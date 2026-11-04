'use client';

import * as styles from './Pagination.css.js';

export default function Pagination({ page = 1, totalPages = 1, onChange }) {
  if (totalPages <= 1) return null;
  const candidates = [1, totalPages, ...Array.from({ length: 5 }, (_, index) => page + index - 2)];
  const visible = [...new Set(candidates.filter((n) => n >= 1 && n <= totalPages))].sort(
    (a, b) => a - b,
  );
  const entries = [];
  let previous = 0;
  for (const value of visible) {
    if (previous && value > previous + 1) entries.push('…');
    entries.push(value);
    previous = value;
  }
  return (
    <nav className={styles.container} aria-label="페이지 선택">
      <button
        className={styles.button}
        type="button"
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
        aria-label="이전 페이지"
      >
        ‹
      </button>
      {entries.map((value, index) =>
        value === '…' ? (
          <span key={'gap-' + index} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <button
            key={value}
            className={[styles.button, value === page ? styles.current : ''].join(' ')}
            type="button"
            aria-current={value === page ? 'page' : undefined}
            disabled={value === page}
            onClick={() => onChange?.(value)}
          >
            {value}
          </button>
        ),
      )}
      <button
        className={styles.button}
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange?.(page + 1)}
        aria-label="다음 페이지"
      >
        ›
      </button>
    </nav>
  );
}
