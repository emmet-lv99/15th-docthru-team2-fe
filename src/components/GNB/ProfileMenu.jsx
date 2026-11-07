'use client';

// src/components/GNB/ProfileMenu.jsx
//
// GNB 오른쪽 프로필(등급 배지) 메뉴 — 마이페이지 · 나의 챌린지 · 로그아웃.
// 바깥 클릭이나 ESC 로 닫히고, 열림 상태를 aria-expanded 로 알려 줘요.
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/contexts/AuthProvider';
import * as gnbStyles from './GNB.css.js';
import * as styles from './ProfileMenu.css.js';

/** 메뉴 항목 — 이동 경로는 화면 계약(/my-challenges/participating)을 그대로 써요 */
const MENU = [
  { key: 'mypage', label: '마이페이지', href: '/mypage' },
  { key: 'my-challenges', label: '나의 챌린지', href: '/my-challenges/participating' },
];

export function ProfileMenu({ grade = null }) {
  const router = useRouter();
  const { logout, isLoggingOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);

  // 바깥 클릭 · ESC 로 닫기
  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) setIsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      router.replace('/');
      router.refresh();
    } catch {
      // 로그아웃 실패는 화면을 유지해요 (세션 갱신은 다음 요청에서 재시도됩니다)
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        ref={triggerRef}
        className={clsx(gnbStyles.badge, styles.trigger)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="프로필 메뉴"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {grade ?? '내 정보'}
      </button>

      {isOpen && (
        <ul className={styles.menu} role="menu">
          {MENU.map((item) => (
            <li key={item.key} className={styles.item}>
              <Link
                href={item.href}
                className={styles.link}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className={styles.item}>
            <button
              type="button"
              className={styles.link}
              role="menuitem"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? '로그아웃 중…' : '로그아웃'}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileMenu;
