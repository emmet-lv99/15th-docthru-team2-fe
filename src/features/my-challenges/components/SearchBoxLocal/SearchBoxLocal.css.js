import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const wrap = style({
  position: 'relative',
  marginBottom: '30px',
});

export const icon = style({
  position: 'absolute',
  top: '50%',
  left: '16px',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
});

export const input = style({
  width: '100%',
  height: '40px',
  padding: '0 20px 0 44px',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '30px',
  backgroundColor: '#fff',
  fontFamily: vars.fontFamily,
  fontSize: '16px',
  color: vars.colorGray900,
  outline: 'none',
  boxSizing: 'border-box',
  selectors: {
    '&::placeholder': { color: vars.colorGray500 },
    '&:focus': { borderColor: vars.colorGray800 },
  },
});
