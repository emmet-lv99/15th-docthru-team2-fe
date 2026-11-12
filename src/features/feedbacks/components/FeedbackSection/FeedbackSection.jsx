'use client';

import FeedbackForm from '@/features/feedbacks/components/FeedbackForm/FeedbackForm';
import FeedbackList from '@/features/feedbacks/components/FeedbackList/FeedbackList.jsx';
import * as styles from '@/features/feedbacks/components/FeedbackSection/FeedbackSection.css';

export default function FeedbackSection({ workId }) {
  return (
    <div className={styles.container}>
      <FeedbackForm workId={workId} />
      <FeedbackList workId={workId} />
    </div>
  );
}
