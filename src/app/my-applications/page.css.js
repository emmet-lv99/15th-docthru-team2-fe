import { style } from '@vanilla-extract/css';

//배경
export const pageBackground = style({
  backgroundColor: '#FAFAFA',
  minHeight: '100dvh',
  paddingTop: '30px',
});

//페이지 전체
export const container = style({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '40px, 24px',
});

//제목과 신규신청
export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

//제목
export const title = style({
  fontSize: '20px',
  fontWeight: '600',
});

//신규신청 버튼
export const newButton = style({
  height: '40px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 20px',
  borderRadius: '24px',
  backgroundColor: '#262626',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
});

//탭 메뉴 전체
export const tabs = style({
  display: 'flex',
  gap: '24px',
  borderBottom: '1px solid #d4d4d4',
  marginBottom: '30px',
});

//탭 단일
export const tab = style({
  padding: '0 24px 16px',
  fontSize: '18px',
  fontWeight: '600',
  color: '#737373',
  textDecoration: 'none',
});

//선택된탭
export const activeTab = style({
  color: '#262626',
  borderBottom: '3px solid #262626',
  marginBottom: '-1px',
});

//검색창과 드롭다운
export const filterBar = style({
  display: 'flex',
  gap: '16px',
  marginBottom: '30px',
});

//검색창
export const searchInput = style({
  flex: 1,
  minWidth: 0,
  width: '844px',
  height: '40px',
  padding: '0 20px',
  border: '1px solid #e5e5e5',
  borderRadius: '30px',
  backgroundColor: '#FFFFFF',
  fontSize: '16px',
  outline: 'none',

  selectorys: {
    '&:focus': {
      borderColor: '#262626',
    },
  },
});

//드롭다운
export const statusSelect = style({
  width: '140px',
  height: '40px',
  padding: '10px',
  borderRadius: '30px',
  border: '1px solid #e5e5e5',
  color: '#a3a3a3',
  fontSize: '16px',
  fontWeight: '400',
});

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
