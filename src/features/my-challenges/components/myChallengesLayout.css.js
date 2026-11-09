import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const pageBackground = style({
  minHeight: '100dvh',
  backgroundColor: vars.colorGray50,
});

export const container = style({
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '24px',
  boxSizing: 'border-box',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
});

export const heading = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: '20px',
  fontWeight: '600',
  color: vars.colorGray800,
});

export const newButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  height: '40px',
  padding: '12px 20px',
  borderRadius: '24px',
  backgroundColor: vars.colorGray800,
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
});

export const tabs = style({
  marginBottom: '30px',
});
