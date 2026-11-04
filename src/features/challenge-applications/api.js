import { apiClient } from '@/lib/client';

//내 챌린지 신청 목록 조회
export async function getMyApplications({ page = 1, size = 10, q = '', status = 'ALL' } = {}) {
  return apiClient.get('/challenge-applications/me', {
    params: {
      page,
      size,
      ...(q ? { q } : {}),
      ...(status !== 'ALL' ? { status } : {}),
    },
  });
}
