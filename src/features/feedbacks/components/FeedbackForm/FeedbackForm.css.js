import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const form = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 36px',
  alignItems: 'start',
  columnGap: '24px',
  rowGap: '8px',
  width: '100%',
});

export const inputWrapper = style({
  minWidth: 0,
});

export const textBox = style({
  width: '100%',
});

// 피드백 입력창
globalStyle(`${textBox} textarea`, {
  minHeight: '88px',
  maxHeight: '107px',
  overflowY: 'auto',
  resize: 'none',
});

export const submitButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  padding: 0,
  border: 'none',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  cursor: 'pointer',

  ':disabled': {
    cursor: 'not-allowed',
  },
});

export const errorMessage = style({
  gridColumn: '1 / -1',
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  color: vars.colorRedError,
});
