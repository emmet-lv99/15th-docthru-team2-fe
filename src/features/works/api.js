import { apiClient } from '@/lib/client';

/**
 * 챌린지 상세 정보 조회
 * @param {string|number} challengeId - 챌린지 식별자
 */
export const getChallenge = (challengeId) => apiClient.get(`/challenges/${challengeId}`);

/**
 * 내 임시저장(초안) 데이터 조회
 * @param {string|number} challengeId - 챌린지 식별자
 */
export const getMyDraft = (challengeId) => apiClient.get(`/challenges/${challengeId}/drafts/me`);

/**
 * 내가 기존에 제출한 작업물 조회 (수정 진입 시 에디터 자동 복원용)
 * @param {string|number} challengeId - 챌린지 식별자
 */
export const getMyWork = (challengeId) => apiClient.get(`/challenges/${challengeId}/works/me`);

/**
 * 챌린지 작업물 임시저장 (TipTap HTML 본문 단일 초안 저장)
 * @param {string|number} challengeId - 챌린지 식별자
 * @param {string} content - 에디터 HTML 본문
 */
export const saveDraft = (challengeId, content) =>
  apiClient.put(`/challenges/${challengeId}/drafts/me`, { content });

/**
 * 챌린지 작업물 최종 제출 (신규 제출 또는 기존 제출 갱신)
 * @param {string|number} challengeId - 챌린지 식별자
 * @param {string} content - 에디터 HTML 본문
 */
export const submitWork = (challengeId, content) =>
  apiClient.put(`/challenges/${challengeId}/works/me`, { content });

/**
 * 챌린지 참여 포기 (참여 기록 삭제)
 * @param {string|number} challengeId - 챌린지 식별자
 */
export const abandonChallenge = (challengeId) =>
  apiClient.del(`/challenges/${challengeId}/participation`);

/**
 * 작업물 상세 조회 (본문, 작성자, 챌린지 정보, 좋아요 수 및 내 좋아요 여부 포함)
 * @param {string|number} challengeId - 챌린지 식별자
 * @param {string|number} workId - 작업물 식별자
 */
export const getWorkDetail = (challengeId, workId) =>
  apiClient.get(`/challenges/${challengeId}/works/${workId}`);

/**
 * 작업물 좋아요(하트) 등록
 * @param {string|number} workId - 작업물 식별자
 */
export const likeWork = (workId) => apiClient.put(`/works/${workId}/like`);

/**
 * 작업물 좋아요(하트) 취소
 * @param {string|number} workId - 작업물 식별자
 */
export const unlikeWork = (workId) => apiClient.del(`/works/${workId}/like`);

/**
 * 작업물 삭제 (작성자 본인: reason 불필요 / 어드민 타인 삭제: reason 필수)
 * @param {string|number} workId - 작업물 식별자
 * @param {string} [reason] - 어드민 삭제 사유
 */
export const deleteWork = (workId, reason) =>
  apiClient.del(`/works/${workId}`, { data: reason ? { reason } : {} });

/**
 * 작업물 수정 (본문 PATCH)
 * @param {string|number} workId - 작업물 식별자
 * @param {string} content - 수정할 TipTap HTML 본문
 */
export const updateWork = (workId, content) => apiClient.patch(`/works/${workId}`, { content });

/**
 * 원문 공식 문서 파싱 본문 요청 (Next.js 내부 리더 API 라우트 호출)
 * @param {string} sourceUrl - 원문 공식 문서 URL
 */
export const getReaderContent = async (sourceUrl) => {
  const res = await fetch(`/api/reader?url=${encodeURIComponent(sourceUrl)}`);
  if (!res.ok) {
    throw new Error('보안 정책 또는 네트워크 문제로 본문을 직접 불러올 수 없습니다.');
  }
  const json = await res.json();
  if (json.error) {
    throw new Error(json.error);
  }
  return json;
};
