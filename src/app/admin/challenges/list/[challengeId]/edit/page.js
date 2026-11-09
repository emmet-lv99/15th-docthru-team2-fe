import { notFound } from 'next/navigation';
import { AuthGuard } from '@/components/AuthGuard';
import { GNB } from '@/components/GNB';
import AdminChallengeEditView from '@/features/admin-challenges/components/AdminChallengeEditView';

export const metadata = {
  title: '관리자 챌린지 수정',
  description: '진행 중인 챌린지의 제목, 원문 링크, 분야, 마감일 및 정원을 수정합니다.',
};

/** 관리자만 수정 컴포넌트를 마운트하므로 권한 없는 API 요청을 방지합니다. */
export default async function AdminChallengeEditPage({ params }) {
  const { challengeId } = await params;
  const id = Number(challengeId);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  return (
    <AuthGuard role="ADMIN">
      {/* 전역 레이아웃은 /edit 화면의 GNB를 숨기므로 해당 관리자 화면에서만 재사용합니다. */}
      <GNB isLoggedIn isAdmin />
      <AdminChallengeEditView challengeId={id} />
    </AuthGuard>
  );
}
