'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ChallengeListLocal } from '@/features/my-challenges/components/ChallengeListLocal/ChallengeListLocal';
import { MyChallengesTabs } from '@/features/my-challenges/components/MyChallengesTabs/MyChallengesTabs';
import { SearchBoxLocal } from '@/features/my-challenges/components/SearchBoxLocal/SearchBoxLocal';
import { useDebouncedKeyword } from '@/features/my-challenges/hooks/useDebouncedKeyword';
import { useParticipating } from '@/features/my-challenges/hooks/useParticipating';
import * as styles from '@/features/my-challenges/components/myChallengesLayout.css.js';

const EMPTY = {
  title: '참여 중인 챌린지가 없어요.',
  description: '마음에 드는 챌린지를 찾아 도전해 보세요.',
  href: '/challenges',
  linkLabel: '챌린지 둘러보기',
};

export function ParticipatingList() {
  const { inputValue, setInputValue, keyword } = useDebouncedKeyword();
  const query = useParticipating({ q: keyword });

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>나의 챌린지</h1>
          <Link href="/my-applications/new" className={styles.newButton}>
            신규 챌린지 신청
            <Image src="/icons/plus-white.svg" alt="" width={14} height={14} />
          </Link>
        </div>

        <div className={styles.tabs}>
          <MyChallengesTabs />
        </div>

        <SearchBoxLocal value={inputValue} onChange={setInputValue} />

        <ChallengeListLocal query={query} keyword={keyword} mode="participating" empty={EMPTY} />
      </div>
    </div>
  );
}

export default ParticipatingList;
