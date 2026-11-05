import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiGet } from '@/lib/api';
import {
  getInitialChallenges,
  getInitialChallengeDetail,
  getInitialParticipants,
} from '@/features/challenges/server';

vi.mock('@/lib/api', () => ({ apiGet: vi.fn() }));

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(apiGet).mockResolvedValue({ ok: true, status: 200, data: { items: [] } });
});

describe('챌린지 서버 초기 조회 경계', () => {
  it('null 목록 필터를 기본 쿼리로 변환해 요청한다', async () => {
    await getInitialChallenges(null);
    expect(apiGet).toHaveBeenCalledWith('/challenges?sort=latest&page=1&size=9');
  });

  it('null 참여자 필터를 기본 정렬로 변환해 요청한다', async () => {
    await getInitialParticipants(5, null);
    expect(apiGet).toHaveBeenCalledWith('/challenges/5/participants?page=1&size=10&sort=likes');
  });

  it('상세 요청 경로는 전달받은 챌린지 ID를 사용한다', async () => {
    await getInitialChallengeDetail(5);
    expect(apiGet).toHaveBeenCalledWith('/challenges/5');
  });
});
