// src/app/notifications/page.js
// 알림함
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ④(피드백 · 알림)
// 📍 이 파일: src/app/notifications/page.js → /notifications
// 🔗 협력: GNB 배지(GET /notifications/unread-count) — 발신은 ①③⑤ 도메인
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 내 알림 목록 · 읽음 처리 · 전체 읽음이 있는 화면 (요구 3.2). 새로고침할 때 fetch 하는 방식이라 실시간 소식(websocket) 없이도 가능해요.
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET /notifications — unreadOnly·page·size
//    ② PATCH /notifications/{notificationId}/read · POST /notifications/read-all
//
// 🧩 쓸 부품 — Tabs · Empty 부품 (뼈대)
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 💡 구현 메모
//    · type 은 9종 (B-9 확정) — 문구는 FE 에서 조립 (응답에 content 없음 D-70). 값은 스키마 §3 참고
//    · GNB 배지는 /notifications/unread-count 를 별도로 읽어요 (D-64·D-87)
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

import { AuthGuard } from '@/components/AuthGuard';

export default function NotificationsPage() {
  return (
    <AuthGuard>
      <span>알림함 — TODO(팀원 ④): 이 파일 상단의 주석 가이드를 따라 구현해 주세요</span>
    </AuthGuard>
  );
}
