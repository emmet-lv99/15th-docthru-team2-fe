'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useAuth } from '@/contexts/AuthProvider';
import * as styles from './ProfileMenu.css.js';

const MENU = [
  { key: 'mypage', label: '마이페이지', href: '/mypage' },
  { key: 'my-challenges', label: '나의 챌린지', href: '/my-challenges/participating' },
];

export function ProfileMenu({ isAdmin = false }) {
  const router = useRouter();
  const { logout, isLoggingOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);

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
    setErrorMessage(null);
    try {
      await logout();
      setIsOpen(false);
      router.replace('/');
      router.refresh();
    } catch {
      setErrorMessage('로그아웃에 실패했어요. 잠시 후 다시 시도해 주세요.');
    }
  };

  const handleToggle = () => {
    setErrorMessage(null);
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        ref={triggerRef}
        className={clsx(styles.trigger, isAdmin ? styles.adminTrigger : styles.userTrigger)}
        aria-expanded={isOpen}
        aria-label="프로필 메뉴"
        onClick={handleToggle}
      >
        <Image
          src={isAdmin ? '/icons/admin-profile.svg' : '/icons/profile.svg'}
          alt=""
          width={32}
          height={32}
        />
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {!isAdmin &&
            MENU.map((item) => (
              <li key={item.key} className={styles.item}>
                <Link href={item.href} className={styles.link} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}

          <li className={styles.item}>
            <button
              type="button"
              className={styles.link}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? '로그아웃 중…' : '로그아웃'}
            </button>
          </li>
          {errorMessage && (
            <li className={styles.item}>
              <p className={styles.error} role="alert">
                {errorMessage}
              </p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileMenu;
