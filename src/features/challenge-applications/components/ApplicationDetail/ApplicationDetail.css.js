import { style } from '@vanilla-extract/css';

// 상세 페이지 전체 컨테이너
export const container = style({
  width: '100%',
  maxWidth: '890px',
  margin: '0 auto',
  padding: '24px 24px 80px',
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
  marginTop: '16px',
});

// 신청 정보 영역
export const infoSection = style({
  minWidth: 0,
});

//마감일 모집인원 아이콘 문구
export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
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

// 점 3개 설정 버튼
export const settingsButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
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
  width: '140px',
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
  marginTop: '20px',
  paddingTop: '16px',
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
  minHeight: '490px',
  backgroundColor: '#262626',
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
  padding: '5px 10px',
  borderRadius: '10px',
  backgroundColor: 'rgba(246, 248, 250, 0.8)',
  color: '#404040',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '700',
});

// 모달 =========================

// 모달 배경
export const modalOverlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

// 모달 본문
export const modalContent = style({
  width: '327px',
  maxWidth: 'calc(100vw - 32px)',
  padding: '24px',
  borderRadius: '12px',
  backgroundColor: '#FFFFFF',
  border: '2px solid #262626',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
});

// 모달 아이콘과 문구 배치
export const modalMessage = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  width: '100%',
});

// 확인 문구
export const modalText = style({
  margin: 0,
  fontSize: '16px',
  fontWeight: '500',
  color: '#262626',
  textAlign: 'center',
});

// 버튼 영역
export const modalButtons = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  width: '100%',
});

// 아니오 버튼
export const modalNoButton = style({
  width: '90px',
  height: '40px',
  border: '1px solid #262626',
  borderRadius: '12px',
  backgroundColor: '#FFFFFF',
  color: '#262626',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
});

// 네 버튼
export const modalYesButton = style({
  width: '90px',
  height: '40px',
  border: 'none',
  borderRadius: '12px',
  backgroundColor: '#262626',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
});

// 거절 상태 배너
export const rejectedBanner = style({
  padding: '8px 16px',
  borderRadius: '999px',
  backgroundColor: '#FFF0F0',
  color: '#E54946',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
});

// 거절 사유 박스
export const rejectionBox = style({
  marginTop: '16px',
  padding: '18px 24px',
  border: '1px solid #E5E5E5',
  borderRadius: '16px',
  backgroundColor: '#FAFAFA',
});

// 거절 사유 제목
export const rejectionTitle = style({
  margin: 0,
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: '600',
  color: '#262626',
});

// 거절 사유 내용
export const rejectionText = style({
  margin: '12px 0 17px',
  textAlign: 'center',
  fontSize: '16px',
  color: '#404040',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
});

// 거절 처리 정보
export const rejectionMeta = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '5px',
  color: '#737373',
  fontSize: '14px',
});

// 거절 사유 박스 아래 구분선
export const rejectionDivider = style({
  width: '100%',
  height: '1px',
  backgroundColor: '#E5E5E5',
  marginTop: '24px',
});

// 승인 완료 배너
export const approvedBanner = style({
  padding: '8px 16px',
  borderRadius: '999px',
  backgroundColor: '#DFF0FF',
  color: '#4095DE',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
});

// 삭제된 챌린지 배너
export const deletedBanner = style({
  padding: '8px 16px',
  borderRadius: '999px',
  backgroundColor: '#777777',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
});
