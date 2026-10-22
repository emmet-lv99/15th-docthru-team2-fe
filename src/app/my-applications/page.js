// src/app/my-applications/page.js
// 내 제안 목록
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ⑤(제안 · 승인)
// 📍 이 파일: src/app/my-applications/page.js → /my-applications
// 🔗 협력: ③(제안 이력) · ④(승인·거절 알림 수신)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 신청한 챌린지 목록 + 상태(대기·승인·거절)처리 (요구 2.8). 취소는 PENDING 만 가능해요.
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET /challenge-applications/me
//    ② DELETE /challenge-applications/me/{applicationId} — PENDING 취소
//    ③ GET /challenge-applications/me/{applicationId} — 상태·사유
//
// 🧩 쓸 부품 — Card · Modal 부품
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 💡 구현 메모
//    · 승인 상태면 해당 챌린지 상세로 이동하는 링크가 있으면 사용자 편리할게요 (요구 2.8)
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

export default function MeApplicationsPage() {
  return (
    <span>
      내 제안 목록 — TODO(팀원 ⑤ (목록은 팀원 ③ 협력)): 이 파일 상단의 주석 가이드를 따라 구현해
      주세요
    </span>
  );
}
