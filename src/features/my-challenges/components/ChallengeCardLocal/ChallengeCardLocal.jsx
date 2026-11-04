'use client';

// src/features/my-challenges/components/ChallengeCardLocal/ChallengeCardLocal.jsx
//
// 참여 중 목록의 카드 한 장 — 제목 · 칩 2개 · 마감일/인원까지예요.
// 공용 Card/Chip 부품이 아직 뼈대라 화면 안에서만 쓰는 임시 카드로 시작합니다.
// (공용 부품이 완성되면 이 컴포넌트를 교체하면 됩니다)
import Image from 'next/image';

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

/** ISO(UTC) → "2026년 12월 20일" (한국 시간 기준) */
function formatDeadline(iso) {
  if (!iso) return null;

  return new Date(iso).toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ChallengeCardLocal({
  title,
  category,
  documentType,
  deadline,
  participantCount,
  maxParticipants,
  isClosed = false,
}) {
  const deadlineText = formatDeadline(deadline);
  const hasPeople = Number.isFinite(participantCount) && Number.isFinite(maxParticipants);

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

      <div className={styles.footer}>
        <hr className={styles.divider} />
        <div className={styles.metaRow}>
          <div className={styles.metaLeft}>
            {deadlineText && (
              <span className={styles.metaItem}>
                <Image src="/icons/deadline-black.svg" alt="" width={16} height={16} />
                {deadlineText} 마감
              </span>
            )}
            {hasPeople && (
              <span className={styles.metaItem}>
                <Image src="/icons/person-yellow.svg" alt="" width={16} height={16} />
                {participantCount}/{maxParticipants} {isClosed ? '참여 완료' : '참여 중'}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ChallengeCardLocal;
