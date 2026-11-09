import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray800,
  cursor: 'pointer',
});

export const input = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: 0,
  padding: 0,
  opacity: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  border: 0,
});

export const box = style({
  position: 'relative',
  flex: 'none',
  width: '18px',
  height: '18px',
  border: `1px solid ${vars.colorGray300}`,
  borderRadius: '2px',
  backgroundColor: vars.colorGray50,
  boxSizing: 'border-box',
  selectors: {
    [`${input}:checked + &`]: {
      borderColor: vars.colorGray800,
      backgroundColor: vars.colorGray800,
    },
    [`${input}:checked + &::after`]: {
      content: '""',
      position: 'absolute',
      left: '5px',
      top: '2px',
      width: '5px',
      height: '9px',
      borderRight: '2px solid #fff',
      borderBottom: '2px solid #fff',
      transform: 'rotate(45deg)',
    },
    [`${input}:focus-visible + &`]: {
      outline: `2px solid ${vars.colorBrand2}`,
      outlineOffset: '2px',
    },
    [`${input}:disabled + &`]: { opacity: 0.5 },
  },
});

export const boxRadio = style({
  borderRadius: '9999px',
  selectors: {
    [`${input}:checked + &::after`]: {
      content: '""',
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '8px',
      height: '8px',
      borderRadius: '9999px',
      backgroundColor: '#fff',
      border: 'none',
      transform: 'translate(-50%, -50%)',
    },
  },
});

export const label = style({
  lineHeight: '1.4',
});
