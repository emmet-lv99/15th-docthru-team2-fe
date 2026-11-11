'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import * as styles from '@/features/notifications/components/NotificationMobileHeader/NotificationMobileHeader.css';

export default function NotificationMobileHeader() {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>알림</h1>

      <button
        type="button"
        className={styles.closeButton}
        aria-label="알림 닫기"
        onClick={() => router.back()}
      >
        <Image src="/icons/ic_out.svg" alt="" width={24} height={24} aria-hidden="true" />
      </button>
    </div>
  );
}
