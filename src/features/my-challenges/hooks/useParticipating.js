'use client';

// src/features/my-challenges/hooks/useParticipating.js
//
// ③ 담당 — 참여 중인 챌린지 목록을 커서 방식으로 불러오는 훅이에요.
//
//   · useInfiniteQuery 를 쓰는 이유: 서버가 { items, cursor, hasMore } 를 돌려주기 때문이에요.
//     pageParam 에 "이전 응답의 cursor" 를 넣어 주면 다음 페이지를 이어서 받아옵니다.
//   · getNextPageParam 이 undefined 를 돌려주면 TanStack Query 가 "더 없음"으로 판단해요.
//     (null 을 돌려주면 null 자체가 다음 커서로 쓰여 무한 요청이 날 수 있어요)
import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';
import { getParticipating } from '@/features/my-challenges/api.js';

/**
 * @param {{ limit?: number }} [options]
 * @returns TanStack Query 의 useInfiniteQuery 결과
 */
export function useParticipating({ limit = 10 } = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.myChallenges.participating({ limit }),
    queryFn: ({ pageParam }) => getParticipating({ cursor: pageParam, limit }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => (lastPage?.hasMore ? lastPage.cursor : undefined),
  });
}
