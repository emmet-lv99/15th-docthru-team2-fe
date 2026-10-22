// src/lib/queryKeys.js — TanStack Query 키 모음 (도메인별 네임스페이스)
//
// 왜 한 곳에 모으나요?
//   키를 문자열로 여기저기 적으면 오타 하나로 캐시가 따로 놀아요.
//   (예: ['challenge'] 와 ['challenges'] 는 다른 캐시예요)
//   → 도메인별로 함수를 만들어 두고, 무효화(invalidate)할 때도 이 키를 그대로 씁니다.
//
// 필터처럼 값이 여러 개인 조회는 filters 객체를 그대로 키에 넣어요.
// 같은 조건이면 같은 키가 되어 캐시가 재사용돼요.

export const queryKeys = {
  // ── 나 (인증 / 내 정보) ─────────────────────────────────────
  me: {
    all: () => ['me'],
    info: () => ['me', 'info'],
  },

  // ── 챌린지 ─────────────────────────────────────────────────
  challenges: {
    all: () => ['challenges'],
    list: (filters) => ['challenges', 'list', filters ?? 'default'],
    detail: (challengeId) => ['challenges', 'detail', challengeId],
    participants: (challengeId, filters) => [
      'challenges',
      'detail',
      challengeId,
      'participants',
      filters ?? 'default',
    ],
    participation: (challengeId) => ['challenges', 'detail', challengeId, 'participation'],
    // 내 번역 작업(제출본) · 임시저장(draft)
    myWork: (challengeId) => ['challenges', 'detail', challengeId, 'works', 'me'],
    draft: (challengeId) => ['challenges', 'detail', challengeId, 'draft'],
  },

  // ── 작업물(번역) ────────────────────────────────────────────
  works: {
    all: () => ['works'],
    list: (filters) => ['works', 'list', filters ?? 'default'],
    detail: (workId) => ['works', 'detail', workId],
  },

  // ── 피드백 ─────────────────────────────────────────────────
  feedbacks: {
    all: () => ['feedbacks'],
    list: (workId, filters) => ['feedbacks', 'list', workId, filters ?? 'default'],
    detail: (feedbackId) => ['feedbacks', 'detail', feedbackId],
  },

  // ── 알림 ───────────────────────────────────────────────────
  notifications: {
    all: () => ['notifications'],
    list: (filters) => ['notifications', 'list', filters ?? 'default'],
    // GNB 배지에 쓰는 안 읽은 개수 — 자주 바뀌니 별도 키로 둬요.
    unreadCount: () => ['notifications', 'unreadCount'],
  },

  // ── 챌린지 신청(제안) ───────────────────────────────────────
  applications: {
    all: () => ['applications'],
    mine: (filters) => ['applications', 'mine', filters ?? 'default'],
    myDetail: (applicationId) => ['applications', 'mine', 'detail', applicationId],
    adminList: (filters) => ['applications', 'admin', 'list', filters ?? 'default'],
    adminDetail: (applicationId) => ['applications', 'admin', 'detail', applicationId],
  },

  // ── 나의 챌린지 ─────────────────────────────────────────────
  myChallenges: {
    all: () => ['myChallenges'],
    participating: (filters) => ['myChallenges', 'participating', filters ?? 'default'],
    completed: (filters) => ['myChallenges', 'completed', filters ?? 'default'],
  },
};
