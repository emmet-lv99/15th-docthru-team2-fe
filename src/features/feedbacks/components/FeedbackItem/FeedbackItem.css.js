import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  padding: '16px',
  border: '1px solid transparent',
  borderRadius: '12px',
  backgroundColor: vars.colorGray50,
  boxSizing: 'border-box',
});

export const itemEditing = style({
  backgroundColor: '#FFFFFF',
  borderColor: vars.colorGray200,
});

export const authorRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const avatar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  flexShrink: 0,
  borderRadius: '50%',
  backgroundColor: vars.colorBrand2,
  overflow: 'hidden',
});

export const authorInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: 0,
});

export const nickname = style({
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  fontWeight: '500',
  color: vars.colorGray800,
});

export const date = style({
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-12)',
  color: vars.colorGray400,
});

export const content = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  lineHeight: vars.lineHeightRelaxed,
  color: vars.colorGray800,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
});

export const menuWrapper = style({
  position: 'relative',
  marginLeft: 'auto',
});

export const menuButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.colorGray400,
  fontSize: '24px',
  cursor: 'pointer',

  ':hover': {
    color: vars.colorGray800,
  },
});

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  right: 0,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  minWidth: '120px',
  padding: '4px',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '8px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
});

export const dropdownItem = style({
  width: '100%',
  padding: '10px 12px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  color: vars.colorGray800,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  textAlign: 'left',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: vars.colorGray50,
  },
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const editTextBox = style({
  width: '100%',
});

globalStyle(`${editTextBox} textarea`, {
  display: 'block',
  width: '100%',
  height: 'auto',
  minHeight: '20px',
  maxHeight: '107px',
  padding: 0,
  margin: 0,
  border: 'none',
  borderRadius: 0,
  backgroundColor: 'transparent',
  color: vars.colorGray800,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  lineHeight: '20px',
  overflowY: 'hidden',
  resize: 'none',
  boxSizing: 'border-box',
});

globalStyle(`${editTextBox} textarea:focus`, {
  outline: 'none',
  border: 'none',
});

export const reasonInput = style({
  width: '100%',
  padding: '10px 12px',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '8px',
  backgroundColor: '#FFFFFF',
  color: vars.colorGray800,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  boxSizing: 'border-box',

  ':focus': {
    outline: 'none',
    borderColor: vars.colorBrand1,
  },
});

export const formActions = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '8px',
  marginLeft: 'auto',
  flexShrink: 0,
});

export const topCancelButton = style({
  padding: '8px 12px',
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.colorGray600,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  cursor: 'pointer',

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const confirmButton = style({
  padding: '8px 16px',
  border: 'none',
  borderRadius: '10px',
  backgroundColor: vars.colorGray800,
  color: '#FFFFFF',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  cursor: 'pointer',

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const deleteButton = style({
  padding: '8px 16px',
  border: 'none',
  borderRadius: '10px',
  backgroundColor: vars.colorGray800,
  color: '#FFFFFF',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  cursor: 'pointer',

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const confirmMessage = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorRedError,
});

export const errorMessage = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  color: vars.colorBrand2,
});
