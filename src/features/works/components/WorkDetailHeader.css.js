// src/features/works/components/WorkDetailHeader.css.js
import { breakpoint } from '@/styles/breakpoints';
import { vars } from '@/styles/theme.css';
import { radius, space } from '@/styles/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  paddingBottom: space.xl,
  borderBottom: `1px solid ${vars.borderColor}`,
  marginBottom: space['2xl'],
});

export const titleRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: space.lg,
  position: 'relative',
  marginBottom: space.lg,
});

export const title = style({
  fontSize: 'var(--font-size-24)',
  fontWeight: 700,
  lineHeight: vars.lineHeightTight,
  color: vars.colorGray900,
  margin: 0,
  wordBreak: 'keep-all',

  '@media': {
    [breakpoint.maxMd]: {
      fontSize: 'var(--font-size-20)',
    },
  },
});

export const kebabButton = style({
  background: 'none',
  border: 'none',
  padding: '6px 8px',
  cursor: 'pointer',
  fontSize: 'var(--font-size-20)',
  color: vars.colorGray500,
  borderRadius: radius.md,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.15s ease',

  ':hover': {
    backgroundColor: vars.colorGray50,
    color: vars.colorGray900,
  },
});

export const chipRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.sm,
  marginBottom: space.xl,
});

export const categoryChip = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 10px',
  borderRadius: radius.sm,
  fontSize: 'var(--font-size-12)',
  fontWeight: 600,
  backgroundColor: vars.colorBrand2,
  color: vars.colorBrand1,
});

export const docTypeChip = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 10px',
  borderRadius: radius.sm,
  fontSize: 'var(--font-size-12)',
  fontWeight: 500,
  backgroundColor: vars.colorBrand3,
  color: vars.colorGray700,
});

export const metaRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: space.md,
});

export const authorGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.lg,
});

export const authorInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: space.sm,
});

export const avatar = style({
  width: '24px',
  height: '24px',
  borderRadius: radius.full,
  backgroundColor: vars.colorBrand2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFFFFF',
  fontWeight: 700,
  fontSize: 'var(--font-size-12)',
});

export const nickname = style({
  fontSize: 'var(--font-size-14)',
  fontWeight: 600,
  color: vars.colorGray900,
});

export const date = style({
  fontSize: 'var(--font-size-13)',
  color: vars.colorGray400,
});
