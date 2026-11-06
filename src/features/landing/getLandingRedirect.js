import { cookies } from 'next/headers';
import { apiGet } from '@/lib/api';

/**
 * /에 접근한 사용자가 로그인된 경우에만 챌린지 목록 경로를 반환합니다.
 * 쿠키가 만료되었거나 인증 API에 장애가 있으면 비로그인 랜딩을 표시합니다.
 */
export async function getLandingRedirect() {
  const cookieStore = await cookies();
  const hasSessionCookie = cookieStore.has('accessToken') || cookieStore.has('refreshToken');

  if (!hasSessionCookie) return null;

  try {
    const { ok, data } = await apiGet('/auth/me');
    return ok && data ? '/challenges' : null;
  } catch {
    return null;
  }
}
