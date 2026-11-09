'use client';

import { useState } from 'react';
import * as styles from './AdminRejectModal.css.js';

export default function AdminRejectModal({ onClose, onConfirm, isPending = false }) {
  const [reason, setReason] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedReason = reason.trim();

    if (!trimmedReason || isPending) return;

    onConfirm(trimmedReason);
  };

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-modal-title"
      >
        <div className={styles.header}>
          <h2 id="reject-modal-title" className={styles.title}>
            거절 사유
          </h2>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            disabled={isPending}
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="reject-reason" className={styles.label}>
            내용
          </label>

          <textarea
            id="reject-reason"
            className={styles.textarea}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="거절 사유를 입력해주세요"
            maxLength={500}
            disabled={isPending}
          />

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!reason.trim() || isPending}
          >
            {isPending ? '처리 중...' : '전송'}
          </button>
        </form>
      </div>
    </div>
  );
}
