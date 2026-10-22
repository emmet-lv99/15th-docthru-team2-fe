// src/styles/breakpoints.js — 반응형 분기점 (vanilla-extract @media 용)
//
// ⚠️ 미디어 쿼리 문자열은 **CSS 변수(var(--x))를 못 써요** — 리터럴 문자열이어야 합니다.
//   그래서 theme 의 createVar 가 아니라 평범한 상수로 둡니다.
//   사용: style({ '@media': { [breakpoint.md]: { ... } } })
export const breakpoint = {
  sm: '(min-width: 480px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  // 작은 화면만 타깃 (sm 미만 = 모바일)
  maxSm: '(max-width: 479px)',
  // 태블릿 이하 (원본 GNB 가 쓰던 767 기준)
  maxMd: '(max-width: 767px)',
};
