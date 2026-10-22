// src/app/admin/challenges/list/page.js
// 관리자 — 챌린지 관리
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ①(챌린지 생명주기) — 관리자 챌린지 관리
// 📍 이 파일: src/app/admin/challenges/list/page.js → /admin/challenges/list
// 🔗 협력: ②(챌린지 삭제 시 작업물 영향 확인)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 관리자 챌린지 목록 + 수정 · 삭제 화면 (요구 2.6).
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET·POST /admin/challenges
//    ② PATCH·DELETE /admin/challenges/{challengeId} — 삭제 { reason } 필수 · soft delete
//
// 🧩 쓸 부품 — Modal · Button 부품
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 💡 구현 메모
//    · 삭제 시 "참가자 알림"(포기자 제외 · D-63)이 발송되어야 하면 같은 트랜잭션으로 묶어야 해요 (D-25)
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

export default function AdminListPage() {
  return (
    <span>
      관리자 — 챌린지 관리 — TODO(팀원 ⑤): 이 파일 상단의 주석 가이드를 따라 구현해 주세요
    </span>
  );
}
