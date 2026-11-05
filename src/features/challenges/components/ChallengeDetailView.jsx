'use client';

import { useState } from 'react';
import Image from 'next/image';
import iconProfile from '../assets/profile.svg';
import iconProfileOutline from '../assets/profile-outline.svg';
import iconProfileUnderline from '../assets/profile-underline.svg';
import iconCrown from '../assets/crown.svg';
import iconHeart from '../assets/heart.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Chip } from '@/components/Chip';
import { Empty } from '@/components/Empty';
import { useAuth } from '@/contexts/AuthProvider';
import { queryKeys } from '@/lib/queryKeys';
import { abandonChallenge, joinChallenge } from '@/features/challenges/api';
import {
  useChallengeDetail,
  useChallengeParticipants,
  useMyChallengeParticipation,
  useTopLikedWorks,
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
    .replace(/<\/?(?:br|p|div|li)\b[^>]*>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function ProfileAvatar() {
  return (
    <span className={styles.avatar} aria-hidden="true">
      <Image src={iconProfile} alt="" width={32} height={32} />
      <Image
        src={iconProfileOutline}
        alt=""
        width={24}
        height={14}
        className={styles.avatarOutline}
      />
      <Image
        src={iconProfileUnderline}
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
  const { user, isPending: authPending } = useAuth();
  const [confirmAbandon, setConfirmAbandon] = useState(false);
  const [actionNotice, setActionNotice] = useState('');
  const [expandedWorkId, setExpandedWorkId] = useState(null);

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

  const closed = Boolean(challenge?.isClosed || challenge?.status === 'CLOSED');
  const isUser = user?.role === 'USER';
  const {
    data: myParticipation,
    isPending: participationPending,
    isError: participationError,
    refetch: retryParticipation,
  } = useMyChallengeParticipation(challengeId, isUser);
  const {
    data: featured = [],
    isPending: featuredPending,
    isError: featuredError,
  } = useTopLikedWorks(challengeId, closed);

  async function refreshAfterParticipationChange() {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.challenges.all() }),
      queryClient.invalidateQueries({ queryKey: queryKeys.myChallenges.all() }),
    ]);
    router.refresh();
  }

  const joinMutation = useMutation({
    mutationFn: () => joinChallenge(challengeId),
    onSuccess: async () => {
      setActionNotice('참여가 완료됐습니다. 작업 이어하기를 선택할 수 있습니다.');
      await refreshAfterParticipationChange();
    },
  });
  const abandonMutation = useMutation({
    mutationFn: () => abandonChallenge(challengeId),
    onSuccess: async () => {
      setConfirmAbandon(false);
      setActionNotice('참여를 포기했습니다.');
      await refreshAfterParticipationChange();
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

  const source = externalSourceUrl(challenge.sourceUrl);
  const isAdmin = user?.role === 'ADMIN';
  const cannotJoin = closed || challenge.isFull || isAdmin;

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
          {authPending || (isUser && participationPending) ? (
            <button type="button" className={styles.challengeAction} disabled>
              {authPending ? '로그인 상태 확인 중...' : '참여 상태 확인 중...'}
            </button>
          ) : isUser && participationError ? (
            <>
              <button type="button" className={styles.challengeAction} disabled>
                참여 상태를 확인할 수 없습니다
              </button>
              <button
                type="button"
                className={styles.retryAction}
                onClick={() => retryParticipation()}
              >
                다시 확인하기
              </button>
            </>
          ) : myParticipation?.participating ? (
            <>
              {closed ? (
                <button type="button" className={styles.challengeAction} disabled>
                  챌린지 마감
                </button>
              ) : (
                <Link
                  href={'/challenges/' + challengeId + '/edit'}
                  className={styles.challengeAction}
                >
                  작업 이어하기
                </Link>
              )}
              {myParticipation.totalWorks > 0 ? (
                <p className={styles.actionHint}>제출한 번역문이 있어 참여를 포기할 수 없습니다.</p>
              ) : (
                <>
                  <button
                    type="button"
                    className={styles.abandonAction}
                    onClick={() => setConfirmAbandon(true)}
                    disabled={abandonMutation.isPending}
                  >
                    참여 포기하기
                  </button>
                  {confirmAbandon && (
                    <div className={styles.confirmBox} role="group" aria-label="참여 포기 확인">
                      <p>참여를 포기하시겠습니까?</p>
                      <div className={styles.confirmButtons}>
                        <button
                          type="button"
                          className={styles.confirmAbandon}
                          onClick={() => abandonMutation.mutate()}
                          disabled={abandonMutation.isPending}
                        >
                          {abandonMutation.isPending ? '처리 중...' : '포기 확정'}
                        </button>
                        <button
                          type="button"
                          className={styles.confirmCancel}
                          onClick={() => setConfirmAbandon(false)}
                          disabled={abandonMutation.isPending}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : !user && !cannotJoin ? (
            <Link href="/login" className={styles.challengeAction}>
              로그인 후 도전하기
            </Link>
          ) : (
            <button
              type="button"
              className={styles.challengeAction}
              onClick={() => {
                setActionNotice('');
                joinMutation.mutate();
              }}
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
          {actionNotice && (
            <p role="status" className={styles.actionHint}>
              {actionNotice}
            </p>
          )}
          {(joinMutation.isError || abandonMutation.isError) && (
            <p role="alert" className={styles.actionError}>
              {joinMutation.error?.message ??
                abandonMutation.error?.message ??
                '참여 상태를 변경하지 못했습니다. 다시 시도해 주세요.'}
            </p>
          )}
        </aside>
      </div>

      {closed && featuredPending && (
        <p role="status" className={styles.muted}>
          최다 추천 번역을 확인하는 중입니다.
        </p>
      )}
      {closed && featuredError && (
        <p role="alert" className={styles.actionError}>
          최다 추천 번역을 불러오지 못했습니다.
        </p>
      )}
      {closed && featured.length > 0 && (
        <section aria-label="최다 추천 번역">
          <h2 className={styles.featuredHeading}>최다 추천 번역</h2>
          <div className={styles.featuredScroller}>
            {featured.map(({ work, user: author }) => {
              const content = plainText(work.content) || '번역 내용 보기';
              const canExpand = content.length > 240;
              const expanded = expandedWorkId === work.id;
              return (
                <article className={styles.featuredCard} key={work.id}>
                  <span className={styles.featuredLabel}>
                    <Image src={iconCrown} alt="" width={16} height={16} />
                    최다 추천 번역
                  </span>
                  <div className={styles.featuredMeta}>
                    <ProfileAvatar />
                    <strong>{author?.nickname ?? '참여자'}</strong>
                    <span className={styles.statItem}>
                      <Image src={iconHeart} alt="" width={16} height={16} />
                      {work.likeCount ?? 0}
                    </span>
                    <span>{formatChallengeDate(work.submittedAt)}</span>
                  </div>
                  <p className={styles.featuredText} id={'featured-preview-' + work.id}>
                    {expanded ? content : content.slice(0, 240)}
                  </p>
                  {canExpand && (
                    <button
                      type="button"
                      className={styles.featuredExpandButton}
                      aria-controls={'featured-preview-' + work.id}
                      aria-expanded={expanded}
                      onClick={() => setExpandedWorkId(expanded ? null : work.id)}
                    >
                      {expanded ? '접기 ⌃' : '더보기 ⌄'}
                    </button>
                  )}
                  <Link
                    className={styles.workLink}
                    href={'/challenges/' + challengeId + '/works/' + work.id}
                  >
                    전체 번역 보기 →
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <section className={styles.participantPanel} aria-label="참여 현황">
        <div className={styles.participantHeader}>
          <h2 className={styles.sectionTitle}>참여 현황</h2>
          <div className={styles.participantControls}>
            <label className={styles.participantSort}>
              정렬
              <select
                aria-label="참여 현황 정렬"
                className={styles.participantSortSelect}
                value={participantSort}
                onChange={(event) => changeParticipants(1, event.target.value)}
              >
                <option value="likes">하트순</option>
                <option value="submittedAt">제출순</option>
              </select>
            </label>
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
                    <Image src={iconHeart} alt="" width={16} height={16} />
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
