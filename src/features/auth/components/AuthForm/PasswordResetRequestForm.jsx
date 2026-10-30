'use client';

// 비밀번호 재설정 요청 화면 — 이메일을 받아 30분·1회용 링크를 요청해요.
// 계정이 없어도 같은 안내가 나오므로 "가입 여부"를 노출하지 않아요.
import { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/Button';
import { requestPasswordReset } from '@/features/auth/api';

import { AuthField } from './AuthField.jsx';
import { AuthLogo } from './AuthLogo.jsx';
import * as styles from './AuthForm.css.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PasswordResetRequestForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);
    setMessage(null);

    const trimmed = email.trim();
    if (!trimmed) return setError('이메일을 입력해 주세요.');
    if (!EMAIL_PATTERN.test(trimmed)) return setError('올바른 이메일 형식이 아니에요.');

    setIsSubmitting(true);
    try {
      const result = await requestPasswordReset({ email: trimmed });
      setMessage(result?.message ?? '비밀번호 재설정 안내를 보냈습니다.');
    } catch (requestError) {
      setFormError(requestError?.message ?? '요청에 실패했어요. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.container}>
      <AuthLogo />

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {formError && <p className={styles.formError}>{formError}</p>}
        {message && <p className={styles.successText}>{message}</p>}

        <AuthField
          label="이메일"
          name="email"
          type="email"
          placeholder="가입한 이메일을 입력해 주세요"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError(null);
            setFormError(null);
            setMessage(null);
          }}
          errorMessage={error}
        />

        <Button type="submit" variant="solid" size="lg" fullWidth disabled={isSubmitting}>
          {isSubmitting ? '보내는 중…' : '재설정 메일 받기'}
        </Button>
      </form>

      <footer className={styles.footer}>
        <Link href="/login" className={styles.footerLink}>
          로그인으로 돌아가기
        </Link>
      </footer>
    </main>
  );
}

export default PasswordResetRequestForm;
