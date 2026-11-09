import * as styles from './ApplicationDetail.css.js';

// 분야별 표시 이름
const categoryLabels = {
  NEXT_JS: 'Next.js',
  API: 'API',
  CAREER: 'Career',
  MODERN_JS: 'Modern JS',
  WEB: 'Web',
};

// 문서 타입별 표시 이름
const documentLabels = {
  OFFICIAL: '공식문서',
  BLOG: '블로그',
  BOOK: '책',
  OTHER: '기타',
};

// 분야별 배지 스타일
const categoryStyles = {
  NEXT_JS: styles.nextJsBadge,
  API: styles.apiBadge,
  CAREER: styles.careerBadge,
  MODERN_JS: styles.modernJsBadge,
  WEB: styles.webBadge,
};

export default function ApplicationBadge({ type, value }) {
  if (type === 'category') {
    return (
      <span className={`${styles.badge} ${styles.categoryBadge} ${categoryStyles[value] ?? ''}`}>
        {categoryLabels[value] ?? value}
      </span>
    );
  }

  return (
    <span className={`${styles.badge} ${styles.documentBadge}`}>
      {documentLabels[value] ?? value}
    </span>
  );
}
