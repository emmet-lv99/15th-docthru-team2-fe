# syntax=docker/dockerfile:1
#
# frontend — 프로덕션 이미지
#
# ⚠️ Next.js standalone 출력을 쓴다 (next.config.mjs 의 output: 'standalone').
#    없으면 node_modules 전체가 이미지에 들어가 수백 MB 가 된다.

# ══ 1. 의존성 ═══════════════════════════════════════════════
FROM node:24-slim AS deps
WORKDIR /app

# ⚠️ npm 레지스트리가 가끔 503 / 타임아웃을 흘려서 corepack 이 pnpm 을 못 받는 일이 있어요.
#    그래서 3번까지 재시도해요 (15초 · 30초 대기).
#    한 번 실패했을 때 그대로 두면 빌드 전체가 2분 wasted 되기 때문이에요.
RUN corepack enable \
    && (corepack prepare pnpm@12.5.1 --activate \
        || (echo "corepack 준비 실패 — 15초 뒤 다시 시도" && sleep 15 && corepack prepare pnpm@12.5.1 --activate) \
        || (echo "corepack 준비 실패 — 30초 뒤 다시 시도" && sleep 30 && corepack prepare pnpm@12.5.1 --activate))

# ⚠️ pnpm-workspace.yaml 도 함께 복사해요 — 그 안의 allowBuilds 가 없으면
#    pnpm 12 가 설치 스크립트를 건너뛰어 ERR_PNPM_IGNORED_BUILDS 로 실패합니다.
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ══ 2. 빌드 ═════════════════════════════════════════════════
FROM node:24-slim AS build
WORKDIR /app

# ⚠️ npm 레지스트리가 가끔 503 / 타임아웃을 흘려서 corepack 이 pnpm 을 못 받는 일이 있어요.
#    그래서 3번까지 재시도해요 (15초 · 30초 대기).
#    한 번 실패했을 때 그대로 두면 빌드 전체가 2분 wasted 되기 때문이에요.
RUN corepack enable \
    && (corepack prepare pnpm@12.5.1 --activate \
        || (echo "corepack 준비 실패 — 15초 뒤 다시 시도" && sleep 15 && corepack prepare pnpm@12.5.1 --activate) \
        || (echo "corepack 준비 실패 — 30초 뒤 다시 시도" && sleep 30 && corepack prepare pnpm@12.5.1 --activate))

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY next.config.mjs jsconfig.json ./
COPY . .

# ⚠️ NEXT_PUBLIC_* 는 **빌드 시점에 박힌다**. 실행 시 환경변수를 줘도 늦다.
#    그래서 build-arg 로 받는다.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# ⚠️ BACKEND_BASE_URL 도 **빌드 시점에 박힙니다**.
#    next.config.mjs 의 rewrites(브라우저 → 백엔드 프록시 주소)가
#    빌드 때 정해져서, 실행 시 환경변수를 줘도 rewrite 주소는 안 바뀌어요.
#    그래서 build-arg 로 받아서 여기서 ENV 로 확정해 줍니다.
ARG BACKEND_BASE_URL=http://localhost:5010/api/v1
ENV BACKEND_BASE_URL=$BACKEND_BASE_URL

RUN pnpm install --frozen-lockfile \
    && pnpm build

# ══ 3. 런타임 ════════════════════════════════════════════════
FROM node:24-slim AS runtime
WORKDIR /app

# ⚠️ 서버 컴포넌트(src/lib/api.js)는 **실행 시점**에 주소를 읽어요.
#    빌드 때 받은 값을 이 스테이지로 이어받아 이미지 안에도 남겨 둡니다.
#    그래야 이미지만 배포해도 API 주소가 비어 있지 않아요.
ARG BACKEND_BASE_URL=http://localhost:5010/api/v1
ENV NODE_ENV=production \
    PORT=8080 \
    BACKEND_BASE_URL=$BACKEND_BASE_URL

# standalone 은 .next/standalone 에 필요한 최소 서버만 만든다.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

USER node

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||8080)).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]