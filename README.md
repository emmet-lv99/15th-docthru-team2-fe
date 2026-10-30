# frontend — 독스루 화면 (FE 단독 repo)

> **기본 정보 (1줄)** — 독스루 프론트엔드 단독 repo · Next.js 16 App Router + vanilla-extract · 이 폴더(`docthru-frontend/`)가 **repo 루트**예요.
> 읽는 순서: 이 문서 → `src/app/<내 화면>/page.js` (상단 주석 = 내 지침서).

## 1. 이 repo는 무엇인가요

- 독스루의 **화면(프론트엔드)** 만 담은 repo예요. 서버는 별도 repo(`backend`)에 있어요.
- 화면 개발만 하면 되도록 **공용 부품·실행 설정·디자인 토큰**이 미리 들어 있습니다.
- BE 호출은 `/api/backend/*` 프록시를 거칩니다 — 그래서 BE repo 없이도 화면은 켜집니다(데이터만 비어요).

### 1-1. 기술 스택

| 영역         | 기술                                                              | 버전·메모                                                |
| ------------ | ----------------------------------------------------------------- | -------------------------------------------------------- |
| Runtime      | Node.js · pnpm                                                    | `>=24` · `12.5.1`                                        |
| Framework    | Next.js App Router · React                                        | `16.3` · `19.2`                                          |
| Rendering    | RSC + 동적 SSR + CSR                                              | 현재 SSG 미사용                                          |
| Language     | JavaScript / JSX                                                  | TypeScript 아님                                          |
| Styling      | vanilla-extract · Pretendard                                      | `1.21`                                                   |
| Server State | TanStack Query                                                    | `5.102`                                                  |
| Auth State   | Context API · `useAuth` custom hook                               | ③ 개인 담당 · React Query 파사드                         |
| HTTP         | axios(브라우저) · fetch(RSC)                                      | `/api/backend` 프록시                                    |
| Editor       | TipTap                                                            | `3.32`                                                   |
| UI           | clsx · react-toastify · react-error-boundary                      | —                                                        |
| Quality      | Vitest · axios-mock-adapter · ESLint · Prettier                   | `Vitest 5`                                               |
| Infra        | Docker · GitHub Actions · GCP Cloud Run · Artifact Registry · WIF | **자동 배포** (develop 머지 → main 동기화 → Cloud Build) |

> **렌더링** — RSC는 SSG와 같은 말이 아니에요. RSC는 서버 컴포넌트 모델이고, 실제 HTML 생성 시점은 SSG/SSR/ISR 중 선택합니다. 현재는 인증 `cookies()` 때문에 동적 SSR을 사용하고 SSG는 쓰지 않아요.
>
> **데이터 호출** — 브라우저(Client Component)는 axios, 서버 컴포넌트(RSC)는 fetch를 사용합니다. 인증은 `useAuth()`, 도메인 데이터는 `features/<도메인>/api.js` + React Query 훅으로 연결해요.
>
> **검색·SEO** — 검색·필터는 URL query를 정본으로 두고, 서버에서 `searchParams`를 읽어 초기 결과를 렌더링하는 방식이 목표예요. 현재 목록·상세는 뼈대라 실제 데이터 SSR과 `generateMetadata`는 담당자가 구현합니다.

### 1-2. 현재 구현 상태

| 영역                  | 상태                                                            | 담당    |
| --------------------- | --------------------------------------------------------------- | ------- |
| 화면                  | **22 page** · components **22 dirs**                            | ①~⑤     |
| 인증 FE               | 로그인·가입·로그아웃·내 정보 수정·탈퇴·비밀번호 재설정 **구현** | ③       |
| 테스트                | Vitest **8/8** · build **22 routes**                            | 🔷 공용 |
| 계정 수정(`updateMe`) | **채택** — `/mypage`에서 닉네임·비밀번호 수정                   | ③       |

### 1-3. 문서 정본 순서와 동기화

```text
요구사항 → API-명세 → ERD → Swagger/OpenAPI → page.js·features → README·주석
```

- API 경로·응답이 바뀌면 **API-명세 · ERD · OpenAPI · page 주석 · feature API · test · README**를 한 묶음으로 갱신해요.
- 브라우저는 `src/lib/client.js`(axios), 서버 컴포넌트는 `src/lib/api.js`(fetch)를 사용해요.
- 401 세션 갱신은 **③ 개인 담당**예요. 로그인·가입 화면은 ③ 개인 작업용 정적 뼈대입니다.

## 2. Next.js App Router — 30초 개념

- **폴더 경로가 곧 URL** 이에요 (`src/app/challenges/page.js` → `/challenges`)
- `page.js` 는 **조립만** — 데이터를 잡는 일은 컴포넌트·훅으로 나눠야 화면이 깔끔해요
- 이벤트 핸들러(클릭 등)가 필요한 컴포넌트만 파일 첫 줄에 `'use client'` 를 붙여요

