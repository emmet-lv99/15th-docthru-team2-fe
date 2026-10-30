// src/features/auth/components/AuthForm/AuthForm.css.js
//
// 👤 담당: 팀원 ③(인증 · 마이)
// 🔨 상태: 뼈대 — 인증 화면 전용 레이아웃 골격만 제공해요.
//
// 이 파일이 하는 일
//   · 로그인·회원가입 두 화면이 함께 쓰는 바깥 틀(배경·가운데 정렬·폼 폭·푸터)만 담당해요.
//   · 로그인/가입 화면만의 세부 디자인(색·간격·반응형 미세 조정)은 담당자가 이 파일에서 마무리해요.
//
// 🎨 근거
//   · 인증 화면은 연회색 배경 + 가운데 정렬 + 좁은 폼 폭이에요.
//   · 색은 가능한 한 src/styles/theme.css.js 의 vars 토큰을 쓰고, 새 색이 필요하면
//     hex 를 여기서 직접 만들기보다 theme.css.js 에 토큰을 추가할지 먼저 팀에 제안해 주세요.
//   · GNB 높이는 layout.js 의 실제 값과 맞춰야 해요 — 지금은 --gnb-height 폴백을 써요.
//
// 🚫 수정하지 않는 파일
//   · src/components/Input, Button — 공용 부품은 각 담당자 몫이에요.
//   · src/contexts/AuthProvider.jsx, src/lib/client.js — ③ 담당 인증 인프라예요.
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const container = style({
  width: '100%',
  minHeight: 'calc(100vh - var(--gnb-height, 60px))',
  padding: 'clamp(2rem, 8vw, 7.5rem) clamp(1rem, 4vw, 2.5rem)',
  backgroundColor: vars.colorBrand3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
});

export const logoBlock = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '40px',
  textDecoration: 'none',
});

export const logoText = style({
  fontFamily: vars.fontQuantico,
  fontSize: '57.6px',
  fontWeight: '700',
  letterSpacing: '0.065rem',
  color: vars.colorGray600,
});

export const form = style({
  width: '100%',
  maxWidth: '32.375rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

// ── 입력 필드 ────────────────────────────────────────────────
// 공용 Input 이 아직 뼈대라, 인증 화면 안에서만 쓰는 로컬 필드를 둡니다.
// (공용 부품을 침범하지 않으면서 로그인·가입이 실제로 동작하게 하기 위해서예요)
export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const label = style({
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  fontWeight: '600',
  color: vars.colorGray800,
});

export const input = style({
  width: '100%',
  height: '48px',
  padding: '0 14px',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '10px',
  backgroundColor: vars.colorGray50,
  color: vars.colorGray900,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-16)',
  outline: 'none',
  boxSizing: 'border-box',
  selectors: {
    '&::placeholder': { color: vars.colorGray400 },
    '&:focus': { borderColor: vars.colorBrand1 },
  },
});

export const inputError = style([
  input,
  {
    borderColor: vars.colorRedError,
    selectors: {
      '&:focus': { borderColor: vars.colorRedError },
    },
  },
]);

export const inputWrap = style({
  position: 'relative',
});

export const toggleButton = style({
  position: 'absolute',
  top: '50%',
  right: '8px',
  transform: 'translateY(-50%)',
  /** 24px 아이콘 + 사방 4px 여백 = 누르기 쉬운 32px 버튼 */
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
});

export const hint = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  color: vars.colorGray500,
});

export const errorText = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  color: vars.colorRedError,
});

export const formError = style({
  margin: 0,
  padding: '12px 14px',
  borderRadius: '10px',
  backgroundColor: '#FDECEC',
  color: vars.colorRedError,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  lineHeight: vars.lineHeightRelaxed,
});

export const successText = style({
  margin: 0,
  padding: '12px 14px',
  borderRadius: '10px',
  backgroundColor: vars.colorGray100,
  color: vars.colorGray800,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  lineHeight: vars.lineHeightRelaxed,
});

export const forgotRow = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '-8px',
});

export const subtleLink = style({
  color: vars.colorGray500,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  textDecoration: 'underline',
});

export const submitButton = style({
  marginTop: '8px',
});

export const googleButton = style({
  gap: '8px',
  fontWeight: '400',
  color: vars.colorGray800,
  backgroundColor: '#ffffff',
  boxShadow: `inset 0 0 0 1px ${vars.colorGray200}`,
  selectors: {
    '&:hover:not(:disabled)': { backgroundColor: vars.colorGray50, opacity: 1 },
  },
});

export const footer = style({
  marginTop: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '6px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray500,
});

export const footerLink = style({
  color: vars.colorBrand1,
  fontWeight: '700',
  textDecoration: 'underline',
});
