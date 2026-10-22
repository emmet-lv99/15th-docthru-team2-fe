// src/app/admin/challenges/[applicationId]/page.js
// 관리자 — 신청 상세 (승인·거절)
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ⑤(제안 · 승인) — 신청 상세 · 승인·거절
// 📍 이 파일: src/app/admin/challenges/[applicationId]/page.js → /admin/challenges/{applicationId}
// 🔗 협력: ⑤(목록 /admin/challenges 에서 진입) · ①(승인되면 목록에 등장) · 알림 발송은 BE가 원자적(D-22)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 제안·신청자 상세 + 승인/거절 화면 (요구 2.5). 승인 즉시 챌린지가 생성되고 알림이 발송됩니다.
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET /admin/challenge-applications/{applicationId} — 제안·신청자 상세
//    ② POST .../{applicationId}/approve — deadline?·maxParticipants? (atomic — 생성 + 상태 변경을 한 트랜잭션으로)
//    ③ POST .../{applicationId}/reject — { reason } 필수 (누락 시 400 VALIDATION_ERROR · 코드 통일은 팀 회의 안건)
//
// 🧩 쓸 부품 — Modal · Button 부품
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 💡 구현 메모
//    · 권한 확인은 서버에서 — 어드민 전용이므로 needsRole (D-62)
//    · 승인 시 마감일·최대 인원을 조정할 수 있어요 — 승인 다이얼로그로 값을 고쳐 보내세요
//    · 상단에 현재 페이지 번호(No.)와 이전/다음 글 이동을 두면 목록↔상세 오가기가 편해요
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

export default function AdminApplicationDetailPage() {
  return (
    <span>관리자 — 신청 상세 — TODO(팀원 ⑤): 이 파일 상단의 주석 가이드를 따라 구현해 주세요</span>
  );
}
