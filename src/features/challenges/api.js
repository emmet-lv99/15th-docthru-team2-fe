import { apiClient } from '../../lib/client.js';
import { buildChallengeQuery } from './query.js';

export function getChallengeList(filters = {}) {
  return apiClient.get('/challenges?' + buildChallengeQuery(filters));
}

export function getChallengeDetail(challengeId) {
  return apiClient.get('/challenges/' + encodeURIComponent(String(challengeId)));
}

export function getChallengeParticipants(
  challengeId,
  { page = 1, size = 10, sort = 'likes' } = {},
) {
  return apiClient.get('/challenges/' + encodeURIComponent(String(challengeId)) + '/participants', {
    params: { page, size, sort },
  });
}

// 참여/포기는 로그인 필수이며, 실제 상태 변경 UI는 다음 기능 단계에서 연결한다.
export function joinChallenge(challengeId) {
  return apiClient.post(
    '/challenges/' + encodeURIComponent(String(challengeId)) + '/participation',
  );
}

export function abandonChallenge(challengeId) {
  return apiClient.del('/challenges/' + encodeURIComponent(String(challengeId)) + '/participation');
}
