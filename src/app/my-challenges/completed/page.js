// src/app/my-challenges/completed/page.js
// 완료한 챌린지
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ③(인증 · 마이)
// 📍 이 파일: src/app/my-challenges/completed/page.js → /my-challenges/completed
// 🔗 협력: ②(완료 후 내 작업물 확인 흐름)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 마감된 챌린지와 내 제출물 목록 (요구 2.8).
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    GET /me/challenges/completed — 커서 무한스크롤 (D-60)
//
// 🧩 쓸 부품 — Card 부품 · 목록은 커서 방식이라 Pagination(페이지 숫자)이 아니라 "더 보기" 버튼이에요 (D-60)
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 💡 구현 메모
//    · 커서 기반이라 "더 보기" 방을 누르면 세부 쿼리 cursor 가 이어서 붙습니다 (D-60)
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

import { AuthGuard } from '@/components/AuthGuard';

export default function MeCompletedPage() {
  return (
    <AuthGuard>
      <span>완료한 챌린지 — TODO(팀원 ③): 이 파일 상단의 주석 가이드를 따라 구현해 주세요</span>
    </AuthGuard>
  );
}
