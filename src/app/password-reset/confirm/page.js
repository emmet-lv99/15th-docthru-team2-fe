// /password-reset/confirm?token=... — 메일 링크의 토큰으로 새 비밀번호를 설정해요.
// useSearchParams 는 Suspense 경계가 필요해서 페이지에서 한 번 감싸 줍니다.
import { Suspense } from 'react';
import { PasswordResetConfirmForm } from '@/features/auth/components/AuthForm';

export const metadata = {
  title: '새 비밀번호 설정',
  description: '메일로 받은 링크에서 새 비밀번호를 설정해요.',
};

export default function PasswordResetConfirmPage() {
  return (
    <Suspense fallback={<p style={{ padding: '48px', textAlign: 'center' }}>불러오는 중…</p>}>
      <PasswordResetConfirmForm />
    </Suspense>
  );
}
