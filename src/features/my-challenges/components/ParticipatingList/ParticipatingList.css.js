// src/features/my-challenges/components/ParticipatingList/ParticipatingList.css.js
//
// 목록 배치 — 카드 사이 간격과 페이지 폭만 담당해요.
import { style } from '@vanilla-extract/css';

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
