import { style } from '@vanilla-extract/css';

// 승인·거절 버튼 영역
export const actionGroup = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '12px',

  // 버튼 위 구분선
  borderTop: '1px solid #E5E5E5',
  marginTop: '24px',
  paddingTop: '24px',
});

// 거절하기 버튼
export const rejectButton = style({
  width: '140px',
  padding: '12px 16px',
  borderRadius: '12px',
  backgroundColor: '#FFE7E7',
  color: '#F24744',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
});

// 승인하기 버튼
export const approveButton = style({
  width: '140px',
  padding: '12px 16px',
  borderRadius: '12px',
  backgroundColor: '#262626',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
});

export const number = style({
  fontSize: '16px',
  fontWeight: '500',
  marginBottom: '10px',
});
