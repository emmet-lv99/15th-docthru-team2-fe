// src/lib/api.js — 서버 컴포넌트용 API 호출 유틸
//
// Next 16 App Router 패턴
//   서버 컴포넌트에서 fetch(`${process.env.API_URL}/api/...`) 로 직접 조회한다.
//
// ⚠️ 우리 API 의 인증 방식 때문에 한 줄이 더 필요하다:
//   우리 백엔드는 httpOnly 쿠키(accessToken/refreshToken)로 인증한다(D-06).
//   서버 컴포넌트가 fetch 를 하면 **브라우저 쿠키가 자동으로 붙지 않는다**.
//   → next/headers 의 cookies() 로 브라우저가 보낸 쿠키 헤더를 그대로 전달해야 한다.
//   이걸 빠뜨리면 /me/* · /notifications · /admin/* 가 전부 401 이 된다.
import { cookies } from 'next/headers';

/**
 * 백엔드 베이스 URL — **서버 전용** env 를 먼저 쓴다.
 * NEXT_PUBLIC_ 접두사가 붙으면 클라이언트 번들에 값이 박혀 버리므로 서버 전용 변수를 우선한다.
 */
export const BASE_URL =
  process.env.BACKEND_BASE_URL ??
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL ??
  'http://localhost:5010/api/v1';

/**
 * 인증이 필요한 API 호출.
 * @param {string} path  예: '/challenges?page=1&size=20'
 * @param {{ cache?: RequestCache, method?: string, body?: unknown }} options
 */
export async function apiFetch(path, options = {}) {
  const { cache = 'no-store', method = 'GET', body } = options;

  // 서버 컴포넌트에서만 호출 가능하다 (cookies() 제약)
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    cache,
    headers: {
      ...(cookieHeader && { cookie: cookieHeader }),
      ...(body && { 'Content-Type': 'application/json' }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  return response;
}

/**
 * JSON 을 파싱해 주는 헬퍼.
 * 404 여부를 함께 돌려줘야 page.js 에서 notFound() 를 호출할 수 있다.
 */
export async function apiGet(path, options = {}) {
  const response = await apiFetch(path, options);

  if (response.status === 404) {
    return { ok: false, status: 404, data: null };
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    return { ok: false, status: response.status, data: error };
  }

  return { ok: true, status: response.status, data: await response.json() };
}

/**
 * 쿼리스트링 조립 — 값이 undefined/null/'' 이면 키 자체를 넣지 않는다.
 * (그래야 서버 기본값이 그대로 적용된다)
 */
export function toQuery(params) {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    search.set(key, String(value));
  }

  const query = search.toString();
  return query ? `?${query}` : '';
}
