import { apiClient } from '@/lib/client';

// 알림 목록 조회
export function getNotifications({ unreadOnly = false, page = 1, size = 10 } = {}) {
  return apiClient.get('/notifications', {
    params: { unreadOnly, page, size },
  });
}

// 읽지 않은 알림 개수 조회
export function getUnreadNotificationCount() {
  return apiClient.get('/notifications/unread-count');
}

// 개별 알림 읽음 처리
export function markNotificationAsRead(notificationId) {
  return apiClient.patch(`/notifications/${notificationId}/read`);
}

// 전체 알림 읽음 처리
export function markAllNotificationsAsRead() {
  return apiClient.post('/notifications/read-all');
}
