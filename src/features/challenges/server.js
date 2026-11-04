import { apiGet } from '@/lib/api';
import { buildChallengeQuery } from '@/features/challenges/query';

// 서버 컴포넌트의 첫 화면은 인증 쿠키 전달을 지원하는 기존 apiGet을 사용한다.
/** 서버 렌더링 시 초기 챌린지 목록을 조회합니다. */
export function getInitialChallenges(filters) {
  return apiGet('/challenges?' + buildChallengeQuery(filters));
}

/** 서버 렌더링 시 초기 챌린지 상세 정보를 조회합니다. */
export function getInitialChallengeDetail(challengeId) {
  return apiGet('/challenges/' + encodeURIComponent(String(challengeId)));
}

/** 서버 렌더링 시 참여자 현황의 첫 데이터를 조회합니다. */
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