## 3. 폴더 구조 지도 — 담당자까지 한눈에

> **범례** — `①~⑤` 담당 팀원 번호 · `🔷 공용` 공용(보일러플레이트 제공 · 수정은 담당자에게 제안)

```text
docthru-frontend/                                                                       # FE 단독 repo — 이 폴더가 repo 루트        🔷 공용
├── public/                                                                             # 정적 자원                                 🔷 공용
│   └── fonts/                                                                          # Pretendard 서브셋 (FontLoader 가 로드)    🔷 공용
├── src/                                                                                # 화면 코드 전체                            🔷 공용
│   ├── app/                                                                            # 라우트 — 폴더 경로가 곧 URL               🔷 공용
│   │   ├── layout.js                                                                   # 전 화면 공통 껍데기 (GNB·세션·Provider)   🔷 공용
│   │   ├── page.js                                                                     # 랜딩 (로그인 전)                          ①
│   │   ├── login/page.js                                                               # 로그인                                    ③
│   │   ├── signup/page.js                                                              # 회원가입                                  ③
│   │   ├── password-reset/page.js                                                      # 비밀번호 재설정 요청                      ③
│   │   ├── password-reset/confirm/page.js                                              # 새 비밀번호 설정 (메일 토큰)              ③
│   │   ├── mypage/page.js                                                              # 마이페이지 (정보 수정·탈퇴·로그아웃)      ③
│   │   ├── challenges/page.js                                                          # 챌린지 목록 (필터·검색)                   ①
│   │   ├── challenges/[challengeId]/page.js                                            # 챌린지 상세 (도전·포기)                   ①
│   │   ├── challenges/[challengeId]/edit/page.js                                       # 작업 에디터 (제출·임시저장)               ②
│   │   ├── challenges/[challengeId]/works/[workId]/page.js                             # 작업물 상세 + 피드백·하트                 ②
│   │   ├── challenges/[challengeId]/works/[workId]/edit/page.js                        # 작업물 수정 (작성자·ADMIN)                 ②
│   │   ├── my-challenges/participating/page.js                                         # 참여 중인 챌린지                          ③
│   │   ├── my-challenges/completed/page.js                                             # 완료한 챌린지                             ③
│   │   ├── my-applications/page.js                                                     # 내 제안 목록 (상태·취소)                  ⑤
│   │   ├── my-applications/new/page.js                                                 # 새 챌린지 제안 작성                       ⑤
│   │   ├── my-applications/[applicationId]/page.js                                     # 제안 상세 (승인·거절 사유)                ⑤
│   │   ├── notifications/page.js                                                       # 알림함                                    ④
│   │   ├── admin/challenges/page.js                                                    # 관리자 — 신청 승인·거절                   ⑤
│   │   ├── admin/challenges/list/page.js                                               # 관리자 — 챌린지 관리                      ①
│   │   ├── admin/challenges/list/[challengeId]/edit/page.js                            # 관리자 — 챌린지 수정                      ①
│   │   ├── admin/challenges/[applicationId]/page.js                                    # 관리자 — 신청 상세 (승인·거절)            ⑤
│   │   ├── styleguide/page.js                                                          # 부품 진열대 (뼈대 온전성 확인)            🔷 공용
│   │   ├── error.js · loading.js                                                       # 에러·로딩 화면                            🔷 공용
│   │   └── icon.svg                                                                    # 파비콘                                    🔷 공용
│   ├── components/                                                                     # 공용 부품 창고 — 3파일 세트               🔷 공용
│   │   ├── Button/{Button.jsx · Button.css.js · index.js}                              # 구현 — 벤치마크 3파일 표본                🔷 공용
│   │   ├── GNB/{GNB.jsx · GNB.css.js · index.js}                                       # 구현 — 상단 내비게이션                    🔷 공용
│   │   ├── Container/{Container.jsx · Container.css.js · index.js}                     # 구현 — 화면 폭 컨테이너                   🔷 공용
│   │   ├── FontLoader/{FontLoader.jsx · index.js}                                      # 구현 — 폰트 자동 로드                     🔷 공용
│   │   ├── SessionRefresh/{SessionRefresh.jsx · index.js}                              # 개인 작업 — 세션 갱신 (③)                 ③
│   │   ├── layouts/                                                                    # 구현 — app/layout 조립                    🔷 공용
│   │   ├── Loading/{Loading.jsx · Loading.css.js · index.js}                           # 뼈대 — 공용 기본세팅으로 제공             🔷 공용
│   │   ├── QueryBoundary/{QueryBoundary.jsx · QueryBoundary.css.js · index.js}         # 뼈대 — 공용 기본세팅으로 제공             🔷 공용
│   │   ├── Warn/{Warn.jsx · Warn.css.js · index.js}                                    # 뼈대 — 공용 기본세팅으로 제공             🔷 공용
│   │   ├── Card/{Card.jsx · Card.css.js · index.js}                                    # 뼈대 — 카드                               ①
│   │   ├── Chip/{Chip.jsx · Chip.css.js · index.js}                                    # 뼈대 — 태그 칩                            ①
│   │   ├── Search/{Search.jsx · Search.css.js · index.js}                              # 뼈대 — 검색창                             ①
│   │   ├── Sort/{Sort.jsx · Sort.css.js · index.js}                                    # 뼈대 — 정렬 (Dropdown 필요)               ①
│   │   ├── Pagination/{Pagination.jsx · Pagination.css.js · index.js}                  # 뼈대 — 페이지 넘김                        ①
│   │   ├── Filter/{Filter.jsx · FilterDialog.jsx · Filter.css.js · index.js}           # 뼈대 — 필터 (Modal·Checkbox 필요)         ①
│   │   ├── Empty/{Empty.jsx · Empty.css.js · index.js}                                 # 뼈대 — 빈 상태                            ①
│   │   ├── Modal/{Modal.jsx · Modal.css.js · index.js}                                 # 뼈대 — 기본 모달                          ③
│   │   ├── Input/{Input.jsx · TextBox.jsx · Input.css.js · TextBox.css.js · index.js}  # 뼈대 — 입력·소개글 (③·② 공동)             ③·②
│   │   ├── ConfirmDialog/{ConfirmDialog.jsx · ConfirmDialog.css.js · index.js}         # 뼈대 — 확인 대화상자 (Modal·Button 필요)  ③·②
│   │   ├── Checkbox/{Checkbox.jsx · Checkbox.css.js · index.js}                        # 뼈대 — 체크박스 (③·⑤ 공동)                ③·⑤
│   │   ├── Tabs/{Tabs.jsx · Tabs.css.js · index.js}                                    # 뼈대 — 탭 (③·⑤ 공동)                      ③·⑤
│   │   └── Dropdown/{Dropdown.jsx · Dropdown.css.js · index.js}                        # 뼈대 — 드롭다운                           ⑤
│   ├── contexts/                                                                       # 전역 인증 Context (③ 담당)               ③
│   │   └── AuthProvider.jsx                                                            # 개인 작업 — user · login/logout · useAuth ③
│   ├── providers/                                                                      # 앱 전역 Provider 조립                     🔷 공용 배선
│   │   └── AppProviders.jsx                                                            # QueryClient + AuthProvider 중첩           🔷 공용 배선
│   ├── constants/                                                                      # 공용 상수                                🔷 공용
│   │   └── time.js                                                                     # USER_INFO_STALE_TIME_MS                   🔷 공용
│   ├── features/                                                                       # 도메인 계층 — 화면별 api·hooks·components  ①~⑤
│   │   ├── auth/api.js                                                                 # 개인 작업 — getMe · login · logout         ③
│   │   └── <domain>/{api · hooks · components · constants.js}                          # 도메인 코드 (React Query + features 패턴) ①~⑤
│   ├── lib/                                                                            # 백엔드 호출 helper (직접 fetch 금지)      🔷 공용
│   │   ├── api.js                                                                      # 서버 fetch helper — 쿠키 자동 전달        🔷 공용
│   │   ├── client.js                                                                   # axios 공용 + 401 정책 ③ 개인 담당              🔷 공용·③
│   │   ├── client.test.js                                                              # client.js 단위 테스트 (Vitest)            🔷 공용
│   │   └── queryKeys.js                                                                # React Query 키 모음                       🔷 공용
│   └── styles/                                                                         # 전역 스타일 · 디자인 토큰                 🔷 공용
│       ├── global.css.js                                                               # 전역 리셋 · 폰트                          🔷 공용
│       └── theme.css.js                                                                # 디자인 토큰 21종                          🔷 공용
├── next.config.mjs                                                                     # /api/backend/* → BE 프록시 설정           🔷 공용
├── jsconfig.json                                                                       # @/ 경로 별칭 설정                         🔷 공용
├── eslint.config.mjs · .prettierrc                                                     # 코드 규칙 · 포맷 설정                     🔷 공용
├── Dockerfile                                                                          # 배포 이미지                               🔷 공용
└── .env.example                                                                        # 환경변수 예시 (복사해서 .env.local)       🔷 공용
```

