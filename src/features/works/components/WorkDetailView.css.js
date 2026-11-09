import { breakpoint } from '@/styles/breakpoints';
import { style } from '@vanilla-extract/css';
export const container = style({
  maxWidth: '890px',
  margin: '0 auto',
  padding: '40px 24px 120px',
  width: '100%',
  boxSizing: 'border-box',
  minHeight: 'calc(100vh - 64px)',
  '@media': {
    [breakpoint.maxMd]: {
      padding: '24px 16px 80px',
    },
  },
});
export const feedbackSection = style({
  marginTop: '48px',
  paddingTop: '32px',
  borderTop: '1px solid #F1F5F9',
});
