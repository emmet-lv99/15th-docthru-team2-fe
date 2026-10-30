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
 * 서버 요청 상한 — 브라우저(client.js)의 10초 timeout 과 맞춰 두었어요.
 * 이게 없으면 백엔드가 응답을 안 줄 때 페이지 렌더가 그대로 멈춥니다.
 */
const REQUEST_TIMEOUT_MS = 10_000;

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
    // 응답이 없으면 10초 뒤 스스로 중단해요 (그대로 두면 렌더가 멈춥니다).
    // 참고: signal 을 넘기면 같은 렌더 안의 fetch 메모이제이션은 적용되지 않아요.
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  return response;
}

/**
 * JSON 을 파싱해 주는 헬퍼.
 * 404 여부를 함께 돌려줘야 page.js 에서 notFound() 를 호출할 수 있다.
 *
 * ⚠️ 본문이 없는 응답(204)은 파싱하지 않아요.
 *   우리 명세에서 logout · DELETE /auth/me · password-reset/confirm 이 204 라서,
 *   빈 본문에 response.json() 을 부르면 SyntaxError 가 납니다.
 */
export async function apiGet(path, options = {}) {
  const response = await apiFetch(path, options);

  // 204 No Content — 성공이지만 본문이 없어요.
  if (response.status === 204) {
    return { ok: true, status: 204, data: null };
  }

  if (response.status === 404) {
    return { ok: false, status: 404, data: null };
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    return { ok: false, status: response.status, data: error };
  }

  // 200 이어도 본문이 비어 있을 수 있어서 text 로 먼저 확인해요.
  const text = await response.text();
  if (!text) return { ok: true, status: response.status, data: null };

  try {
    return { ok: true, status: response.status, data: JSON.parse(text) };
  } catch {
    // JSON 이 아닌 200 응답(프록시 오류 페이지 등)은 빈 데이터로 처리해요.
    return { ok: true, status: response.status, data: null };
  }
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
