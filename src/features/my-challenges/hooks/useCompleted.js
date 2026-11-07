'use client';

// src/features/my-challenges/hooks/useCompleted.js
//
// ③ 담당 — 완료한 챌린지 목록을 커서 방식으로 불러오는 훅이에요.
// 참여 중 목록(useParticipating)과 같은 규칙을 씁니다.
//   · 서버가 { items, cursor, hasMore } 를 돌려주므로 useInfiniteQuery 를 써요.
//   · queryKey 에 사용자 id 를 넣어 계정별로 캐시를 분리해요.
//   · getNextPageParam 은 undefined 로 "더 없음"을 알려 줘요(null 은 무한 요청 위험).
import { useInfiniteQuery } from '@tanstack/react-query';

import { useAuth } from '@/contexts/AuthProvider';
import { getCompleted } from '@/features/my-challenges/api.js';
import { queryKeys } from '@/lib/queryKeys';

/**
 * @param {{ limit?: number, q?: string }} [options]
 * @returns TanStack Query 의 useInfiniteQuery 결과
 */
export function useCompleted({ limit = 10, q = '' } = {}) {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const keyword = q.trim();

  return useInfiniteQuery({
    queryKey: queryKeys.myChallenges.completed({ userId, limit, q: keyword }),
    queryFn: ({ pageParam }) => getCompleted({ cursor: pageParam, limit, q: keyword }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => (lastPage?.hasMore ? lastPage.cursor : undefined),
    enabled: Boolean(userId),
  });
}