### 3-1. 폴더·파일 상세 설명

| 경로                      | 하는 일                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `src/app/`                | 화면 라우트 22개 — 폴더 경로가 그대로 URL                                                   |
| `src/app/layout.js`       | 전 화면 공통 껍데기 — GNB·세션 갱신·폰트·`AppProviders`를 자동 적용                         |
| `src/contexts/`           | ③ 인증 Context — 개인 담당 · `AuthProvider`·`useAuth` 인터페이스                            |
| `src/providers/`          | 앱 전역 Provider 조립 — `QueryClient` + `AuthProvider` 중첩                                 |
| `src/components/`         | **공용** 부품 창고 — 구현 6종 + 뼈대 16종(공용 3종 포함)                                    |
| `src/features/`           | **도메인** 계층 — 화면별 `api · hooks · components · constants.js` (React Query + features) |
| `src/features/auth/`      | ③ 인증 API · `getMe` · `signUp` · `login` · `logout` · `updateMe` · `deleteMe` · 재설정     |
| `src/lib/api.js`          | 서버 fetch helper — 쿠키 전달을 자동으로 해 줘요 (직접 fetch 금지)                          |
| `src/lib/client.js`       | 공용 axios helper — timeout·오류 변환 · **401 세션 갱신은 ③ 개인 담당**                     |
| `src/lib/client.test.js`  | 공용 axios 테스트 — 응답·오류·timeout·네트워크 (Vitest)                                     |
| `src/styles/theme.css.js` | 디자인 토큰 21종 — 색을 hex 로 쓰지 말고 여기 vars 만 사용                                  |
| `next.config.mjs`         | `/api/backend/*` 를 BE 로 넘기는 프록시 설정 (같은 오리진이라 쿠키가 안전)                  |
| `.env.example`            | 환경변수 예시 — 복사해서 `.env.local` 로 (`.env.local` 은 커밋 금지)                        |
| `Dockerfile`              | 배포 이미지 빌드용                                                                          |

