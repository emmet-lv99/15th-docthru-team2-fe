import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const wrap = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  flex: 'none',
});

export const bellButton = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  padding: 0,
  border: 'none',
  borderRadius: '9999px',
  backgroundColor: 'transparent',
  color: vars.colorGray800,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.colorGray100,
  },
});

export const panel = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  zIndex: 200,

  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
});

export const desktop = style({
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
});

export const mobile = style({
  display: 'none',
  '@media': {
    '(max-width: 767px)': {
      display: 'inline-flex',
    },
  },
});
