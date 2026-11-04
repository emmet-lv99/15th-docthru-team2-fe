'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Chip } from '@/components/Chip';
import { Empty } from '@/components/Empty';
import { useAuth } from '@/contexts/AuthProvider';
import { queryKeys } from '@/lib/queryKeys';
import { joinChallenge } from '@/features/challenges/api';
import {
  useChallengeDetail,
  useChallengeParticipants,
} from '@/features/challenges/hooks/useChallenges';
import {
  CATEGORY_LABEL,
  DOCUMENT_LABEL,
  formatChallengeDate,
  externalSourceUrl,
} from '@/features/challenges/labels';
import * as styles from './challenges.css.js';

function plainText(content) {
  return String(content ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function ProfileAvatar() {
  return (
    <span className={styles.avatar} aria-hidden="true">
      <Image src="/icons/challenges/profile.svg" alt="" width={32} height={32} />
      <Image
        src="/icons/challenges/profile-outline.svg"
        alt=""
        width={24}
        height={14}
        className={styles.avatarOutline}
      />
      <Image
        src="/icons/challenges/profile-underline.svg"
        alt=""
        width={14.3}
        height={1.8}
        className={styles.avatarUnderline}
      />
      <span className={styles.avatarKeys} />
    </span>
  );
}

export default function ChallengeDetailView({
  challengeId,
  initialChallenge,
  initialParticipants,
  participantPage,
  participantSort,
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const {
    data: challenge,
    isPending: detailPending,
    isError: detailError,
  } = useChallengeDetail(challengeId, initialChallenge);
  const pageFilters = { page: participantPage, size: 10, sort: participantSort };
  const {
    data: participants,
    isPending: participantsPending,
    isError: participantsError,
  } = useChallengeParticipants(challengeId, pageFilters, initialParticipants);

  const joinMutation = useMutation({
    mutationFn: () => joinChallenge(challengeId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.challenges.detail(challengeId) }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.challenges.participants(challengeId, pageFilters),
        }),
      ]);
      router.push('/challenges/' + challengeId + '/edit');
      router.refresh();
    },
  });

  function changeParticipants(page, sort = participantSort) {
    const params = new URLSearchParams({ page: String(page), sort });
    router.push('/challenges/' + challengeId + '?' + params);
  }

  if (detailPending)
    return (
      <main className={styles.detailPage} role="status">
        챌린지를 불러오는 중입니다.
      </main>
    );
  if (detailError || !challenge)
    return (
      <main className={styles.detailPage}>
        <div role="alert" className={styles.error}>
          챌린지 정보를 불러올 수 없습니다.
        </div>
      </main>
    );

  const closed = challenge.isClosed || challenge.status === 'CLOSED';
  const source = externalSourceUrl(challenge.sourceUrl);
  const myParticipation = participants?.items?.find(
    (participant) => participant.user?.id === user?.id && !participant.isAbandoned,
  );
  const isAdmin = user?.role === 'ADMIN';
  const cannotJoin = closed || challenge.isFull || isAdmin;

  // 좋아요순 첫 페이지의 작업물 중 최고 하트 수와 동률을 모두 보여줍니다.
  // 전체 페이지를 아우르는 최다 추천작 판정은 백엔드 별도 검증 대상입니다.
  const firstPageRankedWorks =
    closed && participantPage === 1 && participantSort === 'likes'
      ? (participants?.items ?? [])
          .filter((participant) => !participant.isAbandoned)
          .flatMap((participant) =>
            (participant.works ?? []).map((work) => ({ work, user: participant.user })),
          )
          .sort((a, b) => (b.work.likeCount ?? 0) - (a.work.likeCount ?? 0))
      : [];
  const highestLikes = firstPageRankedWorks[0]?.work?.likeCount ?? -1;
  const featured =
    highestLikes > 0
      ? firstPageRankedWorks.filter(({ work }) => (work.likeCount ?? 0) === highestLikes)
      : [];

  return (
    <main className={styles.detailPage}>
      <div className={styles.detailTop}>
        <div className={styles.detailOverview}>
          <h1 className={styles.detailTitle}>{challenge.title}</h1>
          <div className={styles.detailTags}>
            <Chip kind="stack">{CATEGORY_LABEL[challenge.category] ?? challenge.category}</Chip>
            <Chip kind="docType">
              {DOCUMENT_LABEL[challenge.documentType] ?? challenge.documentType}
            </Chip>
          </div>
          <p className={styles.description}>
            {challenge.content || '등록된 상세 내용이 없습니다.'}
          </p>
          <div className={styles.author}>
            <ProfileAvatar />
            <span>{challenge.createdBy?.nickname ?? '작성자'}</span>
          </div>
        </div>
        <aside className={styles.actionPanel} aria-label="챌린지 정보와 참여">
          <div className={styles.detailStats}>
            <span className={styles.statItem}>
              <Image src="/icons/challenges/deadline.svg" alt="" width={16} height={16} />
              {formatChallengeDate(challenge.deadline)} 마감
            </span>
            <span className={styles.statItem}>
              <Image src="/icons/challenges/people.svg" alt="" width={16} height={16} />
              {challenge.participantCount}/{challenge.maxParticipants}명
            </span>
          </div>
          {source ? (
            <a
              className={styles.sourceLink}
              href={source}
              target="_blank"
              rel="noopener noreferrer"
            >
              원문 보기
            </a>
          ) : (
            <span className={styles.sourceUnavailable}>원문 주소가 없습니다</span>
          )}
          {myParticipation ? (
            <Link href={'/challenges/' + challengeId + '/edit'} className={styles.challengeAction}>
              작업 이어하기
            </Link>
          ) : !user && !cannotJoin ? (
            <Link href="/login" className={styles.challengeAction}>
              로그인 후 도전하기
            </Link>
          ) : (
            <button
              type="button"
              className={styles.challengeAction}
              onClick={() => joinMutation.mutate()}
              disabled={cannotJoin || joinMutation.isPending}
            >
              {closed
                ? '챌린지 마감'
                : challenge.isFull
                  ? '모집 완료'
                  : isAdmin
                    ? '관리자는 참여할 수 없습니다'
                    : joinMutation.isPending
                      ? '참여 요청 중...'
                      : '작업 도전하기'}
            </button>
          )}
          {joinMutation.isError && (
            <p role="alert" className={styles.actionError}>
              참여 요청이 처리되지 않았습니다.{' '}
              {joinMutation.error?.message ?? '다시 시도해 주세요.'}
            </p>
          )}
        </aside>
      </div>

      {closed && featured.length > 0 && (
        <section aria-label="최다 추천 번역">
          <h2 className={styles.featuredHeading}>최다 추천 번역</h2>
          <div className={styles.featuredScroller}>
            {featured.map(({ work, user: author }) => (
              <article className={styles.featuredCard} key={work.id}>
                <span className={styles.featuredLabel}>
                  <Image src="/icons/challenges/crown.svg" alt="" width={16} height={16} />
                  최다 추천 번역
                </span>
                <div className={styles.featuredMeta}>
                  <ProfileAvatar />
                  <strong>{author?.nickname ?? '참여자'}</strong>
                  <span className={styles.statItem}>
                    <Image src="/icons/challenges/heart.svg" alt="" width={16} height={16} />
                    {work.likeCount ?? 0}
                  </span>
                  <span>{formatChallengeDate(work.submittedAt)}</span>
                </div>
                <p className={styles.featuredText}>
                  {plainText(work.content).slice(0, 240) || '번역 내용 보기'}
                </p>
                <Link
                  className={styles.workLink}
                  href={'/challenges/' + challengeId + '/works/' + work.id}
                >
                  전체 번역 보기 →
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className={styles.participantPanel} aria-label="참여 현황">
        <div className={styles.participantHeader}>
          <h2 className={styles.sectionTitle}>참여 현황</h2>
          <div className={styles.participantControls}>
            <span className={styles.pageIndicator}>
              {participants?.page ?? participantPage} / {Math.max(1, participants?.totalPages ?? 1)}
            </span>
            <button
              type="button"
              className={styles.pageArrow}
              aria-label="이전 참여자 페이지"
              disabled={participantPage <= 1}
              onClick={() => changeParticipants(participantPage - 1)}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.pageArrow}
              aria-label="다음 참여자 페이지"
              disabled={participantPage >= (participants?.totalPages ?? 1)}
              onClick={() => changeParticipants(participantPage + 1)}
            >
              ›
            </button>
          </div>
        </div>
        {participantsPending ? (
          <p role="status" className={styles.muted}>
            참여자 현황을 불러오는 중입니다.
          </p>
        ) : participantsError ? (
          <div role="alert" className={styles.error}>
            참여자 현황을 불러올 수 없습니다.
          </div>
        ) : !participants?.items?.length ? (
          <Empty title="아직 참여자가 없어요" description="첫 번째 참여자가 되어 보세요." />
        ) : (
          <div className={styles.participantList}>
            {participants.items.map((participant, index) => {
              const work = participant.works?.[0];
              return (
                <article key={participant.participantId} className={styles.participant}>
                  <span className={styles.rank}>
                    {String((participantPage - 1) * 10 + index + 1).padStart(2, '0')}
                  </span>
                  <div className={styles.participantIdentity}>
                    <ProfileAvatar />
                    <div className={styles.participantMeta}>
                      <span className={styles.participantName}>
                        {participant.user?.nickname ?? '참여자'}
                      </span>
                      <span className={styles.participantGrade}>
                        {participant.isAbandoned
                          ? '참여 포기'
                          : participant.user?.grade === 'EXPERT'
                            ? '전문가'
                            : '일반'}
                      </span>
                    </div>
                  </div>
                  {work && (
                    <span className={styles.participantDate}>
                      {formatChallengeDate(work.submittedAt)} 제출
                    </span>
                  )}
                  <span className={styles.participantStats}>
                    <Image src="/icons/challenges/heart.svg" alt="" width={16} height={16} />
                    {work?.likeCount ?? 0}
                  </span>
                  {work ? (
                    <Link
                      className={styles.workLink}
                      href={'/challenges/' + challengeId + '/works/' + work.id}
                    >
                      작업물 보기 ›
                    </Link>
                  ) : (
                    <span className={styles.noWork}>미제출</span>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
      <Link href="/challenges" className={styles.backLink}>
        ← 챌린지 목록으로
      </Link>
    </main>
  );
}
