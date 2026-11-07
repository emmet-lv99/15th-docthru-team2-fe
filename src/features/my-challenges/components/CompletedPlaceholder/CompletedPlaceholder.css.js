// src/features/my-challenges/components/CompletedPlaceholder/CompletedPlaceholder.css.js
//
// 완료 화면 임시 안내 — 참여 중 화면과 같은 폭·여백을 써서 탭 이동 시 화면이 덜 튀게 해요.
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

export const box = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '56px 16px',
  textAlign: 'center',
});

export const title = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-16)',
  fontWeight: '600',
  color: vars.colorGray800,
});

export const desc = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray500,
});

export const link = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '8px',
  padding: '10px 18px',
  borderRadius: '9999px',
  backgroundColor: vars.colorBrand1,
  color: vars.colorGray50,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  fontWeight: '600',
  textDecoration: 'none',
  selectors: {
    '&:hover': { opacity: 0.9 },
  },
});
