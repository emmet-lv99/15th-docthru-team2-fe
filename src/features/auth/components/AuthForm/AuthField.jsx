'use client';

// 인증 화면 전용 입력 한 줄 — 공용 Input 이 완성되기 전까지 auth 기능 안에서만 써요.
//
//   · 공용 컴포넌트(src/components/Input)는 담당자가 따로 구현하므로 건드리지 않았어요.
//   · label · errorMessage · hint · showPasswordToggle 인터페이스는 공용 Input 과 맞춰 두었어요.
//   · 비밀번호 눈 토글은 로컬 state 로 type 만 바꿉니다.
import Image from 'next/image';
import { useId, useState } from 'react';
import * as styles from './AuthForm.css.js';

export function AuthField({
  label,
  errorMessage,
  hint,
  showPasswordToggle = false,
  type = 'text',
  id,
  ...inputProps
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const [revealed, setRevealed] = useState(false);

  const isPassword = type === 'password';
  const resolvedType = isPassword && revealed ? 'text' : type;
  const describedBy = [hint ? hintId : null, errorMessage ? errorId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.inputWrap}>
        <input
          {...inputProps}
          id={inputId}
          type={resolvedType}
          className={errorMessage ? styles.inputError : styles.input}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={describedBy || undefined}
          style={isPassword && showPasswordToggle ? { paddingRight: '44px' } : undefined}
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setRevealed((value) => !value)}
            aria-label={revealed ? '비밀번호 숨기기' : '비밀번호 보기'}
            aria-pressed={revealed}
            className={styles.toggleButton}
          >
            <Image
              src={
                revealed
                  ? '/icons/password-visibility-on.svg'
                  : '/icons/password-visibility-off.svg'
              }
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
        <p id={errorId} className={styles.errorText}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
