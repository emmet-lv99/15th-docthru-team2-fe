'use client';

import { useEffect, useRef } from 'react';
import {
  useInfiniteNotifications,
  useMarkNotificationAsRead,
} from '@/features/notifications/hooks/useNotifications';
import NotificationItem from '@/features/notifications/components/NotificationList/NotificationItem';
import * as styles from '@/features/notifications/components/NotificationList/NotificationList.css';

export default function NotificationList({ unreadOnly = false, onNotificationClick }) {
  const loadMoreRef = useRef(null);

  const {
    data,
    isPending,
    isError,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
  } = useInfiniteNotifications({ unreadOnly });

  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const notifications = data?.pages.flatMap((page) => page.items) ?? [];

  // 목록 아래쪽이 보이면 다음 페이지 조회
  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !hasNextPage || isFetchingNextPage || isFetchNextPageError) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '100px' },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, isFetchNextPageError, fetchNextPage]);

  // 개별 알림 클릭 시 읽음 처리
  function handleNotificationClick(notification) {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    onNotificationClick?.(notification);
  }

  if (isPending) {
    return <p className={styles.status}>알림을 불러오는 중이에요.</p>;
  }

  if (isError && !data) {
    return <p className={styles.status}>알림을 불러오지 못했어요.</p>;
  }

  if (notifications.length === 0) {
    return <p className={styles.status}>알림이 없어요.</p>;
  }

  return (
    <>
      <ul className={styles.list}>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClick={handleNotificationClick}
          />
        ))}
      </ul>

      {hasNextPage && <div ref={loadMoreRef} aria-hidden="true" />}

      {isFetchingNextPage && <p className={styles.status}>알림을 더 불러오는 중이에요.</p>}

      {isFetchNextPageError && (
        <button type="button" onClick={() => fetchNextPage()}>
          알림을 불러오지 못했어요. 다시 시도
        </button>
      )}
    </>
  );
}
