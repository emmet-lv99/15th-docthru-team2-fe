import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '100%',
  padding: '4px 9px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 600,
  lineHeight: 1.3,
  whiteSpace: 'nowrap',
});
export const tone = styleVariants({
  status: { backgroundColor: vars.colorBrand2, color: vars.colorBrand1 },
  cardStatus: {
    backgroundColor: vars.colorGray200,
    color: vars.colorGray800,
    borderRadius: '20px',
  },
  stack: {
    backgroundColor: vars.colorBrand3,
    color: vars.colorGray800,
    fontFamily: vars.fontQuantico,
    fontWeight: 700,
    fontSize: '14px',
    padding: '3px 12px',
  },
  docType: {
    backgroundColor: vars.colorGray50,
    color: vars.colorGray600,
    border: '1px solid ' + vars.colorGray300,
  },
  category: { backgroundColor: vars.colorBrand3, color: vars.colorGray800 },
});
export const stack = styleVariants({
  nextjs: { backgroundColor: '#79e16a' },
  modernjs: { backgroundColor: '#ff6b6b' },
  api: { backgroundColor: '#ff8855' },
  web: { backgroundColor: '#f4e94f' },
  career: { backgroundColor: '#78aceb' },
});
export const closedStatus = style({
  backgroundColor: vars.colorGray800,
  color: vars.colorGray50,
});
