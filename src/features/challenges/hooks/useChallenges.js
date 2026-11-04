'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { getChallengeDetail, getChallengeList, getChallengeParticipants } from '../api.js';

export function useChallenges(filters, initialData) {
  return useQuery({
    queryKey: queryKeys.challenges.list(filters),
    queryFn: () => getChallengeList(filters),
    initialData,
    staleTime: 30_000,
  });
}

export function useChallengeDetail(challengeId, initialData) {
  return useQuery({
    queryKey: queryKeys.challenges.detail(challengeId),
    queryFn: () => getChallengeDetail(challengeId),
    initialData,
    enabled: Boolean(challengeId),
    staleTime: 30_000,
  });
}

export function useChallengeParticipants(challengeId, filters, initialData) {
  return useQuery({
    queryKey: queryKeys.challenges.participants(challengeId, filters),
    queryFn: () => getChallengeParticipants(challengeId, filters),
    initialData,
    enabled: Boolean(challengeId),
    staleTime: 30_000,
  });
}
