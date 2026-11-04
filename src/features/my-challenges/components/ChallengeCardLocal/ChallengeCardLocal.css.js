// src/features/my-challenges/components/ChallengeCardLocal/ChallengeCardLocal.css.js
//
// 카드 틀만 잡는 스타일 — 4단계(테두리 · 모서리 · 여백).
// 칩·마감일·버튼은 다음 단계에서 이 파일에 추가해요.
import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '20px 24px',
  border: `1px solid ${vars.borderColor}`,
  borderRadius: '12px',
  backgroundColor: '#fff',
  boxSizing: 'border-box',
});

export const title = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-18)',
  fontWeight: '700',
  color: vars.colorGray900,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
