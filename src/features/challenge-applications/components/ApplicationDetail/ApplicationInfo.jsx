//제목, 분야, 문서타입, 내용 등 신청 정보

import ApplicationBadge from './ApplicationBadge.jsx';
import * as styles from './ApplicationDetail.css.js';
import Image from 'next/image';
import deadlineIcon from '@/features/challenge-applications/assets/ic_deadline.svg';
import personIcon from '@/features/challenge-applications/assets/ic_person.svg';

//마감일을 한국날짜 형식으로 변환
function formatDeadline(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// 신청한 챌린지의 기본 정보
export default function ApplicationInfo({ application }) {
  return (
    <section className={styles.infoSection}>
      {/* 챌린지 제목 */}
      <h1 className={styles.title}>{application.title}</h1>

      {/* 분야 및 문서 타입 */}
      <div className={styles.badgeGroup}>
        <ApplicationBadge type="category" value={application.category} />
        <ApplicationBadge type="document" value={application.documentType} />
      </div>

      {/* 챌린지 설명 */}
      <p className={styles.description}>{application.content}</p>

      {/* 마감일 및 모집 인원 */}
      <div className={styles.metaInfo}>
        <div className={styles.metaItem}>
          <Image src={deadlineIcon} alt="" width={20} height={20} />
          <span>{formatDeadline(application.desiredDeadline)} 마감</span>
        </div>

        <div className={styles.metaItem}>
          <Image src={personIcon} alt="" width={20} height={20} />
          <span>{application.maxParticipants}명</span>
        </div>
      </div>

      {/* 원문 링크 */}
      <section className={styles.sourceSection}>
        <h2 className={styles.sourceTitle}>원문 링크</h2>

        <div className={styles.sourceContent}>
          <a
            className={styles.sourceLink}
            href={application.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            원문 보러가기 ↗
          </a>
        </div>
      </section>
    </section>
  );
}
