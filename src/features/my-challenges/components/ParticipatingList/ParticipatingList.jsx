'use client';

// src/features/my-challenges/components/ParticipatingList/ParticipatingList.jsx
//
// 참여 중인 챌린지 목록 — 탭 + 검색 + 목록(4가지 상태).
// 목록 표시는 ChallengeListLocal 이 담당해요(완료 화면과 공유).
import { MyChallengesTabs } from '@/features/my-challenges/components/MyChallengesTabs/MyChallengesTabs';
import { ChallengeListLocal } from '@/features/my-challenges/components/ChallengeListLocal/ChallengeListLocal';
import { SearchBoxLocal } from '@/features/my-challenges/components/SearchBoxLocal/SearchBoxLocal';
import { useDebouncedKeyword } from '@/features/my-challenges/hooks/useDebouncedKeyword';
import { useParticipating } from '@/features/my-challenges/hooks/useParticipating';
import * as styles from '@/features/my-challenges/components/myChallengesLayout.css.js';

/** 참여가 하나도 없을 때 보여 줄 안내 */
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
    <section className={styles.page}>
      <h2 className={styles.heading}>나의 챌린지</h2>

      <MyChallengesTabs />

      <SearchBoxLocal value={inputValue} onChange={setInputValue} />

      <ChallengeListLocal query={query} keyword={keyword} mode="participating" empty={EMPTY} />
    </section>
  );
}

export default ParticipatingList;
