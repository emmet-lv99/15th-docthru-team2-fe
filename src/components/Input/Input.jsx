'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useId, useState } from 'react';

import * as styles from './Input.css.js';

export function Input({
  label,
  errorMessage,
  hint,
  trailingIcon,
  showPasswordToggle = false,
  state,
  className,
  id,
  type = 'text',
  ...restProps
}) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [revealed, setRevealed] = useState(false);

  const isPassword = type === 'password' && showPasswordToggle;
  const resolvedType = isPassword && revealed ? 'text' : type;
  const hasError = Boolean(errorMessage) || state === 'error';

  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = errorMessage ? `${inputId}-error` : undefined;

  return (
    <div className={className ? `${styles.field} ${className}` : styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.control}>
        <input
          id={inputId}
          type={resolvedType}
          className={clsx(
            styles.input,
            (isPassword || trailingIcon) && styles.inputWithSlot,
            hasError && styles.inputError,
          )}
          aria-invalid={hasError || undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          {...restProps}
        />

        {trailingIcon && <span className={styles.trailing}>{trailingIcon}</span>}

        {isPassword && (
          <button
            type="button"
            className={styles.toggle}
            aria-label={revealed ? '비밀번호 숨기기' : '비밀번호 보기'}
            aria-pressed={revealed}
            onClick={() => setRevealed((prev) => !prev)}
          >
            <Image
              src={`/icons/password-visibility-${revealed ? 'off' : 'on'}.svg`}
              alt=""
              width={24}
              height={24}
            />
          </button>
        )}
      </div>

      {hint && !errorMessage && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {errorMessage && (
        <p id={errorId} className={styles.error}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default Input;
