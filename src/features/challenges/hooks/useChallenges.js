'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import {
  getChallengeDetail,
  getChallengeList,
  getChallengeParticipants,
} from '@/features/challenges/api';

/** 목록 조회 캐시 및 첫 렌더 데이터를 관리합니다. */
export function useChallenges(filters, initialData) {
  return useQuery({
    queryKey: queryKeys.challenges.list(filters),
    queryFn: () => getChallengeList(filters),
    initialData,
    staleTime: 30_000,
  });
}

/** 챌린지 상세 조회 캐시를 관리합니다. */
export function useChallengeDetail(challengeId, initialData) {
  return useQuery({
    queryKey: queryKeys.challenges.detail(challengeId),
    queryFn: () => getChallengeDetail(challengeId),
    initialData,
    enabled: Boolean(challengeId),
    staleTime: 30_000,
  });
}

/** 참여자 조회 캐시를 페이지·정렬 기준과 함께 관리합니다. */
export function useChallengeParticipants(challengeId, filters, initialData) {
  return useQuery({
    queryKey: queryKeys.challenges.participants(challengeId, filters),
    queryFn: () => getChallengeParticipants(challengeId, filters),
    initialData,
    enabled: Boolean(challengeId),
    staleTime: 30_000,
  });
}
