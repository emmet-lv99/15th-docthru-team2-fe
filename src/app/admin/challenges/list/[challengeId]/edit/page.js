// src/app/admin/challenges/list/[challengeId]/edit/page.js
// 관리자 — 챌린지 수정
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ①(챌린지 생명주기) — 관리자 챌린지 수정
// 📍 이 파일: src/app/admin/challenges/list/[challengeId]/edit/page.js → /admin/challenges/list/{challengeId}/edit
// 🔗 협력: ①(챌린지 상세와 폼 필드가 같아요) · ⑤(my-applications/new 신청 폼과도 필드가 같아요)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 관리자가 이미 개설된 챌린지 정보를 수정하는 폼 화면 (요구 2.6).
//   챌린지 관리 목록(admin/challenges/list) 카드의 케밥(⋮) → "수정하기" 로 들어와요.
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET /challenges/{challengeId} — 폼 초기값(제목 · 원문링크 · 분야 · 문서타입 · 마감일 · 최대인원 · 내용)
//    ② PATCH /admin/challenges/{challengeId} — 진행 중인 챌린지 수정 (ADMIN)
//
// 🧩 쓸 부품 — Input · TextBox · Dropdown · Button (뼈대)
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 💡 구현 메모
//    · 필드 구성이 신청 폼(my-applications/new)과 같아요 — 검증 규칙을 공유하면 중복을 줄일 수 있어요.
//    · 분야(category) · 문서타입(documentType)은 드롭다운이고, 마감일은 달력 입력이에요.
//    · 수정 후에는 목록 캐시를 무효화해 카드가 곧바로 갱신되게 해 주세요.
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

import { AuthGuard } from '@/components/AuthGuard';

export default function AdminChallengeEditPage() {
  return (
    <AuthGuard role="ADMIN">
      <span>
        관리자 — 챌린지 수정 — TODO(팀원 ①): 이 파일 상단의 주석 가이드를 따라 구현해 주세요
      </span>
    </AuthGuard>
  );
}
