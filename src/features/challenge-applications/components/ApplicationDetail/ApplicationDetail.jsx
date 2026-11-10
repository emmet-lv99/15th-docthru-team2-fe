'use client';

import ApplicationStatus from './ApplicationStatus';
import ApplicationInfo from './ApplicationInfo';
import * as styles from './ApplicationDetail.css.js';

import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loading } from '@/components/Loading';

import { getApplicationDetail, cancelApplication } from '../../api';

import { useEffect, useRef, useState } from 'react';
import ApplicationCancelModal from './ApplicationCancelModal';
import ApplicationDecisionReason from './ApplicationDecisionReason';

export default function ApplicationDetail() {
  const { applicationId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // 신청 취소 성공 여부 기록
  const isCancelledRef = useRef(false);

  // 신청 상세 조회
  const {
    data: application,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['application', applicationId],
    queryFn: () => getApplicationDetail(applicationId),
    enabled: Boolean(applicationId),
  });

  // 상세 페이지가 닫힌 후 취소된 신청의 캐시 제거
  useEffect(() => {
    const detailQueryKey = ['application', applicationId];

    return () => {
      if (isCancelledRef.current) {
        queryClient.removeQueries({
          queryKey: detailQueryKey,
          exact: true,
        });
      }
    };
  }, [queryClient, applicationId]);

  // 신청 취소
  const { mutate: cancel, isPending: isCancelling } = useMutation({
    mutationFn: () => cancelApplication(applicationId),

    onSuccess: async () => {
      isCancelledRef.current = true;

      await queryClient.invalidateQueries({
        queryKey: ['applications'],
      });

      setIsCancelModalOpen(false);
      router.push('/my-applications');
    },

    onError: (error) => {
      console.error('신청 취소 실패:', error);
      console.error('HTTP 상태 코드:', error.response?.status);
      console.error('서버 응답:', error.response?.data);

      alert('신청 취소에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  if (isPending) {
    return <Loading title="불러오는 중이에요" description="잠시만 기다려 주세요." />;
  }

  if (isError || !application) {
    return <p>신청 정보를 불러오지 못했습니다.</p>;
  }

  // 삭제된 챌린지인지 확인
  const isDeleted = Boolean(application.approvedChallenge?.deletedAt);

  return (
    <main className={styles.container}>
      {/* 신청 상태 안내 */}
      <ApplicationStatus status={isDeleted ? 'DELETED' : application.status} />

      {/* 신청 거절 사유 */}
      {application.status === 'REJECTED' && (
        <>
          <ApplicationDecisionReason
            title="신청 거절 사유"
            reason={application.rejectionReason || '등록 거절 사유가 없습니다.'}
            decidedAt={application.decidedAt}
          />
          <div className={styles.rejectionDivider} />
        </>
      )}

      {/* 삭제된 챌린지의 삭제 사유 */}
      {isDeleted && (
        <>
          <ApplicationDecisionReason
            title="삭제 사유"
            reason={application.approvedChallenge.deleteReason}
            decidedAt={application.approvedChallenge.deletedAt}
            showOperator={false}
          />
          <div className={styles.rejectionDivider} />
        </>
      )}

      {/* 신청 상세 정보 */}
      <div className={styles.detailLayout}>
        <ApplicationInfo application={application} />

        {/* 승인 대기 상태에서 관리 버튼 표시 */}
        {application.status === 'PENDING' && (
          <div className={styles.actionGroup}>
            <button
              className={styles.cancelButton}
              type="button"
              onClick={() => setIsCancelModalOpen(true)}
            >
              취소하기
            </button>
          </div>
        )}
      </div>

      {/* 신청 취소 확인 모달 */}
      {isCancelModalOpen && (
        <ApplicationCancelModal
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={() => cancel()}
          isPending={isCancelling}
        />
      )}
    </main>
  );
}
