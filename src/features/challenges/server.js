import { apiGet } from '@/lib/api';
import { buildChallengeQuery } from './query.js';

// 서버 컴포넌트의 첫 화면은 인증 쿠키 전달을 지원하는 기존 apiGet을 사용한다.
export function getInitialChallenges(filters) {
  return apiGet('/challenges?' + buildChallengeQuery(filters));
}

export function getInitialChallengeDetail(challengeId) {
  return apiGet('/challenges/' + encodeURIComponent(String(challengeId)));
}

export function getInitialParticipants(challengeId, { page = 1, size = 10, sort = 'likes' } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort,
  });
  return apiGet(
    '/challenges/' + encodeURIComponent(String(challengeId)) + '/participants?' + params,
  );
}
