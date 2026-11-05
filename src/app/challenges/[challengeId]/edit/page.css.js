import { breakpoint } from '@/styles/breakpoints';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const pageLayout = style({
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  '@media': {
    [breakpoint.maxMd]: {
      flexDirection: 'column-reverse',
      height: '100vh',
      overflow: 'hidden',
    },
  },
});

export const mainContent = style({
  flex: 1,
  margin: '24px',
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    [breakpoint.maxMd]: {
      margin: '16px',
      overflowY: 'auto',
    },
  },
});

export const innerContainer = style({
  width: '100%',
  maxWidth: '890px',
  margin: '0 auto',
});

export const challengeTitle = style({
  padding: '24px 0',
  borderBottom: `1px solid ${vars.colorGray200}`,
  fontSize: 'var(--font-size-20)',
  lineHeight: 1.3,
  wordBreak: 'keep-all',
  '@media': {
    [breakpoint.maxMd]: {
      padding: '16px 0',
      fontSize: 'var(--font-size-18)',
    },
  },
});

export const floatingSourceButton = style({
  position: 'fixed',
  right: 0,
  top: '180px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  padding: '12px 10px',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRight: 'none',
  borderRadius: '12px 0 0 12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 600,
  color: '#334155',
  zIndex: 40,
  transition: 'all 0.15s ease',
  ':hover': {
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
  },
  '@media': {
    [breakpoint.maxMd]: {
      top: '140px',
      padding: '8px 6px',
      fontSize: '11px',
    },
  },
});

export const workspace = style({});
