import { vars } from '@/styles/theme.css';
import { radius } from '@/styles/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  display: 'inline-block',
});

export const kebabButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  background: 'none',
  border: 'none',
  borderRadius: radius.md,
  fontSize: '20px',
  color: vars.colorGray600,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, color 0.15s ease',

  ':hover': {
    backgroundColor: vars.colorBrand3,
    color: vars.colorGray900,
  },
  ':active': {
    backgroundColor: vars.colorGray200,
  },
});

export const dropdown = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  right: 0,
  minWidth: '110px',
  backgroundColor: '#FFFFFF',
  borderRadius: radius.md,
  border: `1px solid ${vars.colorGray300}`,
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  padding: '4px 0',
  zIndex: 50,
  display: 'flex',
  flexDirection: 'column',
});

export const menuItem = style({
  width: '100%',
  padding: '8px 16px',
  textAlign: 'left',
  background: 'none',
  border: 'none',
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray800,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',

  ':hover': {
    backgroundColor: vars.colorBrand3,
  },
});

// 삭제 버튼: 시각적 주의를 위한 레드 컬러
export const deleteItem = style({
  color: vars.colorRedError,
  ':hover': {
    backgroundColor: '#FEE2E2', // 연한 레드 호버 배경
  },
});
