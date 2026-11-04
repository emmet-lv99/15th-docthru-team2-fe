'use client';

// src/features/my-challenges/components/ParticipatingList/ParticipatingList.jsx
//
// 참여 중인 챌린지 목록 — 4단계에서는 카드 틀까지 입혔습니다.
// (칩 · 마감일 · 인원 · 버튼은 다음 단계)
import { useParticipating } from '@/features/my-challenges/hooks/useParticipating';
import { ChallengeCardLocal } from '@/features/my-challenges/components/ChallengeCardLocal/ChallengeCardLocal';
import * as styles from './ParticipatingList.css.js';

export function ParticipatingList() {
  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useParticipating();

  if (isPending) return <p>불러오는 중…</p>;

  // 첫 페이지부터 실패한 경우에만 목록을 대신해 오류를 보여줘요.
  // (다음 페이지 실패로 이미 받은 목록을 지워 버리면 안 됩니다)
  if (isError && !data) {
    return <p>목록을 불러오지 못했어요: {error?.message ?? '알 수 없는 오류'}</p>;
  }

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <section className={styles.page}>
      <h2 className={styles.heading}>나의 챌린지</h2>

      {items.length === 0 ? (
        <p>참여 중인 챌린지가 없어요.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.participationId}>
              <ChallengeCardLocal
                title={item.challenge.title}
                category={item.challenge.category}
                documentType={item.challenge.documentType}
              />
            </li>
          ))}
        </ul>
      )}

      {/* 커서 방식이라 페이지 번호 대신 "더 보기"로 다음 묶음을 이어 붙여요 (D-54) */}
      {isFetchNextPageError && <p>다음 목록을 불러오지 못했어요. 다시 시도해 주세요.</p>}

      {hasNextPage && (
        <button type="button" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? '불러오는 중…' : '더 보기'}
        </button>
      )}
    </section>
  );
}

export default ParticipatingList;