### 3-2. 팀원별 담당표 — 화면(어디를) · 공용까지 한눈에

| 담당    | 이름           | 담당 화면 (`src/app/`)                                                                                                                                                                                                                                                                                                                 | 난이도 | 하는 일                                                          | 뼈대 부품                                                                                                                                                                                                                                                                                                                                                                            |
| ------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 팀원 ①  | 영환           | **랜딩**<br>`src/app/page.js`<br>**챌린지 목록**<br>`src/app/challenges/page.js`<br>**챌린지 상세**<br>`src/app/challenges/[challengeId]/page.js`<br>**관리자 챌린지 관리**<br>`src/app/admin/challenges/list/page.js`<br>**관리자 챌린지 수정**<br>`src/app/admin/challenges/list/[challengeId]/edit/page.js`                         | 중상   | 랜딩 구성 · 목록 필터·검색 · 상세 참여 · 관리자 챌린지 관리·수정 | `src/components/Card/`(카드)<br>`src/components/Chip/`(칩)<br>`src/components/Search/`(검색)<br>`src/components/Sort/`(정렬)<br>`src/components/Pagination/`(페이지네이션)<br>`src/components/Filter/`(필터)<br>`src/components/Empty/`(빈 상태)                                                                                                                                     |
| 팀원 ②  | 다찬           | **작업 에디터**<br>`src/app/challenges/[challengeId]/edit/page.js`<br>**작업물 상세**<br>`src/app/challenges/[challengeId]/works/[workId]/page.js`<br>**작업물 수정**<br>`src/app/challenges/[challengeId]/works/[workId]/edit/page.js`                                                                                                | 최상   | 작업물 작성·제출·수정·하트 · 임시저장                            | `src/components/Input/`(입력·TextBox)<br>`src/components/ConfirmDialog/`(확인 대화상자, ③ 공동)<br>에디터(TipTap)                                                                                                                                                                                                                                                                    |
| 팀원 ③  | 순창           | **로그인**<br>`src/app/login/page.js`<br>**회원가입**<br>`src/app/signup/page.js`<br>**마이페이지**<br>`src/app/mypage/page.js`<br>**참여 중인 챌린지**<br>`src/app/my-challenges/participating/page.js`<br>**완료한 챌린지**<br>`src/app/my-challenges/completed/page.js`                                                             | 중상   | 로그인·회원가입·마이페이지 · 내 챌린지 · 인증 인프라             | `src/components/Modal/`(모달)<br>`src/components/Input/`(입력)<br>`src/components/ConfirmDialog/`(확인 대화상자, ② 공동)<br>`src/components/Checkbox/`(체크박스, ⑤ 공동)<br>`src/components/Tabs/`(탭, ⑤ 공동)<br>`src/components/SessionRefresh/`(세션 갱신)<br>`src/contexts/AuthProvider.jsx`(인증 상태)<br>`src/features/auth/api.js`(인증 API)<br>`src/lib/client.js`(401 정책) |
| 팀원 ④  | 륜희           | **알림함**<br>`src/app/notifications/page.js`                                                                                                                                                                                                                                                                                          | 중하   | 알림함 조회·읽음 처리                                            | —                                                                                                                                                                                                                                                                                                                                                                                    |
| 팀원 ⑤  | 경래           | **내 제안 목록**<br>`src/app/my-applications/page.js`<br>**새 챌린지 제안**<br>`src/app/my-applications/new/page.js`<br>**제안 상세**<br>`src/app/my-applications/[applicationId]/page.js`<br>**관리자 신청 관리**<br>`src/app/admin/challenges/page.js`<br>**관리자 신청 상세**<br>`src/app/admin/challenges/[applicationId]/page.js` | 중     | 제안 작성·취소·상세 · 관리자 승인/거절                           | `src/components/Dropdown/`(드롭다운)<br>`src/components/Checkbox/`(체크박스, ③ 공동)<br>`src/components/Tabs/`(탭, ③ 공동)                                                                                                                                                                                                                                                           |
| 🔷 공용 | 보일러플레이트 | **공용 부품 스타일가이드**<br>`src/app/styleguide/page.js`                                                                                                                                                                                                                                                                             | —      | 공용 부품 제공·유지·검증                                         | `src/components/Button/`(버튼)<br>`src/components/GNB/`(상단 내비게이션)<br>`src/components/Container/`(레이아웃 컨테이너)<br>`src/components/FontLoader/`(폰트 로더)<br>`src/components/layouts/`(레이아웃)<br>`src/components/Loading/`(로딩)<br>`src/components/QueryBoundary/`(쿼리 경계)<br>`src/components/Warn/`(경고)                                                        |

