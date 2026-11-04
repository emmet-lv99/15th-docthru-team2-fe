'use client';

import { useEffect, useRef, useState } from 'react';
import * as styles from './ApplicationForm.css.js';

export default function ApplicationDropdown({ id, name, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 드롭다운 밖을 클릭하면 닫기
  useEffect(() => {
    function handleOutsideClick(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, []);

  // 선택한 옵션을 부모 컴포넌트로 전달
  function handleSelect(selectedValue) {
    onChange(selectedValue);
    setIsOpen(false);
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        id={id}
        type="button"
        className={styles.dropdownTrigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-options`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setIsOpen(false);
          if (event.key === 'ArrowDown' && !isOpen) setIsOpen(true);
        }}
      >
        <span className={value ? styles.dropdownValue : styles.dropdownPlaceholder}>
          {options.find((option) => option.value === value)?.label ?? '카테고리'}
        </span>

        <span aria-hidden="true" className={styles.dropdownArrow}>
          {isOpen ? '▴' : '▾'}
        </span>
      </button>

      {isOpen && (
        <div
          id={`${id}-options`}
          className={styles.dropdownMenu}
          role="listbox"
          aria-label={name === 'category' ? '분야' : '문서 타입'}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              className={styles.dropdownOption}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* 실제 폼 제출 시 값이 포함되도록 유지 */}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
