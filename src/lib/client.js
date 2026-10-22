// src/lib/client.js — 클라이언트 컴포넌트 전용 API 호출 도우미
//
// 왜 서버용 src/lib/api.js 와 따로 두나요?
//   · lib/api.js 는 next/headers 의 cookies() 를 쓰는 서버 전용이라 브라우저에서 못 씁니다.
//   · 브라우저는 프록시 경로(/api/backend/*)로 호출하면 httpOnly 쿠키가 자동으로 실려요.
//     (next.config.mjs 의 rewrite 가 백엔드로 넘겨줍니다)
//
// ⚠️ 이 파일은 'use client' 컴포넌트에서만 쓰세요. 서버 컴포넌트는 lib/api.js 를 쓰시면 됩니다.
//
// ③ 담당 인증 정책 — 401 세션 갱신은 이 파일의 TODO 지점에서 구현합니다.
//   공용 HTTP 동작(timeout·오류 변환)은 아래에 제공되어 있어요.
import axios from 'axios';

const API_BASE = '/api/backend';
const REQUEST_TIMEOUT_MS = 10_000;

// 응답이 실패했을 때 상태·오류 코드·문제 필드를 함께 실어 보내는 에러예요.
// 화면에서 error.status · error.code · error.field 로 분기할 수 있어요.
export class ApiError extends Error {
  constructor(message, { status, code, field } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.field = field;
  }
}

export const httpClient = axios.create({
  baseURL: API_BASE,
  // 우리는 /api/backend 프록시를 써서 same-origin 이에요.
  withCredentials: true,
  timeout: REQUEST_TIMEOUT_MS,
});

/** axios 오류를 화면에서 쓰기 좋은 ApiError 로 바꿔요. */
function toApiError(error) {
  if (error instanceof ApiError) return error;

  if (axios.isCancel(error)) {
    return new ApiError('요청이 취소됐어요', { status: 0, code: 'CANCELED' });
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ApiError('요청 시간이 초과됐어요. 잠시 후 다시 시도해 주세요.', {
      status: 408,
      code: 'TIMEOUT',
    });
  }

  if (!error.response) {
    return new ApiError('네트워크 연결을 확인해 주세요.', {
      status: 0,
      code: 'NETWORK_ERROR',
    });
  }

  const { status, data } = error.response;
  const payload = data && typeof data === 'object' ? data : null;
  const apiError = new ApiError(payload?.message ?? `요청에 실패했어요 (${status})`, {
    status,
    code: payload?.code,
    field: payload?.field ?? payload?.details?.field,
  });

  apiError.cause = error;
  return apiError;
}

// 2xx 응답은 data 만, 204 는 null 을 돌려줘요.
// 실패 응답은 아래 인터셉터에서 ApiError 로 바꿉니다.

// 401 세션 갱신 — 동시에 여러 요청이 401 을 받아도 한 번만 호출합니다(single-flight).
//   우리 계약에는 refresh 전용 경로가 없어서 GET /auth/me 로 갱신을 트리거합니다.
//   (BE 의 전역 authenticate 가 access 만료 시 refresh 쿠키로 새 토큰을 발급해요)
const AUTH_PATHS = ['/auth/login', '/auth/signup', '/auth/logout', '/auth/me'];

let refreshPromise = null;

export function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = httpClient.get('/auth/me').finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

function isAuthPath(url = '') {
  return AUTH_PATHS.some((path) => url.startsWith(path));
}

httpClient.interceptors.response.use(
  (response) => (response.status === 204 ? null : response.data),
  async (error) => {
    const originalRequest = error.config ?? {};
    const status = error.response?.status;

    // 로그인·가입·로그아웃·/auth/me 의 401 은 갱신 대상이 아니에요.
    if (status === 401 && !originalRequest._retry && !isAuthPath(originalRequest.url)) {
      originalRequest._retry = true;

      try {
        await refreshSession();
      } catch {
        return Promise.reject(toApiError(error));
      }

      return httpClient(originalRequest);
    }

    return Promise.reject(toApiError(error));
  },
);

// 화면에서 쓰는 짧은 이름들 — get / post / patch / put / del
export const apiClient = {
  get: (path, options) => httpClient.get(path, options),
  post: (path, body, options) => httpClient.post(path, body, options),
  patch: (path, body, options) => httpClient.patch(path, body, options),
  put: (path, body, options) => httpClient.put(path, body, options),
  del: (path, options) => httpClient.delete(path, options),
};

export default apiClient;
