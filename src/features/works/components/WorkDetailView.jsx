'use client';

import { useAuth } from '@/contexts/AuthProvider';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getWorkDetail } from '../api';
import WorkDetailContent from './WorkDetailContent';
import WorkDetailHeader from './WorkDetailHeader';
import * as styles from './WorkDetailView.css.js';

function WorkDetailView({ initialWork, challengeId, workId }) {
  const { user } = useAuth();

  const { data: work } = useQuery({
    queryKey: queryKeys.works.detail(Number(workId), user?.id),
    queryFn: () => getWorkDetail(challengeId, workId),
    initialData: initialWork,
  });

  const currentWork = work ?? initialWork;

  return (
    <div className={styles.container}>
      {/* 상단 헤더 */}
      <WorkDetailHeader work={currentWork} />
      {/* 작업물 번역 본문 */}
      <WorkDetailContent content={currentWork?.content} />
      {/* 피드백 섹션 */}
      <section className={styles.feedbackSection}></section>
    </div>
  );
}

export default WorkDetailView;
