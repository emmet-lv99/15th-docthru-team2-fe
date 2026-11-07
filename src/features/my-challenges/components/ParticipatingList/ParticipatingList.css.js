// src/features/my-challenges/components/ParticipatingList/ParticipatingList.css.js
//
// 목록 배치 — 카드 사이 간격과 페이지 폭만 담당해요.
import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const page = style({
  width: '100%',
  maxWidth: '960px',
  margin: '0 auto',
  padding: '48px 20px 80px',
  boxSizing: 'border-box',
});

export const heading = style({
  margin: '0 0 24px',
  fontSize: 'var(--font-size-24)',
  fontWeight: '700',
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

/** 검색 입력 — 돋보기 + placeholder (강사님 완성본 Search 부품 톤) */
export const searchWrap = style({
  position: 'relative',
  marginBottom: '20px',
});

export const searchIcon = style({
  position: 'absolute',
  top: '50%',
  left: '14px',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
});

export const searchInput = style({
  width: '100%',
  height: '44px',
  padding: '0 14px 0 42px',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '10px',
  backgroundColor: vars.colorGray50,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray900,
  outline: 'none',
  boxSizing: 'border-box',
  selectors: {
    // gray500(#737373) — 배경 gray50 대비 4.54:1 로 WCAG 4.5:1 을 넘겨요
    '&::placeholder': { color: vars.colorGray500 },
    '&:focus': { borderColor: vars.colorBrand1 },
  },
});

/** 로딩 스켈레톤 — 카드 3장과 같은 모양으로 자리를 잡아 줘요 */
const pulse = keyframes({
  '0%, 100%': { opacity: 0.45 },
  '50%': { opacity: 1 },
});

const skeletonBlock = style({
  backgroundColor: vars.colorGray100,
  animation: `${pulse} 1.4s ease-in-out infinite`,
});

export const skeletonCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '20px 24px',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '12px',
  backgroundColor: '#fff',
});

export const skeletonTitle = style([
  skeletonBlock,
  { width: '60%', height: '22px', borderRadius: '6px' },
]);

export const skeletonChip = style([
  skeletonBlock,
  { width: '72px', height: '26px', borderRadius: '8px' },
]);

export const skeletonMeta = style([
  skeletonBlock,
  { width: '45%', height: '14px', borderRadius: '6px' },
]);

/** 빈·오류 상태 — 가운데 정렬 안내 */
export const stateBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '56px 16px',
  textAlign: 'center',
});

export const stateTitle = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-16)',
  fontWeight: '600',
  color: vars.colorGray800,
});

export const stateDesc = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray500,
});

const stateAction = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '8px',
  padding: '10px 18px',
  borderRadius: '9999px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  fontWeight: '600',
  textDecoration: 'none',
  cursor: 'pointer',
  selectors: {
    '&:hover': { opacity: 0.9 },
  },
});

/** 빈 상태의 이동 버튼 */
export const stateLink = style([
  stateAction,
  { backgroundColor: vars.colorBrand1, color: vars.colorGray50 },
]);

/** 오류 상태의 다시 시도 버튼 */
export const retryButton = style([
  stateAction,
  {
    backgroundColor: '#fff',
    color: vars.colorBrand1,
    border: 'none',
    boxShadow: `inset 0 0 0 1px ${vars.colorBrand1}`,
  },
]);

/** 다음 페이지 오류 — 이미 받은 목록은 그대로 두고 아래에만 안내 */
export const nextError = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '16px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray600,
});

export const nextRetry = style({
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  fontWeight: '600',
  color: vars.colorBrand1,
  textDecoration: 'underline',
  cursor: 'pointer',
  selectors: {
    '&:disabled': { cursor: 'not-allowed', opacity: 0.5 },
  },
});

/** 더 보기 버튼 — 목록 아래 가운데 */
export const moreButton = style({
  display: 'block',
  margin: '24px auto 0',
  padding: '10px 22px',
  border: 'none',
  borderRadius: '9999px',
  backgroundColor: vars.colorGray800,
  color: vars.colorGray50,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  fontWeight: '600',
  cursor: 'pointer',
  selectors: {
    '&:hover:not(:disabled)': { opacity: 0.9 },
    '&:disabled': { cursor: 'not-allowed', opacity: 0.5 },
  },
});
