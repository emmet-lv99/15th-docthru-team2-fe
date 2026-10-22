// src/app/challenges/[challengeId]/works/[workId]/edit/page.js
// 작업물 수정 (작성자 · ADMIN)
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ②(작업물 · 임시저장) — 작업물 수정
// 📍 이 파일: src/app/challenges/[challengeId]/works/[workId]/edit/page.js → /challenges/{challengeId}/works/{workId}/edit
// 🔗 협력: ①(작업물 상세에서 진입) · ⑤(어드민이 남의 작업물을 수정할 때도 이 화면)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 이미 올라온 번역 작업물의 본문을 고치는 화면 (요구 2.7).
//   작업물 상세의 케밥(⋮) → "수정하기" 로 들어와요 (내 작업물이거나, 어드민이 남의 작업물을 고칠 때).
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET /challenges/{challengeId}/works/{workId} — 본문 초기값(비회원도 조회 가능)
//    ② PATCH /works/{workId} — 작업물 수정 `{content}` (작성자 또는 ADMIN · 챌린지 마감 후 409 CHALLENGE_CLOSED)
//
// 🧩 쓸 부품 — 리치 텍스트 에디터(TipTap) · Button
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요)
//
// 🧠 에디터 메모
//    · 작성(도전) 화면과 **같은 에디터**를 재사용해요 — 본문 형식은 TipTap JSON 문자열이라 그대로 넣고 빼면 돼요.
//      참고 구현: 완성본 prisma-8 `src/features/works/editor/`(TiptapEditor · Toolbar).
//    · 제목은 챌린지 이름을 그대로 보여 주고, 본문만 편집하게 해요.
//
// 💡 구현 메모
//    · **권한을 서버에서 먼저 확인**하세요 — 작성자 또는 ADMIN 이 아니면 안내(Warn)만 보여 주고 편집 UI 는 감춥니다.
//    · 어드민이 남의 작업물을 고치는 경우, 삭제와 달리 사유는 받지 않아요(PATCH 는 `{content}` 만 — 계약).
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

export default function WorkEditPage() {
  return (
    <span>
      작업물 수정 (작성자 · ADMIN) — TODO(팀원 ②): 이 파일 상단의 주석 가이드를 따라 구현해 주세요
    </span>
  );
}
