'use client';

// src/features/my-challenges/components/ParticipatingList/ParticipatingList.jsx
//
// 참여 중인 챌린지 목록 — 8단계에서 검색까지 붙였습니다.
// (탭 · 4가지 상태 정리는 다음 단계)
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ChallengeCardLocal } from '@/features/my-challenges/components/ChallengeCardLocal/ChallengeCardLocal';
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
    isFetchingNextPage,
    isFetchNextPageError,
  } = useParticipating({ q: keyword });

  // 첫 페이지부터 실패한 경우에만 목록을 대신해 오류를 보여줘요.
  // (다음 페이지 실패로 이미 받은 목록을 지워 버리면 안 됩니다)
  const showError = isError && !data;
  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <section className={styles.page}>
      <h2 className={styles.heading}>나의 챌린지</h2>

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

      {isPending && <p>불러오는 중…</p>}

      {showError && <p>목록을 불러오지 못했어요: {error?.message ?? '알 수 없는 오류'}</p>}

      {!isPending && !showError && items.length === 0 && (
        <p>{keyword ? '검색 결과가 없어요.' : '참여 중인 챌린지가 없어요.'}</p>
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
