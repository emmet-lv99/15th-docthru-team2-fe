// src/features/my-challenges/components/ParticipatingList/ParticipatingList.css.js
//
// 목록 배치 — 카드 사이 간격과 페이지 폭만 담당해요.
import { style } from '@vanilla-extract/css';

export const page = style({
  width: '100%',
  maxWidth: '960px',
  margin: '0 auto',
  padding: '48px 20px 80px',
  boxSizing: 'border-box',
});

export const heading = style({
  margin: '0 0 24px',
  fontSize: 'var(--font-size-24)',
  fontWeight: '700',
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});
