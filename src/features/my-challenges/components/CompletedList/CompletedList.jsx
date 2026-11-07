'use client';

// src/features/my-challenges/components/CompletedList/CompletedList.jsx
//
// 완료한 챌린지 목록 — 탭 + 검색 + 목록(4가지 상태).
// 카드 CTA 는 "내 작업물 보기" 로, 제출물이 없으면 버튼을 숨겨요.
import { MyChallengesTabs } from '@/features/my-challenges/components/MyChallengesTabs/MyChallengesTabs';
import { ChallengeListLocal } from '@/features/my-challenges/components/ChallengeListLocal/ChallengeListLocal';
import { SearchBoxLocal } from '@/features/my-challenges/components/SearchBoxLocal/SearchBoxLocal';
import { useCompleted } from '@/features/my-challenges/hooks/useCompleted';
import { useDebouncedKeyword } from '@/features/my-challenges/hooks/useDebouncedKeyword';
import * as styles from '@/features/my-challenges/components/myChallengesLayout.css.js';

/** 완료가 하나도 없을 때 보여 줄 안내 */
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
    <section className={styles.page}>
      <h2 className={styles.heading}>나의 챌린지</h2>

      <MyChallengesTabs />

      <SearchBoxLocal value={inputValue} onChange={setInputValue} />

      <ChallengeListLocal query={query} keyword={keyword} mode="completed" empty={EMPTY} />
    </section>
  );
}

export default CompletedList;
