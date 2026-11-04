import { apiClient } from '@/lib/client';
import { buildChallengeQuery } from '@/features/challenges/query';

/** 챌린지 목록을 검색·정렬·필터 조건에 따라 조회합니다. */
export function getChallengeList(filters = {}) {
  return apiClient.get('/challenges?' + buildChallengeQuery(filters));
}

/** 단일 챌린지 상세 정보를 조회합니다. */
export function getChallengeDetail(challengeId) {
  return apiClient.get('/challenges/' + encodeURIComponent(String(challengeId)));
}

/** 참여자 현황을 지정된 페이지와 정렬 기준으로 조회합니다. */
export function getChallengeParticipants(
  challengeId,
  { page = 1, size = 10, sort = 'likes' } = {},
) {
  return apiClient.get('/challenges/' + encodeURIComponent(String(challengeId)) + '/participants', {
    params: { page, size, sort },
  });
}

// 참여/포기는 로그인 필수이며, 실제 상태 변경 UI는 다음 기능 단계에서 연결한다.
/** 로그인한 사용자의 챌린지 참여를 요청합니다. */
export function joinChallenge(challengeId) {
  return apiClient.post(
    '/challenges/' + encodeURIComponent(String(challengeId)) + '/participation',
  );
}

/** 로그인한 사용자의 챌린지 참여 포기를 요청합니다. */
export function abandonChallenge(challengeId) {
  return apiClient.del('/challenges/' + encodeURIComponent(String(challengeId)) + '/participation');
}
