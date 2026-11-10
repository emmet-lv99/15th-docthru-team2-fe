'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAdminApplications,
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

  // 이전·다음 이동을 위한 전체 신청 목록 조회 (최신순)
  const { data: navigationApplications = [], isPending: isNavigationPending } = useQuery({
    queryKey: ['adminApplications', 'navigation', 'latest'],
    queryFn: async () => {
      const size = 10;

      const firstPage = await getAdminApplications({
        page: 1,
        size,
        status: 'ALL',
        q: '',
        sort: 'latest',
      });

      const totalPages = firstPage.totalPages ?? 1;

      const remainingPages = await Promise.all(
        Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) =>
          getAdminApplications({
            page: index + 2,
            size,
            status: 'ALL',
            q: '',
            sort: 'latest',
          }),
        ),
      );

      return [firstPage, ...remainingPages].flatMap((page) => page.items ?? []);
    },
    staleTime: 60 * 1000,
  });

  // 현재 신청이 전체 목록에서 몇 번째인지 확인
  const currentIndex = navigationApplications.findIndex(
    (item) => String(item.applicationId) === String(applicationId),
  );

  const previousApplicationId =
    currentIndex > 0 ? navigationApplications[currentIndex - 1].applicationId : null;

  const nextApplicationId =
    currentIndex >= 0 && currentIndex < navigationApplications.length - 1
      ? navigationApplications[currentIndex + 1].applicationId
      : null;

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
      queryClient.invalidateQueries({
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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminApplications'],
      });

      queryClient.invalidateQueries({
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
      <div className={adminStyles.detailHeader}>
        <p className={adminStyles.number}>
          No. <span>{application.applicationId}</span>
        </p>

        <div className={adminStyles.navigation}>
          <button
            type="button"
            className={adminStyles.navigationButton}
            aria-label="이전 신청"
            disabled={isNavigationPending || previousApplicationId == null}
            onClick={() => router.push(`/admin/challenges/${previousApplicationId}`)}
          >
            ‹
          </button>

          <button
            type="button"
            className={adminStyles.navigationButton}
            aria-label="다음 신청"
            disabled={isNavigationPending || nextApplicationId == null}
            onClick={() => router.push(`/admin/challenges/${nextApplicationId}`)}
          >
            ›
          </button>
        </div>
      </div>

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

          <div className={adminStyles.rejectionDivider} />
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
