import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import {
  createFeedback,
  deleteFeedback,
  getFeedbacks,
  updateFeedback,
} from '@/features/feedbacks/api';

// 피드백 목록 조회
export function useInfiniteFeedbacks(workId, limit = 10) {
  return useInfiniteQuery({
    queryKey: queryKeys.feedbacks.list(workId, { limit }),
    queryFn: ({ pageParam }) => getFeedbacks(workId, { cursor: pageParam, limit }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? (lastPage.cursor ?? undefined) : undefined),
    enabled: workId != null && workId !== '',
  });
}

// 피드백 생성
export function useCreateFeedback(workId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content) => createFeedback(workId, content),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.feedbacks.all(),
      }),
  });
}

// 피드백 수정
export function useUpdateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ feedbackId, content, reason }) =>
      updateFeedback(feedbackId, { content, reason }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.feedbacks.all(),
      }),
  });
}

// 피드백 삭제
export function useDeleteFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ feedbackId, reason }) => deleteFeedback(feedbackId, reason),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.feedbacks.all(),
      }),
  });
}
