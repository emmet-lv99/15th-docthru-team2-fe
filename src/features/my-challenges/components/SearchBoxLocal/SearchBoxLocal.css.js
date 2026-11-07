// src/features/my-challenges/components/SearchBoxLocal/SearchBoxLocal.css.js
import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const wrap = style({
  position: 'relative',
  marginBottom: '20px',
});

export const icon = style({
  position: 'absolute',
  top: '50%',
  left: '14px',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
});

export const input = style({
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
