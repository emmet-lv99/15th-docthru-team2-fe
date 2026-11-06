// 승인대기 승인 거절 등 상태표시

import * as styles from './ApplicationDetail.css.js';

//신청 상태에 따라 안내 문구 표시
const statusMessages = {
  PENDING: '승인 대기 중입니다.',
  APPROVED: '신청이 승인되었습니다.',
  REJECTED: '신청이 거절되었습니다.',
  CANCELLED: '취소된 신청입니다.',
  DELETED: '삭제된 챌린지입니다.',
};

// 상태에 따라 배너 색상 변경
const statusStyles = {
  PENDING: styles.statusBanner,
  APPROVED: `${styles.statusBanner} ${styles.approvedBanner}`,
  REJECTED: `${styles.statusBanner} ${styles.rejectedBanner}`,
  CANCELLED: styles.statusBanner,
  DELETED: `${styles.statusBanner} ${styles.deletedBanner}`,
};

export default function ApplicationStatus({ status }) {
  return (
    <div role="status" className={statusStyles[status] ?? styles.statusBanner}>
      {statusMessages[status] ?? '신청 상태를 확인할 수 없습니다.'}
    </div>
  );
}
