import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  boxSizing: 'border-box',
});

export const panel = style({
  position: 'relative',
  width: '100%',
  maxWidth: '327px',
  maxHeight: '90vh',
  overflow: 'auto',
  border: `2px solid ${vars.colorGray800}`,
  borderRadius: '16px',
  backgroundColor: '#fff',
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.16)',
  outline: 'none',
  '@media': {
    '(min-width: 768px)': { maxWidth: '496px' },
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '24px 24px 0',
});

export const title = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-18)',
  fontWeight: '700',
  lineHeight: '26px',
  color: vars.colorGray800,
});

export const closeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  width: '24px',
  height: '24px',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.colorGray800,
  cursor: 'pointer',
});

export const body = style({
  padding: '24px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-16)',
  lineHeight: '1.6',
  color: vars.colorGray800,
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '8px',
  padding: '0 24px 24px',
});
