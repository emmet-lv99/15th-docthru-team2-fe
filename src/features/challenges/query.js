// 챌린지 URL 쿼리는 페이지/목록 API에서 공유하되, 다른 도메인의 공용 helper는 변경하지 않는다.
export const CHALLENGE_CATEGORIES = ['NEXT_JS', 'MODERN_JS', 'API', 'WEB', 'CAREER'];
export const CHALLENGE_DOCUMENT_TYPES = ['OFFICIAL', 'BLOG', 'BOOK', 'OTHER'];
export const CHALLENGE_STATUSES = ['IN_PROGRESS', 'CLOSED'];
export const CHALLENGE_SORTS = ['latest', 'deadline', 'popular'];
export const CHALLENGE_PAGE_SIZE = 9;

/** 허용된 필터 값만 서버 요청에 포함하기 위한 검사입니다. */
function allowedValue(value, choices) {
  return typeof value === 'string' && choices.includes(value) ? value : '';
}

/** 페이지 쿼리를 유효한 양의 정수로 정규화합니다. */
function positivePage(value) {
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

// Next.js searchParams: category가 한 개면 문자열, 반복되면 배열이다.
/** URL 검색 파라미터를 서버 계약에 맞는 필터 객체로 정규화합니다. */
export function normalizeChallengeFilters(raw = {}) {
  const filters = raw ?? {};
  const categoryValues = Array.isArray(filters.category) ? filters.category : [filters.category];
  return {
    q: typeof filters.q === 'string' ? filters.q.trim() : '',
    category: [...new Set(categoryValues.filter((v) => CHALLENGE_CATEGORIES.includes(v)))],
    documentType: allowedValue(filters.documentType, CHALLENGE_DOCUMENT_TYPES),
    status: allowedValue(filters.status, CHALLENGE_STATUSES),
    sort: allowedValue(filters.sort, CHALLENGE_SORTS) || 'latest',
    page: positivePage(filters.page),
    size: CHALLENGE_PAGE_SIZE,
  };
}

// 여러 category를 category=A&category=B 로 보내야 백엔드 Zod 배열 계약과 일치한다.
/** 분야 다중 선택 값을 반복 파라미터로 직렬화해 목록 API 쿼리를 생성합니다. */
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
