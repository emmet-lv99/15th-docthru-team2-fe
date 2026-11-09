import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  width: '100%',
  fontFamily: vars.fontFamily,
});

export const label = style({
  fontSize: 'var(--font-size-14)',
  fontWeight: '600',
  color: vars.colorGray800,
});

export const control = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

export const input = style({
  width: '100%',
  height: '44px',
  padding: '0 14px',
  border: `1px solid ${vars.colorGray300}`,
  borderRadius: '10px',
  backgroundColor: '#fff',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray900,
  outline: 'none',
  boxSizing: 'border-box',
  selectors: {
    '&::placeholder': { color: vars.colorGray500 },
    '&:focus': { borderColor: vars.colorGray800 },
    '&:disabled': { backgroundColor: vars.colorGray50, cursor: 'not-allowed' },
  },
});

export const inputWithSlot = style({
  paddingRight: '44px',
});

export const inputError = style({
  borderColor: vars.colorRedError,
  selectors: {
    '&:focus': { borderColor: vars.colorRedError },
  },
});
export const trailing = style({
  position: 'absolute',
  right: '12px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
});

export const toggle = style({
  position: 'absolute',
  right: '6px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

export const hint = style({
  margin: 0,
  fontSize: 'var(--font-size-12)',
  color: vars.colorGray500,
});

export const error = style({
  margin: 0,
  fontSize: 'var(--font-size-12)',
  color: vars.colorRedError,
});
