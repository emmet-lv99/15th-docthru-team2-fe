import { style } from '@vanilla-extract/css';

// 상세 페이지 전체 컨테이너
export const container = style({
  width: '100%',
  maxWidth: '890px',
  margin: '0 auto',
  padding: '32px 24px 80px',
});

// 상태 안내 배너
export const statusBanner = style({
  padding: '8px 16px',
  borderRadius: '999px',
  backgroundColor: '#FFFDE7',
  color: '#F2BC00',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
});

export const detailLayout = style({
  position: 'relative',
  marginTop: '24px',
});

// 신청 정보 영역
export const infoSection = style({
  minWidth: 0,
});

// 제목 오른쪽 관리 버튼 영역
export const actionGroup = style({
  position: 'absolute',
  top: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '12px',
});

// 점 세 개 설정 버튼
export const settingsButton = style({
  border: 'none',
  backgroundColor: 'transparent',
  fontSize: '28px',
  lineHeight: '24px',
  cursor: 'pointer',
});

// 챌린지 제목
export const title = style({
  margin: 0,
  fontSize: '24px',
  fontWeight: '600',
  color: '#262626',
});

//========================= 배지 스타일===================

// 분야 및 문서 타입 배지
export const badgeGroup = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  marginTop: '16px',
});

// 모든 배지에 공통 적용
export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 10px',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#4B4B4B',
  fontFamily: 'Quantico',
});

// 분야 배지 폰트
export const categoryBadge = style({
  fontWeight: '700',
});

// Next.js 분야 배지
export const nextJsBadge = style({
  backgroundColor: '#79E16A',
});

// API 분야 배지
export const apiBadge = style({
  backgroundColor: '#FF905E',
});

// Career 분야 배지
export const careerBadge = style({
  backgroundColor: '#7EB2EE',
});

// Modern JS 분야 배지
export const modernJsBadge = style({
  backgroundColor: '#F66E6B',
});

// Web 분야 배지
export const webBadge = style({
  backgroundColor: '#F7EA5D',
});

// 문서 타입 배지
export const documentBadge = style({
  backgroundColor: '#FFFFFF',
  border: '1px solid #D4D4D4',
  fontWeight: '500',
  fontSize: '13px',
});

// 챌린지 설명
export const description = style({
  marginTop: '16px',
  marginBottom: 0,
  color: '#262626',
  fontSize: '16px',
  fontWeight: '500',
  overflowWrap: 'anywhere',
});

// 마감일 및 모집 인원
export const metaInfo = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  marginTop: '20px',
  fontSize: '13px',
  fontWeight: '400',
  color: '#525252',
});

// 취소하기 버튼
export const cancelButton = style({
  padding: '10px 16px',
  border: '1px solid #D4D4D4',
  borderRadius: '8px',
  backgroundColor: '#FFFFFF',
  color: '#737373',
  fontSize: '16px',
  cursor: 'pointer',
});

// 원문 링크 가로 선
export const sourceSection = style({
  marginTop: '32px',
  paddingTop: '24px',
  borderTop: '1px solid #E5E5E5',
});

// 원문 링크 제목
export const sourceTitle = style({
  margin: '0 0 16px',
  fontSize: '18px',
  fontWeight: '600',
  color: '#262626',
});

// 원문 미리보기 전체 영역
export const sourceContent = style({
  position: 'relative',
  width: '100%',
  minHeight: '420px',
  border: '1px solid #E5E5E5',
  borderRadius: '12px',
  backgroundColor: '#FAFAFA',
  overflow: 'hidden',
});

// 추후 미리보기 이미지가 들어갈 영역
export const previewArea = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '420px',
  color: '#A3A3A3',
  fontSize: '14px',
});

// 미리보기 오른쪽 상단 링크 버튼
export const sourceLink = style({
  position: 'absolute',
  top: '16px',
  right: '16px',
  zIndex: 1,
  padding: '8px 14px',
  borderRadius: '10px',
  backgroundColor: 'rgba(246, 248, 250, 0.8)',
  color: '#404040',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '700',
});
