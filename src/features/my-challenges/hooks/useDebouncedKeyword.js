'use client';

// src/features/my-challenges/hooks/useDebouncedKeyword.js
//
// 입력값과 실제 요청어를 나눠요 — 타이핑마다 서버를 부르지 않으려고 300ms 기다립니다.
import { useEffect, useState } from 'react';

/**
 * @param {number} [delay] 디바운스 시간(ms)
 * @returns {{ inputValue: string, setInputValue: (v: string) => void, keyword: string }}
 */
export function useDebouncedKeyword(delay = 300) {
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setKeyword(inputValue.trim()), delay);
    return () => clearTimeout(timer);
  }, [inputValue, delay]);

  return { inputValue, setInputValue, keyword };
}
