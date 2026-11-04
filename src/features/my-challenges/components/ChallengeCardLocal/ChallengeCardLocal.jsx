'use client';

// src/features/my-challenges/components/ChallengeCardLocal/ChallengeCardLocal.jsx
//
// 참여 중 목록의 카드 한 장 — 지금은 **제목만** 담는 틀이에요.
// 공용 Card 부품(src/components/Card)이 아직 뼈대라, 화면 안에서만 쓰는 임시 카드로 시작합니다.
// (공용 Card 가 완성되면 이 컴포넌트를 교체하면 됩니다)
import * as styles from './ChallengeCardLocal.css.js';

export function ChallengeCardLocal({ title }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
    </article>
  );
}

export default ChallengeCardLocal;
