# 화면(라우트) ↔ 요구사항 ↔ API 대조표 — 프론트엔드용

> **기본 정보 (1줄)** — 프론트 라우트(22개)가 **어느 요구사항을 담당하고 어떤 API를 부르는지** 화면 중심으로 정리한 표.
> 같은 표를 **API 중심**으로 본 판은 백엔드 repo `docthru-backend/docs/화면-라우트-API-대조.md` 에 있어요 (두 문서는 한 묶음으로 갱신).

- **정본**: `docs/FE-요구사항.md`(무엇을) → `docthru-backend/docs/API-명세.md`(경로) → Swagger `/api-docs`(필드)
- **API 호출 규칙**: 화면에서 직접 `fetch` 금지 — `src/lib/api.js`(서버) · `src/lib/client.js`(브라우저) helper 사용
- **대조 시점**: 2026-10-23

## 라우트 → 요구 → API

| #   | 화면(라우트)                                    | 담당 요구                              | 부르는 API (경로)                                                                                                                                                              |
| --- | ----------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `/`                                             | 2.1 랜딩                               | `GET /auth/me`                                                                                                                                                                 |
| 2   | `/login`                                        | 2.2 로그인 · 3.1 OAuth                 | `POST /auth/login` · `GET /auth/google`(③이 BE OAuth 구현)                                                                                                                     |
| 3   | `/signup`                                       | 2.2 회원가입                           | `POST /auth/signup`                                                                                                                                                            |
| 4   | `/mypage`                                       | 2.2 등급·로그아웃 · 내 정보 수정·탈퇴  | `GET /auth/me` · `PATCH`·`DELETE /auth/me` · `POST /auth/logout`                                                                                                               |
| 5   | `/challenges`                                   | 2.3 목록(검색·필터·페이지)             | `GET /challenges`                                                                                                                                                              |
| 6   | `/challenges/[challengeId]`                     | 2.3 상세·참여현황 · 2.4 도전/포기      | `GET /challenges/{id}` · `GET /challenges/{id}/participants` · `POST`·`DELETE /challenges/{id}/participation`                                                                  |
| 7   | `/challenges/[challengeId]/edit`                | 2.4 에디터·임시저장·제출               | `GET`·`PUT /challenges/{id}/works/me` · `PUT`·`GET`·`DELETE /challenges/{id}/drafts/me`                                                                                        |
| 8   | `/challenges/[challengeId]/works/[workId]`      | 2.7 작업물·피드백·하트 · 2.6 수정/삭제 | `GET /challenges/{id}/works/{workId}` · `GET`·`POST /works/{id}/feedbacks` · `PUT`·`DELETE /works/{id}/like` · `PATCH`·`DELETE /works/{id}` · `PATCH`·`DELETE /feedbacks/{id}` |
| 9   | `/challenges/[challengeId]/works/[workId]/edit` | 2.6 작업물 수정                        | `GET /challenges/{id}/works/{workId}` · `PATCH /works/{workId}`                                                                                                                |
| 10  | `/my-challenges/participating`                  | 2.8 참여 중(무한스크롤)                | `GET /me/challenges/participating`                                                                                                                                             |
| 11  | `/my-challenges/completed`                      | 2.8 완료                               | `GET /me/challenges/completed`                                                                                                                                                 |
| 12  | `/my-applications`                              | 2.8 내 신청 목록                       | `GET /challenge-applications/me`                                                                                                                                               |
| 13  | `/my-applications/new`                          | 2.5 신규 신청                          | `POST /challenge-applications`                                                                                                                                                 |
| 14  | `/my-applications/[applicationId]`              | 2.8 신청 상세·취소                     | `GET`·`DELETE /challenge-applications/me/{applicationId}`                                                                                                                      |
| 15  | `/notifications`                                | 3.2 알림함                             | `GET /notifications` · `PATCH /notifications/{id}/read` · `POST /notifications/read-all`                                                                                       |
| 16  | `/admin/challenges`                             | 2.5 신청 관리(승인/거절)               | `GET /admin/challenge-applications`                                                                                                                                            |
| 17  | `/admin/challenges/[applicationId]`             | 2.5 신청 상세                          | `GET /admin/challenge-applications/{id}` · `…/approve` · `…/reject`                                                                                                            |
| 18  | `/admin/challenges/list`                        | 2.6 챌린지 관리                        | `GET`·`POST /admin/challenges` · `PATCH`·`DELETE /admin/challenges/{id}`                                                                                                       |
| 19  | `/admin/challenges/list/[challengeId]/edit`     | 2.6 챌린지 수정                        | `GET /challenges/{id}` · `PATCH /admin/challenges/{id}`                                                                                                                        |
| 20  | `/styleguide`                                   | (공용) 부품 진열                       | (API 없음)                                                                                                                                                                     |
| 21  | `/password-reset`                               | 2.2 비밀번호 재설정 요청               | `POST /auth/password-reset/request`                                                                                                                                            |
| 22  | `/password-reset/confirm?token=`                | 2.2 새 비밀번호 설정                   | `POST /auth/password-reset/confirm`                                                                                                                                            |

> GNB 알림 드롭다운은 **모든 로그인 화면**에서 `GET /notifications/unread-count` 를 써요 (3.2).

> 신청 목록은 `GET /challenge-applications/me`를 써요. `GET /me/challenges/applications`는 계약 별칭이에요.

## 대조 결론

- **미커버 0건** · **과잉 0건** — 라우트 22개가 요구 2.1~3.4를 모두 담당해요.
- **기록된 편차 1건** — 2.4 임시저장은 **참여당 초안 1개(단일, 서버 D-98)**. 요구의 "목록 선택"과 다르지만 기록된 편차이며 **팀원 의견 환영**.
