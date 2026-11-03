import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const pageLayout = style({
  width: '100%',
  display: 'flex',
});

export const mainContent = style({
  flex: 1,
  margin: '24px',
  display: 'flex',
  flexDirection: 'column',
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
  lineHeight: 1,
});

export const floatingSourceButton = style({});

export const workspace = style({});
