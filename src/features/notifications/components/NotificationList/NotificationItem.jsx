import { getNotificationMessage, NOTIFICATION_TYPES } from '@/features/notifications/constants';
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
  const { id, isRead, createdAt, reason, type } = notification;

  const message = getNotificationMessage(notification);
  const formattedDate = formatNotificationDate(createdAt);

  const isRejected = type === NOTIFICATION_TYPES.CHALLENGE_REJECTED;

  function handleClick() {
    onClick?.(notification);
  }

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.button}
        onClick={handleClick}
        data-notification-id={id}
        data-read={isRead}
      >
        <span className={styles.message}>
          <span>{message}</span>

          {isRejected && reason && <span className={styles.reason}>사유: {reason.trim()}</span>}
        </span>

        {formattedDate && (
          <time className={styles.date} dateTime={createdAt}>
            {formattedDate}
          </time>
        )}

        {!isRead && <span className={styles.unreadDot} aria-hidden="true" />}
      </button>
    </li>
  );
}
