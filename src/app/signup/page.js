// src/app/signup/page.js
// 회원가입
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ③(인증 · 마이)
// 📍 이 파일: src/app/signup/page.js → /signup
// 🔗 협력: — (POST /auth/signup · 이메일·닉네임 중복은 409)
// 🔨 상태: 뼈대(조립만) — 실제 가입 로직은 SignupForm 안에서 구현해 주세요.
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 이메일·닉네임·비밀번호로 가입하는 화면 (요구 2.2).
// 비밀번호 72바이트 규칙(bcrypt 6 의 실제 제한)은 BE에서 검증하니 화면에서는 길이 안내만 해도 됩니다.
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    POST /auth/signup — { email, nickname, password } → { user } + 쿠키
//    ⚠️ 확인용 비밀번호는 화면에서만 비교하고 요청에는 넣지 않아요.
//
// 🧩 배치
//    · 화면 조립: 이 파일 → SignupForm
//    · 상태·검증·API 호출·에러·이동: src/features/auth/components/AuthForm/SignupForm.jsx
//    · 가입 API 함수: src/features/auth/api.js 의 signUp (아직 없음 — 담당자가 추가)
//    · 가입 훅: src/features/auth/hooks/useSignup.js (없으면 생성)
//    · 공용 Input 은 아직 뼈대예요 — Input 담당자가 구현하기 전에는 필드 자리에 TODO 가 보여요.
//
// 🚫 이 파일에 두지 않는 것
//    · useState·useEffect·fetch·에러 처리 — page.js 는 조립만 담당해요.
//    · 공용 Input/Button은 각 담당자, AuthProvider는 ③ 담당이에요.
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② SignupForm 의 TODO 와 Input 자리표가 화면에서 사라졌는지
//    ③ 이메일·닉네임 중복(409) 시 사용자가 읽을 수 있는 안내가 나오는지
//    ④ pnpm lint · pnpm build 통과
import { SignupForm } from '@/features/auth/components/AuthForm';

export const metadata = {
  title: '회원가입',
  description: '이메일과 닉네임으로 독스루에 가입해요.',
};

export default function SignupPage() {
  return <SignupForm />;
}
