// src/app/challenges/[challengeId]/edit/page.js
// 작업 도전 (에디터)
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ②(작업물 · 임시저장) — 에디터
// 📍 이 파일: src/app/challenges/[challengeId]/edit/page.js → /challenges/{challengeId}/edit
// 🔗 협력: ①(도전하기로 유입) — 임시저장은 PUT /challenges/{challengeId}/drafts/me (D-98)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 번역 에디터 + 임시 저장 화면 (요구 2.4). M-09 — 신규 제출 · 수정이 한 곳에서 재사용됩니다.
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET /challenges/{challengeId}/works/me — 내 작업 (없으면 { work: null }, 404 아님 D-19)
//    ①-2 서버 임시저장 3건 (D-98) — PUT·GET·DELETE /challenges/{challengeId}/drafts/me
//        · GET 은 첫 진입 모달에 씀 — { draft: null } 이면 모달 띄우지 않는다 (요구 2.4)
//        · PUT 으로 저장(신규 201 / 덮어쓰기 200) · DELETE 로 버리기(멱등 204)
//    ② PUT /challenges/{challengeId}/works/me — 제출 (첫 번째 201 · 갱신 200)
//
// 🧩 쓸 부품 — Button · ConfirmDialog · Modal (뼈대) · 번역 에디터는 리치 텍스트(TipTap)
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 🧠 에디터 메모 (시안 '작업 도전하기')
//    · 서식 툴바가 있는 **리치 텍스트 에디터**를 씁니다 — `@tiptap/react`·`@tiptap/starter-kit`·`@tiptap/extension-underline` 설치돼 있어요.
//      참고 구현: 완성본 prisma-8 `src/features/works/editor/`(TiptapEditor·Toolbar).
//    · 본문 저장 형식은 **TipTap JSON 문자열**(`JSON.stringify(editor.getJSON())`) — 계약 `content: string` 그대로예요.
//    · 작업물 상세도 같은 에디터를 읽기전용(editable=false)으로 렌더하면 안전해요(dangerouslySetInnerHTML 금지).
//
// 💡 구현 메모
//    · 임시저장은 서버 저장 (D-98 — 2026-10-10 채택, 요구 원문 LocalStorage와의 편차 기록 있음)
//      진입 시 GET drafts/me 로 저장분을 확인하고 있으면 모달로 다시 물어보세요 (요구 2.4의 모달 동작은 그대로)
//      ⚠️ 요구 원문(LocalStorage)과 다른 서버 저장 방식 — 계약은 BE API-명세의 drafts 3건을 따릅니다.
//    · 에디터 등 상호작용이 많다면 그 부분은 use client 컴포넌트로 나눠 주세요
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

import { AuthGuard } from '@/components/AuthGuard';

export default function ChallengeEditPage() {
  return (
    <AuthGuard>
      <span>
        작업 도전 (에디터) — TODO(팀원 ②): 이 파일 상단의 주석 가이드를 따라 구현해 주세요
      </span>
    </AuthGuard>
  );
}
