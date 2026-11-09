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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: space.sm,
  width: '100%',
  padding: space.lg,
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
export const unread = style({
  backgroundColor: vars.colorGray50,
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
  fontSize: 'var(--font-size-12)',
  color: vars.colorGray500,
});

// 로딩, 오류, 빈 목록
export const status = style({
  padding: space.xl,
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray500,
  textAlign: 'center',
});
