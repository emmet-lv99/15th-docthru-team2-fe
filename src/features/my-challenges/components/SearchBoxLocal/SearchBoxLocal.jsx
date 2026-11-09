'use client';

// src/features/my-challenges/components/SearchBoxLocal/SearchBoxLocal.jsx
//
// 목록 상단 검색 입력 — 돋보기 아이콘 + placeholder.
// 공용 Search 부품이 아직 뼈대라 화면 전용으로 먼저 만들어요.
import Image from 'next/image';

import * as styles from './SearchBoxLocal.css.js';

export function SearchBoxLocal({
  value,
  onChange,
  placeholder = '챌린지 이름을 검색해보세요',
  label = '챌린지 이름 검색',
}) {
  return (
    <div className={styles.wrap}>
      <Image className={styles.icon} src="/icons/search.svg" alt="" width={18} height={18} />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className={styles.input}
      />
    </div>
  );
}

export default SearchBoxLocal;
