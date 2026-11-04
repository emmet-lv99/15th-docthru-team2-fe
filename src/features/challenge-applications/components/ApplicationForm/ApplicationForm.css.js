import { style, globalStyle } from '@vanilla-extract/css';

// 신청 페이지 전체 컨테이너
export const container = style({
  width: '100%',
  maxWidth: '590px',
  margin: '0 auto',
  padding: '32px 24px 64px',
});

// 신규 챌린지 신청 제목
export const title = style({
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '36px',
  color: '#262626',
});

// 신청서 전체 폼 레이아웃
export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

// 각 입력 항목 그룹 (라벨 + 입력창)
export const formGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

// 라벨 텍스트
globalStyle(`${formGroup} label`, {
  fontSize: '14px',
  fontWeight: '500',
  color: '#171717',
});

// input, select, textarea 공통 스타일
globalStyle(`${formGroup} input, ${formGroup} select, ${formGroup} textarea`, {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  borderRadius: '10px',
  fontSize: '16px',
  fontWeight: '400',
  color: '#262626',
  backgroundColor: '#FFFFFF',
  boxSizing: 'border-box',
});

// input과 textarea의 안내 문구
globalStyle(`${formGroup} input::placeholder, ${formGroup} textarea::placeholder`, {
  color: '#a3a3a3',
});

// 선택하기 전 드롭다운 안내 문구
globalStyle(`${formGroup} select:invalid`, {
  color: '#a3a3a3',
});

// 내용 입력창
globalStyle(`${formGroup} textarea`, {
  resize: 'vertical',
  minHeight: '180px',
});

// 입력창 포커스 시 기존 디자인을 유지하는 테두리
globalStyle(`${formGroup} input:focus-visible, ${formGroup} textarea:focus-visible`, {
  outline: '1px solid #D4D4D4',
});

// 신청하기 버튼
export const submitButton = style({
  width: '100%',
  padding: '14px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#262626',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      backgroundColor: '#404040',
    },

    '&:focus-visible': {
      outline: '2px solid #262626',
      outlineOffset: '3px',
    },
  },
});

// 드롭다운 ===========================================

// 드롭다운 전체 영역
export const dropdown = style({
  position: 'relative',
  width: '100%',
});

// 드롭다운 선택 버튼
export const dropdownTrigger = style({
  width: '100%',
  minHeight: '56px',
  padding: '12px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E5E5',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  textAlign: 'left',

  selectors: {
    '&:focus-visible': {
      outline: '2px solid #262626',
      outlineOffset: '2px',
    },
  },
});

// 선택 전 안내 문구
export const dropdownPlaceholder = style({
  color: '#A3A3A3',
});

// 선택한 값
export const dropdownValue = style({
  color: '#262626',
});

// 드롭다운 화살표
export const dropdownArrow = style({
  fontSize: '22px',
  color: '#262626',
  lineHeight: 1,
});

// 펼쳐지는 옵션 목록
export const dropdownMenu = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  width: '100%',
  zIndex: 10,
  backgroundColor: '#FFFFFF',
  border: '1px solid #D4D4D4',
  borderRadius: '8px',
  overflow: 'hidden',
});

// 각 선택 항목
export const dropdownOption = style({
  display: 'block',
  width: '100%',
  padding: '12px 16px',
  border: 'none',
  borderBottom: '1px solid #D4D4D4',
  backgroundColor: '#FFFFFF',
  color: '#737373',
  fontSize: '16px',
  textAlign: 'center',
  cursor: 'pointer',

  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },

    '&:hover': {
      backgroundColor: '#F5F5F5',
    },

    '&:focus-visible': {
      outline: '2px solid #262626',
      outlineOffset: '-2px',
    },
  },
});

// 마감일
// 마감일 입력창을 감싸는 영역
export const dateWrapper = style({
  position: 'relative',
  width: '100%',
});

// 날짜 미선택 시 안내 문구
export const datePlaceholder = style({
  position: 'absolute',
  top: '50%',
  left: '16px',
  transform: 'translateY(-50%)',
  color: '#B3B3B3',
  fontSize: '16px',
  pointerEvents: 'none',
  zIndex: 1,
});

// 날짜를 선택하지 않은 상태
export const dateEmpty = style({
  color: 'transparent',
  WebkitTextFillColor: 'transparent',

  selectors: {
    '&::-webkit-datetime-edit': {
      color: 'transparent',
    },
  },
});

// 날짜를 선택한 상태
export const dateSelected = style({
  color: '#262626',
  WebkitTextFillColor: '#262626',
});
