// src/components/QueryBoundary/QueryBoundary.css.js
import { style } from '@vanilla-extract/css';

export const errorFallback = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  padding: '48px 16px',
});

export const retryButton = style({
  width: '120px',
});
