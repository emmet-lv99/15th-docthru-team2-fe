// src/features/my-challenges/components/ChallengeCardLocal/ChallengeCardLocal.css.js
//
// 카드 틀 + 칩 스타일 (4~5단계).
// 색·간격 근거: 팀 디자인 자료 `공용 컴퍼넌트/chip-type`(카테고리 5색) · `chip-category.png`(문서유형)
import { style, styleVariants } from '@vanilla-extract/css';

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

/** 칩 줄 — 카테고리 + 문서유형 */
export const chipRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
});

const chipBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '26px',
  borderRadius: '8px',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
});

/** 기술 스택 5색 — chip-type.png 실측값 */
export const categoryChip = styleVariants({
  NEXT_JS: [chipBase, { padding: '3px 12px', backgroundColor: '#79E16A' }],
  MODERN_JS: [chipBase, { padding: '3px 12px', backgroundColor: '#F66E6B' }],
  API: [chipBase, { padding: '3px 12px', backgroundColor: '#FF905E' }],
  WEB: [chipBase, { padding: '3px 12px', backgroundColor: '#F7EA5D' }],
  CAREER: [chipBase, { padding: '3px 12px', backgroundColor: '#7EB2EE' }],
});

export const categoryLabel = style({
  fontFamily: vars.fontQuantico,
  fontSize: 'var(--font-size-14)',
  fontWeight: '700',
  color: vars.colorGray600,
});

/** 문서유형 — 흰 배경 + 테두리 (chip-category.png) */
export const docChip = style([
  chipBase,
  {
    padding: '5px 7px',
    border: `1px solid ${vars.colorGray300}`,
    backgroundColor: '#fff',
    fontFamily: vars.fontFamily,
    fontSize: 'var(--font-size-12)',
    fontWeight: '500',
    color: vars.colorGray600,
  },
]);
