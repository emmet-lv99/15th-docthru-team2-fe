'use client';

// 비밀번호 재설정 확정 화면 — 메일 링크의 token + 새 비밀번호를 보내요.
// 성공하면 기존 세션이 모두 무효화되므로 로그인 화면으로 안내합니다.
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/Button';
import { confirmPasswordReset } from '@/features/auth/api';

import { AuthField } from './AuthField.jsx';
import { AuthLogo } from './AuthLogo.jsx';
import * as styles from './AuthForm.css.js';

const BCRYPT_MAX_BYTES = 72;
const byteLength = (value) => new TextEncoder().encode(value).length;

export function PasswordResetConfirmForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [values, setValues] = useState({ newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      setFormError('재설정 링크가 올바르지 않아요. 메일의 링크를 다시 확인해 주세요.');
      return;
    }

    const nextErrors = {};
    if (!values.newPassword) nextErrors.newPassword = '새 비밀번호를 입력해 주세요.';
    else if (values.newPassword.length < 8) {
      nextErrors.newPassword = '비밀번호는 8자 이상이어야 해요.';
    } else if (byteLength(values.newPassword) > BCRYPT_MAX_BYTES) {
      nextErrors.newPassword = '비밀번호는 72바이트 이하여야 해요. (한글은 1자당 3바이트)';
    }
    if (!values.confirmPassword) nextErrors.confirmPassword = '비밀번호를 한 번 더 입력해 주세요.';
    else if (values.newPassword !== values.confirmPassword) {
      nextErrors.confirmPassword = '비밀번호가 서로 달라요.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await confirmPasswordReset({ token, newPassword: values.newPassword });
      setIsDone(true);
    } catch (error) {
      setFormError(error?.message ?? '비밀번호를 바꾸지 못했어요. 링크를 다시 확인해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.container}>
      <AuthLogo />

      {isDone ? (
        <div className={styles.form}>
          <p className={styles.successText}>
            비밀번호를 바꿨어요. 새 비밀번호로 다시 로그인해 주세요.
          </p>
          <Button as={Link} href="/login" variant="solid" size="lg" fullWidth>
            로그인하러 가기
          </Button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {formError && <p className={styles.formError}>{formError}</p>}

          <AuthField
            label="새 비밀번호"
            name="newPassword"
            type="password"
            placeholder="새 비밀번호를 입력해 주세요"
            autoComplete="new-password"
            hint="8자 이상 입력해 주세요"
            showPasswordToggle
            value={values.newPassword}
            onChange={handleChange}
            errorMessage={errors.newPassword}
          />

          <AuthField
            label="새 비밀번호 확인"
            name="confirmPassword"
            type="password"
            placeholder="새 비밀번호를 한 번 더 입력해 주세요"
            autoComplete="new-password"
            showPasswordToggle
            value={values.confirmPassword}
            onChange={handleChange}
            errorMessage={errors.confirmPassword}
          />

          <Button type="submit" variant="solid" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? '변경 중…' : '비밀번호 변경하기'}
          </Button>
        </form>
      )}

      <footer className={styles.footer}>
        <Link href="/password-reset" className={styles.footerLink}>
          재설정 메일 다시 받기
        </Link>
      </footer>
    </main>
  );
}

export default PasswordResetConfirmForm;
