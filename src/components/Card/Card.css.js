import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '24px',
  border: '2px solid ' + vars.colorGray800,
  borderRadius: '12px',
  backgroundColor: vars.colorGray50,
  color: vars.colorGray800,
  textDecoration: 'none',
  minWidth: 0,
  selectors: {
    '&:hover': { backgroundColor: vars.colorGray100 },
    '&:focus-visible': { outline: '3px solid ' + vars.colorBrand2, outlineOffset: '2px' },
  },
  '@media': { '(max-width: 640px)': { padding: '20px 16px' } },
});
export const widths = styleVariants({
  wide: { width: '100%' },
  medium: { width: '100%', maxWidth: '696px' },
  narrow: { width: '100%', maxWidth: '343px' },
});
export const statusRow = style({ marginBottom: '12px' });
export const title = style({
  margin: 0,
  fontSize: '20px',
  lineHeight: 1.4,
  fontWeight: 700,
  overflowWrap: 'anywhere',
  '@media': { '(max-width: 640px)': { fontSize: '18px' } },
});
export const tags = style({ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' });
export const details = style({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  gap: '12px',
  marginTop: '20px',
  paddingTop: '16px',
  borderTop: '1px solid ' + vars.colorGray200,
  fontSize: '13px',
  lineHeight: 1.5,
  color: vars.colorGray600,
  '@media': { '(max-width: 640px)': { gap: '8px', flexDirection: 'column' } },
});
export const detailItem = style({ display: 'inline-flex', alignItems: 'center', gap: '5px' });
export const callToAction = style({ marginTop: '12px', fontSize: '13px', fontWeight: 700 });
