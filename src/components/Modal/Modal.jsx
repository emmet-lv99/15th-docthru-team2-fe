'use client';

import { useEffect, useId, useRef } from 'react';

import * as styles from './Modal.css.js';

export function Modal({ isOpen = true, title, onClose, footer, children, className }) {
  const titleId = useId();
  const panelRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    lastFocusedRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseRef.current?.();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const isFirst =
        document.activeElement === first || document.activeElement === panelRef.current;

      if (event.shiftKey && isFirst) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (lastFocusedRef.current instanceof HTMLElement) lastFocusedRef.current.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        ref={panelRef}
        className={className ? `${styles.panel} ${className}` : styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        {title && (
          <div className={styles.header}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="닫기"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}

        <div className={styles.body}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
