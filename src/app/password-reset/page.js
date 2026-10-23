// /password-reset — 비밀번호 재설정 메일 요청 화면 (비회원)
import { PasswordResetRequestForm } from '@/features/auth/components/AuthForm';

export const metadata = {
  title: '비밀번호 재설정',
  description: '가입한 이메일로 비밀번호 재설정 링크를 받아요.',
};

export default function PasswordResetPage() {
  return <PasswordResetRequestForm />;
}
