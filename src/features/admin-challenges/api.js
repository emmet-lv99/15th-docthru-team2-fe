import { apiClient } from '@/lib/client';
import { buildChallengeQuery } from '@/features/challenges/query';

/** 관리자 전용 챌린지 목록: 공개 목록과 구분하여 soft-delete 항목까지 조회할 수 있습니다. */
export function getAdminChallenges(filters = {}) {
  const query = buildChallengeQuery(filters);
  const params = new URLSearchParams(query);
  if (filters.includeDeleted) params.set('includeDeleted', 'true');
  return apiClient.get('/admin/challenges?' + params.toString());
}

/** 챌린지 수정은 변경한 필드만 서버에 전달합니다. */
export function updateAdminChallenge(challengeId, changes) {
  return apiClient.patch('/admin/challenges/' + encodeURIComponent(String(challengeId)), changes);
}

/** 백엔드의 필수 삭제 사유는 DELETE 요청의 body로 전달합니다. */
export function deleteAdminChallenge(challengeId, reason) {
  return apiClient.del('/admin/challenges/' + encodeURIComponent(String(challengeId)), {
    data: { reason: reason.trim() },
  });
}
