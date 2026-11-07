import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const wrap = style({
  width: '100%',
});

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  borderBottom: `1px solid ${vars.colorGray200}`,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

export const navTop = style({
  borderBottom: 'none',
  borderTop: `1px solid ${vars.colorGray200}`,
});

export const tablist = style({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  borderBottom: `1px solid ${vars.colorGray200}`,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

const tabBase = style({
  position: 'relative',
  flex: 'none',
  padding: '8px 0 12px',
  border: 'none',
  backgroundColor: 'transparent',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-16)',
  fontWeight: '500',
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
    color: vars.colorGray900,
    fontWeight: '700',
    selectors: {
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '2px',
        backgroundColor: vars.colorGray900,
      },
    },
  },
]);
