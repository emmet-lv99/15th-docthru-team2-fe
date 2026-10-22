// src/components/Loading/Loading.css.js
// 색은 hex 로 직접 쓰지 않고 theme.css.js 의 vars 토큰을 씁니다.
import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  padding: '48px 16px',
  textAlign: 'center',
});

export const spinner = style({
  width: '32px',
  height: '32px',
  border: `3px solid ${vars.colorGray200}`,
  borderTopColor: vars.colorBrand2,
  borderRadius: '50%',
  animation: `${spin} 0.8s linear infinite`,
});

export const title = style({
  margin: 0,
  fontSize: 'var(--font-size-16)',
  fontWeight: '600',
  color: vars.colorGray700,
});

export const description = style({
  margin: 0,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray500,
});
