// src/components/Input/TextBox.css.js
// 근거: 공용 컴퍼넌트/text-box.png
//
// ★ 스타일 뼈대 — 값은 담당자가 근거 PNG 에 맞춰 채워 주세요.
//
// 🎨 토큰 규칙 — 색은 hex 로 직접 쓰지 말고 theme.css.js 의 vars 토큰을 써 주세요.
//    이유는 한 군데 고치면 전 화면에 반영되기 때문이에요. 예시는 Button.css.js 를 보세요:
//
//      import { style, styleVariants } from '@vanilla-extract/css';
//      import { vars } from '@/styles/theme.css.js';
//
//      export const size = styleVariants({
//        sm: { height: '32px', padding: '0 12px', fontSize: 'var(--font-size-13)' },
//      });
//
// 🧩 병합 셀렉터(selectors)는 & 로 끝나야 합니다. hover 는 style() 최상위 키로 넣을 수 있어요.

import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

// 자리표 — 지금은 스타일이 비어 있어요. 채워 주시면 base 이름을 그대로 쓰시면 됩니다.
export const base = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

export const field = base;

export const label = style({
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  fontWeight: '500',
  color: vars.colorGray800,
});

export const textarea = style({
  display: 'block',
  width: '100%',
  minHeight: '120px',
  padding: '12px 16px',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '8px',
  backgroundColor: '#FFFFFF',
  color: vars.colorGray700,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  lineHeight: vars.lineHeightRelaxed,
  resize: 'vertical',
  boxSizing: 'border-box',

  '::placeholder': {
    color: vars.colorGray400,
  },

  ':focus': {
    outline: 'none',
    borderColor: vars.colorBrand1,
  },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
});

export const readOnly = style({
  backgroundColor: vars.colorGray50,
  cursor: 'default',
});

export const textareaError = style({
  borderColor: vars.colorBrand2,
});

export const hint = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  color: vars.colorGray500,
});

export const error = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  color: vars.colorBrand2,
});