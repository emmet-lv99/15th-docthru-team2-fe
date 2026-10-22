// src/components/layouts/GlobalLayout/GlobalLayout.css.js
import { style } from '@vanilla-extract/css';

export const container = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

// 원본(prisma-7)과 동일 — 전역 폭 제한 없이 각 화면이 자기 컨테이너를 관리합니다.
export const main = style({
  flex: 1,
  width: '100%',
});
