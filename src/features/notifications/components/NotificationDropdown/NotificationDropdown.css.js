import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const dropdown = style({
  width: '343px',
  height: '465px',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '12px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
});

export const title = style({
  margin: 0,
  color: vars.colorGray800,
  fontFamily: vars.fontFamily,
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: 'normal',
});

export const content = style({
  maxHeight: '400px',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
});
