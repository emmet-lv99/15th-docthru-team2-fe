// src/features/my-challenges/components/CompletedPlaceholder/CompletedPlaceholder.jsx
//
// 완료한 챌린지 화면의 임시 안내 — 목록 구현은 다음 작업(5일차)에서 채워요.
// 지금은 탭을 잃지 않도록 같은 탭 메뉴와 안내 문구만 먼저 보여 줍니다.
import Link from 'next/link';

import { MyChallengesTabs } from '@/features/my-challenges/components/MyChallengesTabs/MyChallengesTabs';
import * as styles from './CompletedPlaceholder.css.js';

export function CompletedPlaceholder() {
  return (
    <section className={styles.page}>
      <h2 className={styles.heading}>나의 챌린지</h2>

      <MyChallengesTabs />

      <div className={styles.box}>
        <p className={styles.title}>완료한 챌린지를 준비하고 있어요.</p>
        <p className={styles.desc}>
          마감된 챌린지와 내가 제출한 작업물을 이 화면에서 볼 수 있게 될 거예요.
        </p>
        <Link href="/my-challenges/participating" className={styles.link}>
          참여 중인 챌린지 보기
        </Link>
      </div>
    </section>
  );
}

export default CompletedPlaceholder;
