'use client';

// 보호 화면 공용 가드 — 내부에서 강사님 정본의 useAuth(true)를 호출합니다.
//
//   · 로그인하지 않았으면 useAuth 가 /login 으로 보냅니다.
//   · role 을 주면 그 역할이 아닐 때 /challenges 로 보냅니다 (어드민 화면용).
//
// 담당자가 자기 화면(feature 컴포넌트)을 만들면 이 가드를 그 안으로 옮겨 주세요.
// (강사님 정본은 feature 컴포넌트에서 useAuth(true)를 직접 호출합니다)
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';

export function AuthGuard({ role = null, children }) {
  const { user, isPending } = useAuth(true);
  const router = useRouter();

  useEffect(() => {
    if (!role || isPending || !user) return;
    if (user.role !== role) {
      router.replace('/challenges');
    }
  }, [role, isPending, user, router]);

  return children;
}
