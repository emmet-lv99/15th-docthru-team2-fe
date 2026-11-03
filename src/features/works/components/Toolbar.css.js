import { style } from '@vanilla-extract/css';

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  padding: '16px 0',
});

export const buttonGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
});

export const toolbarButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px', // 👈 아이콘(24px)보다 살짝 여유 있는 크기
  height: '28px',
  borderRadius: '4px', // 👈 둥근 모서리
  padding: 0,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  ':hover': {
    backgroundColor: '#F3F4F6', // hover 시 살짝 연한 회색 배경
  },
});

export const activeButton = style({
  backgroundColor: '#E5E7EB', // 👈 호버보다 한 톤 더 확실하게 짙은 회색 (선명하게 켜짐)
  fontWeight: 'bold',
  ':hover': {
    backgroundColor: '#D1D5DB', // 👈 활성화된 상태에서 호버할 땐 더 짙게
  },
});
