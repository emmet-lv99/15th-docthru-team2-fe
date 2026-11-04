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
