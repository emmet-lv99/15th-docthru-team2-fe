import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from '@/lib/client';
import {
  deleteAdminChallenge,
  getAdminChallenges,
  updateAdminChallenge,
} from '@/features/admin-challenges/api';

vi.mock('@/lib/client', () => ({
  apiClient: { get: vi.fn(), patch: vi.fn(), del: vi.fn() },
}));

beforeEach(() => vi.clearAllMocks());

describe('관리자 챌린지 API 계약', () => {
  it('목록 조회는 서버 지원 필터·페이지네이션을 사용한다', async () => {
    await getAdminChallenges({
      q: 'React',
      category: ['NEXT_JS'],
      status: 'IN_PROGRESS',
      sort: 'latest',
      page: 2,
    });
    expect(apiClient.get).toHaveBeenCalledWith(
      '/admin/challenges?q=React&category=NEXT_JS&status=IN_PROGRESS&sort=latest&page=2&size=9',
    );
  });

  it('삭제된 챌린지는 관리자 선택 시에만 조회한다', async () => {
    await getAdminChallenges({ includeDeleted: true });
    expect(apiClient.get).toHaveBeenCalledWith(
      '/admin/challenges?sort=latest&page=1&size=9&includeDeleted=true',
    );
  });

  it('수정은 경로 ID와 변경 필드를 PATCH로 전송한다', async () => {
    const change = { title: '새로운 제목' };
    await updateAdminChallenge(12, change);
    expect(apiClient.patch).toHaveBeenCalledWith('/admin/challenges/12', change);
  });

  it('삭제는 사유를 DELETE 본문에 넣고 양쪽 공백을 제거한다', async () => {
    await deleteAdminChallenge(12, '  원문이 사라졌습니다  ');
    expect(apiClient.del).toHaveBeenCalledWith('/admin/challenges/12', {
      data: { reason: '원문이 사라졌습니다' },
    });
  });
});