- **페이지 합계 22개** — ① 5 · ② 3 · ③ 7 · ④ 1 · ⑤ 5 · 공용 스타일가이드 1.
- `src/app/admin/challenges/`는 부모 폴더를 공유해요 — `list/`는 ①, 루트 `page.js`·`[applicationId]/`는 ⑤예요.
- `src/app/challenges/[challengeId]/works/[workId]/`는 ② 담당이고, 작업물 상세와 수정이 이 안에 있어요.
- `ConfirmDialog`는 ②·③ 공동, `Checkbox`·`Tabs`는 ③·⑤ 공동이에요.
- `src/features/auth/api.js`는 인증 API 개인 작업, `src/lib/client.js`의 401 세션 갱신은 ③ 개인 담당예요.

### 3-3. 공용 컴포넌트 담당표

| 구분           | 부품                                                                                                                                                                                                                                                                                                                   | 담당    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 이미 제공      | `src/components/Button/`(버튼) · `src/components/GNB/`(상단 내비게이션) · `src/components/Container/`(레이아웃 컨테이너) · `src/components/FontLoader/`(폰트 로더) · `src/components/layouts/`(레이아웃) · `src/components/Loading/`(로딩) · `src/components/QueryBoundary/`(쿼리 경계) · `src/components/Warn/`(경고) | 🔷 공용 |
| 구현 뼈대      | `src/components/Card/`(카드) · `src/components/Chip/`(칩) · `src/components/Search/`(검색) · `src/components/Sort/`(정렬) · `src/components/Pagination/`(페이지네이션) · `src/components/Filter/`(필터) · `src/components/Empty/`(빈 상태)                                                                             | ①       |
| 구현 뼈대      | `src/components/Input/`(TextBox) · `src/components/ConfirmDialog/`(확인 대화상자)                                                                                                                                                                                                                                      | ② · ③   |
| 구현 뼈대      | `src/components/Modal/`(모달) · `src/components/Input/`(입력)                                                                                                                                                                                                                                                          | ③       |
| 구현 뼈대      | `src/components/Checkbox/`(체크박스) · `src/components/Tabs/`(탭)                                                                                                                                                                                                                                                      | ③ · ⑤   |
| 구현 뼈대      | `src/components/Dropdown/`(드롭다운)                                                                                                                                                                                                                                                                                   | ⑤       |
| 인증 개인 작업 | `src/components/SessionRefresh/`(세션 갱신)                                                                                                                                                                                                                                                                            | ③       |
| 공용 배선      | `src/providers/AppProviders.jsx`(전역 Provider 조립) · `src/app/layout.js`(앱 레이아웃) · `src/lib/api.js`(서버 API) · `src/app/styleguide/page.js`(공용 부품 스타일가이드)                                                                                                                                            | 🔷 공용 |
| ③ 인증 인프라  | `src/contexts/AuthProvider.jsx`(인증 상태) · `src/features/auth/api.js`(인증 API) · `src/lib/client.js`(401 정책)                                                                                                                                                                                                      | ③       |

> **구분** — **이미 제공** = 보일러플레이트가 구현 완료(팀원 작업 없음) · **구현 뼈대** = 담당자가 구현 · **인증 개인 작업** = ③이 구현(뼈대 기본셋팅 제외). 공용 행은 제공 완료이므로 새로 만들지 않아요.

