'use client';

// src/features/auth/components/AuthForm/LoginForm.jsx
//
// 👤 담당: 팀원 ③(인증 · 마이)
// 🔨 상태: 뼈대 — 마크업·배치만 잡아 둔 정적 화면이에요. 실제 로그인은 아직 동작하지 않아요.
//
// 이 화면이 뭔가요?
//   이메일·비밀번호로 로그인하는 화면이에요. 성공하면 BE가 httpOnly 쿠키를 내려 주고,
//   화면은 챌린지 목록으로 이동해요.
//
// 📏 API 계약 (정확한 필드는 /api-docs 확인)
//   POST /auth/login
//   요청: { email, password }
//   성공: 200 + { user } + httpOnly 쿠키
//   실패: 401 — 이메일/비밀번호 불일치 (어느 쪽이 틀렸는지 구분하지 않아요)
//
// 🧩 구현 위치 — 아래 표시를 보고 담당자가 직접 채워 주세요.
//   ① 상태·검증·제출 핸들러: 이 파일 안 (useState·handleChange·handleSubmit)
//   ② 로그인 요청: src/contexts/AuthProvider.jsx 의 useAuth().login(credentials)
//      · 이미 쿠키 로그인·유저 캐시 갱신·router.refresh() 가 들어 있어요.
//      · 별도 useLogin 훅을 새로 만들지 않아도 돼요.
//   ③ 검증 규칙을 두 화면이 함께 쓴다면: src/features/auth/constants.js (없으면 새로 생성)
//   ④ 에러 문구: useAuth().loginError 또는 try/catch 의 error.message
//   ⑤ 성공 후 이동: router.replace('/challenges') — AuthProvider.login의 refresh는 ③ 구현 후 동작해요.
//
// ⚠️ 자주 하는 실수
//   · Input 의 value/onChange 를 빠뜨리면 입력이 화면에 반영되지 않아요.
//   · 로그인 실패 시 401 을 "이메일이 없습니다"처럼 나누면 보안상 힌트를 줘요. API message 를 그대로 쓰는 편이 안전해요.
//   · Google 로그인은 fetch 가 아니라 브라우저 전체 이동이에요. 지금은 버튼 자리만 두었어요.
//
// 🚫 손대지 않는 파일
//   · src/components/Input, Button — 공용 부품은 각 담당자 몫이에요.
//   · src/contexts/AuthProvider.jsx, src/lib/client.js — ③ 담당 인증 인프라예요.
//   · src/app/login/page.js — 조립만 담당하므로, 로직은 이 파일에 작성해 주세요.
//
// ✅ 완료 판정
//   · 이메일/비밀번호를 입력하고 제출하면 실제 로그인이 되는지
//   · 실패 시 사용자에게 읽을 수 있는 오류가 보이는지
//   · 성공 후 /challenges 로 이동하고 GNB 프로필이 갱신되는지
//   · 로딩 중 버튼이 중복 클릭되지 않는지
//   · pnpm lint · pnpm build 통과
import Link from 'next/link';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import { AuthLogo } from './AuthLogo.jsx';
import * as styles from './AuthForm.css.js';

export function LoginForm() {
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
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="current-password"
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
          로그인하기
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
        <span>회원이 아니신가요?</span>
        <Link href="/signup" className={styles.footerLink}>
          회원가입하기
        </Link>
      </footer>
    </main>
  );
}

export default LoginForm;
