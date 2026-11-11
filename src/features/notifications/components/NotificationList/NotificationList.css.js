import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { space, transition } from '@/styles/tokens';

// 알림 목록
export const list = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

// 개별 알림
export const item = style({
  borderBottom: `1px solid ${vars.borderColor}`,

  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

// 알림 클릭 영역
export const button = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: space.sm,
  width: '100%',
  padding: space.lg,
  paddingRight: '32px',
  border: 'none',
  backgroundColor: 'transparent',
  textAlign: 'left',
  cursor: 'pointer',
  transition: `background-color ${transition.duration.fast} ${transition.timing.ease}`,

  ':hover': {
    backgroundColor: vars.colorGray50,
  },
});

// 읽지 않은 알림
export const unreadDot = style({
  position: 'absolute',
  top: '50%',
  right: '14px',
  transform: 'translateY(-50%)',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: vars.colorBrand2,
});

// 알림 메시지
export const message = style({
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  lineHeight: vars.lineHeightRelaxed,
  color: vars.colorBrand1,
});

// 알림 생성 날짜
export const date = style({
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray400,
});

// 로딩, 오류, 빈 목록
export const status = style({
  padding: space.xl,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray500,
  textAlign: 'center',
});

// 재시도
export const retryContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '16px',
});

export const retryButton = style({
  padding: '8px 16px',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '6px',
  backgroundColor: '#FFFFFF',
  color: vars.colorGray800,
  fontFamily: vars.fontFamily,
  fontSize: '14px',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: vars.colorGray50,
  },

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const retryMessage = style({
  margin: 0,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray500,
  textAlign: 'center',
});
