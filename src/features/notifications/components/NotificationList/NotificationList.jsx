'use client';

import {
  useNotifications,
  useMarkNotificationAsRead,
} from '@/features/notifications/hooks/useNotifications';
import NotificationItem from '@/features/notifications/components/NotificationItem';

export default function NotificationList({ unreadOnly = false, onNotificationClick }) {
  const { data, isPending, isError } = useNotifications({
    unreadOnly,
  });

  const { mutate: markAsRead } = useMarkNotificationAsRead();

  const notifications = data?.items ?? [];

  function handleNotificationClick(notification) {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    onNotificationClick?.(notification);
  }

  if (isPending) {
    return <p>알림을 불러오는 중이에요.</p>;
  }

  if (isError) {
    return <p>알림을 불러오지 못했어요.</p>;
  }

  if (notifications.length === 0) {
    return <p>알림이 없어요.</p>;
  }

  return (
    <ul>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClick={handleNotificationClick}
        />
      ))}
    </ul>
  );
}
