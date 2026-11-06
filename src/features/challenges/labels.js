export const CATEGORY_LABEL = {
  NEXT_JS: 'Next.js',
  MODERN_JS: 'Modern JS',
  API: 'API',
  WEB: 'Web',
  CAREER: 'Career',
};

export const DOCUMENT_LABEL = {
  OFFICIAL: '공식 문서',
  BLOG: '블로그',
  BOOK: '도서',
  OTHER: '기타',
};

export const STATUS_LABEL = {
  IN_PROGRESS: '진행 중',
  CLOSED: '마감',
};

export function formatChallengeDate(iso) {
  if (!iso || Number.isNaN(new Date(iso).getTime())) return '-';
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso));
}

export function externalSourceUrl(url) {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : null;
  } catch {
    return null;
  }
}
