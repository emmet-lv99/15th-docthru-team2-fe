'use client';

import { useAuth } from '@/contexts/AuthProvider';
import { likeWork, unlikeWork } from '@/features/works/api.js';
import { queryKeys } from '@/lib/queryKeys.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as styles from './LikeButton.css.js';

function LikeButton({ workId, initialLiked: isLiked = false, initialCount: count = 0 }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: () => (isLiked ? unlikeWork(workId) : likeWork(workId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.works.detail(Number(workId)) });
    },
    onError: (err) => {
      toast.error(err.message || '좋아요 처리에 실패했습니다.');
    },
  });
  const handleClick = (e) => {
    e.preventDefault();
    if (!user) {
      toast.warning('로그인이 필요한 기능입니다.');
      return;
    }
    toggleLike();
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={styles.button}
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
    >
      <svg
        className={`${styles.heartIcon} ${isLiked ? styles.heartLiked : styles.heartUnliked}`}
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span className={styles.count}>{count.toLocaleString()}</span>
    </button>
  );
}
export default LikeButton;
