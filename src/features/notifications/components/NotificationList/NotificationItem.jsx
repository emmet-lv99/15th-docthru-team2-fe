import { getNotificationMessage } from '@/features/notifications/constants';

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
    <li>
      <button
        type="button"
        onClick={handleClick}
        data-notification-id={id}
        data-read={isRead}
        aria-label={message}
      >
        <span>{message}</span>
        {formattedDate && <time dateTime={createdAt}>{formattedDate}</time>}{' '}
      </button>
    </li>
  );
}
