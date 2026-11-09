'use client';

import { useEffect, useRef, useState } from 'react';
import * as styles from './ApplicationFilterDropdown.css.js';
import Image from 'next/image';
import arrowDown from '@/features/challenge-applications/assets/icon_arrow_down.svg';

const options = [
  { value: 'ALL', label: '전체 상태' },
  { value: 'PENDING', label: '승인 대기' },
  { value: 'APPROVED', label: '신청 승인' },
  { value: 'REJECTED', label: '신청 거절' },
  { value: 'oldest', label: '신청 시간 빠른순' },
  { value: 'latest', label: '신청 시간 느린순' },
  { value: 'deadlineAsc', label: '마감 기한 빠른순' },
  { value: 'deadlineDesc', label: '마감 기한 느린순' },
];

export default function ApplicationFilterDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div
      className={styles.dropdown}
      ref={dropdownRef}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls="application-filter-options"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedOption?.label ?? '전체 상태'}</span>
        <Image src={arrowDown} alt="" width={20} height={20} className={styles.arrow} />
      </button>

      {isOpen && (
        <div id="application-filter-options" className={styles.menu}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={styles.option}
              aria-pressed={value === option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
