import { apiClient } from '@/lib/client';

export const getChallenge = (challengeId) => apiClient.get(`/challenges/${challengeId}`);

export const getMyDraft = (challengeId) => apiClient.get(`/challenges/${challengeId}/drafts/me`);

export const getMyWork = (challengeId) => apiClient.get(`/challenges/${challengeId}/works/me`);

export const saveDraft = (challengeId, content) =>
  apiClient.put(`/challenges/${challengeId}/drafts/me`, { content });

export const submitWork = (challengeId, content) =>
  apiClient.put(`/challenges/${challengeId}/works/me`, { content });

export const abandonChallenge = (challengeId) =>
  apiClient.del(`/challenges/${challengeId}/participation`);

export const getReaderContent = async (sourceUrl) => {
  const res = await fetch(`/api/reader?url=${encodeURIComponent(sourceUrl)}`);
  if (!res.ok) {
    throw new Error('보안 정책 또는 네트워크 문제로 본문을 직접 불러올 수 없습니다.');
  }
  const json = await res.json();
  if (json.error) {
    throw new Error(json.error);
  }
  return json;
};
