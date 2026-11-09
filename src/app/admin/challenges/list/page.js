import { AuthGuard } from '@/components/AuthGuard';
import AdminChallengeListView from '@/features/admin-challenges/components/AdminChallengeListView';

export const metadata = {
  title: '관리자 챌린지 목록',
  description: '관리자 전용 챌린지 검색, 수정 및 삭제',
};

/** 관리자 신청 관리(/admin/challenges)와 별개인 챌린지 생명주기 관리 화면입니다. */
export default function AdminListPage() {
  return (
    <AuthGuard role="ADMIN">
      <AdminChallengeListView />
    </AuthGuard>
  );
}
