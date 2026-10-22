// src/styles/tokens.js — 디자인 스케일 토큰 (Tier 2)
//
// 색·폰트 같은 "테마성" 값은 theme.css.js(createVar)에, 여기엔 **수치 스케일**만 모아요.
// 근거: 원본 prisma-7 의 tokens.css.ts (space · radius · shadow · zIndex · opacity · transition).
//
// 왜 createVar 를 안 쓰나요? — 이 값들은 테마 전환 대상이 아니라서, 그냥 상수로 두면
//   컴포넌트 style() 안에 바로 쓸 수 있고(불필요한 CSS 변수 생성도 줄어요) 빌드 함정도 피해요.

/** 여백 리듬 — 4px 그리드 */
export const space = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
};

/** 모서리 반경 */
export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '19px',
  '3xl': '30px',
  full: '9999px',
};

/** 그림자 단계 (원본과 동일 값) */
export const shadow = {
  xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
  sm: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
  md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
  xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
};

/** 레이어 순서 — 서로 겹칠 때 이 순서로만 쌓아요 */
export const zIndex = {
  dropdown: 1000,
  modal: 1100,
  toast: 1200,
  tooltip: 1300,
};

/** 투명도 의미값 */
export const opacity = {
  hidden: 0,
  inactive: 0.4,
  disabled: 0.5,
  overlay: 0.4,
};

/** 전환 시간/곡선 */
export const transition = {
  duration: { fast: '0.15s', normal: '0.2s' },
  timing: { ease: 'ease' },
};
