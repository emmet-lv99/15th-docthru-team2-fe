'use client';

// src/components/GNB/GNB.jsx
// 근거: 공용 컴퍼넌트/gnb.png — 기기 3 × 권한 3 = 9변형

import { usePathname } from 'next/navigation';
import { Button } from '@/components/Button';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import * as styles from './GNB.css.js';
import { ProfileMenu } from './ProfileMenu';
import NotificationBell from '@/features/notifications/components/NotificationBell/NotificationBell';

/**
 * isLoggedIn · isAdmin 이 권한을 결정한다.
 * 알림 개수 및 읽지 않은 알림 표시는 NotificationBell에서 관리한다.
 * 어드민이면 "챌린지 관리"(검은 배지) · "챌린지 목록" 메뉴가 노출된다.
 */
function GNB({ isLoggedIn = false, isAdmin = false, grade = null }) {
  const pathname = usePathname();

  const isChallengeList = pathname.startsWith('/admin/challenges/list');

  return (
    <header className={styles.header}>
      <div className={clsx(styles.inner, styles.mobileInner)}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo} aria-label="독스루 홈">
            <Image
              src="/icons/logo.svg"
              alt=""
              width={150}
              height={32}
              className={styles.logoImage}
              priority
            />
          </Link>

          {isAdmin && (
            <nav className={styles.nav}>
              <Link
                href="/admin/challenges"
                className={clsx(styles.navLink, !isChallengeList && styles.activeNavLink)}
              >
                챌린지 관리
              </Link>

              <Link
                href="/admin/challenges/list"
                className={clsx(styles.navLink, isChallengeList && styles.activeNavLink)}
              >
                챌린지 목록
              </Link>
            </nav>
          )}
        </div>

        <div className={styles.right}>
          {!isLoggedIn && (
            <Button as={Link} href="/login" variant="outline" size="md">
              로그인
            </Button>
          )}

          {isLoggedIn && (
            <>
              {!isAdmin && <NotificationBell />}

              {/* 프로필 메뉴 — 마이페이지 · 나의 챌린지 · 로그아웃 */}
              <ProfileMenu grade={grade} isAdmin={isAdmin} />
            </>
          )}

          {/* {isAdmin && <span className={styles.badge}>ADMIN</span>} */}
        </div>
      </div>
    </header>
  );
}

export default GNB;
