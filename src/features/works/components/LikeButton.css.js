import { vars } from '@/styles/theme.css';
import { radius } from '@/styles/tokens';
import { style } from '@vanilla-extract/css';
export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  background: 'none',
  border: 'none',
  padding: '4px 8px',
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: 'transform 0.15s ease, background-color 0.15s ease',
  userSelect: 'none',
  ':hover': {
    backgroundColor: vars.colorBrand3, // #F1F2F5 연회색 호버 배경
    transform: 'scale(1.05)',
  },
  ':active': {
    transform: 'scale(0.95)',
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
});
export const heartIcon = style({
  width: '18px',
  height: '18px',
  transition: 'fill 0.2s ease, stroke 0.2s ease, transform 0.2s ease',
});
// 활성화(좋아요 누름): 채워진 빨간색
export const heartLiked = style({
  fill: vars.colorRedError,
  stroke: vars.colorRedError,
});
// 비활성화(좋아요 안 누름): 비어있는 회색 라인
export const heartUnliked = style({
  fill: 'none',
  stroke: vars.colorGray500,
  strokeWidth: 2,
});
export const count = style({
  fontSize: 'var(--font-size-14)',
  fontWeight: 500,
  color: vars.colorGray700,
});
