// next.config.mjs — vanilla-extract + Turbopack (Next 16)
//
// 강사님 정본: react-query-completed / nextjs-app-router-completed 설정과 동일
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'auto' },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,

  // Docker 이미지 크기를 줄이기 위해 필요 (Dockerfile 에서 사용)
  output: 'standalone',

  // ── 백엔드 프록시 ────────────────────────────────────────
  // 브라우저가 백엔드 주소(http://localhost:5010)를 직접 호출하면 안 되는 이유 두 가지:
  //   ① 쿠키가 백엔드 오리진에 저장된다 → 서버 컴포넌트의 cookies() 로 못 읽는다
  //   ② CORS 와 credentials 를 양쪽 다 맞춰야 한다
  //
  // rewrite 로 **같은 오리진**(`/api/backend/*`)에서 넘기면 둘 다 해결된다.
  //
  // ★ 강사님 정본 근거 (중요 — 여기는 방향을 바꾸지 않는 편이 좋아요)
  //   nextjs-user-auth-completed/client/next.config.mjs 에서 동일하게 rewrite 를 쓴다:
  //     rewrites: [{ source: '/api/:path*', destination: 'http://localhost:3001/api/:path*' }]
  //   그리고 axios 인스턴스의 baseURL 이 'http://localhost:3000/api' (= 자기 오리진) 다.
  //
  //   → "프론트에서 axios + withCredentials 로 크로스 오리진 호출"이 아니라
  //     "같은 오리진 프록시"가 강사님 정본의 방식이다. 우리도 그걸 따른다.
  //
  //   경로만 `/api/backend/*` 인 이유: Next.js 자체 예약 경로(`/api` 등)와 겹치지 않으려고.
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.BACKEND_BASE_URL ?? 'http://localhost:5010/api/v1'}/:path*`,
      },
    ];
  },
};

export default withVanillaExtract(nextConfig);
