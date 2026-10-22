// src/features/auth/components/AuthForm/AuthLogo.jsx
//
// 👤 담당: 팀원 ③(인증 · 마이)
// 🔨 상태: 정적 셸 — 로그인·회원가입 화면 맨 위의 로고예요.
//
// 왜 이 파일이 따로 있나요?
//   · 로그인과 회원가입 두 화면이 같은 로고를 쓰기 때문에, 한 곳에 두면
//     나중에 링크나 크기를 바꿀 때 두 파일을 동시에 고치는 실수를 줄일 수 있어요.
//   · 클릭하면 앱 화면(챌린지 목록)으로 이동해요.
//
// 🚫 손대지 않는 파일
//   · src/components/* 공용 부품 — 로고는 인증 화면 전용이라 여기(features)에 둬요.
import Link from 'next/link';
import Image from 'next/image';
import * as styles from './AuthForm.css.js';

export function AuthLogo() {
  return (
    <Link href="/challenges" className={styles.logoBlock} aria-label="독스루 홈으로">
      <Image src="/icons/docthru-logo.svg" alt="" width={44} height={51} aria-hidden />
      <span className={styles.logoText}>Docthru</span>
    </Link>
  );
}

export default AuthLogo;
