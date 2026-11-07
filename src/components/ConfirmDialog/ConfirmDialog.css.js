import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const contentLeft = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const contentRight = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  textAlign: 'center',
});

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '9999px',
  backgroundColor: vars.colorGray50,
  color: vars.colorGray800,
});

export const message = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-16)',
  lineHeight: '1.6',
  color: vars.colorGray800,
  whiteSpace: 'pre-line',
});

export const actionsLeft = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '8px',
  width: '100%',
});

export const actionsRight = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '8px',
  width: '100%',
});
