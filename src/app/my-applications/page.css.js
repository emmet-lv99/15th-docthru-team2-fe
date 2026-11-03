import { style } from '@vanilla-extract/css';

//배경
export const pageBackground = style({
  backgroundColor: '#FAFAFA',
  minHeight: '100dvh',
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
  fontSize: '24px',
  fontWeight: ' 700',
});

//신규신청 버튼
export const newButton = style({
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
  gap: '32px',
  borderBottom: '1px solid #dddddd',
  marginBottom: '30px',
});

//탭 단일
export const tab = style({
  padding: '0 24px 16px',
  fontSize: '18px',
  fontWeight: '600',
  color: '#777777',
  textDecoration: 'none',
});

//선택된탭
export const activeTab = style({
  color: '#222222',
  borderBottom: '3px solid #222222',
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
  height: '50px',
  padding: '0 20px',
  border: '1px solid #dddddd',
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
  width: '175px',
  height: '50px',
  padding: '0 16px',
  borderRadius: '30px',
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
  padding: '16px 12px',
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
  padding: '20px 12px',
  fontSize: '14px',
  color: '#333333',
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
});

//상태 기본 스타일
export const statusBadge = style({
  display: 'inline-block',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600',
  backgroundColor: '#fff3d6',
  color: '#a66a00',
});

export const tableRow = style({
  backgroundColor: '#ffffff',
});

export const deletedRow = style({
  backgroundColor: '#fafafa',
});
