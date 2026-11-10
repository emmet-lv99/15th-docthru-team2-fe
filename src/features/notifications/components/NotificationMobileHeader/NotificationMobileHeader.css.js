import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const header = style({
  display: 'none',

  '@media': {
    '(max-width: 767px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 16px',
      borderBottom: `1px solid ${vars.colorGray100}`,
    },
  },
});

export const title = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: '16px',
  fontWeight: 600,
  color: vars.colorGray800,
});

export const closeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.colorGray800,
  fontSize: '24px',
  cursor: 'pointer',
});
