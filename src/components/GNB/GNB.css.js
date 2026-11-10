// src/components/GNB/GNB.css.js
// 근거: 공용 컴포넌트/gnb.png 원본 확인 (2026-10-01)
//
// 원본 9가지 변형 = 기기(PC · Tablet · Mobile) × 권한(비로그인 · 일반 · 어드민)
//   비로그인 : 로고 + 로그인 버튼
//   일반     : 로고 + 알림벨 + 등급(ELA) 배지
//   어드민   : 로고 + 챌린지 관리 + 챌린지 목록 + 어드민 배지
import { vars } from '@/styles/theme.css.js';
import { style, styleVariants } from '@vanilla-extract/css';

const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  width: '100%',
  borderBottom: `1px solid ${vars.colorGray100}`,
  backgroundColor: '#FFFFFF',
});

const inner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  width: '100%',
  maxWidth: '1200px',
  height: vars.headerHeight,
  margin: '0 auto',
  padding: '0 24px',
});

const logo = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  flex: 'none',
  fontFamily: vars.fontQuantico,
  fontSize: '21.6px',
  fontWeight: '700',
  letterSpacing: '0.2889px',
  color: vars.colorGray600,
});

const nav = style({
  display: 'flex',
  alignItems: 'center',
});

const navLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '21px 17px',
  fontFamily: vars.fontFamily,
  fontSize: '15px',
  fontWeight: '700',
  letterSpacing: '0%',
  color: vars.colorGray500,
  whiteSpace: 'nowrap',
});

/** 어드민 전용 메뉴는 검은 배경 + 흰 글씨 (원본 "챌린지 관리") */
const navLinkAdmin = style({
  composes: navLink,
  color: vars.colorGray800,
  fontWeight: '700',

  ':hover': {
    color: vars.colorGray900,
    backgroundColor: vars.colorGray50,
  },
});

const activeNavLink = style({
  color: vars.colorGray800,
  fontWeight: '700',
});

const right = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 'none',
});

const iconButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  width: '32px',
  height: '32px',
  padding: 0,
  borderRadius: '9999px',
  backgroundColor: 'transparent',
  border: 'none',
  color: vars.colorGray800,
  cursor: 'pointer',
  ':hover': { backgroundColor: vars.colorGray100 },
  selectors: {
    // 알림이 있으면 점 표시
    '&[data-has-unread="true"]::after': {
      content: '""',
      position: 'absolute',
      top: '4px',
      right: '4px',
      width: '6px',
      height: '6px',
      borderRadius: '9999px',
      backgroundColor: vars.colorRedError,
    },
  },
});

const iconButtonPositioned = style({ position: 'relative' });

/** 등급(ELA) · 어드민 배지 — 노랑 배경 + 진한 테두리 */
const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  minWidth: '28px',
  height: '24px',
  padding: '0 6px',
  borderRadius: '9999px',
  backgroundColor: vars.colorBrand2,
  boxShadow: `inset 0 0 0 1px ${vars.colorGray800}`,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-12)',
  fontWeight: '700',
  letterSpacing: '0%',
  color: vars.colorGray900,
});

/** 기기별 — 원본 3행(PC · Tablet · Mobile) 이 각각 3줄씩 총 9변형 */
const device = styleVariants({
  pc: { gap: '20px' },
  tablet: { gap: '16px' },
  mobile: { gap: '12px' },
});

const mobileInner = style({
  '@media': {
    'screen and (max-width: 767px)': {
      padding: '0 16px',
      gap: '8px',
    },
  },
});

const mobileLogo = style([
  logo,
  {
    fontSize: 'var(--font-size-16)',
  },
]);

const logoImage = style({
  width: '110px',
  height: 'auto',

  '@media': {
    '(max-width: 767px)': {
      width: '110px',
    },
  },
});

const hideOnMobile = style({
  '@media': {
    '(max-width: 767px)': { display: 'none' },
  },
});

const left = style({
  display: 'flex',
  gap: '24px',
});

export {
  badge,
  device,
  header,
  hideOnMobile,
  iconButton,
  iconButtonPositioned,
  inner,
  left,
  logo,
  logoImage,
  mobileInner,
  mobileLogo,
  nav,
  navLink,
  navLinkAdmin,
  activeNavLink,
  right,
};
