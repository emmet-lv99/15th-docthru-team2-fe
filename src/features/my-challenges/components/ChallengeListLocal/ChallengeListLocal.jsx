'use client';

// src/features/my-challenges/components/ChallengeListLocal/ChallengeListLocal.jsx
//
// 목록 + 4가지 상태를 한곳에 모은 공통 뷰 — 참여 중/완료 화면이 함께 써요.
// (검색 입력은 화면마다 따로 두고, 결과 표시만 여기서 담당합니다)
import Link from 'next/link';

import { ChallengeCardLocal } from '@/features/my-challenges/components/ChallengeCardLocal/ChallengeCardLocal';
import * as styles from './ChallengeListLocal.css.js';

/**
 * @param {object} props
 * @param {object} props.query useInfiniteQuery 결과
 * @param {string} props.keyword 현재 검색어 (빈 값이면 전체 목록)
 * @param {'participating'|'completed'} [props.mode] 카드 CTA 종류
 * @param {{title:string, description:string, href:string, linkLabel:string}} props.empty
 */
export function ChallengeListLocal({ query, keyword, mode = 'participating', empty }) {
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchNextPageError,
  } = query;

  // 첫 페이지부터 실패한 경우에만 목록을 대신해 오류를 보여 줘요.
  // (다음 페이지 실패로 이미 받은 목록을 지워 버리면 안 됩니다)
  const showError = isError && !data;
  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <>
      {isPending && (
        <ul className={styles.list} aria-busy="true" aria-label="목록을 불러오는 중">
          {[0, 1, 2].map((key) => (
            <li key={key}>
              <div className={styles.skeletonCard}>
                <span className={styles.skeletonTitle} />
                <span className={styles.skeletonChip} />
                <span className={styles.skeletonMeta} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {showError && (
        <div className={styles.stateBox} role="alert">
          <p className={styles.stateTitle}>목록을 불러오지 못했어요.</p>
          <p className={styles.stateDesc}>{error?.message ?? '잠시 후 다시 시도해 주세요.'}</p>
          <button type="button" className={styles.retryButton} onClick={() => refetch()}>
            다시 시도
          </button>
        </div>
      )}

      {!isPending && !showError && items.length === 0 && (
        <div className={styles.stateBox}>
          {keyword ? (
            <>
              <p className={styles.stateTitle}>‘{keyword}’에 해당하는 챌린지가 없어요.</p>
              <p className={styles.stateDesc}>검색어를 바꿔 다시 찾아보세요.</p>
            </>
          ) : (
            <>
              <p className={styles.stateTitle}>{empty.title}</p>
              <p className={styles.stateDesc}>{empty.description}</p>
              <Link href={empty.href} className={styles.stateLink}>
                {empty.linkLabel}
              </Link>
            </>
          )}
        </div>
      )}

      {items.length > 0 && (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.participationId}>
              <ChallengeCardLocal
                mode={mode}
                challengeId={item.challenge.id}
                title={item.challenge.title}
                category={item.challenge.category}
                documentType={item.challenge.documentType}
                deadline={item.challenge.deadline}
                participantCount={item.challenge.participantCount}
                maxParticipants={item.challenge.maxParticipants}
                isClosed={item.challenge.isClosed}
                latestWorkId={item.latestWork?.id ?? null}
              />
            </li>
          ))}
        </ul>
      )}

      {/* 커서 방식이라 페이지 번호 대신 "더 보기"로 다음 묶음을 이어 붙여요 (D-54) */}
      {isFetchNextPageError && (
        <div className={styles.nextError}>
          <span>다음 목록을 불러오지 못했어요.</span>
          <button
            type="button"
            className={styles.nextRetry}
            onClick={() => fetchNextPage()}
            disabled={isFetching}
          >
            다시 시도
          </button>
        </div>
      )}

      {hasNextPage && (
        <button
          type="button"
          className={styles.moreButton}
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        >
          {isFetching ? '불러오는 중…' : '더 보기'}
        </button>
      )}
    </>
  );
}

export default ChallengeListLocal;
