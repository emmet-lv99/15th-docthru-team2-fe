'use client';

import ApplicationStatus from './ApplicationStatus';
import ApplicationInfo from './ApplicationInfo';
import * as styles from './ApplicationDetail.css.js';
import Image from 'next/image';
import moreIcon from '@/features/challenge-applications/assets/icon_more.svg';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getApplicationDetail } from '../../api';

export default function ApplicationDetail() {
  const { applicationId } = useParams();

  const {
    data: application,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['application', applicationId],
    queryFn: () => getApplicationDetail(applicationId),
    enabled: Boolean(applicationId),
  });

  if (isPending) {
    return <p>신청 정보를 불러오는 중입니다...</p>;
  }

  if (isError || !application) {
    return <p>신청 정보를 불러오지 못했습니다.</p>;
  }

  return (
    <main className={styles.container}>
      {/* 신청 상태 안내 */}
      <ApplicationStatus status={application.status} />

      {/* 신청 상세 정보 */}
      <div className={styles.detailLayout}>
        <ApplicationInfo application={application} />

        {/* 승인대기 상태에서 관리 버튼 표시 */}
        {application.status === 'PENDING' && (
          <div className={styles.actionGroup}>
            <button type="button" className={styles.settingsButton} aria-label="신청 관리 메뉴">
              <Image src={moreIcon} alt="" width={24} height={24} />
            </button>

            <button className={styles.cancelButton} type="button">
              취소하기
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
