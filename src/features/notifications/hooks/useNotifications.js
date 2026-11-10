import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '@/features/notifications/api';
import { queryKeys } from '@/lib/queryKeys';

// 알림 목록 조회
export function useNotifications(filters = {}) {
  return useQuery({
    queryKey: queryKeys.notifications.list(filters),
    queryFn: () => getNotifications(filters),
  });
}

// 알림 목록 무한 스크롤 조회
export function useInfiniteNotifications(filters = {}) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.notifications.list(filters), 'infinite'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getNotifications({
        ...filters,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
}

// 읽지 않은 알림 개수 조회
export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: queryKeys.notifications.unreadCount(),
    queryFn: getUnreadNotificationCount,
  });
}

// 개별 알림 읽음 처리
export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all(),
      });
    },
  });
}

// 전체 알림 읽음 처리
export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all(),
      });
    },
  });
}
