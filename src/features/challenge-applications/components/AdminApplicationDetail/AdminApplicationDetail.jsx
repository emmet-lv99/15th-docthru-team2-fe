'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAdminApplicationDetail, rejectAdminApplication } from '../../api';

import ApplicationInfo from '../ApplicationDetail/ApplicationInfo';
import * as styles from '../ApplicationDetail/ApplicationDetail.css.js';
import * as adminStyles from './AdminApplicationDetail.css.js';

import { useState } from 'react';
import AdminRejectModal from './AdminRejectModal';

import ApplicationStatus from '../ApplicationDetail/ApplicationStatus';
import ApplicationDecisionReason from '../ApplicationDetail/ApplicationDecisionReason';

export default function AdminApplicationDetail() {
  const { applicationId } = useParams();

  const router = useRouter();
  const queryClient = useQueryClient();

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

  const { mutate: rejectApplication, isPending: isRejecting } = useMutation({
    mutationFn: (reason) => rejectAdminApplication(applicationId, reason),

    onSuccess: async () => {
      // 관리자 신청 목록 캐시 갱신
      await queryClient.invalidateQueries({
        queryKey: ['adminApplications'],
      });

      // 현재 상세 정보 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: ['adminApplication', applicationId],
      });

      // 모달 닫기
      setIsRejectModalOpen(false);

      // 관리자 목록으로 이동
      router.push('/admin/challenges');
    },

    onError: (error) => {
      console.error('신청 거절 실패:', error);
      alert('신청 거절에 실패했습니다. 다시 시도해 주세요.');
    },
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

      {/* 거절된 신청 상태 안내 */}
      {application.status === 'REJECTED' && (
        <>
          <ApplicationStatus status="REJECTED" />

          <ApplicationDecisionReason
            title="신청 거절 사유"
            reason={application.rejectionReason || '등록 거절 사유가 없습니다.'}
            decidedAt={application.decidedAt}
            showOperator={false}
          />

          <div className={styles.rejectionDivider} />
        </>
      )}

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
          onConfirm={(reason) => rejectApplication(reason)}
          isPending={isRejecting}
        />
      )}
    </main>
  );
}
