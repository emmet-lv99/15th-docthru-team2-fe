'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as styles from './Search.css.js';

export default function Search({
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  placeholder = '챌린지 이름을 검색해보세요',
}) {
  const [draft, setDraft] = useState(defaultValue);
  const inputValue = value === undefined ? draft : value;

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.(inputValue.trim());
  }

  return (
    <form role="search" className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.submit} type="submit" aria-label="검색">
        <span className={styles.searchIcon}>
          <Image
            src="/icons/challenges/search_circle.svg"
            alt=""
            width={15}
            height={15}
            className={styles.searchCircle}
          />
          <Image
            src="/icons/challenges/search_handle.svg"
            alt=""
            width={4}
            height={4}
            className={styles.searchHandle}
          />
        </span>
      </button>
      <input
        className={styles.input}
        type="search"
        aria-label="챌린지 검색어"
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => {
          if (value === undefined) setDraft(event.target.value);
          onChange?.(event.target.value);
        }}
      />
    </form>
  );
}