> ⚠️ **화면 URL ≠ API URL** — 폴더 이름은 읽기 좋게 `my-challenges` · `my-applications` 로 두었지만,
> 서버 경로는 `/me/challenges/*` · `/challenge-applications/me/*` 그대로예요(계약 유지).
> 헷갈리면 각 `page.js` 상단 주석의 "📏 쓸 API" 를 보세요.

> 📌 담당 **정본(SoT)** 은 `docthru-backend/docs/팀 온보딩 — 설명안 §2` 예요 — 이 표가 어긋나면 그 표를 기준으로 함께 갱신해요.

### 3-4. 공용 분류 기준

공용은 **여러 화면이 함께 쓰는 부품**이라는 뜻이에요. “모두가 새로 만드는 것”과는 달라요.

| 분류            | 판단 기준                                                          | 예시                                                                                                                          | 팀원 작업    |
| --------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **제공 완료**   | 여러 화면이 쓰지만 이미 구현됨 · 도메인 로직 없음                  | Button · GNB · Container · FontLoader · layouts · Loading · QueryBoundary · Warn · AppProviders · app/layout · lib/api        | ❌ 없음      |
| **구현 뼈대**   | 여러 화면이 쓰지만 아직 구현 전 · **처음 쓰는 화면 담당자**가 구현 | Card·Chip·Search·Sort·Pagination·Filter·Empty(①), TextBox·ConfirmDialog(②·③), Modal·Input(③), Checkbox·Tabs(③·⑤), Dropdown(⑤) | ✅ 담당자    |
| **공동 소유**   | 두 담당자가 동시에 쓰므로 **한 번만 구현**하고 같이 사용           | TextBox·ConfirmDialog(②·③), Checkbox·Tabs(③·⑤)                                                                                | ✅ 공동      |
| **전역 인증**   | 전 화면에 걸리지만 보안·세션은 **단일 소유**가 안전                | AuthProvider · SessionRefresh · 401 정책                                                                                      | ✅ ③         |
| **도메인 전용** | 한 화면/도메인에서만 사용                                          | `src/features/<도메인>/`                                                                                                      | ✅ 해당 담당 |

**운영 규칙**

1. **제공 완료**는 사용만 하고, 수정은 담당자에게 제안해요.
2. **구현 뼈대**는 그 부품을 처음 쓰는 화면 담당자가 구현해요.
3. **공동 소유**는 한 사람이 core를 만들고, 다른 사람은 연결·검증을 맡아요.
4. **전역 인증**은 ③이 단독 소유해요.
5. **도메인 전용**은 공용으로 올리지 않고 `features/<도메인>/`에 둬요.
6. 같은 공동 부품을 **두 번 구현하지 않아요** — 먼저 만든 쪽을 가져다 써요.

### 3-5. 담당자별 작업 순서 (권장)

> **원칙** — 의존성 먼저 → 자기 화면 vertical slice → 교차 연결 → 검증.
> 아래 순서는 “남는 시간에 하는 일”이 아니라 **막힘을 줄이는 순서**예요.

**① 챌린지**

1. `Card` → `Chip` → `Search` → `Pagination` → `Empty`
2. 랜딩
3. 챌린지 목록
4. 챌린지 상세
5. `Sort` — **⑤ Dropdown 완료 후**
6. `Filter` — **③ Modal·Checkbox 완료 후**
7. 관리자 챌린지 목록·수정 — **③ Modal/Input, ⑤ Dropdown 완료 후**
8. `pnpm lint` · `pnpm test` · `pnpm build`

**② 작업물**

1. `TextBox`·`ConfirmDialog` — **③과 공동**
2. 작업 에디터(TipTap)
3. 작업물 상세
4. 작업물 수정
5. 피드백 UI — **④ Feedback API 완료 후 연결**
6. `pnpm lint` · `pnpm test` · `pnpm build`

**③ 인증·마이**

1. `Modal`
2. `Input`·`TextBox`
3. `Checkbox`·`Tabs`
4. `ConfirmDialog` — **②와 공동**
5. `AuthProvider`·`useAuth`·auth API·401·`SessionRefresh`
6. 로그인
7. 회원가입
8. 마이페이지
9. 내 챌린지 — **① Card 완료 후**
10. Google OAuth — **③ 담당자 구현 범위**
11. `pnpm lint` · `pnpm test` · `pnpm build`

**④ 피드백·알림**

1. **BE repo** — Feedback repository → service → controller
2. **BE repo** — Notification repository → service → controller
3. **BE repo** — `pnpm test:contract`로 피드백·알림 계약 확인
4. **FE repo** — 알림함: **③ Tabs·① Empty 완료 후**
5. **FE repo** — 작업물 상세의 피드백 UI는 **② 화면에 연결 지원**
6. **FE repo** — `pnpm lint` · `pnpm build`

