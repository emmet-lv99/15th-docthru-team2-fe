'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import {
  getChallengeDetail,
  getChallengeList,
  getChallengeParticipants,
  getMyChallengeParticipation,
  getTopLikedWorks,
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

/** 현재 로그인 사용자의 참여 여부는 페이지네이션과 무관하게 확인합니다. */
export function useMyChallengeParticipation(challengeId, enabled) {
  return useQuery({
    queryKey: queryKeys.challenges.participation(challengeId),
    queryFn: () => getMyChallengeParticipation(challengeId),
    enabled: Boolean(enabled && challengeId),
    retry: false,
  });
}

/** 마감 챌린지의 공동 최다 추천 작업물을 페이지 경계까지 조회합니다. */
export function useTopLikedWorks(challengeId, enabled) {
  return useQuery({
    queryKey: [...queryKeys.challenges.detail(challengeId), 'topLikedWorks'],
    queryFn: () => getTopLikedWorks(challengeId),
    enabled: Boolean(enabled && challengeId),
    staleTime: 30_000,
  });
}
