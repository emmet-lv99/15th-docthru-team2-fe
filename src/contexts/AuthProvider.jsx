'use client';

// ③ 담당 인증 상태 — 강사님 정본(AuthProvider + useAuth(required)) 패턴을 따릅니다.
//
//   · 인증 상태는 React Query 의 GET /auth/me 캐시 하나로 관리해요.
//   · 보호 화면은 feature 컴포넌트에서 useAuth(true) 한 줄로 로그인 여부를 확인합니다.
//   · 로그인/로그아웃 성공 시 router.refresh() 로 서버 컴포넌트(GNB·layout)도 새 쿠키를 읽게 합니다.
import { createContext, useContext, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getMe, login as loginRequest, logout as logoutRequest } from '@/features/auth/api';
import { queryKeys } from '@/lib/queryKeys';

const AuthContext = createContext({
  user: null,
  isPending: false,
  isLoggingIn: false,
  loginError: null,
  isLoggingOut: false,
  logoutError: null,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children, initialUser = null, hasSession = false }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 쿠키가 없는 익명 방문자는 /auth/me 를 부르지 않아요 (콘솔 401 방지).
  // 대신 isPending 을 false 로 내려서 useAuth(true) 가 즉시 /login 으로 보낼 수 있게 합니다.
  const canQuery = hasSession || Boolean(initialUser);

  const { data: user = null, isPending } = useQuery({
    queryKey: queryKeys.me.info(),
    queryFn: getMe,
    initialData: initialUser ?? undefined,
    enabled: canQuery,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => loginRequest({ email, password }),
    onSuccess: (loggedInUser) => {
      // 로그인 응답은 user 본문이에요 — 캐시를 즉시 채워 쿼리가 꺼져 있어도 화면이 바뀝니다.
      queryClient.setQueryData(queryKeys.me.info(), loggedInUser ?? null);
      router.refresh();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.me.info(), null);
      queryClient.removeQueries({ queryKey: queryKeys.me.all() });
      router.refresh();
    },
  });

  const value = {
    user,
    isPending: canQuery ? isPending : false,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    isLoggingOut: logoutMutation.isPending,
    logoutError: logoutMutation.error,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(required = false) {
  const context = useContext(AuthContext);
  const router = useRouter();

  // 강사님 정본과 동일 — 로그인/비로그인 판정이 끝난 뒤에만 이동합니다.
  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      router.push('/login');
    }
  }, [context.user, context.isPending, router, required]);

  return context;
}
