// src/components/GNB/ProfileMenu.css.js
//
// 프로필 배지 드롭다운 — 배지 모양은 GNB.css.js 의 badge 를 그대로 쓰고,
// 여기서는 버튼 리셋과 메뉴 상자만 담당해요.
import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.js';

export const wrap = style({
  position: 'relative',
  display: 'inline-flex',
  flex: 'none',
});

/** 배지(badge) 위에 버튼 기본값만 덮어써요 */
export const trigger = style({
  border: 'none',
  cursor: 'pointer',
  padding: '0 6px',
});

export const menu = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  zIndex: 200,
  minWidth: '168px',
  margin: 0,
  padding: '6px',
  listStyle: 'none',
  border: `1px solid ${vars.colorGray200}`,
  borderRadius: '12px',
  backgroundColor: '#fff',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
});

export const item = style({
  display: 'block',
});

export const link = style({
  display: 'block',
  width: '100%',
  padding: '10px 12px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  fontWeight: '500',
  color: vars.colorGray800,
  textAlign: 'left',
  textDecoration: 'none',
  cursor: 'pointer',
  selectors: {
    '&:hover': { backgroundColor: vars.colorGray50 },
    '&:disabled': { cursor: 'not-allowed', opacity: 0.5 },
  },
});
