// 마이페이지(③ 인증·마이) 전용 스타일 — 공용 부품은 건드리지 않고 이 화면 안에서만 써요.
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const page = style({
  width: '100%',
  maxWidth: '960px',
  margin: '0 auto',
  padding: '48px 20px 80px',
  boxSizing: 'border-box',
});

export const header = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: '16px',
  marginBottom: '28px',
  flexWrap: 'wrap',
});

export const title = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-24)',
  fontWeight: '700',
  color: vars.colorGray900,
});

export const subtitle = style({
  margin: '8px 0 0',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray500,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
});

export const card = style({
  padding: '24px',
  borderRadius: '16px',
  border: `1px solid ${vars.borderColor}`,
  backgroundColor: vars.colorGray50,
  boxShadow: vars.shadowCard,
});

export const cardTitle = style({
  margin: '0 0 18px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-18)',
  fontWeight: '700',
  color: vars.colorGray900,
});

export const profileRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '10px 0',
  borderBottom: `1px solid ${vars.colorGray100}`,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray600,
});

export const profileRowLast = style([
  profileRow,
  {
    borderBottom: 'none',
  },
]);

export const profileValue = style({
  color: vars.colorGray900,
  fontWeight: '600',
  textAlign: 'right',
  wordBreak: 'break-all',
});

export const statGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '12px',
  marginTop: '16px',
});

export const stat = style({
  padding: '14px 10px',
  borderRadius: '12px',
  backgroundColor: vars.colorBrand3,
  textAlign: 'center',
});

export const statValue = style({
  display: 'block',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-20)',
  fontWeight: '700',
  color: vars.colorGray900,
});

export const statLabel = style({
  display: 'block',
  marginTop: '4px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-12)',
  color: vars.colorGray500,
});

export const progressText = style({
  margin: '16px 0 0',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  lineHeight: vars.lineHeightRelaxed,
  color: vars.colorGray500,
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const actions = style({
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  marginTop: '4px',
});

export const dangerButton = style({
  marginTop: '16px',
  border: 'none',
  background: 'none',
  padding: 0,
  cursor: 'pointer',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  color: vars.colorRedError,
  textDecoration: 'underline',
});

export const feedback = style({
  margin: 0,
  padding: '10px 12px',
  borderRadius: '10px',
  backgroundColor: '#FDECEC',
  color: vars.colorRedError,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  lineHeight: vars.lineHeightRelaxed,
});

export const success = style({
  margin: 0,
  padding: '10px 12px',
  borderRadius: '10px',
  backgroundColor: vars.colorGray100,
  color: vars.colorGray700,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-13)',
  lineHeight: vars.lineHeightRelaxed,
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

export const dialog = style({
  width: '100%',
  maxWidth: '380px',
  padding: '24px',
  borderRadius: '16px',
  backgroundColor: vars.colorGray50,
  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
});

export const dialogTitle = style({
  margin: '0 0 10px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-18)',
  fontWeight: '700',
  color: vars.colorGray900,
});

export const dialogText = style({
  margin: '0 0 20px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  lineHeight: vars.lineHeightRelaxed,
  color: vars.colorGray600,
});

export const confirmBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '20px',
});

export const confirmRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  lineHeight: vars.lineHeightRelaxed,
  color: vars.colorGray700,
});

export const confirmInput = style({
  width: '100%',
  padding: '10px 12px',
  border: `1px solid ${vars.borderColor}`,
  borderRadius: '10px',
  backgroundColor: vars.colorGray50,
  color: vars.colorGray900,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  boxSizing: 'border-box',
  outline: 'none',
  ':focus': {
    borderColor: vars.colorGray700,
  },
});

export const dialogActions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
});
