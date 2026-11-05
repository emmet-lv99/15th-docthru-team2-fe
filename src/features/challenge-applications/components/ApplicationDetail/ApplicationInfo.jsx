//제목, 분야, 문서타입, 내용 등 신청 정보

import ApplicationBadge from './ApplicationBadge.jsx';
import * as styles from './ApplicationDetail.css.js';

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
        <span>마감일: {application.desiredDeadline}</span>
        <span>모집 인원: {application.maxParticipants}명</span>
      </div>

      {/* 원문 링크 */}
      <section className={styles.sourceSection}>
        <h2 className={styles.sourceTitle}>원문 링크</h2>

        <div className={styles.sourceContent}>
          {/* 원문 미리보기 이미지가 들어갈 영역 */}
          <div className={styles.previewArea}>
            <span>원문 미리보기</span>
          </div>

          <a
            className={styles.sourceLink}
            href={application.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            링크 열기 ↗
          </a>
        </div>
      </section>
    </section>
  );
}
