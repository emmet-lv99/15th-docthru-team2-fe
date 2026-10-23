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

export async function signUp({ email, nickname, password }) {
  return apiClient.post('/auth/signup', { email, nickname, password });
}

export async function logout() {
  return apiClient.post('/auth/logout');
}

/** PATCH /auth/me — { nickname?, password? } 중 보낸 값만 수정해요. */
export async function updateMe({ nickname, password }) {
  const body = {};
  if (nickname !== undefined) body.nickname = nickname;
  if (password !== undefined) body.password = password;
  return apiClient.patch('/auth/me', body);
}

/** DELETE /auth/me — 소프트 삭제 후 204. apiClient 가 null 을 돌려줘요. */
export async function deleteMe() {
  return apiClient.del('/auth/me');
}

/** POST /auth/password-reset/request — 계정 존재 여부와 무관하게 같은 안내. */
export async function requestPasswordReset({ email }) {
  return apiClient.post('/auth/password-reset/request', { email });
}

/** POST /auth/password-reset/confirm — 메일 링크 토큰 + 새 비밀번호. */
export async function confirmPasswordReset({ token, newPassword }) {
  return apiClient.post('/auth/password-reset/confirm', { token, newPassword });
}
