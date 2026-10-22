// src/components/GNB/GNB.jsx
// 근거: 공용 컴퍼넌트/gnb.png — 기기 3 × 권한 3 = 9변형
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '@/components/Button';
import * as styles from './GNB.css.js';

/**
 * isLoggedIn · isAdmin 이 권한을, unreadCount 가 알림 점 표시에 쓰인다.
 * 어드민이면 "챌린지 관리"(검은 배지) · "챌린지 목록" 메뉴가 노출된다.
 */
function GNB({ isLoggedIn = false, isAdmin = false, grade = null, unreadCount = 0 }) {
  return (
    <header className={styles.header}>
      <div className={clsx(styles.inner, styles.mobileInner)}>
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

        <div className={styles.right}>
          {!isLoggedIn && (
            <Button as={Link} href="/login" variant="outline" size="md">
              로그인
            </Button>
          )}

          {isLoggedIn && (
            <>
              <Link
                href="/notifications"
                className={clsx(styles.iconButton, styles.iconButtonPositioned)}
                data-has-unread={unreadCount > 0}
                aria-label={`알림 ${unreadCount}건`}
              >
                <BellIcon />
              </Link>

              {/* 마이페이지 진입점 — 닉네임/등급 배지를 링크로 만든다 */}
              <Link href="/mypage" className={styles.badge} title="마이페이지">
                {grade ?? '내 정보'}
              </Link>
            </>
          )}

          {isAdmin && <span className={styles.badge}>ADMIN</span>}
        </div>
      </div>
    </header>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6ZM10.5 20a1.8 1.8 0 0 0 3 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default GNB;
