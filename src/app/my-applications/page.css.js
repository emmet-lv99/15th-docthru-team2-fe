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
  padding: '24px',
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
  gap: '8px',
});

//탭 메뉴 전체
export const tabs = style({
  display: 'flex',
  gap: 'clamp(0px, 2vw, 24px)',
  borderBottom: '1px solid #d4d4d4',
  marginBottom: '30px',
  overflowX: 'auto',
});

//탭 단일
export const tab = style({
  padding: '0 clamp(4px, 2vw, 24px) 16px',
  fontSize: '18px',
  fontWeight: '600',
  color: '#737373',
  textDecoration: 'none',

  whiteSpace: 'nowrap',
  flexShrink: 0,
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

// 검색창과 돋보기 아이콘을 감싸는 영역
export const searchWrapper = style({
  position: 'relative',
  flex: 1,
  minWidth: 0,
});

// 검색창 왼쪽 돋보기 아이콘
export const searchIcon = style({
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
});

//검색창
export const searchInput = style({
  width: '100%',
  boxSizing: 'border-box',
  height: '40px',
  padding: '0 20px',
  border: '1px solid #e5e5e5',
  borderRadius: '30px',
  backgroundColor: '#FFFFFF',
  fontSize: '16px',
  outline: 'none',
  paddingLeft: '44px',
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
