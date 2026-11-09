import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cookies } from 'next/headers';
import { apiGet } from '@/lib/api';
import { getLandingRedirect } from '@/features/landing/getLandingRedirect';

vi.mock('next/headers', () => ({ cookies: vi.fn() }));
vi.mock('@/lib/api', () => ({ apiGet: vi.fn() }));

/** 테스트별 쿠키의 로그인 토큰 존재 여부를 제어합니다. */
function mockCookies(names = []) {
  vi.mocked(cookies).mockResolvedValue({
    has: (key) => names.includes(key),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('랜딩 로그인 경계', () => {
  it('비로그인 방문자는 인증 API 호출 없이 랜딩을 본다', async () => {
    mockCookies();

    expect(await getLandingRedirect()).toBeNull();
    expect(apiGet).not.toHaveBeenCalled();
  });

  it('유효한 액세스 토큰을 가진 사용자는 챌린지 목록으로 이동한다', async () => {
    mockCookies(['accessToken']);
    vi.mocked(apiGet).mockResolvedValue({
      ok: true,
      status: 200,
      data: { id: 1, role: 'USER' },
    });

    expect(await getLandingRedirect()).toBe('/challenges');
    expect(apiGet).toHaveBeenCalledWith('/auth/me');
  });

  it('리프레시 토큰만 있어도 실제 인증 성공 시 이동한다', async () => {
    mockCookies(['refreshToken']);
    vi.mocked(apiGet).mockResolvedValue({
      ok: true,
      status: 200,
      data: { id: 1, role: 'USER' },
    });

    expect(await getLandingRedirect()).toBe('/challenges');
  });

  it('만료된 쿠키만 있으면 로그인 사용자로 잘못 판단하지 않는다', async () => {
    mockCookies(['accessToken']);
    vi.mocked(apiGet).mockResolvedValue({ ok: false, status: 401, data: null });

    expect(await getLandingRedirect()).toBeNull();
  });

  it('인증 서버 요청 실패 시 랜딩 화면을 유지한다', async () => {
    mockCookies(['accessToken']);
    vi.mocked(apiGet).mockRejectedValue(new Error('Backend unavailable'));

    expect(await getLandingRedirect()).toBeNull();
  });
});
