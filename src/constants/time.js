// src/constants/time.js — 화면 전반에서 쓰는 시간 상수
//
// 값을 한 곳에 모아 두면, 나중에 "얼마 동안 최신으로 볼지" 정책을 바꿀 때
// 여기만 고치면 돼서 편해요. (여기저기 숫자를 흩어 두면 한 곳을 빠뜨리기 쉬워요)

const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;

// 토스트(알림 말풍선)가 저절로 사라지기까지의 시간이에요.
export const TOAST_AUTO_CLOSE_MS = 2 * SECOND_MS;

// 따로 정하지 않은 조회는 1분 동안 "최신"이라고 가정해요.
// 너무 짧으면 요청이 잦아지고, 너무 길면 갱신이 느려서 1분을 기본값으로 둡니다.
export const DEFAULT_STALE_TIME_MS = MINUTE_MS;

// 내 정보(/auth/me)처럼 잘 바뀌지 않는 값은 1시간 동안 최신으로 봐요.
export const USER_INFO_STALE_TIME_MS = HOUR_MS;
