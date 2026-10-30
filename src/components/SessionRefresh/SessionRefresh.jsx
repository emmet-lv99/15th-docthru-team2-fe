'use client';

// ③ 담당 인증 인프라 — 만료된 access 토큰을 새로고침하는 역할입니다.
//
// 강사님 정본은 axios 401 인터셉터가 refresh 를 담당하지만,
// 우리 계약에는 /auth/token/refresh 경로가 없어요.
// → GET /auth/me 를 1회 호출하면 BE 의 전역 authenticate 가 refresh 를 수행합니다.
import { useEffect } from 'react';
import { refreshSession } from '@/lib/client';

export function SessionRefresh() {
  useEffect(() => {
    refreshSession().catch(() => {});
  }, []);

  return null;
}
