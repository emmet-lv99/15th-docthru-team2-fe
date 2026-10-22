// src/components/Container/Container.css.js — 페이지 공통 폭 래퍼
// 근거: gnb.png inner maxWidth 1280px + card.png wide 변형 기준
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 24px',
  '@media': { '(max-width: 767px)': { padding: '0 16px' } },
});

export const containerNarrow = style({
  width: '100%',
  maxWidth: '720px',
  margin: '0 auto',
  padding: '0 24px',
});

export const containerNarrowest = style({
  width: '100%',
  maxWidth: '520px',
  margin: '0 auto',
  padding: '0 24px',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '32px 0',
});
