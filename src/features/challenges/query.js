// 챌린지 URL 쿼리는 페이지/목록 API에서 공유하되, 다른 도메인의 공용 helper는 변경하지 않는다.
export const CHALLENGE_CATEGORIES = ['NEXT_JS', 'MODERN_JS', 'API', 'WEB', 'CAREER'];
export const CHALLENGE_DOCUMENT_TYPES = ['OFFICIAL', 'BLOG', 'BOOK', 'OTHER'];
export const CHALLENGE_STATUSES = ['IN_PROGRESS', 'CLOSED'];
export const CHALLENGE_SORTS = ['latest', 'deadline', 'popular'];
export const CHALLENGE_PAGE_SIZE = 9;

function allowedValue(value, choices) {
  return typeof value === 'string' && choices.includes(value) ? value : '';
}

function positivePage(value) {
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

// Next.js searchParams: category가 한 개면 문자열, 반복되면 배열이다.
export function normalizeChallengeFilters(raw = {}) {
  const categoryValues = Array.isArray(raw.category) ? raw.category : [raw.category];
  return {
    q: typeof raw.q === 'string' ? raw.q.trim() : '',
    category: [...new Set(categoryValues.filter((v) => CHALLENGE_CATEGORIES.includes(v)))],
    documentType: allowedValue(raw.documentType, CHALLENGE_DOCUMENT_TYPES),
    status: allowedValue(raw.status, CHALLENGE_STATUSES),
    sort: allowedValue(raw.sort, CHALLENGE_SORTS) || 'latest',
    page: positivePage(raw.page),
    size: CHALLENGE_PAGE_SIZE,
  };
}

// 여러 category를 category=A&category=B 로 보내야 백엔드 Zod 배열 계약과 일치한다.
export function buildChallengeQuery(filters = {}) {
  const f = normalizeChallengeFilters(filters);
  const params = new URLSearchParams();
  if (f.q) params.set('q', f.q);
  for (const category of f.category) params.append('category', category);
  if (f.documentType) params.set('documentType', f.documentType);
  if (f.status) params.set('status', f.status);
  params.set('sort', f.sort);
  params.set('page', String(f.page));
  params.set('size', String(f.size));
  return params.toString();
}
