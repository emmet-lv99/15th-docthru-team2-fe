'use client';

import ApplicationStatus from './ApplicationStatus';
import ApplicationInfo from './ApplicationInfo';
import * as styles from './ApplicationDetail.css.js';
import Image from 'next/image';
import moreIcon from '@/features/challenge-applications/assets/icon_more.svg';

import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApplicationDetail, cancelApplication } from '../../api';

import { useState } from 'react';
import ApplicationCancelModal from './ApplicationCancelModal';

export default function ApplicationDetail() {
  const { applicationId } = useParams();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const {
    data: application,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['application', applicationId],
    queryFn: () => getApplicationDetail(applicationId),
    enabled: Boolean(applicationId),
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: cancel, isPending: isCancelling } = useMutation({
    mutationFn: () => cancelApplication(applicationId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['applications'] });

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
