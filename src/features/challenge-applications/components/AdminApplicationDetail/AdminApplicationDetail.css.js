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

// 번호와 이전·다음 버튼 영역
export const detailHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

// 신청 번호
export const number = style({
  fontSize: '16px',
  fontWeight: '500',
  color: '#262626',
});

// 이전·다음 버튼 그룹
export const navigation = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

// 이전·다음 버튼
export const navigationButton = style({
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#262626',
  fontSize: '30px',
  fontWeight: '300',
  cursor: 'pointer',

  selectors: {
    '&:disabled': {
      color: '#A3A3A3',
      cursor: 'not-allowed',
    },
  },
});

export const rejectionDivider = style({
  borderTop: '1px solid #E5E5E5',
  marginTop: '24px',
  marginBottom: '16px',
});
