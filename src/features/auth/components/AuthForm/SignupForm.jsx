'use client';

// src/features/auth/components/AuthForm/SignupForm.jsx
//
// 이메일·닉네임·비밀번호 가입 화면 — 성공하면 httpOnly 쿠키가 생기고
// AuthProvider 캐시에 user 가 들어가 GNB 까지 함께 갱신돼요.
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthProvider';

import { AuthField } from './AuthField.jsx';
import { AuthLogo } from './AuthLogo.jsx';
import * as styles from './AuthForm.css.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BCRYPT_MAX_BYTES = 72;

const byteLength = (value) => new TextEncoder().encode(value).length;

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
        <span>이미 회원이신가요?</span>
        <Link href="/login" className={styles.footerLink}>
          로그인하기
        </Link>
      </footer>
    </main>
  );
}

export default SignupForm;
