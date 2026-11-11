'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import * as styles from './not-found.css.js';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <span className={styles.badge}>PAGE NOT FOUND</span>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.title}>원하시는 페이지를 찾을 수 없습니다</h2>
      <p className={styles.description}>
        페이지 주소가 잘못 입력되었거나, 변경 또는 삭제되어 더 이상 찾을 수 없습니다. 입력하신
        주소가 맞는지 다시 한번 확인해 주세요.
      </p>
      <div className={styles.buttonGroup}>
        <Button variant="outline" size="md" onClick={() => router.back()}>
          이전 페이지
        </Button>
        <Button as={Link} href="/" variant="solid" size="md">
          홈으로 이동
        </Button>
      </div>
    </main>
  );
}
