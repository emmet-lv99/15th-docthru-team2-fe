import { getNotificationMessage } from '@/features/notifications/constants';
import * as styles from '@/features/notifications/components/NotificationList/NotificationList.css';

function formatNotificationDate(createdAt) {
  if (!createdAt) return '';

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  }).format(date);
}

export default function NotificationItem({ notification, onClick }) {
  const { id, isRead, createdAt } = notification;

  const message = getNotificationMessage(notification);
  const formattedDate = formatNotificationDate(createdAt);

  function handleClick() {
    onClick?.(notification);
  }

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={`${styles.button} ${!isRead ? styles.unread : ''}`}
        onClick={handleClick}
        data-notification-id={id}
        data-read={isRead}
        aria-label={message}
      >
        <span className={styles.message}>{message}</span>
        {formattedDate && (
          <time className={styles.date} dateTime={createdAt}>
            {formattedDate}
          </time>
        )}
      </button>
    </li>
  );
}
