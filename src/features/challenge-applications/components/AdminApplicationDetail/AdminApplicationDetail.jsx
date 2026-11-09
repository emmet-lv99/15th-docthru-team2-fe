'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAdminApplicationDetail,
  rejectAdminApplication,
  approveAdminApplication,
} from '../../api';

import ApplicationInfo from '../ApplicationDetail/ApplicationInfo';
import * as styles from '../ApplicationDetail/ApplicationDetail.css.js';
import * as adminStyles from './AdminApplicationDetail.css.js';

import { useState } from 'react';
import AdminRejectModal from './AdminRejectModal';

import ApplicationStatus from '../ApplicationDetail/ApplicationStatus';
import ApplicationDecisionReason from '../ApplicationDetail/ApplicationDecisionReason';
import ApplicationCancelModal from '../ApplicationDetail/ApplicationCancelModal';

export default function AdminApplicationDetail() {
  const { applicationId } = useParams();

  const router = useRouter();
  const queryClient = useQueryClient();

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

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

    onSuccess: () => {
      +queryClient.invalidateQueries({
        queryKey: ['adminApplications'],
      });

      queryClient.invalidateQueries({
        queryKey: ['adminApplication', applicationId],
      });

      setIsRejectModalOpen(false);

      router.push('/admin/challenges');
    },

    onError: (error) => {
      console.error('신청 거절 실패:', error);
      alert('신청 거절에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const { mutate: approveApplication, isPending: isApproving } = useMutation({
    mutationFn: () => approveAdminApplication(applicationId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['adminApplications'],
      });

      await queryClient.invalidateQueries({
        queryKey: ['adminApplication', applicationId],
      });

      setIsApproveModalOpen(false);
      router.push('/admin/challenges');
    },

    onError: (error) => {
      console.error('신청 승인 실패:', error);
      alert('신청 승인에 실패했습니다. 다시 시도해 주세요.');
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

      {/* 승인 완료 상태 안내 */}
      {application.status === 'APPROVED' && <ApplicationStatus status="APPROVED" />}

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

          <button
            type="button"
            className={adminStyles.approveButton}
            onClick={() => {
              console.log('승인 버튼 클릭됨');
              setIsApproveModalOpen(true);
            }}
          >
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

      {isApproveModalOpen && (
        <ApplicationCancelModal
          message="정말 승인하시겠어요?"
          pendingMessage="승인 중..."
          onClose={() => setIsApproveModalOpen(false)}
          onConfirm={() => approveApplication()}
          isPending={isApproving}
        />
      )}
    </main>
  );
}
