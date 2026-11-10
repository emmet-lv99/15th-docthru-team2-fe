import * as styles from './ApplicationList.css.js';
import Link from 'next/link';

const statusLabels = {
  PENDING: '승인 대기',
  APPROVED: '신청 승인',
  REJECTED: '신청 거절',
  DELETED: '챌린지 삭제',
};

const statusStyles = {
  PENDING: styles.pendingBadge,
  APPROVED: styles.approvedBadge,
  REJECTED: styles.rejectedBadge,
  DELETED: styles.deletedBadge,
};

// 날자를 YY.MM.DD 형태로 변환
const formatDate = (dateString) => {
  if (!dateString) return '-';

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return '-';

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const getPart = (type) => parts.find((part) => part.type === type)?.value;

  return `${getPart('year')}/${getPart('month')}/${getPart('day')}`;
};

export default function ApplicationTable({ applications, isPending, isError }) {
  if (isPending) {
    return <p className={styles.emptyMessage}>불러오는중...</p>;
  }
  // API 요청 실패
  if (isError) {
    return <p className={styles.emptyMessage}>신청 목록을 불러오지 못했습니다.</p>;
  }

  // 신청 데이터가 없는 경우
  if (applications.length === 0) {
    return <p className={styles.emptyMessage}>아직 챌린지가 없어요.</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.tableHeading}>No.</th>
            <th className={styles.tableHeading}>분야</th>
            <th className={styles.tableHeading}>문서 타입</th>
            <th className={styles.tableHeading}>챌린지 제목</th>
            <th className={styles.tableHeading}>모집 인원</th>
            <th className={styles.tableHeading}>신청일</th>
            <th className={styles.tableHeading}>마감 기한</th>
            <th className={styles.tableHeading}>상태</th>
          </tr>
        </thead>

        <tbody>
          {isPending ? (
            <tr>
              <td colSpan={8} className={styles.tableCell}>
                신청 목록을 불러오는 중...
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={8} className={styles.tableCell}>
                신청 목록을 불러오지 못했습니다.
              </td>
            </tr>
          ) : applications.length === 0 ? (
            <tr>
              <td colSpan={8} className={styles.tableCell}>
                표시할 신청 내역이 없습니다.
              </td>
            </tr>
          ) : (
            applications.map((application) => {
              // 승인된 챌린지가 삭제되었는지 확인
              const isDeleted = Boolean(application.approvedChallenge?.deletedAt);

              // 화면에 표시할 상태 결정
              const displayStatus = isDeleted ? 'DELETED' : application.status;

              return (
                <tr
                  key={application.applicationId}
                  className={isDeleted ? styles.deletedRow : styles.tableRow}
                >
                  <td className={styles.tableCell}>{application.applicationId}</td>
                  <td className={styles.tableCell}>{application.category}</td>
                  <td className={styles.tableCell}>{application.documentType}</td>
                  <td className={`${styles.tableCell} ${styles.challengeTitle}`}>
                    <Link
                      href={`/my-applications/${application.applicationId}`}
                      className={styles.detailLink}
                    >
                      {application.title}
                    </Link>
                  </td>
                  <td className={styles.tableCell}>{application.maxParticipants}</td>
                  <td className={styles.tableCell}>{formatDate(application.createdAt)}</td>
                  <td className={styles.tableCell}>{formatDate(application.desiredDeadline)}</td>
                  <td className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${statusStyles[displayStatus] ?? ''}`}>
                      {statusLabels[displayStatus] ?? displayStatus}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
