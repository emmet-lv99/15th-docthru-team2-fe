# syntax=docker/dockerfile:1
#
# frontend — 프로덕션 이미지
#
# ⚠️ Next.js standalone 출력을 쓴다 (next.config.mjs 의 output: 'standalone').
#    없으면 node_modules 전체가 이미지에 들어가 수백 MB 가 된다.

# ══ 1. 의존성 ═══════════════════════════════════════════════
FROM node:24-slim AS deps
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@12.5.1 --activate

# ⚠️ pnpm-workspace.yaml 도 함께 복사해요 — 그 안의 allowBuilds 가 없으면
#    pnpm 12 가 설치 스크립트를 건너뛰어 ERR_PNPM_IGNORED_BUILDS 로 실패합니다.
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ══ 2. 빌드 ═════════════════════════════════════════════════
FROM node:24-slim AS build
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@12.5.1 --activate

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY next.config.mjs jsconfig.json ./
COPY . .

# ⚠️ NEXT_PUBLIC_* 는 **빌드 시점에 박힌다**. 실행 시 환경변수를 줘도 늦다.
#    그래서 build-arg 로 받는다.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile \
    && pnpm build

# ══ 3. 런타임 ════════════════════════════════════════════════
FROM node:24-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    PORT=8080

# standalone 은 .next/standalone 에 필요한 최소 서버만 만든다.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

USER node

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||8080)).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]