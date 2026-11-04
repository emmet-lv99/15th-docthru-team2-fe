import { breakpoint } from '@/styles/breakpoints';
import { vars } from '@/styles/theme.css';
import { radius } from '@/styles/tokens';
import { style } from '@vanilla-extract/css';

export const actionBarLayout = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const logoWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5.4px',
  fontSize: '21.6px',
  fontFamily: 'var(--font-quantico)',
  fontWeight: '700',
  color: vars.colorGray600,
  '@media': {
    [breakpoint.maxMd]: {
      fontSize: '18px',
    },
  },
});

export const actions = style({
  display: 'flex',
  gap: '8px',
});

export const actionDrop = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  backgroundColor: '#FFE7E7',
  padding: '0 12px',
  height: '40px',
  borderRadius: radius.lg,
  color: vars.colorRedError,
  fontSize: 'var(--font-size-16)',
  fontWeight: '600',
  cursor: 'pointer',
  border: 'none',
  transition: 'opacity 0.15s ease',
  ':hover': {
    opacity: 0.85,
  },
  '@media': {
    [breakpoint.maxMd]: {
      width: '40px',
      padding: 0,
      justifyContent: 'center',
    },
  },
});

export const actionDropText = style({
  display: 'inline',
  '@media': {
    [breakpoint.maxMd]: {
      display: 'none',
    },
  },
});

export const actionDraft = style({
  border: `1px solid ${vars.colorGray800}`,
  padding: '0 17px',
  height: '40px',
  borderRadius: radius.lg,
  color: vars.colorGray800,
  fontSize: 'var(--font-size-16)',
  fontWeight: '600',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  ':hover': {
    backgroundColor: vars.colorGray50,
  },
  '@media': {
    [breakpoint.maxMd]: {
      padding: '0 12px',
      fontSize: 'var(--font-size-14)',
    },
  },
});

export const actionSubmit = style({
  backgroundColor: vars.colorGray800,
  padding: '0 17px',
  height: '40px',
  borderRadius: radius.lg,
  color: '#fff',
  fontSize: 'var(--font-size-16)',
  fontWeight: '600',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  ':hover': {
    backgroundColor: vars.colorGray900,
  },
  '@media': {
    [breakpoint.maxMd]: {
      padding: '0 12px',
      fontSize: 'var(--font-size-14)',
    },
  },
});
