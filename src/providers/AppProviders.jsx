// src/providers/AppProviders.jsx — 앱 전역 Provider (React Query + 토스트)
//
// 서버(SSR)에서는 요청마다 새 QueryClient 를 만들고,
// 브라우저에서는 모듈 수준 변수에 하나만 만들어 재사용해요.
//   이유: 서버에서 캐시를 공유하면 A 사용자의 데이터가 B 사용자에게 새어 나갈 수 있어요.
'use client';

import { environmentManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { DEFAULT_STALE_TIME_MS, TOAST_AUTO_CLOSE_MS } from '@/constants/time';
import { AuthProvider } from '@/contexts/AuthProvider';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME_MS,

        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

// 브라우저 전용 싱글턴 — 새로고침 전까지 캐시를 유지해요.
let browserQueryClient;

function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}

export default function AppProviders({ children, initialUser = null, hasSession = false }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider initialUser={initialUser} hasSession={hasSession}>
        {children}
      </AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={TOAST_AUTO_CLOSE_MS}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
      {/* 개발할 때만 켜는 React Query 패널 — 운영 번들에는 렌더되지 않아요 */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
