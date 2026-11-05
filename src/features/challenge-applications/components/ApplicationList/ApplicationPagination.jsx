'use client';

import * as styles from './ApplicationList.css.js';
import Image from 'next/image';

import arrowLeft from '../../assets/icon_arrow_left.svg';
import arrowRight from '../../assets/icon_arrow_right.svg';

export default function ApplicationPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="신청 목록 페이지 이동">
      {/* 이전 페이지 */}
      <button
        type="button"
        className={styles.arrowButton}
        aria-label="이전 페이지"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Image src={arrowLeft} alt="" width={14} height={14} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={currentPage === pageNumber ? styles.activePage : styles.pageButton}
          aria-current={currentPage === pageNumber ? 'page' : undefined}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {/* 다음 페이지 */}
      <button
        type="button"
        className={styles.arrowButton}
        aria-label="다음 페이지"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Image src={arrowRight} alt="" width={14} height={14} />
      </button>
    </nav>
  );
}
