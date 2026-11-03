// src/features/my-challenges/api.js
//
// ③ 담당 — 나의 챌린지 화면이 쓰는 API 모음이에요.
// 화면은 이 파일만 거치고, 401 같은 공통 정책은 src/lib/client.js 가 담당합니다.
import { apiClient } from '@/lib/client';

/**
 * GET /me/challenges/participating
 *
 * 참여 중인 챌린지 + 내 작업물 요약(totalWorks · latestWork)을 커서 방식으로 가져와요.
 *
 * @param {{ cursor?: number|null, limit?: number }} [query]
 *   cursor — 이전 응답의 cursor 값. 첫 페이지는 생략(null)이에요.
 *   limit  — 한 번에 받을 개수 (서버 기본값 사용 시 생략)
 * @returns {Promise<{ items: Array, cursor: number|null, limit: number, hasMore: boolean }>}
 */
export async function getParticipating({ cursor, limit } = {}) {
  const search = new URLSearchParams();

  // cursor 가 0 일 수도 있으니 != null 로 확인해요 (0 은 유효한 커서예요)
  if (cursor != null) search.set('cursor', String(cursor));
  if (limit != null) search.set('limit', String(limit));

  const queryString = search.toString();

  return apiClient.get(`/me/challenges/participating${queryString ? `?${queryString}` : ''}`);
}
