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
});

const tabBase = style({
  position: 'relative',
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
        bottom: '-1px',
        height: '2px',
        backgroundColor: vars.colorGray900,
      },
    },
  },
]);
