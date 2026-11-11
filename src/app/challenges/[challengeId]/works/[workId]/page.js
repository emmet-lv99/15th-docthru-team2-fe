// src/app/challenges/[challengeId]/works/[workId]/page.js
// 작업물 상세 · 피드백
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ②(작업물 · 임시저장) — 작업물 상세(하트)
// 📍 이 파일: src/app/challenges/[challengeId]/works/[workId]/page.js → /challenges/{challengeId}/works/{workId}
// 🔗 협력: ④(피드백 API — 피드백 컴포넌트 경계 협력) · ①(상세 ↔ 작업물 이동)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 작업물 본문 + 피드백 목록·작성 + 하트 화면 (요구 2.7).
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET /challenges/{challengeId}/works/{workId} — 작업물 상세
//    ② GET·POST /works/{workId}/feedbacks — 피드백 (커서 페이징 D-54)
//    ③ PUT·DELETE /works/{workId}/like — 하트 (백엔드가 토글 D-83)
//
// 🧩 쓸 부품 — TextBox · Modal · Button · Empty 부품 (뼈대)
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 💡 구현 메모
//    · 피드백 목록에는 isMine 표현이 없어요 — 작성자 표식을 계속 기억해 두었다가 비교하세요 (D-84)
//    · 마감된 챌린지에도 피드백 작성은 허용돼요 — 수정·삭제만 막히면 되는 규칙 (D-18)
//    · 피드백 수정·삭제는 별도 경로로 해요 — PATCH·DELETE /feedbacks/{feedbackId} (feedbacks 스키마 계약)
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

import WorkDetailView from '@/features/works/components/WorkDetailView';
import { apiGet } from '@/lib/api';
import { notFound } from 'next/navigation';
/**
 * 외부 검색 엔진(SEO) 및 SNS 링크 공유(Open Graph)용 메타데이터 동적 생성
 */
export async function generateMetadata({ params }) {
  const { challengeId, workId } = await params;
  const { ok, data: work } = await apiGet(`/challenges/${challengeId}/works/${workId}`);
  if (!ok || !work) {
    notFound();
  }
  const title = `${work.challenge?.title ?? '번역 작업물'} - ${work.author?.nickname ?? '작성자'} | Docthru`;
  const description = `${work.author?.nickname}님이 작성한 번역 작업물입니다. 독스루에서 전문을 확인해 보세요.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}
/**
 * 작업물 상세 서버 컴포넌트 (비회원 접근 가능)
 */
export default async function WorkDetailPage({ params }) {
  const { challengeId, workId } = await params;
  // 1. 서버에서 작업물 데이터 조회 (SSR)
  const { ok, status, data: work } = await apiGet(`/challenges/${challengeId}/works/${workId}`);
  // 2. 404 상태코드(미존재 작업물)일 때만 notFound 페이지로 분기
  if (status === 404 || (!ok && !work)) {
    notFound();
  }
  // 4. 그 외 서버 에러(500, 503 등)는 Next.js error.js 로 던져 오류 화면 표시
  if (!ok || !work) {
    throw new Error('작업물 상세 정보를 불러오는 중 서버 오류가 발생했습니다.');
  }
  // 4. 클라이언트 인터랙션 컨테이너에 초기 데이터(initialWork) 전달
  return (
    <main>
      <WorkDetailView initialWork={work} challengeId={challengeId} workId={workId} />
    </main>
  );
}
