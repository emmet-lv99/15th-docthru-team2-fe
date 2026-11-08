'use client';

import Link from 'next/link';

import { ChallengeListLocal } from '@/features/my-challenges/components/ChallengeListLocal/ChallengeListLocal';
import { MyChallengesTabs } from '@/features/my-challenges/components/MyChallengesTabs/MyChallengesTabs';
import { SearchBoxLocal } from '@/features/my-challenges/components/SearchBoxLocal/SearchBoxLocal';
import { useCompleted } from '@/features/my-challenges/hooks/useCompleted';
import { useDebouncedKeyword } from '@/features/my-challenges/hooks/useDebouncedKeyword';
import * as styles from '@/features/my-challenges/components/myChallengesLayout.css.js';

const EMPTY = {
  title: '완료한 챌린지가 없어요.',
  description: '챌린지를 마치면 이 화면에서 제출한 작업물을 볼 수 있어요.',
  href: '/my-challenges/participating',
  linkLabel: '참여 중인 챌린지 보기',
};

export function CompletedList() {
  const { inputValue, setInputValue, keyword } = useDebouncedKeyword();
  const query = useCompleted({ q: keyword });

  return (
    <div className={styles.pageBackground}>
      <main className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>나의 챌린지</h1>
          <Link href="/my-applications/new" className={styles.newButton}>
            신규 챌린지 신청
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 8H14M8 14V2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>

        <div className={styles.tabs}>
          <MyChallengesTabs />
        </div>

        <SearchBoxLocal value={inputValue} onChange={setInputValue} />

        <ChallengeListLocal query={query} keyword={keyword} mode="completed" empty={EMPTY} />
      </main>
    </div>
  );
}

export default CompletedList;