**⑤ 제안·승인**

1. `Dropdown` — **① Sort가 기다림**
2. `Checkbox`·`Tabs` — **③과 공동**
3. 내 제안 목록·작성·상세
4. 관리자 신청 관리·상세
5. 승인·거절 흐름
6. `pnpm lint` · `pnpm test` · `pnpm build`

### 3-6. 의존성 지도

| 먼저 완료                  | 기다리는 작업             |
| -------------------------- | ------------------------- |
| ⑤ `Dropdown`               | ① `Sort`                  |
| ③ `Modal` + ③/⑤ `Checkbox` | ① `Filter`                |
| ③ `Modal` + 제공 `Button`  | ②·③ `ConfirmDialog`       |
| ③ `TextBox`                | ② 에디터                  |
| ③ `AuthProvider`·auth API  | ③ 로그인·가입·마이        |
| ④ Feedback API             | ② 작업물 상세의 피드백 UI |
| ③ `Tabs` + ① `Empty`       | ④ 알림함                  |

**추천 병렬 순서**

1. **③ Modal·Input, ⑤ Dropdown, ① 기본 부품, ④ BE API**를 먼저 시작
2. 공동 부품(`ConfirmDialog`·`TextBox`·`Checkbox`·`Tabs`) 연결
3. 각자 자기 화면을 vertical slice로 완성
4. 교차 화면 연결
5. 계약·build·브라우저 검증

**완료 판정**

- FE: 내 담당 route가 `pnpm build`에 포함되고 `lint`·`test` 통과
- 공용 부품: `styleguide`에서 상태 확인 + 사용 화면 1곳 이상 연결
- 공동 부품: 두 담당 화면에서 모두 동작 확인

## 4. 공용 컴포넌트 — 두 종류가 섞여 있어요

| 상태                    | 이름                                                      | 배지    |
| ----------------------- | --------------------------------------------------------- | ------- |
| ✅ 구현 (바로 쓰면 됨)  | Button · GNB · Container                                  | 🔷 공용 |
| ✅ 구현 (공용 인프라)   | FontLoader · layouts                                      | 🔷 공용 |
| 🔨 개인 작업 (③ 담당)   | SessionRefresh                                            | ③       |
| 🔨 뼈대 (담당자 구현)   | Card · Chip · Search · Sort · Pagination · Filter · Empty | ①       |
| 🔨 뼈대 (담당자 구현)   | Modal · Input(+TextBox) · ConfirmDialog                   | ③ · ②   |
| 🔨 뼈대 (담당자 구현)   | Checkbox · Tabs · Dropdown                                | ③ · ⑤   |
| 🟢 기본세팅 제공 (공용) | Loading · QueryBoundary · Warn                            | 🔷 공용 |

- **뼈대 부품은 파일 자체가 지침서** — 폴더를 열면 근거 PNG · props · 동작 요점 · 만들기 순서가 다 적혀 있어요.
- 만들기 좋은 순서와 추천 담당은 `src/components/README.md` 표를 확인하세요.
- **Button** 은 새 부품을 만들 때 벤치마크할 3파일 패턴 표본이에요.
- **공용 vs 도메인** — 여러 화면이 함께 쓰는 **재사용 부품**은 `src/components/<Name>/` 에,
  화면 하나에서만 쓰는 코드(그 화면의 API 호출 · 훅 · 전용 컴포넌트)는 `src/features/<도메인>/` 에 둡니다.
- **인증 인프라** — `src/contexts/AuthProvider.jsx` · `src/features/auth/api.js` · `SessionRefresh`는 **③ 담당**이에요.
- **공용 배선** — `src/providers/AppProviders.jsx`는 QueryClient와 AuthProvider를 조립하는 공용 배선이에요.
- 인증 인프라를 수정해야 하면 ③ 담당자에게 이유와 함께 제안해 주세요.

```text
src/components/Modal/
├── Modal.jsx        내용
├── Modal.css.js     스타일 (vanilla-extract · 토큰으로 색상 지정)
└── index.js         내보내기
```

## 5. API 호출 규칙

- **서버 컴포넌트/RSC** — `src/lib/api.js` 의 `apiGet` 계열 helper 를 씁니다 (쿠키 자동 전달).
- **브라우저/Client Component** — `src/lib/client.js` 의 `apiClient` 를 씁니다 (axios, `ApiError.status` 포함).
- **도메인 API** — 화면 전용 호출은 `src/features/<도메인>/api.js` 에 모읍니다.
- **직접 `fetch` 금지** — 쿠키 전달이 빠져 로그인 세션이 날아갈 수 있어요.
- **브라우저 호출 안전장치** — 10초 timeout과 오류 변환은 공용으로 제공돼요.
  401 세션 갱신·single-flight 재시도는 **③ 개인 담당**예요 (`src/lib/client.js`).
