'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import NotificationDropdown from '@/features/notifications/components/NotificationDropdown/NotificationDropdown.jsx';
import * as styles from '@/features/notifications/components/NotificationBell/NotificationBell.css';
import { useUnreadNotificationCount } from '@/features/notifications/hooks/useNotifications';

export default function NotificationBell() {
  const { data } = useUnreadNotificationCount();
  const unreadCount = data?.unreadCount ?? 0;
  const bellIconSrc =
    unreadCount > 0 ? '/icons/notification-unread.svg' : '/icons/notification.svg';

  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (!wrapRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      {/* PC / 태블릿 */}
      <button
        type="button"
        ref={buttonRef}
        className={clsx(styles.bellButton, styles.desktop)}
        aria-label={`알림 ${unreadCount}건`}
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'notification-dropdown' : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image src={bellIconSrc} alt="" width={24} height={24} aria-hidden="true" />
      </button>

      {/* 모바일 */}
      <Link
        href="/notifications"
        className={clsx(styles.bellButton, styles.mobile)}
        aria-label={`알림 ${unreadCount}건`}
      >
        <Image src={bellIconSrc} alt="" width={24} height={24} aria-hidden="true" />
      </Link>

      {isOpen && (
        <div id="notification-dropdown" className={styles.panel}>
          <NotificationDropdown onNotificationClick={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
