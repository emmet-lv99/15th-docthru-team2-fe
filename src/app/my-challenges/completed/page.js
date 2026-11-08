// src/app/my-challenges/completed/page.js
// 완료한 챌린지
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ③(인증 · 마이)
// 📍 이 파일: src/app/my-challenges/completed/page.js → /my-challenges/completed
// 🔗 협력: ②(완료 후 내 작업물 확인 흐름)
// 🔨 상태: 구현 완료 — 목록은 GET /me/challenges/completed (커서 · D-60)
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 마감되었거나 종료된 챌린지와 내 제출물 목록 (요구 2.8).
//
// 📏 쓸 API
//    GET /me/challenges/completed — 커서 무한스크롤 (D-60)
//
// 🧩 구성
//    탭(나의 챌린지 3종) + 검색 + 카드 목록 — 카드 CTA 는 "내 작업물 보기"
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지

import { AuthGuard } from '@/components/AuthGuard';
import { CompletedList } from '@/features/my-challenges/components/CompletedList/CompletedList';

export default function MeCompletedPage() {
  return (
    <AuthGuard>
      <CompletedList />
    </AuthGuard>
  );
}
