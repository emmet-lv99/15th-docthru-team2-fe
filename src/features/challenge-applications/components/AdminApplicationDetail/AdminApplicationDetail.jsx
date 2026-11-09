'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getAdminApplicationDetail } from '../../api';

import ApplicationInfo from '../ApplicationDetail/ApplicationInfo';
import * as styles from '../ApplicationDetail/ApplicationDetail.css.js';
import * as adminStyles from './AdminApplicationDetail.css.js';

import { useState } from 'react';
import AdminRejectModal from './AdminRejectModal';

export default function AdminApplicationDetail() {
  const { applicationId } = useParams();

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const {
    data: application,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['adminApplication', applicationId],
    queryFn: () => getAdminApplicationDetail(applicationId),
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
      <p className={adminStyles.number}>No. {application.applicationId}</p>

      <ApplicationInfo application={application} />

      {application.status === 'PENDING' && (
        <div className={adminStyles.actionGroup}>
          <button
            type="button"
            className={adminStyles.rejectButton}
            onClick={() => setIsRejectModalOpen(true)}
          >
            거절하기
          </button>

          <button type="button" className={adminStyles.approveButton}>
            승인하기
          </button>
        </div>
      )}
      {isRejectModalOpen && (
        <AdminRejectModal
          onClose={() => setIsRejectModalOpen(false)}
          onConfirm={(reason) => {
            console.log('거절 사유:', reason);
          }}
        />
      )}
    </main>
  );
}
