'use client';

import { useInfiniteFeedbacks } from '@/features/feedbacks/hooks/useFeedbacks';
import FeedbackItem from '@/features/feedbacks/components/FeedbackItem/FeedbackItem';
import * as styles from '@/features/feedbacks/components/FeedbackList/FeedbackList.css.js';

export default function FeedbackList({ workId }) {
  const {
    data,
    isPending,
    isError,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfiniteFeedbacks(workId);

  const feedbacks = data?.pages.flatMap((page) => page.items ?? []) ?? [];

  // 첫 페이지 로딩
  if (isPending) {
    return <p className={styles.status}>피드백을 불러오는 중이에요.</p>;
  }

  // 첫 페이지 조회 실패
  if (isError && !data) {
    return (
      <div className={styles.statusContainer}>
        <p className={styles.status}>피드백을 불러오지 못했어요.</p>
        <button
          type="button"
          className={styles.retryButton}
          onClick={() => refetch()}
          disabled={isFetching}
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 피드백 없음
  if (feedbacks.length === 0) {
    return <p className={styles.status}>아직 등록된 피드백이 없어요.</p>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {feedbacks.map((feedback) => (
          <FeedbackItem key={feedback.id} feedback={feedback} />
        ))}
      </ul>

      {/* 다음 페이지 조회 실패 */}
      {isFetchNextPageError && <p className={styles.status}>피드백을 더 불러오지 못했어요.</p>}

      {/* 더 보기 버튼 */}
      {hasNextPage && (
        <button
          type="button"
          className={styles.loadMoreButton}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
        </button>
      )}
    </div>
  );
}
