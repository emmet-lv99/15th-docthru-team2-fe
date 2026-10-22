// src/app/layout.js — 루트 레이아웃
//
// ★ 규칙: page.js 는 **조립만** 담당한다.
//   로직이 필요하면 컴포넌트·훅으로 분리한다. (여기가 그 예시다)
//
import './../styles/global.css.js';
import { cookies } from 'next/headers';
import { GlobalLayout } from '@/components/layouts/GlobalLayout';
import { SessionRefresh } from '@/components/SessionRefresh';
import { FontLoader } from '@/components/FontLoader';
import { quantico } from '@/styles/fonts.js';
import { AppProviders } from '@/providers';
import { apiGet } from '@/lib/api';

// ── metadata ───────────────────────────────────────────────
// ⚠️ metadataBase 가 없으면 OG 이미지·절대 URL 이 http://localhost:3000 으로
//    고정된다. **배포 전에는 환경변수로 지정해 주세요.**
const metadataBase = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(metadataBase),
  title: {
    default: '독스루 (Docthru)',
    template: '%s | 독스루',
  },
  description: '개발 문서를 번역하는 챌린지 플랫폼',
  openGraph: {
    title: '독스루 (Docthru)',
    description: '개발 문서를 번역하는 챌린지 플랫폼',
    locale: 'ko_KR',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

/**
 * 현재 로그인 사용자 — 서버 컴포넌트에서만 부른다.
 *
 * ★ **서버 컴포넌트에서 fetch 하면 브라우저 쿠키가 자동으로 붙지 않는다.**
 *   httpOnly 쿠키는 JS 로 못 읽기 때문에 next/headers 의 cookies() 로
 *   브라우저가 보낸 쿠키 헤더를 그대로 전달해야 한다.
 *   이걸 빠뜨리면 /auth/me 가 401 이 되고, GNB 가 로그인 상태를 못 읽는다.
 *   (src/lib/api.js 의 apiFetch 가 이 처리를 하고 있다)
 */
async function getViewer() {
  const jar = await cookies();
  if (!jar.get('accessToken') && !jar.get('refreshToken')) return null;

  const { ok, data: me } = await apiGet('/auth/me');
  if (!ok || !me) return null;

  return me;
}

export default async function RootLayout({ children }) {
  const jar = await cookies();
  // 쿠키는 httpOnly 라 클라이언트에서 못 읽는다 → 서버에서 존재 여부만 판단해 넘긴다
  const hasSessionCookie = Boolean(jar.get('accessToken') || jar.get('refreshToken'));
  const viewer = await getViewer();

  return (
    <html lang="ko" className={quantico.variable}>
      <head>
        {/*
          Pretendard 폰트 — public/ 으로 빼서 **비차단** 으로 불러온다.

          ⚠️ 번들 import 는 렌더 블리커가 된다 (실측):
             layout.js 에서 CSS 를 import 하면 Next 가 스타일시트로 만들어 첫 페인트를 막는다.
             dynamic-subset 은 @font-face 가 92개라 파싱 비용이 커서
             performance 가 100 → 87 로 떨어졌다. (FCP 0.9s → 2.6s)

          → media="print" 로 시작하면 브라우저가 낮은 우선순위로 처리하고,
            FontLoader(클라이언트)가 mount 후 media 를 'all' 로 올린다.
            폰트가 늦게 도착해도 fallback 글꼴로 먼저 보여준다(FOUT).
        */}
        {/* 매뉴얼 <link> 는 폰트 비차단 로드를 위한 의도된 코드라 린트 규칙을 예외로 둡니다. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/pretendard.css" media="print" />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-css-tags */}
          <link rel="stylesheet" href="/pretendard.css" />
        </noscript>
      </head>
      <body>
        <FontLoader />
        {/* 만료된 access 토큰을 갱신한다. 화면에는 아무것도 그리지 않는다.
            ⚠️ 쿠키가 있을 때만 렌더 — 익명 방문자에게 401 을 찍으면 콘솔 에러가 된다. */}
        {hasSessionCookie && <SessionRefresh />}
        {/* AppProviders 는 React Query 캐시와 토스트를 붙여 주는 클라이언트 Provider 예요.
            서버에서 읽은 viewer 로직은 그대로 두고, 화면 트리만 감싸 줍니다. */}
        <AppProviders initialUser={viewer} hasSession={hasSessionCookie}>
          <GlobalLayout
            isLoggedIn={Boolean(viewer)}
            isAdmin={viewer?.role === 'ADMIN'}
            grade={viewer?.grade ?? null}
          >
            {children}
          </GlobalLayout>
        </AppProviders>
      </body>
    </html>
  );
}
