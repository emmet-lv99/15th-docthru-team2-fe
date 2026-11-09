import { style, globalStyle } from '@vanilla-extract/css';

//표전체
export const tableWrapper = style({
  width: '100%',
  overflowX: 'auto',
});

//표
export const table = style({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0',
  textAlign: 'left',
  whiteSpace: 'nowrap',
});

//표 제목 가로
export const tableHeader = style({
  backgroundColor: '#262626',
  borderRadius: '8px',
});

//표 제목 칸
export const tableHeading = style({
  backgroundColor: '#262626',
  padding: '10px 16px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#ffffff',
  selectors: {
    '&:first-child': {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    '&:last-child': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    },
  },
});

//표 데이터 칸
export const tableCell = style({
  height: '48px',
  padding: '15px 16px',
  fontSize: '13px',
  fontWeight: '400',
  color: '#737373',
  borderBottom: '1px solid #eeeeee',

  selectors: {
    'tbody tr:first-child &': {
      borderTop: '8px solid #FAFAFA',
    },
  },
});

//챌린지 제목
export const challengeTitle = style({
  textAlign: 'left',
  fontWeight: '600',
  fontSize: '13px',
  fontWidth: '500',
  color: '#404040',
});

/* =============
상태별색상적용
================= */

//상태 기본 스타일
export const statusBadge = style({
  display: 'inline-block',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: '600',
  backgroundColor: '#FFFDE7',
  color: '#F2BC00',
});

export const pendingBadge = style({
  backgroundColor: '#FFFDE7',
  color: '#f2b200',
});

export const approvedBadge = style({
  backgroundColor: '#DFF0FF',
  color: '#4095DE',
});

export const rejectedBadge = style({
  backgroundColor: '#FFF0F0',
  color: '#E54946',
});

export const deletedBadge = style({
  backgroundColor: '#E5E5E5',
  color: '#737373',
});

export const tableRow = style({
  backgroundColor: '#ffffff',
});

export const deletedRow = style({
  backgroundColor: '#fafafa',
});

// ========= 페이지네이션

//페이지 번호버튼
export const pageButton = style({
  width: '40px',
  height: '40px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  color: '#A3A3A3',
  fontSize: '16px',
  cursor: 'pointer',
});

//선택된 페이지 버튼
export const activePage = style({
  width: '40px',
  height: '40px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#262626',
  color: '#FFC117',
  fontSize: '16px',
  cursor: 'pointer',
});

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  marginTop: '40px',
});

export const emptyMessage = style({
  minHeight: '550px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#737373',
  fontSize: '16px',
  fontWeight: 400,
});

// 페이지네이션의 기본 화살표 버튼
globalStyle(`${pagination} button:disabled`, {
  cursor: 'not-allowed',
});

// 비활성화된 화살표 아이콘을 밝은 회색으로 표시
globalStyle(`${pagination} button:disabled img`, {
  opacity: 0.3,
});

// 활성화된 화살표 아이콘은 진하게 표시
globalStyle(`${pagination} button:not(:disabled) img`, {
  opacity: 1,
});

// 페이지네이션 화살표 버튼 정렬
export const arrowButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  width: '40px',
  height: '40px',
  border: 'none',
  background: 'transparent',
});

// 신청 상세 페이지 이동 링크
export const detailLink = style({
  color: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
});