- **오류 구분** — timeout 은 `ApiError(408, 'TIMEOUT')`, 네트워크 오류는 `ApiError(0, 'NETWORK_ERROR')` 로 와요.
  timeout·네트워크 오류는 POST/PATCH 중복을 막기 위해 자동 재시도하지 않아요.
- 어떤 API 경로를 쓸지는 각 `page.js` 상단 주석에 있어요. 정확한 요청/응답 필드는
  BE repo 를 켠 뒤 `http://localhost:5010/api-docs` (Swagger) 에서 확인해요.

### 5-1. 상태 관리 규칙

- **서버 데이터(도메인)** — React Query가 단일 저장소예요. `features/<도메인>/api.js` + `queryKeys` 로 관리합니다.
- **전역 인증** — `AuthProvider` / `useAuth()`는 **③ 개인 담당 인터페이스**예요. `user`·`isPending`·`login`·`logout`의 실제 구현은 ③이 채웁니다.
- **Context는 파사드** — 인증 결과를 전달하는 얇은 창구예요. 도메인 데이터를 Context에 넣지 않습니다.
- **로그인** — `me` 캐시를 갱신한 뒤 `fetchQuery` 로 전체 정보를 받고 `router.refresh()` 합니다.
- **로그아웃** — `me` 캐시만 `null` 로 비우고 `router.refresh()` 합니다. 도메인 캐시 정책은 추후 합의합니다.

## 6. 페이지 뼈대 사용법

- 각 화면의 `page.js` 는 **자리표**(`<span>...TODO(담당자)...</span>`)를 보여 줘요.
- 파일 상단 주석에 담당 · 화면 설명 · 쓸 API · 쓸 부품 · 완료 판정이 다 있어요.
- 구현을 마치면 자리표를 지우고 내용으로 채우면 됩니다. 라우트는 이미 살아 있어 URL 로도 확인돼요.

## 7. 실행 · 검증 (이 repo 단독)

```bash
pnpm install          # 의존성 설치
pnpm dev              # http://localhost:3000
pnpm test             # Vitest 단위 테스트 (client.js)
pnpm lint             # ESLint
pnpm format:check     # Prettier 서식
pnpm build            # 프로덕션 빌드 확인
```

> BE 를 함께 켜려면 backend repo 를 실행하세요. 주소가 다르면 `.env.local` 에
> `BACKEND_BASE_URL=http://localhost:5010/api/v1` 처럼 지정하면 됩니다.

- CI/CD: PR·push는 `ci.yml`이 검사해요. **자동 배포는 Cloud Build 가 담당**합니다 — `main` 에 머지되면 3~5분 뒤 Cloud Run 에 반영돼요.
  상세(브랜치 규칙·빌드 인자·배포 주소·문제 해결)는 아래 **9. 배포 · 브랜치 규칙** 을 보세요.

## 8. 스타일 팁

- vanilla-extract 파일(`*.css.js`)은 색을 hex 로 직접 쓰지 말고 `src/styles/theme.css.js` 의 vars 토큰만 쓰세요.
  한 곳만 고치면 전 화면에 반영돼요.

## 9. 배포 · 브랜치 규칙

```text
develop 에서 개발 → push → CI 자동 검사 → PR 머지(develop)
        → Sync main (자동) → main → Cloud Build 자동 배포 🚀
```

| 항목        | 값                                                                      |
| ----------- | ----------------------------------------------------------------------- |
| 배포 주소   | `https://docthru-alysvay2yq-du.a.run.app`                               |
| 백엔드 주소 | `https://docthru-be-xwfe2o3yfa-du.a.run.app/api/v1`                     |
| 자동 배포   | Cloud Build + [`cloudbuild.yaml`](./cloudbuild.yaml) (`main` push 감시) |
| 자동 동기화 | GitHub Actions `sync-main.yml` — **develop 머지 시 main 자동 반영**     |
| CI          | GitHub Actions `ci.yml` (PR·push) — 비밀값 0개                          |

> ⚠️ `BACKEND_BASE_URL` · `NEXT_PUBLIC_SITE_URL` 은 **빌드 시점에** 박힙니다.
> 값을 바꾸려면 `cloudbuild.yaml` 의 `substitutions` 을 고치고 **develop 에 머지**하세요 (자동으로 main 에 동기화됩니다).

자세한 절차·문제 해결은 위 **9. 배포 · 브랜치 규칙** 표를 참고해 주세요.

## 10. 관련 문서

- **요구사항 추적표** — [`docs/화면-라우트-API-대조.md`](./docs/화면-라우트-API-대조.md): **라우트 ↔ 요구 ↔ API** 한 표 (미커버·과잉·편차 점검)
- [`docs/FE-요구사항.md`](./docs/FE-요구사항.md) · `docthru-backend/docs/API-명세.md`
