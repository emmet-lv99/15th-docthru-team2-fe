'use client';

import { useEffect } from 'react';
import * as styles from './ConfirmModal.css.js';

function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  isDanger = false,
  onConfirm,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={
              isDanger
                ? styles.confirmButtonVariants.danger
                : styles.confirmButtonVariants.normal
            }
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
