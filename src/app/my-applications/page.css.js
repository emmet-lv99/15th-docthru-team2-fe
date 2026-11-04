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



