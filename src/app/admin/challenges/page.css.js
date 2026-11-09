import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '40px 24px',
  boxSizing: 'border-box',
});

export const pageTitle = style({
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '24px',
});
