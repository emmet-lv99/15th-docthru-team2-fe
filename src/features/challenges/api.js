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
export function getChallengeParticipants(challengeId, filters = {}) {
  const { page = 1, size = 10, sort = 'likes' } = filters ?? {};
  return apiClient.get('/challenges/' + encodeURIComponent(String(challengeId)) + '/participants', {
    params: { page, size, sort },
  });
}

// 참여/포기는 로그인 필수이며, 현재 상세 화면에서 변경 후 조회 캐시를 갱신합니다.
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

/**
 * 내 참여 여부는 현재 보이는 참여자 페이지로 판단하지 않습니다.
 * 이미 문서화된 GET works/me는 참여자에게만 200을 반환합니다.
 */
export async function getMyChallengeParticipation(challengeId) {
  try {
    const data = await apiClient.get(
      '/challenges/' + encodeURIComponent(String(challengeId)) + '/works/me',
    );
    return { participating: true, totalWorks: data?.totalWorks ?? 0 };
  } catch (error) {
    if (error?.status === 404) return { participating: false, totalWorks: 0 };
    throw error;
  }
}

/**
 * 참여자 API는 추천순으로 페이지를 나눕니다. 공동 1위가 페이지 경계에
 * 걸리더라도 전원 표시되도록 최고 점수 구간까지 추가 조회합니다.
 */
export async function getTopLikedWorks(challengeId) {
  const pageSize = 100; // BE paginationQuerySchema의 허용 최대 size
  const candidates = [];
  let page = 1;
  let highestLikes = 0;
  let totalPages = 1;
  do {
    const response = await getChallengeParticipants(challengeId, {
      page,
      size: pageSize,
      sort: 'likes',
    });
    const items = response?.items ?? [];
    totalPages = response?.totalPages ?? 1;
    for (const participant of items) {
      if (participant.isAbandoned) continue;
      for (const work of participant.works ?? []) {
        const likes = work.likeCount ?? 0;
        if (likes < highestLikes) continue;
        if (likes > highestLikes) {
          highestLikes = likes;
          candidates.length = 0;
        }
        if (likes > 0) candidates.push({ work, user: participant.user });
      }
    }
    // 백엔드가 참여자별 최고 추천수를 기준으로 정렬합니다.
    // 끝 행의 최고 추천수가 현재 1위보다 작으면 다음 페이지에는 1위가 없습니다.
    const last = items.at(-1);
    const lastTopLikes = Math.max(0, ...(last?.works ?? []).map((work) => work.likeCount ?? 0));
    if (!items.length || lastTopLikes < highestLikes) break;
    page += 1;
  } while (page <= totalPages);

  return candidates;
}
