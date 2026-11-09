'use client';

// src/features/auth/components/AuthForm/SignupForm.jsx
//
// 이메일·닉네임·비밀번호 가입 화면 — 성공하면 httpOnly 쿠키가 생기고
// AuthProvider 캐시에 user 가 들어가 GNB 까지 함께 갱신돼요.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthProvider';

import { AuthField } from './AuthField.jsx';
import * as styles from './AuthForm.css.js';
import { AuthLogo } from './AuthLogo.jsx';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BCRYPT_MAX_BYTES = 72;

const byteLength = (value) => new TextEncoder().encode(value).length;

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

export function SignupForm() {
  const router = useRouter();
  const { signUp, isSigningUp } = useAuth();
  const [values, setValues] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError(null);
  };

  const validate = () => {
    const nextErrors = {};
    const email = values.email.trim();
    const nickname = values.nickname.trim();

    if (!email) nextErrors.email = '이메일을 입력해 주세요.';
    else if (!EMAIL_PATTERN.test(email)) nextErrors.email = '올바른 이메일 형식이 아니에요.';

    if (!nickname) nextErrors.nickname = '닉네임을 입력해 주세요.';
    else if (nickname.length < 2 || nickname.length > 20) {
      nextErrors.nickname = '닉네임은 2자 이상 20자 이하로 입력해 주세요.';
    }

    if (!values.password) nextErrors.password = '비밀번호를 입력해 주세요.';
    else if (values.password.length < 8) nextErrors.password = '비밀번호는 8자 이상이어야 해요.';
    else if (byteLength(values.password) > BCRYPT_MAX_BYTES) {
      nextErrors.password = '비밀번호는 72바이트 이하여야 해요. (한글은 1자당 3바이트)';
    }

    if (!values.confirmPassword) nextErrors.confirmPassword = '비밀번호를 한 번 더 입력해 주세요.';
    else if (values.password !== values.confirmPassword) {
      nextErrors.confirmPassword = '비밀번호가 서로 달라요.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      await signUp({
        email: values.email.trim(),
        nickname: values.nickname.trim(),
        password: values.password,
      });
      router.replace('/challenges');
      router.refresh();
    } catch (error) {
      // 409(이메일/닉네임 중복)도 서버 message 를 그대로 보여 줘요.
      setFormError(error?.message ?? '회원가입에 실패했어요. 잠시 후 다시 시도해 주세요.');
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
          label="닉네임"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          autoComplete="nickname"
          hint="2자 이상 20자 이하로 입력해 주세요"
          value={values.nickname}
          onChange={handleChange}
          errorMessage={errors.nickname}
        />

        <AuthField
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="new-password"
          hint="8자 이상 입력해 주세요"
          showPasswordToggle
          value={values.password}
          onChange={handleChange}
          errorMessage={errors.password}
        />

        <AuthField
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          autoComplete="new-password"
          showPasswordToggle
          value={values.confirmPassword}
          onChange={handleChange}
          errorMessage={errors.confirmPassword}
        />

        <Button
          type="submit"
          variant="solid"
          size="lg"
          fullWidth
          disabled={isSigningUp}
          className={styles.submitButton}
        >
          {isSigningUp ? '가입 중…' : '회원가입하기'}
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
        <span>이미 회원이신가요?</span>
        <Link href="/login" className={styles.footerLink}>
          로그인하기
        </Link>
      </footer>
    </main>
  );
}

export default SignupForm;
