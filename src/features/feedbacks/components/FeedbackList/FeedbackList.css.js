import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const statusContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  padding: '24px 0',
});

export const status = style({
  margin: 0,
  padding: '24px 0',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray500,
  textAlign: 'center',
});

export const loadMoreButton = style({
  alignSelf: 'center',
  minWidth: '120px',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: vars.colorGray100,
  color: vars.colorGray600,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  fontWeight: '500',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: vars.colorGray200,
  },

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const retryButton = style({
  padding: '8px 16px',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '6px',
  backgroundColor: vars.colorGray50,
  color: vars.colorGray800,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  cursor: 'pointer',
});
