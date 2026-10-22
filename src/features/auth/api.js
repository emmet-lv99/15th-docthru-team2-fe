// ③ 담당 인증 API — 화면은 apiClient 만 쓰고, 401 정책은 src/lib/client.js 가 담당합니다.
//
// 강사님 정본(nextjs-user-auth-completed/client/src/lib/api.js)과 같은 역할이에요.
//   · getMe  — 로그인하지 않았으면 null (401 을 오류로 던지지 않음)
//   · login  — 성공 시 user 본문 + httpOnly 쿠키
//   · logout — 204 (멱등)
import { apiClient } from '@/lib/client';

export async function getMe() {
  try {
    return await apiClient.get('/auth/me');
  } catch (error) {
    // 비로그인(401)은 "사용자 없음"으로 다뤄요 — 강사님 정본 getMe 와 동일합니다.
    if (error?.status === 401) return null;
    throw error;
  }
}

export async function login({ email, password }) {
  return apiClient.post('/auth/login', { email, password });
}

export async function logout() {
  return apiClient.post('/auth/logout');
}
