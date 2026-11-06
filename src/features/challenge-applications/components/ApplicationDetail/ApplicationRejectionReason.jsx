//승인거절화면
import * as styles from './ApplicationDetail.css.js';

// 거절 결정 시간 형식 변환
function formatDecidedAt(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const getPart = (type) => parts.find((part) => part.type === type)?.value;

  return `${getPart('year')}/${getPart('month')}/${getPart('day')} ${getPart('hour')}:${getPart('minute')}`;
}

export default function ApplicationRejectionReason({ application }) {
  return (
    <section className={styles.rejectionBox}>
      <h2 className={styles.rejectionTitle}>신청 거절 사유 </h2>
      <p className={styles.rejectionText}>
        {application.rejectionReason || '등록 거절 사유가 없습니다.'}
      </p>
      <div className={styles.rejectionMeta}>
        <span>독스루 운영진 |</span>
        {application.decidedAt && (
          <time dateTime={application.decidedAt}>{formatDecidedAt(application.decidedAt)}</time>
        )}
      </div>
    </section>
  );
}
