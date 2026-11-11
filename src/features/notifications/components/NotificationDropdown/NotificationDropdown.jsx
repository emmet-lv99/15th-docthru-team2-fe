'use client';

import NotificationList from '@/features/notifications/components/NotificationList/NotificationList';
import * as styles from '@/features/notifications/components/NotificationDropdown/NotificationDropdown.css';

export default function NotificationDropdown({ onNotificationClick }) {
  return (
    <section className={styles.dropdown} aria-label="알림">
      <div className={styles.header}>
        <h2 className={styles.title}>알림</h2>
      </div>

      <div className={styles.content}>
        <NotificationList onNotificationClick={onNotificationClick} />
      </div>
    </section>
  );
}
