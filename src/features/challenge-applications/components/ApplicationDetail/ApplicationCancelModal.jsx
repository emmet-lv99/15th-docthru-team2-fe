//취소하기 모달

'use client';

import * as styles from './ApplicationDetail.css.js';
import Image from 'next/image.js';
import checkIcon from '@/features/challenge-applications/assets/check.svg';

export default function ApplicationCancelModal({
  onClose,
  onConfirm,
  isPending = false,
  message = '정말 취소하시겠어요?',
  pendingMessage = '취소 중...',
}) {
  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-modal-title"
      >
        {/* 확인 아이콘 및 안내 문구 */}
        <div className={styles.modalMessage}>
          <Image src={checkIcon} alt="" width={24} height={24} />

          <p id="cancel-modal-title" className={styles.modalText}>
            {message}
          </p>
        </div>

        <div className={styles.modalButtons}>
          <button
            type="button"
            className={styles.modalNoButton}
            onClick={onClose}
            disabled={isPending}
          >
            아니오
          </button>

          <button
            type="button"
            className={styles.modalYesButton}
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? pendingMessage : '네'}
          </button>
        </div>
      </div>
    </div>
  );
}
