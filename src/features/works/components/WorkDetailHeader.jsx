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
  if (Number.isNaN(d.getTime())) return '';
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(d);
  const yy = parts.find((p) => p.type === 'year')?.value ?? '';
  const mm = parts.find((p) => p.type === 'month')?.value ?? '';
  const dd = parts.find((p) => p.type === 'day')?.value ?? '';
  return `${yy}/${mm}/${dd}`;
}

function WorkDetailHeader({ work }) {
  const { user } = useAuth();
  // 권한 체크
  const isAuthor = user?.id === work?.author?.id;
  const isAdmin = user?.role === 'ADMIN';
  const canManage = Boolean(isAuthor || isAdmin);
  const isDeletingAsAdmin = isAdmin && !isAuthor;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const challengeId = work?.challenge?.id;
  const workId = work?.id;

  const handleDeleteConfirm = async () => {
    // 관리자가 타인 작업물 삭제 시 사유 필수 검증
    if (isDeleting) return;

    if (isDeletingAsAdmin && !deleteReason.trim()) {
      toast.warning('관리자 삭제 사유를 입력해 주세요.');
      return;
    }

    try {
      setIsDeleting(true);
      // 관리자 타인 삭제일 때만 reason 전달, 본인 삭제는 reason 생략
      await deleteWork(workId, isDeletingAsAdmin ? deleteReason.trim() : undefined);
      setIsDeleteModalOpen(false);
      toast.success('작업물이 삭제되었습니다.');
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
        title={isDeletingAsAdmin ? '작업물 관리자 강제 삭제' : '작업물 삭제'}
        description={
          isDeletingAsAdmin
            ? '관리자 권한으로 타인의 작업물을 삭제합니다.\n삭제 사유를 반드시 입력해 주세요.'
            : '정말 이 작업물을 삭제하시겠습니까? 삭제된 작업물은 복구할 수 없습니다.'
        }
        confirmLabel={isDeleting ? '삭제 중...' : '삭제'}
        isConfirmDisabled={isDeleting}
        isDanger={true}
        onConfirm={handleDeleteConfirm}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteReason(''); // 닫을 때 사유 초기화
        }}
      >
        {isDeletingAsAdmin && (
          <textarea
            className={styles.reasonInput}
            placeholder="삭제 사유를 입력하세요 (예: 부적절한 게시물, 스팸 등)"
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
            disabled={isDeleting}
            maxLength={200}
          />
        )}
      </ConfirmModal>
    </header>
  );
}

export default WorkDetailHeader;
