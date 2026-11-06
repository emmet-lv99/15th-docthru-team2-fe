import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const container = style({
  display: 'flex',
  minHeight: '220px',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px 20px',
  border: '1px dashed ' + vars.colorGray300,
  borderRadius: '16px',
  color: vars.colorGray500,
  textAlign: 'center',
});
export const title = style({
  margin: 0,
  fontWeight: 700,
  fontSize: '16px',
  color: vars.colorGray700,
});
export const description = style({ margin: 0, fontSize: '14px', color: vars.colorGray600 });
