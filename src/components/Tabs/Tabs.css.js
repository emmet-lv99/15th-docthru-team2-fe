import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const wrap = style({
  width: '100%',
});

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  borderBottom: `1px solid ${vars.colorGray300}`,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

export const navTop = style({
  borderBottom: 'none',
  borderTop: `1px solid ${vars.colorGray300}`,
});

export const tablist = style({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  borderBottom: `1px solid ${vars.colorGray300}`,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

const tabBase = style({
  position: 'relative',
  flex: 'none',
  padding: '0 24px 16px',
  border: 'none',
  backgroundColor: 'transparent',
  fontFamily: vars.fontFamily,
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '1.5',
  color: vars.colorGray500,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  selectors: {
    '&:hover': { color: vars.colorGray800 },
  },
});

export const tab = style([tabBase]);

export const activeTab = style([
  tabBase,
  {
    color: vars.colorGray800,
    borderBottom: `3px solid ${vars.colorGray800}`,
    marginBottom: '-1px',
  },
]);
