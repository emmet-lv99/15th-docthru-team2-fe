
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from '@/lib/client';
import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from './api';

vi.mock('@/lib/client', () => ({
  apiClient: {
    get: vi.fn(),
    patch: vi.fn(),
    post: vi.fn(),
  },
}));

describe('알림 API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getNotifications', () => {
    it('기본값으로 알림 목록을 조회한다', async () => {
      const mockResponse = {
        items: [],
        page: 1,
        size: 10,
        totalItems: 0,
        totalPages: 0,
      };

      apiClient.get.mockResolvedValue(mockResponse);

      const result = await getNotifications();

      expect(apiClient.get).toHaveBeenCalledWith('/notifications', {
        params: {
          unreadOnly: false,
          page: 1,
          size: 10,
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it('전달한 조회 조건을 적용한다', async () => {
      const mockResponse = {
        items: [],
        page: 2,
        size: 5,
        totalItems: 0,
        totalPages: 0,
      };

      apiClient.get.mockResolvedValue(mockResponse);

      const result = await getNotifications({
        unreadOnly: true,
        page: 2,
        size: 5,
      });

      expect(apiClient.get).toHaveBeenCalledWith('/notifications', {
        params: {
          unreadOnly: true,
          page: 2,
          size: 5,
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUnreadNotificationCount', () => {
    it('읽지 않은 알림 개수를 조회한다', async () => {
      const mockResponse = { unreadCount: 3 };

      apiClient.get.mockResolvedValue(mockResponse);

      const result = await getUnreadNotificationCount();

      expect(apiClient.get).toHaveBeenCalledWith('/notifications/unread-count');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('markNotificationAsRead', () => {
    it('특정 알림을 읽음 처리한다', async () => {
      apiClient.patch.mockResolvedValue(null);

      await markNotificationAsRead(1);

      expect(apiClient.patch).toHaveBeenCalledWith('/notifications/1/read');
    });
  });

  describe('markAllNotificationsAsRead', () => {
    it('전체 알림을 읽음 처리한다', async () => {
      apiClient.post.mockResolvedValue(null);

      await markAllNotificationsAsRead();

      expect(apiClient.post).toHaveBeenCalledWith('/notifications/read-all');
    });
  });
});
