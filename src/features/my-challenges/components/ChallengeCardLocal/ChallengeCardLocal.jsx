'use client';

// src/features/my-challenges/components/ChallengeCardLocal/ChallengeCardLocal.jsx
//
// 참여 중 목록의 카드 한 장 — 지금은 **제목 + 칩 2개**까지예요.
// 공용 Card/Chip 부품이 아직 뼈대라, 화면 안에서만 쓰는 임시 카드로 시작합니다.
// (공용 부품이 완성되면 이 컴포넌트를 교체하면 됩니다)
import * as styles from './ChallengeCardLocal.css.js';

/** 카테고리 enum → 화면 라벨 (디자인 원본 Chip 과 동일) */
const CATEGORY_LABEL = {
  NEXT_JS: 'Next.js',
  MODERN_JS: 'Modern JS',
  API: 'API',
  WEB: 'Web',
  CAREER: 'Career',
};

/** 문서유형 enum → 화면 라벨 */
const DOC_LABEL = {
  OFFICIAL: '공식문서',
  BLOG: '블로그',
  BOOK: '도서',
  OTHER: '기타',
};

export function ChallengeCardLocal({ title, category, documentType }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.chipRow}>
        {category && (
          <span className={styles.categoryChip[category]}>
            <span className={styles.categoryLabel}>{CATEGORY_LABEL[category] ?? category}</span>
          </span>
        )}
        {documentType && (
          <span className={styles.docChip}>{DOC_LABEL[documentType] ?? documentType}</span>
        )}
      </div>
    </article>
  );
}

export default ChallengeCardLocal;
