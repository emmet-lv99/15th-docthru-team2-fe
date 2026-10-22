'use client';

// src/features/auth/components/AuthForm/SignupForm.jsx
//
// 👤 담당: 팀원 ③(인증 · 마이)
// 🔨 상태: 뼈대 — 마크업·배치만 잡아 둔 정적 화면이에요. 실제 가입은 아직 동작하지 않아요.
//
// 이 화면이 뭔가요?
//   이메일·닉네임·비밀번호로 가입하는 화면이에요. 성공하면 BE가 유저와 httpOnly 쿠키를 내려 주고,
//   화면은 챌린지 목록으로 이동해요.
//
// 📏 API 계약 (정확한 필드는 /api-docs 확인)
//   POST /auth/signup
//   요청: { email, nickname, password }
//   성공: 201 + { user } + httpOnly 쿠키
//   실패: 409 — 이메일 또는 닉네임 중복
//   ⚠️ 확인용 비밀번호(confirmPassword)는 화면에서만 비교하고 BE로 보내지 않아요.
//
// 🧩 구현 위치 — 아래 표시를 보고 담당자가 직접 채워 주세요.
//   ① 상태·검증·제출 핸들러: 이 파일 안 (useState·handleChange·handleSubmit)
//   ② 가입 API 함수: src/features/auth/api.js 에 signUp 추가
//      · 현재 이 파일에는 login·logout·getMe 만 있어요.
//   ③ 가입 훅: src/features/auth/hooks/useSignup.js (없으면 새로 생성)
//      · AuthProvider 는 ③ 담당 인증 인프라라서, 다른 담당자는 직접 수정하지 말고 ③에게 제안해 주세요. 가입은 feature 안의 훅에서 담당합니다.
//   ④ 검증 규칙을 두 화면이 함께 쓴다면: src/features/auth/constants.js
//      · 닉네임 2~20자 · 비밀번호 8자 이상 · 확인 비밀번호 일치
//   ⑤ 성공 후 처리
//      · 응답 user 를 queryKeys.me.info() 캐시에 넣기
//      · router.replace('/challenges') 후 router.refresh()
//   ⑥ 409 에러: 서버 message 를 폼 상단 또는 이메일/닉네임 필드에 보여 주세요.
//
// ⚠️ 자주 하는 실수
//   · confirmPassword 를 API body 에 같이 보내는 실수 — BE 스키마에 없어요.
//   · 닉네임/이메일 중복(409)을 한 필드에만 고정해서 보여 주는 실수 — 서버 message 를 우선 보여 주세요.
//   · Input 의 value/onChange 를 빠뜨리면 입력이 화면에 반영되지 않아요.
//
// 🚫 손대지 않는 파일
//   · src/components/Input, Button — 공용 부품은 각 담당자 몫이에요.
//   · src/contexts/AuthProvider.jsx, src/lib/client.js — ③ 담당 인증 인프라예요.
//   · src/app/signup/page.js — 조립만 담당하므로, 로직은 이 파일에 작성해 주세요.
//
// ✅ 완료 판정
//   · 4개 필드가 모두 검증되고, 확인 비밀번호가 다르면 제출되지 않는지
//   · 가입 성공 후 /challenges 로 이동하고 GNB 프로필이 갱신되는지
//   · 중복 이메일/닉네임(409)에서 사용자가 이유를 알 수 있는지
//   · 로딩 중 버튼이 중복 클릭되지 않는지
//   · pnpm lint · pnpm build 통과
import Link from 'next/link';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import { AuthLogo } from './AuthLogo.jsx';
import * as styles from './AuthForm.css.js';

export function SignupForm() {
  return (
    <main className={styles.container}>
      <AuthLogo />

      {/*
        TODO(③): 아래 form 에 onSubmit 을 연결하고, button 을 type="submit" 으로 바꿔 주세요.
        - Input 은 아직 공용 뼈대라 지금은 TODO 안내가 보여요. Input 담당자가 구현하면 필드가 나타나요.
        - 지금은 disabled 로 두어 "동작하는 것처럼 보이는" 오해를 막았어요. 로직을 붙인 뒤 제거해 주세요.
      */}
      <form className={styles.form} noValidate>
        <Input
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          autoComplete="email"
          disabled
        />

        <Input
          label="닉네임"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          autoComplete="nickname"
          hint="2자 이상 20자 이하로 입력해 주세요"
          disabled
        />

        <Input
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="new-password"
          hint="8자 이상 입력해 주세요"
          showPasswordToggle
          disabled
        />

        <Input
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          autoComplete="new-password"
          showPasswordToggle
          disabled
        />

        <Button
          type="button"
          variant="solid"
          size="lg"
          fullWidth
          disabled
          className={styles.submitButton}
        >
          회원가입하기
        </Button>

        {/* TODO(③): Google OAuth 는 BE OAuth 구현·자격 증명 준비 후 브라우저 전체 이동으로 연결해 주세요. */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          disabled
          className={styles.googleButton}
        >
          Google로 시작하기
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
