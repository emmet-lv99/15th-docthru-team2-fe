// src/app/challenges/[challengeId]/page.js
// 챌린지 상세
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ①(챌린지 생명주기) — 상세
// 📍 이 파일: src/app/challenges/[challengeId]/page.js → /challenges/{challengeId}
// 🔗 협력: ②(도전 → 에디터 · 작업물 이동) · ④(알림으로 들어온 경로)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 설명 · 원문·참여자 현황이 나오는 상세 화면 (요구 2.3·2.4).
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET /challenges/{challengeId} — 상세 (내 참여 여부는 응답에 없어요 — participants 에서 내 id 비교 + !isAbandoned 로 판정 · D-76)
//    ② GET /challenges/{challengeId}/participants — 참여 현황
//    ③ POST·DELETE /challenges/{challengeId}/participation — 도전하기·포기하기
//
// 🧩 쓸 부품 — Tabs · Chip · Empty 부품 (뼈대 — 먼저 구현 필요)
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 💡 구현 메모
//    · 원문(iframe)은 사이트 따른 차단될 수 있어요 — "원문 열기 ↗" 링크를 항상 보여 주면 실망이 없습니다
//    · params 사용 시 Next 16 는 서버 컴포넌트에서 await params 를 권해요
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

import { notFound } from 'next/navigation';
import ChallengeDetailView from '@/features/challenges/components/ChallengeDetailView';
import { getInitialChallengeDetail, getInitialParticipants } from '@/features/challenges/server';
import { buildChallengeDetailMetadata } from '@/features/challenges/metadata';

/**
 * 검색 결과와 공유 링크에는 실제 챌린지의 제목·내용을 사용합니다.
 * 목록·상세 SSR과 같은 공개 API를 재사용하고 인증 담당 영역은 수정하지 않습니다.
 */
export async function generateMetadata({ params }) {
  const { challengeId } = await params;
  const id = Number(challengeId);
  if (!Number.isSafeInteger(id) || id < 1 || id > 2147483647) {
    return { title: '챌린지를 찾을 수 없습니다', robots: { index: false, follow: false } };
  }

  try {
    const result = await getInitialChallengeDetail(id);
    if (result.status === 404) {
      return { title: '챌린지를 찾을 수 없습니다', robots: { index: false, follow: false } };
    }
    if (result.ok && result.data) return buildChallengeDetailMetadata(id, result.data);
  } catch {
    // 일시적인 API 오류로 상세 페이지 전체가 실패하지 않도록 기본 메타데이터를 사용합니다.
  }

  return {
    title: '번역 챌린지',
    description: '독스루에서 개발 문서 번역 챌린지의 내용을 확인하세요.',
  };
}

export default async function ChallengeDetailPage({ params, searchParams }) {
  const { challengeId } = await params;
  const id = Number(challengeId);
  if (!Number.isSafeInteger(id) || id < 1 || id > 2147483647) notFound();

  const search = await searchParams;
  const requestedPage = Number(search?.page);
  const participantPage =
    Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const participantSort = search?.sort === 'submittedAt' ? 'submittedAt' : 'likes';

  let initialChallenge;
  let initialParticipants;
  let detailStatus;
  try {
    const [challengeResult, participantResult] = await Promise.all([
      getInitialChallengeDetail(id),
      getInitialParticipants(id, { page: participantPage, size: 10, sort: participantSort }),
    ]);
    detailStatus = challengeResult.status;
    if (challengeResult.ok) initialChallenge = challengeResult.data;
    if (participantResult.ok) initialParticipants = participantResult.data;
  } catch {
    // 연결 오류는 화면의 React Query 재시도로 넘긴다.
  }
  if (detailStatus === 404) notFound();

  return (
    <ChallengeDetailView
      key={id + ':' + participantPage + ':' + participantSort}
      challengeId={id}
      initialChallenge={initialChallenge}
      initialParticipants={initialParticipants}
      participantPage={participantPage}
      participantSort={participantSort}
    />
  );
}
