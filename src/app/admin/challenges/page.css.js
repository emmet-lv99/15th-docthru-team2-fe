import { style } from '@vanilla-extract/css';

// 관리자 페이지 전체 배경
export const pageBackground = style({
  backgroundColor: '#FAFAFA',
  minHeight: '100dvh',
});

export const container = style({
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '40px 24px',
  boxSizing: 'border-box',
});

export const pageTitle = style({
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '24px',
});
