'use client';

// ③ 담당 인증 상태 — 강사님 정본(AuthProvider + useAuth(required)) 패턴을 따릅니다.
//
//   · 인증 상태는 React Query 의 GET /auth/me 캐시 하나로 관리해요.
//   · 보호 화면은 feature 컴포넌트에서 useAuth(true) 한 줄로 로그인 여부를 확인합니다.
//   · 로그인/로그아웃 성공 시 router.refresh() 로 서버 컴포넌트(GNB·layout)도 새 쿠키를 읽게 합니다.
import { createContext, useContext, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  deleteMe as deleteMeRequest,
  getMe,
  login as loginRequest,
  logout as logoutRequest,
  signUp as signUpRequest,
  updateMe as updateMeRequest,
} from '@/features/auth/api';
import { queryKeys } from '@/lib/queryKeys';

const AuthContext = createContext({
  user: null,
  isPending: false,
  isLoggingIn: false,
  loginError: null,
  isSigningUp: false,
  signUpError: null,
  isLoggingOut: false,
  logoutError: null,
  isUpdatingMe: false,
  updateMeError: null,
  isDeletingMe: false,
  deleteMeError: null,
  login: async () => {},
  signUp: async () => {},
  logout: async () => {},
  updateMe: async () => {},
  deleteMe: async () => {},
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

  const signUpMutation = useMutation({
    mutationFn: ({ email, nickname, password }) => signUpRequest({ email, nickname, password }),
    onSuccess: (signedUpUser) => {
      queryClient.setQueryData(queryKeys.me.info(), signedUpUser ?? null);
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

  const updateMeMutation = useMutation({
    mutationFn: ({ nickname, password }) => updateMeRequest({ nickname, password }),
    onSuccess: (updatedMe) => {
      queryClient.setQueryData(queryKeys.me.info(), updatedMe ?? null);
      router.refresh();
    },
  });

  const deleteMeMutation = useMutation({
    mutationFn: ({ password, withdrawalConsent }) => deleteMeRequest({ password, withdrawalConsent }),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.me.info(), null);
      queryClient.removeQueries({ queryKey: queryKeys.me.all() });
      router.replace('/');
      router.refresh();
    },
  });

  const value = {
    user,
    isPending: canQuery ? isPending : false,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    isSigningUp: signUpMutation.isPending,
    signUpError: signUpMutation.error,
    isLoggingOut: logoutMutation.isPending,
    logoutError: logoutMutation.error,
    isUpdatingMe: updateMeMutation.isPending,
    updateMeError: updateMeMutation.error,
    isDeletingMe: deleteMeMutation.isPending,
    deleteMeError: deleteMeMutation.error,
    login: loginMutation.mutateAsync,
    signUp: signUpMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    updateMe: updateMeMutation.mutateAsync,
    deleteMe: deleteMeMutation.mutateAsync,
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
