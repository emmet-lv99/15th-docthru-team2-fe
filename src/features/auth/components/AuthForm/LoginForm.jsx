'use client';

// src/features/auth/components/AuthForm/LoginForm.jsx
//
// 이메일·비밀번호 로그인 화면 — 성공하면 BE 가 httpOnly 쿠키를 내려 주고
// AuthProvider 가 /auth/me 캐시를 채운 뒤 챌린지 목록으로 이동해요.
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthProvider';

import { AuthField } from './AuthField.jsx';
import { AuthLogo } from './AuthLogo.jsx';
import * as styles from './AuthForm.css.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const router = useRouter();
  const { login, isLoggingIn } = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!values.email.trim()) nextErrors.email = '이메일을 입력해 주세요.';
    else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = '올바른 이메일 형식이 아니에요.';
    }
    if (!values.password) nextErrors.password = '비밀번호를 입력해 주세요.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      await login({ email: values.email.trim(), password: values.password });
      router.replace('/challenges');
      router.refresh();
    } catch (error) {
      // 서버가 "이메일 또는 비밀번호" 를 구분하지 않으므로 그 메시지를 그대로 써요.
      setFormError(error?.message ?? '로그인에 실패했어요. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <main className={styles.container}>
      <AuthLogo />

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {formError && <p className={styles.formError}>{formError}</p>}

        <AuthField
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          errorMessage={errors.email}
        />

        <AuthField
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="current-password"
          showPasswordToggle
          value={values.password}
          onChange={handleChange}
          errorMessage={errors.password}
        />

        <div className={styles.forgotRow}>
          <Link href="/password-reset" className={styles.subtleLink}>
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        <Button
          type="submit"
          variant="solid"
          size="lg"
          fullWidth
          disabled={isLoggingIn}
          className={styles.submitButton}
        >
          {isLoggingIn ? '로그인 중…' : '로그인하기'}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          disabled
          className={styles.googleButton}
          title="Google 로그인은 준비 중이에요."
        >
          Google로 시작하기 (준비 중)
        </Button>
      </form>

      <footer className={styles.footer}>
        <span>회원이 아니신가요?</span>
        <Link href="/signup" className={styles.footerLink}>
          회원가입하기
        </Link>
      </footer>
    </main>
  );
}

export default LoginForm;
