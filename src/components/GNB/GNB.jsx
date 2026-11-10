// src/components/GNB/GNB.jsx
// 근거: 공용 컴퍼넌트/gnb.png — 기기 3 × 권한 3 = 9변형
import { Button } from '@/components/Button';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import * as styles from './GNB.css.js';
import { ProfileMenu } from './ProfileMenu';
import NotificationBell from '@/features/notifications/components/NotificationBell/NotificationBell';

/**
 * isLoggedIn · isAdmin 이 권한을, unreadCount 가 알림 점 표시에 쓰인다.
 * 어드민이면 "챌린지 관리"(검은 배지) · "챌린지 목록" 메뉴가 노출된다.
 */
function GNB({ isLoggedIn = false, isAdmin = false, grade = null, unreadCount = 0 }) {
  return (
    <header className={styles.header}>
      <div className={clsx(styles.inner, styles.mobileInner)}>
        <div className={styles.left}>
          <Link href="/" className={styles.mobileLogo} aria-label="독스루 홈">
            {/* 원본 prisma-7 로고 자산 — 색/비율을 그대로 씁니다 */}
            <Image src="/icons/docthru-logo.svg" alt="" width={18} height={21} aria-hidden />
            Docthru
          </Link>

          {isAdmin && (
            <nav className={clsx(styles.nav, styles.hideOnMobile)}>
              <Link href="/admin/challenges" className={styles.navLinkAdmin}>
                신청 관리
              </Link>
              <Link href="/admin/challenges/list" className={styles.navLink}>
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
              {!isAdmin && <NotificationBell unreadCount={unreadCount} />}

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
