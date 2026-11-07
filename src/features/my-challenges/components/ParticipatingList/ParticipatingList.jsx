'use client';

// src/features/my-challenges/components/ParticipatingList/ParticipatingList.jsx
//
// 참여 중인 챌린지 목록 — 8단계에서 검색까지 붙였습니다.
// (탭 · 4가지 상태 정리는 다음 단계)
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ChallengeCardLocal } from '@/features/my-challenges/components/ChallengeCardLocal/ChallengeCardLocal';
import { MyChallengesTabs } from '@/features/my-challenges/components/MyChallengesTabs/MyChallengesTabs';
import { useParticipating } from '@/features/my-challenges/hooks/useParticipating';
import * as styles from './ParticipatingList.css.js';

export function ParticipatingList() {
  // 입력값(inputValue)과 실제 요청어(keyword)를 나눠요 — 타이핑마다 요청하지 않으려고요.
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setKeyword(inputValue.trim()), 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
    // background refetch 중에도 '더 보기'를 잠가요 — 클릭하면 진행 중인 refetch 가 취소됩니다
    isFetching,
    isFetchNextPageError,
  } = useParticipating({ q: keyword });

  // 첫 페이지부터 실패한 경우에만 목록을 대신해 오류를 보여줘요.
  // (다음 페이지 실패로 이미 받은 목록을 지워 버리면 안 됩니다)
  const showError = isError && !data;
  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <section className={styles.page}>
      <h2 className={styles.heading}>나의 챌린지</h2>

      <MyChallengesTabs />

      <div className={styles.searchWrap}>
        <Image
          className={styles.searchIcon}
          src="/icons/search.svg"
          alt=""
          width={18}
          height={18}
        />
        <input
          type="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="챌린지 이름을 검색해보세요"
          aria-label="챌린지 이름 검색"
          className={styles.searchInput}
        />
      </div>

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
              <p className={styles.stateTitle}>참여 중인 챌린지가 없어요.</p>
              <p className={styles.stateDesc}>마음에 드는 챌린지를 찾아 도전해 보세요.</p>
              <Link href="/challenges" className={styles.stateLink}>
                챌린지 둘러보기
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
    </section>
  );
}

export default ParticipatingList;
