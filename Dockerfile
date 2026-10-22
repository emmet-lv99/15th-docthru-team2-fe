# syntax=docker/dockerfile:1
#
# frontend — 프로덕션 이미지
#
# ⚠️ Next.js standalone 출력을 쓴다 (next.config.mjs 의 output: 'standalone').
#    없으면 node_modules 전체가 이미지에 들어가 수백 MB 가 된다.

# ══ 1. 의존성 ═══════════════════════════════════════════════
FROM node:24-slim AS deps
WORKDIR /app

# ⚠️ pnpm 설치 — corepack 대신 tarball 로 직접 설치해요.
#    corepack 은 pnpm 을 받을 때 registry 의 "패키지 메타데이터" 주소를 거치는데,
#    Cloud Build 출구 경로에서 그 주소가 503 이나 30초 타임아웃을 자주 흘려요.
#    tarball 주소(/-/ 경로)는 0.3초대로응이라서 그쪽으로 직접 내려받아요.
#    node:24-slim 에 curl 이 없어서 node 의 fetch 를 씁니다.
ARG PNPM_VERSION=12.5.1
RUN set -eux; \
    node -e "const fs=require('node:fs');const u='https://registry.npmjs.org/@pnpm/exe.linux-x64/-/exe.linux-x64-'+process.env.PNPM_VERSION+'.tgz';const sleep=ms=>new Promise(r=>setTimeout(r,ms));(async()=>{for(let i=1;i<=3;i++){try{const r=await fetch(u);if(!r.ok)throw new Error('HTTP '+r.status);const b=Buffer.from(await r.arrayBuffer());fs.writeFileSync('/tmp/pnpm.tgz',b);console.log('pnpm '+b.byteLength+' bytes downloaded');return;}catch(e){console.error('download failed ('+i+'/3):',e.message);if(i===3)process.exit(1);await sleep(5000);}}})()"; \
    tar -xzf /tmp/pnpm.tgz -C /tmp; \
    install -m 0755 /tmp/package/pnpm /usr/local/bin/pnpm; \
    rm -rf /tmp/pnpm.tgz /tmp/package; \
    pnpm --version

# ⚠️ pnpm-workspace.yaml 도 함께 복사해요 — 그 안의 allowBuilds 가 없으면
#    pnpm 12 가 설치 스크립트를 건너뛰어 ERR_PNPM_IGNORED_BUILDS 로 실패합니다.
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ══ 2. 빌드 ═════════════════════════════════════════════════
FROM node:24-slim AS build
WORKDIR /app

# ⚠️ pnpm 설치 — corepack 대신 tarball 로 직접 설치해요.
#    corepack 은 pnpm 을 받을 때 registry 의 "패키지 메타데이터" 주소를 거치는데,
#    Cloud Build 출구 경로에서 그 주소가 503 이나 30초 타임아웃을 자주 흘려요.
#    tarball 주소(/-/ 경로)는 0.3초대로응이라서 그쪽으로 직접 내려받아요.
#    node:24-slim 에 curl 이 없어서 node 의 fetch 를 씁니다.
ARG PNPM_VERSION=12.5.1
RUN set -eux; \
    node -e "const fs=require('node:fs');const u='https://registry.npmjs.org/@pnpm/exe.linux-x64/-/exe.linux-x64-'+process.env.PNPM_VERSION+'.tgz';const sleep=ms=>new Promise(r=>setTimeout(r,ms));(async()=>{for(let i=1;i<=3;i++){try{const r=await fetch(u);if(!r.ok)throw new Error('HTTP '+r.status);const b=Buffer.from(await r.arrayBuffer());fs.writeFileSync('/tmp/pnpm.tgz',b);console.log('pnpm '+b.byteLength+' bytes downloaded');return;}catch(e){console.error('download failed ('+i+'/3):',e.message);if(i===3)process.exit(1);await sleep(5000);}}})()"; \
    tar -xzf /tmp/pnpm.tgz -C /tmp; \
    install -m 0755 /tmp/package/pnpm /usr/local/bin/pnpm; \
    rm -rf /tmp/pnpm.tgz /tmp/package; \
    pnpm --version

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