'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import * as styles from './WorkManageMenu.css.js';
function WorkManageMenu({ challengeId, workId, onDeleteClick }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  // 외부 클릭 및 ESC 키 닫기 이벤트 등록
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  const handleEdit = () => {
    setIsOpen(false);
    router.push(`/challenges/${challengeId}/works/${workId}/edit`);
  };
  const handleDelete = () => {
    setIsOpen(false);
    onDeleteClick();
  };
  return (
    <div className={styles.container} ref={menuRef}>
      <button
        type="button"
        className={styles.kebabButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="작업물 관리 메뉴"
        aria-expanded={isOpen}
      >
        ⋮
      </button>
      {isOpen && (
        <div className={styles.dropdown} role="menu">
          <button type="button" className={styles.menuItem} onClick={handleEdit} role="menuitem">
            수정하기
          </button>
          <button
            type="button"
            className={`${styles.menuItem} ${styles.deleteItem}`}
            onClick={handleDelete}
            role="menuitem"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
export default WorkManageMenu;
