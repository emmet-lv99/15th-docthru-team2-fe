import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/navigation.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteWork } from '../api.js';
import ConfirmModal from './ConfirmModal.jsx';
import LikeButton from './LikeButton.jsx';
import * as styles from './WorkDetailHeader.css.js';
import WorkManageMenu from './WorkManageMenu';

// 카테고리 & 문서 타입 한글/영문 매핑
const CATEGORY_MAP = {
  NEXT_JS: 'Next.js',
  MODERN_JS: 'Modern JS',
  API: 'API',
  WEB: 'Web',
  CAREER: 'Career',
};
const DOC_TYPE_MAP = {
  OFFICIAL: '공식문서',
  BLOG: '블로그',
  BOOK: '도서',
  OTHER: '기타',
};

// 날짜 포맷 (YY/MM/DD)
function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}/${mm}/${dd}`;
}

function WorkDetailHeader({ work }) {
  const { user } = useAuth();
  // 권한 체크
  const isAuthor = user?.id === work?.author?.id;
  const isAdmin = user?.role === 'ADMIN';
  const canManage = Boolean(isAuthor || isAdmin);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const challengeId = work?.challenge?.id;
  const workId = work?.id;

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await deleteWork(workId);
      setIsDeleteModalOpen(false);
      // 삭제 후 해당 챌린지 상세 페이지로 이동
      router.push(`/challenges/${challengeId}`);
    } catch (error) {
      toast.error(error.message || '작업물 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <header className={styles.container}>
      {/* 챌린지 제목 & 우측 케밥 버튼 */}
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{work?.challenge?.title}</h1>
        {canManage && (
          <WorkManageMenu
            challengeId={challengeId}
            workId={workId}
            onDeleteClick={() => setIsDeleteModalOpen(true)}
          />
        )}
      </div>
      {/* 카테고리 칩 & 문서서 타입 칩 */}
      <div className={styles.chipRow}>
        {work?.challenge?.category && (
          <span className={styles.categoryChip}>
            {CATEGORY_MAP[work.challenge.category] || work.challenge.category}
          </span>
        )}
        {work?.challenge?.documentType && (
          <span className={styles.docTypeChip}>
            {DOC_TYPE_MAP[work.challenge.documentType] || work.challenge.documentType}
          </span>
        )}
      </div>
      {/* 작성자 프로필, 좋아요, 제출 날짜 */}
      <div className={styles.metaRow}>
        <div className={styles.authorGroup}>
          <div className={styles.authorInfo}>
            <div className={styles.avatar}>{work?.author?.nickname?.[0] ?? 'D'}</div>
            <span className={styles.nickname}>{work?.author?.nickname}</span>
          </div>
          {/* 좋아요 버튼 */}
          <LikeButton
            workId={workId}
            initialLiked={work?.likedByMe}
            initialCount={work?.likeCount}
          />
        </div>
        {/* 제출 날짜 */}
        <span className={styles.date}>{formatDate(work?.submittedAt)}</span>
      </div>
      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="작업물 삭제"
        description="정말 이 작업물을 삭제하시겠습니까? 삭제된 작업물은 복구할 수 없습니다."
        confirmLabel={isDeleting ? '삭제 중...' : '삭제'}
        isDanger={true}
        onConfirm={handleDeleteConfirm}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </header>
  );
}

export default WorkDetailHeader;
