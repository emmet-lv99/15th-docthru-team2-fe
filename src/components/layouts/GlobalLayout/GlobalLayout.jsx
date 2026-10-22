'use client';

// src/components/layouts/GlobalLayout/GlobalLayout.jsx
// 셸 — GNB + <main>{children}</main>.
// 원본(prisma-7)과 동일하게 인트로·로그인·가입·에디터 화면에서는 GNB 를 숨깁니다.
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GNB } from '@/components/GNB';
import * as styles from './GlobalLayout.css.js';

/** 풀스크린/비-GNB 라우트 (원본 GlobalGNB 와 동일) */
const NO_GNB_PREFIXES = ['/intro', '/login', '/signup'];

export function GlobalLayout({
  isLoggedIn = false,
  isAdmin = false,
  grade = null,
  unreadCount = 0,
  children,
}) {
  const pathname = usePathname();

  const hideGnb =
    NO_GNB_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
    pathname.endsWith('/edit');

  return (
    <div className={styles.container}>
      {!hideGnb && (
        <GNB isLoggedIn={isLoggedIn} isAdmin={isAdmin} grade={grade} unreadCount={unreadCount} />
      )}
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export { Link };
