// src/app/mypage/page.js
// 마이페이지
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ③(인증 · 마이)
// 📍 이 파일: src/app/mypage/page.js → /mypage
// 🔗 협력: ④(알림 수신) — 로그아웃도 이 화면이에요
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 프로필 + 내 등급 + 로그아웃이 있는 화면이에요.
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET /auth/me — grade · stats 표기
//    ② POST /auth/logout — 쿠키 만료 (인증 불필요 — 계약: auth.schema.js logout 설명)
//
// 🧩 쓸 부품 — Button · Card 부품
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 💡 구현 메모
//    · 등급 진행도는 백엔드가 주는 임계값을 그대로 사용해 주세요 (하드코딩 대신 D-90 임계값)
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
import { AuthGuard } from '@/components/AuthGuard';
import { MyPageContent } from '@/features/auth/components/MyPage';

export default function MyPagePage() {
  return (
    <AuthGuard>
      <MyPageContent />
    </AuthGuard>
  );
}
