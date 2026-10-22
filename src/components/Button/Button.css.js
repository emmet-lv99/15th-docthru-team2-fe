// src/components/Button/Button.css.js
// 근거: 공용 컴퍼넌트/btn-solid.png · btn-outline.png · btn-filled-tonal.png · btn-transparent.png
//
// ⚠️ 확인 필요 — btn-solid-icon / btn_checkbox / btn_radio 는 Figma export 가 왜곡돼 있다.
//    재추출 후 값만 교체하면 된다.
import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

/** 사이즈 3종 (원본에서 세로 나열로 확인) — ⚠️ px 는 outline(150×140) 기준 추정 */
const size = styleVariants({
  sm: { height: '32px', padding: '0 12px', fontSize: 'var(--font-size-13)' },
  md: { height: '36px', padding: '0 16px', fontSize: 'var(--font-size-14)' },
  lg: { height: '40px', padding: '0 17px', fontSize: 'var(--font-size-16)' },
});

/** variant 4종 */
const variant = styleVariants({
  /** btn-solid: #262626 배경 + 흰 글자 */
  solid: {
    backgroundColor: vars.colorBrand1,
    color: vars.colorGray50,
    selectors: { '&:disabled': { backgroundColor: vars.colorGray200, color: vars.colorGray400 } },
  },
  /** btn-outline: 흰 배경 + 1px #262626 테두리 */
  outline: {
    backgroundColor: vars.colorGray50,
    color: vars.colorBrand1,
    boxShadow: `inset 0 0 0 1px ${vars.colorBrand1}`,
    selectors: {
      '&:disabled': { color: vars.colorGray400, boxShadow: `inset 0 0 0 1px ${vars.colorGray200}` },
    },
  },
  /** btn-filled-tonal: 연분홍 배경 + 붉은 글자 (위험/부정 액션) */
  filledTonal: {
    backgroundColor: '#FDECEC',
    color: vars.colorRedError,
    selectors: { '&:disabled': { backgroundColor: vars.colorGray100, color: vars.colorGray400 } },
  },
  /** btn-transparent: 무테두리 (링크 열기 등) */
  transparent: {
    backgroundColor: 'transparent',
    color: vars.colorBrand1,
    selectors: { '&:disabled': { color: vars.colorGray400 } },
  },
  /** container.png — "원문 보기": 노랑 배경 + 검은 테두리 + 검은 글씨 */
  yellow: {
    backgroundColor: vars.colorBrand2,
    color: vars.colorBrand1,
    boxShadow: `inset 0 0 0 1px ${vars.colorBrand1}`,
    selectors: {
      '&:disabled': {
        backgroundColor: vars.colorGray200,
        color: vars.colorGray400,
        boxShadow: 'none',
      },
    },
  },
});

/** pill: 알약형 — btn-outline-icon(도전 계속하기) · sort(필터) · chip-status 처럼
 *  아이콘이 붙거나 카운트가 붙는 버튼은 radius 9999px 를 쓴다 (btn-solid-icon 도 알약형)
 */
const pill = style({ borderRadius: '9999px' });

/** 원형 버튼 (btn_right · btn_feedback) */
const circular = styleVariants({
  lg: { width: '40px', height: '40px', borderRadius: '9999px' },
  sm: { width: '28px', height: '28px', borderRadius: '9999px' },
});

const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  flex: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  fontFamily: vars.fontFamily,
  fontWeight: '600',
  letterSpacing: '0%',
  lineHeight: vars.lineHeightTight,
  borderRadius: '10px',
  whiteSpace: 'nowrap',
  selectors: {
    '&:hover:not(:disabled)': { opacity: 0.9 },
  },
  ':disabled': { cursor: 'not-allowed' },
});

export const button = style([base, size.md, variant.solid]);
export const fullWidth = style({ width: '100%' });

export {
  base as buttonBase,
  size as buttonSize,
  variant as buttonVariant,
  circular as buttonCircular,
  pill as buttonPill,
};
