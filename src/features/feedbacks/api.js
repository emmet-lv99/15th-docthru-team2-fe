import { apiClient } from '@/lib/client';

// 피드백 목록 조회
export function getFeedbacks(workId, { cursor, limit = 10 } = {}) {
  return apiClient.get(`/works/${workId}/feedbacks`, {
    params: {
      ...(cursor != null ? { cursor } : {}),
      limit,
    },
  });
}

// 피드백 작성
export function createFeedback(workId, content) {
  return apiClient.post(`/works/${workId}/feedbacks`, {
    content,
  });
}

// 피드백 수정
export function updateFeedback(feedbackId, { content, reason }) {
  return apiClient.patch(`/feedbacks/${feedbackId}`, {
    content,
    ...(reason?.trim() ? { reason: reason.trim() } : {}),
  });
}

// 피드백 삭제
export function deleteFeedback(feedbackId, reason) {
  return apiClient.del(`/feedbacks/${feedbackId}`, {
    data: {
      ...(reason?.trim() ? { reason: reason.trim() } : {}),
    },
  });
}
