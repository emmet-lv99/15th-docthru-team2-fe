// src/app/my-applications/new/page.js
// 새 챌린지 제안
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ⑤(제안 · 승인)
// 📍 이 파일: src/app/my-applications/new/page.js → /my-applications/new
// 🔗 협력: ⑤(admin 승인 흐름과 한 세트)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 챌린지 개설 신청 양식 (요구 2.5) — 관리자 승인 후 목록에 노출됩니다.
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    POST /challenge-applications — { title, category, documentType, sourceUrl, content, desiredDeadline, maxParticipants } (D-11)
//
// 🧩 쓸 부품 — Input · TextBox · Dropdown · Button 부품 (뼈대)
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 💡 구현 메모
//    · 희망 마감일 · 정원 입력 — 소중히 저장·전송하세요 (desiredDeadline UTC · D-23)
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

export default function NewApplicationPage() {
  return (
    <span>새 챌린지 제안 — TODO(팀원 ⑤): 이 파일 상단의 주석 가이드를 따라 구현해 주세요</span>
  );
}
