import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const container = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
});
export const button = style({
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  border: 0,
  backgroundColor: 'transparent',
  color: vars.colorGray400,
  font: 'inherit',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  selectors: {
    '&:disabled': { cursor: 'default' },
    '&:focus-visible': { outline: '2px solid ' + vars.colorBrand2 },
  },
  '@media': { '(max-width: 640px)': { width: '32px', height: '32px' } },
});
export const current = style({ backgroundColor: vars.colorGray800, color: vars.colorBrand2 });
export const ellipsis = style({ padding: '0 4px', color: vars.colorGray500 });
