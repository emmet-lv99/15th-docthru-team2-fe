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

export const challengeTitle = style({});

export const floatingSourceButton = style({});

export const workspace = style({});
