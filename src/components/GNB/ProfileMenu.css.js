import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const wrap = style({
  position: 'relative',
  display: 'inline-flex',
  flex: 'none',
});

export const trigger = style({
  border: 'none',
  cursor: 'pointer',
  padding: '0 6px',
});

export const userTrigger = style({
  width: '32px',
  height: '32px',
  minWidth: '32px',
  padding: 0,
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
});

export const menu = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  zIndex: 200,
  minWidth: '168px',
  margin: 0,
  padding: '6px',
  listStyle: 'none',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '12px',
  backgroundColor: '#fff',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
});

export const item = style({
  display: 'block',
});

export const link = style({
  display: 'block',
  width: '100%',
  padding: '10px 12px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  fontWeight: '500',
  color: vars.colorGray800,
  textAlign: 'left',
  textDecoration: 'none',
  cursor: 'pointer',
  selectors: {
    '&:hover': { backgroundColor: vars.colorGray50 },
    '&:disabled': { cursor: 'not-allowed', opacity: 0.5 },
  },
});

export const error = style({
  margin: 0,
  padding: '8px 12px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-12)',
  lineHeight: 1.4,
  color: vars.colorRedError,
});
