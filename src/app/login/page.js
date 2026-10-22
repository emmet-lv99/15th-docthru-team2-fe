// src/app/login/page.js
// 로그인
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ③(인증 · 마이)
// 📍 이 파일: src/app/login/page.js → /login
// 🔗 협력: GNB(공용 부품 — 세션 쿠키가 생기면 배지·프로필이 살아나요. 손대지 않아요)
// 🔨 상태: 뼈대(조립만) — 실제 로그인 로직은 LoginForm 안에서 구현해 주세요.
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 이메일·비밀번호로 로그인하는 화면 (요구 2.2).
// 성공하면 httpOnly 쿠키가 셋팅되고 챌린지 목록으로 이동해요.
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    POST /auth/login — { email, password } → { user } + 쿠키 (D-06)
//
// 🧩 배치
//    · 화면 조립: 이 파일 → LoginForm
//    · 상태·검증·API 호출·에러·이동: src/features/auth/components/AuthForm/LoginForm.jsx
//    · 로그인 요청: src/contexts/AuthProvider.jsx 의 useAuth().login — ③ 구현 후
//    · 공용 Input 은 아직 뼈대예요 — Input 담당자가 구현하기 전에는 필드 자리에 TODO 가 보여요.
//
// 🚫 이 파일에 두지 않는 것
//    · useState·useEffect·fetch·에러 처리 — page.js 는 조립만 담당해요.
//    · 공용 Input/Button은 각 담당자, AuthProvider는 ③ 담당이에요.
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② LoginForm 의 TODO 와 Input 자리표가 화면에서 사라졌는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//    ④ pnpm lint · pnpm build 통과
import { LoginForm } from '@/features/auth/components/AuthForm';

export const metadata = {
  title: '로그인',
  description: '이메일과 비밀번호로 독스루에 로그인해요.',
};

export default function LoginPage() {
  return <LoginForm />;
}
