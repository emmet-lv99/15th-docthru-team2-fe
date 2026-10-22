'use client';

import { createContext, useContext } from 'react';

// ③ 담당 인증 인프라 — 실제 구현은 담당자가 이 파일의 TODO를 채웁니다.
//   · 서버 데이터: GET /auth/me
//   · 로그인·로그아웃: POST /auth/login · POST /auth/logout
//   · 보호 라우트: useAuth(true)에서 /login 이동
//   · SSR 시드: initialUser·hasSession
const AuthContext = createContext({
  user: null,
  isPending: false,
  error: null,
  isLoggingIn: false,
  loginError: null,
  isLoggingOut: false,
  logoutError: null,
  login: async () => {
    throw new Error('TODO(③): login을 구현해 주세요.');
  },
  logout: async () => {
    throw new Error('TODO(③): logout을 구현해 주세요.');
  },
});

export function AuthProvider({ children, initialUser = null }) {
  // TODO(③): useQuery(getMe) · useMutation(login/logout) · initialData/enabled · router.refresh
  // TODO(③): hasSession prop을 받아 익명 401 요청을 막아 주세요.
  const value = {
    user: initialUser,
    isPending: false,
    error: null,
    isLoggingIn: false,
    loginError: null,
    isLoggingOut: false,
    logoutError: null,
    login: async () => {
      throw new Error('TODO(③): login을 구현해 주세요.');
    },
    logout: async () => {
      throw new Error('TODO(③): logout을 구현해 주세요.');
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(required = false) {
  const context = useContext(AuthContext);

  // TODO(③): required && !isPending && !user 이면 router.replace('/login')
  if (required) {
    // 보호 라우트 이동은 담당자가 구현합니다.
  }

  return context;
}
