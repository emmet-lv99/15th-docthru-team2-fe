'use client';

// src/features/auth/components/AuthForm/LoginForm.jsx
//
// 이메일·비밀번호 로그인 화면 — 성공하면 BE 가 httpOnly 쿠키를 내려 주고
// AuthProvider 가 /auth/me 캐시를 채운 뒤 챌린지 목록으로 이동해요.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthProvider';

import { AuthField } from './AuthField.jsx';
import * as styles from './AuthForm.css.js';
import { AuthLogo } from './AuthLogo.jsx';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GOOGLE_AUTH_URL = '/api/backend/auth/google?next=/';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}

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
          as="a"
          href={GOOGLE_AUTH_URL}
          variant="outline"
          size="lg"
          fullWidth
          className={styles.googleButton}
        >
          <GoogleIcon />
          <span>Google로 시작하기</span>
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
