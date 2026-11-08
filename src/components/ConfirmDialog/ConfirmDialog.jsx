'use client';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

import * as styles from './ConfirmDialog.css.js';

export function ConfirmDialog({
  isOpen = true,
  message,
  cancelLabel,
  confirmLabel = '네',
  onConfirm,
  onCancel,
  align = 'left',
  title,
}) {
  const isRight = align === 'right';

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
      footer={
        <div className={isRight ? styles.actionsRight : styles.actionsLeft}>
          {cancelLabel && (
            <Button type="button" variant="outline" size="md" onClick={onCancel}>
              {cancelLabel}
            </Button>
          )}
          <Button type="button" variant="solid" size="md" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div className={isRight ? styles.contentRight : styles.contentLeft}>
        {isRight && (
          <span className={styles.icon} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M8 12.2l2.6 2.6L16 9.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
        <p className={styles.message}>{message}</p>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
