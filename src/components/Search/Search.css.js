import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const form = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minWidth: 0,
  height: '40px',
  border: '1px solid ' + vars.colorGray200,
  borderRadius: '20px',
  backgroundColor: vars.colorGray50,
  selectors: {
    '&:focus-within': { outline: '2px solid ' + vars.colorBrand2, outlineOffset: '1px' },
  },
});
export const input = style({
  flex: 1,
  width: '100%',
  minWidth: 0,
  height: '38px',
  padding: '0 14px 0 4px',
  border: 0,
  outline: 'none',
  backgroundColor: 'transparent',
  color: vars.colorGray800,
  font: 'inherit',
  fontSize: '14px',
  '::placeholder': { color: vars.colorGray400 },
});
export const submit = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 'none',
  width: '36px',
  height: '38px',
  border: 0,
  padding: 0,
  backgroundColor: 'transparent',
  cursor: 'pointer',
  borderRadius: '20px',
});
export const searchIcon = style({
  position: 'relative',
  display: 'block',
  width: '24px',
  height: '24px',
});
export const searchCircle = style({ position: 'absolute', top: '3px', left: '4px' });
export const searchHandle = style({ position: 'absolute', top: '15px', left: '16px' });
