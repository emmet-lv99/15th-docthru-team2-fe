// src/components/GNB/GNB.jsx
// 근거: 공용 컴퍼넌트/gnb.png — 기기 3 × 권한 3 = 9변형

'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/Button';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import * as styles from './GNB.css.js';
import { ProfileMenu } from './ProfileMenu';

/**
 * isLoggedIn · isAdmin 이 권한을, unreadCount 가 알림 점 표시에 쓰인다.
 * 어드민이면 "챌린지 관리"(검은 배지) · "챌린지 목록" 메뉴가 노출된다.
 */
function GNB({ isLoggedIn = false, isAdmin = false, grade = null, unreadCount = 0 }) {
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
            <nav className={clsx(styles.nav, styles.hideOnMobile)}>
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
              {!isAdmin && (
                <Link
                  href="/notifications"
                  className={clsx(styles.iconButton, styles.iconButtonPositioned)}
                  data-has-unread={unreadCount > 0}
                  aria-label={`알림 ${unreadCount}건`}
                >
                  <Image
                    src="/icons/notification.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                </Link>
              )}

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
