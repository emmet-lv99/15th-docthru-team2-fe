// src/features/my-challenges/components/MyChallengesTabs/MyChallengesTabs.css.js
//
// 탭 3개 스타일 — 아래쪽 1px 선 + 활성 탭만 2px 밑줄.
// 색·간격은 테마 토큰만 사용해요.
import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  borderBottom: `1px solid ${vars.colorGray200}`,
  marginBottom: '20px',
  // 좁은 화면에서 페이지 전체가 가로로 밀리지 않게, 탭 영역만 스크롤해요
  overflowX: 'auto',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

const tabBase = style({
  position: 'relative',
  // flex 안에서 찌그러지지 않고, 넘치면 스크롤되게 해요
  flex: 'none',
  padding: '8px 0 12px',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-16)',
  fontWeight: '500',
  color: vars.colorGray500,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  selectors: {
    '&:hover': { color: vars.colorGray800 },
  },
});

export const tab = style([tabBase]);

/** 활성 탭 — 진한 글자 + 2px 밑줄 (아래 1px 선 위에 겹쳐 그려요) */
export const activeTab = style([
  tabBase,
  {
    color: vars.colorGray900,
    fontWeight: '700',
    selectors: {
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '2px',
        backgroundColor: vars.colorGray900,
      },
    },
  },
]);
