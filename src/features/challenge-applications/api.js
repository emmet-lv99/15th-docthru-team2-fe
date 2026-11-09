import { apiClient } from '@/lib/client';

//내 챌린지 신청 목록 조회
export async function getMyApplications({ page = 1, size = 10, q = '', status = 'ALL' } = {}) {
  return apiClient.get('/challenge-applications/me', {
    params: {
      page,
      size,
      ...(q ? { q } : {}),
      ...(status !== 'ALL' ? { status } : {}),
    },
  });
}

//관리자 목록
export const getAdminApplications = ({ page = 1, size = 10, q = '', status, sort }) => {
  return apiClient.get('/admin/challenge-applications', {
    params: {
      page,
      size,
      ...(q && { q }),
      ...(status && status !== 'ALL' && { status }),
      ...(sort && { sort }),
    },
  });
};

//신규 챌린지 신청
export const createApplication = async (data) => {
  const response = await apiClient.post('/challenge-applications', data);

  return response;
};

//신청 상세 조회
export async function getApplicationDetail(applicationId) {
  return apiClient.get(`/challenge-applications/me/${applicationId}`);
}

//신청 취소
export async function cancelApplication(applicationId) {
  return apiClient.del(`/challenge-applications/me/${applicationId}`);
}

// 관리자 신청 상세 조회
export const getAdminApplicationDetail = (applicationId) => {
  return apiClient.get(`/admin/challenge-applications/${applicationId}`);
};

// 관리자 신청 거절
export const rejectAdminApplication = (applicationId, reason) => {
  return apiClient.post(`/admin/challenge-applications/${applicationId}/reject`, { reason });
};
