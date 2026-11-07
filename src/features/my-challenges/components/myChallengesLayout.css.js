// src/features/my-challenges/components/myChallengesLayout.css.js
//
// 나의 챌린지 화면 공통 틀 — 참여 중/완료가 같은 폭·여백을 써요.
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
