import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const page = style({
  maxWidth: '1044px',
  width: '100%',
  margin: '0 auto',
  padding: '24px 24px 88px',
  '@media': { '(max-width: 640px)': { padding: '16px 16px 64px' } },
});
export const listHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
});
export const listTitle = style({
  margin: 0,
  fontSize: '20px',
  fontWeight: 700,
  color: vars.colorGray800,
});
export const newChallenge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40px',
  padding: '0 16px',
  borderRadius: '24px',
  backgroundColor: vars.colorGray800,
  color: vars.colorGray50,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  fontSize: '14px',
  fontWeight: 600,
  selectors: {
    '&:hover': { backgroundColor: vars.colorGray700 },
    '&:focus-visible': { outline: '3px solid ' + vars.colorBrand2, outlineOffset: '2px' },
  },
  '@media': { '(max-width: 640px)': { padding: '0 12px', fontSize: '13px' } },
});
export const listToolbar = style({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  margin: '16px 0 24px',
  '@media': { '(max-width: 640px)': { gap: '8px', marginBottom: '16px' } },
});
export const filterAnchor = style({ position: 'relative', flex: 'none', zIndex: 5 });
export const filterAnchorOpen = style({ zIndex: 200 });
export const filterToggle = style({
  height: '40px',
  minWidth: '110px',
  padding: '0 12px',
  border: '1px solid ' + vars.colorGray200,
  borderRadius: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  font: 'inherit',
  fontSize: '14px',
  backgroundColor: vars.colorGray50,
  color: vars.colorGray600,
  cursor: 'pointer',
  selectors: { '&:focus-visible': { outline: '2px solid ' + vars.colorBrand2 } },
  '@media': { '(max-width: 640px)': { minWidth: '100px' } },
});
export const filterPopover = style({
  position: 'absolute',
  zIndex: 15,
  top: '48px',
  left: 0,
  width: '344px',
  maxWidth: 'calc(100vw - 32px)',
  padding: '16px',
  backgroundColor: vars.colorGray50,
  border: '1px solid ' + vars.colorGray300,
  borderRadius: '8px',
  boxShadow: '0 8px 20px rgba(0,0,0,.10)',
  color: vars.colorGray800,
  '@media': {
    '(max-width: 640px)': {
      position: 'fixed',
      inset: 0,
      width: '100vw',
      maxWidth: 'none',
      height: '100dvh',
      border: 0,
      borderRadius: 0,
      boxShadow: 'none',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
  },
});
export const popoverHeading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '12px',
  fontSize: '16px',
  fontWeight: 700,
});
export const closeFilter = style({
  padding: '0 4px',
  border: 0,
  background: 'transparent',
  fontSize: '24px',
  lineHeight: 1,
  cursor: 'pointer',
  color: vars.colorGray600,
});
export const filterGroup = style({
  margin: 0,
  padding: '12px 0',
  border: 0,
  borderTop: '1px solid ' + vars.colorGray200,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '::before': { display: 'none' },
});
export const filterOption = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '13px',
  color: vars.colorGray700,
});
export const filterSort = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  padding: '12px 0',
  borderTop: '1px solid ' + vars.colorGray200,
  fontSize: '13px',
  fontWeight: 600,
});
export const sortSelect = style({
  flex: 1,
  minWidth: 0,
  height: '32px',
  padding: '0 8px',
  border: '1px solid ' + vars.colorGray300,
  borderRadius: '6px',
  backgroundColor: vars.colorGray50,
  color: vars.colorGray800,
  font: 'inherit',
});
export const filterFooter = style({
  display: 'flex',
  gap: '8px',
  paddingTop: '8px',
  '@media': {
    '(max-width: 640px)': {
      position: 'sticky',
      bottom: 0,
      marginTop: 'auto',
      backgroundColor: vars.colorGray50,
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    },
  },
});
export const filterReset = style({
  flex: 1,
  height: '40px',
  borderRadius: '9px',
  border: '1px solid ' + vars.colorGray800,
  backgroundColor: vars.colorGray50,
  color: vars.colorGray800,
  font: 'inherit',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
});
export const filterApply = style({
  flex: 1,
  height: '40px',
  borderRadius: '9px',
  border: '1px solid ' + vars.colorGray800,
  backgroundColor: vars.colorGray800,
  color: vars.colorGray50,
  font: 'inherit',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
});
export const cards = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});
export const paginationArea = style({ marginTop: '36px' });
export const muted = style({ color: vars.colorGray600, fontSize: '14px', lineHeight: 1.6 });
export const error = style({
  padding: '18px',
  border: '1px solid ' + vars.colorRedError,
  borderRadius: '12px',
  color: vars.colorRedError,
  fontSize: '14px',
  lineHeight: 1.6,
});

// Challenge detail — Figma desktop inner content width 890px
export const detailPage = style({
  maxWidth: '938px',
  width: '100%',
  margin: '0 auto',
  padding: '24px 24px 88px',
  '@media': { '(max-width: 640px)': { padding: '16px 16px 64px' } },
});
export const backLink = style({
  display: 'inline-flex',
  marginBottom: '16px',
  alignItems: 'center',
  fontSize: '13px',
  color: vars.colorGray600,
  textDecoration: 'none',
});
export const detailTop = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0,1fr) 285px',
  gap: '32px',
  paddingBottom: '24px',
  borderBottom: '1px solid ' + vars.colorGray200,
  '@media': { '(max-width: 800px)': { gridTemplateColumns: 'minmax(0,1fr)', gap: '22px' } },
});
export const detailOverview = style({ minWidth: 0 });
export const detailTitle = style({
  margin: 0,
  color: vars.colorGray800,
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: 1.4,
  overflowWrap: 'anywhere',
  '@media': { '(max-width: 640px)': { fontSize: '20px' } },
});
export const detailTags = style({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '14px',
});
export const description = style({
  margin: '18px 0 16px',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  color: vars.colorGray700,
  fontSize: '14px',
  lineHeight: 1.6,
});
export const author = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  color: vars.colorGray700,
  fontSize: '13px',
});
// Figma ic_profile: 각 SVG를 원본 크기로 중첩하고 키보드 표시를 배치합니다.
export const avatar = style({
  position: 'relative',
  display: 'inline-flex',
  flex: 'none',
  width: '32px',
  height: '32px',
});
export const avatarOutline = style({
  position: 'absolute',
  left: '4px',
  top: '9px',
});
export const avatarUnderline = style({
  position: 'absolute',
  left: '8.85px',
  top: '18.9px',
});
export const avatarKeys = style({
  position: 'absolute',
  left: '12px',
  top: '12.25px',
  width: '1.6px',
  height: '1.6px',
  backgroundColor: vars.colorGray800,
  borderRadius: '0.2px',
  boxShadow:
    '3.2px 0 currentColor, 6.4px 0 currentColor, -1.6px 2.4px currentColor, ' +
    '1.6px 2.4px currentColor, 4.8px 2.4px currentColor, 8px 2.4px currentColor',
  color: vars.colorGray800,
});
export const actionPanel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  border: '1px solid ' + vars.colorGray200,
  borderRadius: '16px',
  padding: '16px',
  backgroundColor: vars.colorGray50,
  alignSelf: 'start',
  '@media': {
    '(max-width: 800px)': { maxWidth: '350px', width: '100%' },
    '(max-width: 640px)': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', display: 'grid' },
  },
});
export const detailStats = style({
  '@media': { '(max-width: 640px)': { gridColumn: '1 / -1' } },
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  color: vars.colorGray600,
  paddingBottom: '4px',
});
export const statItem = style({ display: 'inline-flex', alignItems: 'center', gap: '4px' });
export const sourceLink = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40px',
  padding: '8px 16px',
  borderRadius: '10px',
  border: '2px solid ' + vars.colorGray800,
  color: vars.colorGray800,
  backgroundColor: vars.colorBrand2,
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 700,
  selectors: {
    '&:focus-visible': { outline: '3px solid ' + vars.colorBrand2, outlineOffset: '2px' },
  },
});
export const sourceUnavailable = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40px',
  border: '1px solid ' + vars.colorGray300,
  borderRadius: '10px',
  fontSize: '13px',
  color: vars.colorGray500,
});
export const challengeAction = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '40px',
  borderRadius: '9px',
  border: 0,
  backgroundColor: vars.colorGray800,
  color: vars.colorGray50,
  textDecoration: 'none',
  font: 'inherit',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  selectors: {
    '&:disabled': { cursor: 'not-allowed', opacity: 0.6 },
    '&:focus-visible': { outline: '3px solid ' + vars.colorBrand2, outlineOffset: '2px' },
  },
});
export const actionError = style({
  '@media': { '(max-width: 640px)': { gridColumn: '1 / -1' } },
  margin: 0,
  color: vars.colorRedError,
  fontSize: '12px',
  lineHeight: 1.5,
});
export const featuredHeading = style({
  margin: '22px 0 12px',
  fontSize: '17px',
  fontWeight: 700,
});
export const featuredScroller = style({
  display: 'flex',
  gap: '16px',
  overflowX: 'auto',
  paddingBottom: '4px',
});
export const featuredCard = style({
  flex: '1 0 min(100%, 320px)',
  minWidth: 0,
  padding: '22px',
  border: '1px solid ' + vars.colorGray300,
  borderRadius: '14px',
});
export const featuredLabel = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  borderRadius: '20px',
  padding: '6px 10px',
  backgroundColor: vars.colorGray800,
  color: vars.colorBrand2,
  fontSize: '12px',
  fontWeight: 600,
});
export const featuredMeta = style({
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginTop: '14px',
  fontSize: '13px',
  color: vars.colorGray600,
});
export const featuredText = style({
  margin: '16px 0',
  color: vars.colorGray700,
  fontSize: '14px',
  lineHeight: 1.6,
  overflowWrap: 'anywhere',
  whiteSpace: 'pre-wrap',
});
export const featuredExpandButton = style({
  display: 'block',
  margin: '0 auto 12px',
  padding: '4px 12px',
  border: 0,
  backgroundColor: 'transparent',
  color: vars.colorGray800,
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  selectors: {
    '&:focus-visible': { outline: '2px solid ' + vars.colorBrand2, outlineOffset: '2px' },
  },
});
export const participantPanel = style({
  marginTop: '24px',
  padding: '20px 24px 18px',
  border: '2px solid ' + vars.colorGray800,
  borderRadius: '16px',
  '@media': { '(max-width: 640px)': { padding: '16px' } },
});
export const participantHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  marginBottom: '8px',
});
export const sectionTitle = style({ fontSize: '17px', fontWeight: 700, margin: 0 });
export const participantControls = style({ display: 'flex', alignItems: 'center', gap: '8px' });
export const pageIndicator = style({
  padding: '5px 12px',
  backgroundColor: vars.colorGray100,
  borderRadius: '20px',
  fontSize: '12px',
  color: vars.colorGray600,
});
export const pageArrow = style({
  border: 0,
  backgroundColor: 'transparent',
  cursor: 'pointer',
  font: 'inherit',
  fontSize: '22px',
  width: '30px',
  height: '32px',
  color: vars.colorGray800,
  selectors: { '&:disabled': { opacity: 0.35, cursor: 'default' } },
});
export const participantList = style({ display: 'flex', flexDirection: 'column' });
export const participant = style({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  minHeight: '58px',
  borderBottom: '1px solid ' + vars.colorGray200,
  selectors: { '&:last-child': { borderBottom: 0 } },
});
export const rank = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '48px',
  height: '22px',
  borderRadius: '16px',
  backgroundColor: vars.colorGray800,
  color: vars.colorBrand2,
  fontSize: '12px',
  fontWeight: 600,
});
export const participantIdentity = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flex: 1,
  minWidth: 0,
});
export const participantMeta = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  minWidth: 0,
});
export const participantName = style({
  color: vars.colorGray800,
  fontWeight: 600,
  fontSize: '14px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
export const participantGrade = style({ color: vars.colorGray500, fontSize: '12px' });
export const participantStats = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  flex: 'none',
  color: vars.colorGray600,
  fontSize: '13px',
});
export const workLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  textDecoration: 'none',
  fontSize: '13px',
  fontWeight: 600,
  color: vars.colorGray800,
  selectors: { '&:hover': { textDecoration: 'underline' } },
});
export const noWork = style({ flex: 'none', fontSize: '12px', color: vars.colorGray400 });
export const participantDate = style({
  color: vars.colorGray500,
  fontSize: '12px',
  '@media': { '(max-width: 640px)': { display: 'none' } },
});

export const retryAction = style({
  '@media': { '(max-width: 640px)': { gridColumn: '1 / -1' } },
  minHeight: '32px',
  border: '1px solid ' + vars.colorGray300,
  borderRadius: '8px',
  backgroundColor: vars.colorGray50,
  color: vars.colorGray800,
  cursor: 'pointer',
});
export const abandonAction = style({
  '@media': { '(max-width: 640px)': { gridColumn: '1 / -1' } },
  minHeight: '38px',
  border: '1px solid ' + vars.colorRedError,
  borderRadius: '9px',
  backgroundColor: vars.colorGray50,
  color: vars.colorRedError,
  cursor: 'pointer',
  font: 'inherit',
  fontSize: '13px',
  selectors: { '&:disabled': { opacity: 0.5, cursor: 'not-allowed' } },
});
export const actionHint = style({
  '@media': { '(max-width: 640px)': { gridColumn: '1 / -1' } },
  margin: '4px 0 0',
  fontSize: '12px',
  lineHeight: 1.5,
  color: vars.colorGray600,
});
export const confirmBox = style({
  '@media': { '(max-width: 640px)': { gridColumn: '1 / -1' } },
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid ' + vars.colorGray300,
  color: vars.colorGray800,
  fontSize: '13px',
  lineHeight: 1.6,
});
export const confirmButtons = style({ display: 'flex', gap: '8px', marginTop: '8px' });
export const confirmAbandon = style({
  flex: 1,
  minHeight: '32px',
  border: 0,
  borderRadius: '6px',
  backgroundColor: vars.colorGray800,
  color: vars.colorGray50,
  cursor: 'pointer',
});
export const confirmCancel = style({
  flex: 1,
  minHeight: '32px',
  border: '1px solid ' + vars.colorGray300,
  borderRadius: '6px',
  backgroundColor: vars.colorGray50,
  color: vars.colorGray800,
  cursor: 'pointer',
});
export const participantSort = style({
  display: 'inline-flex',
  gap: '5px',
  alignItems: 'center',
  color: vars.colorGray600,
  fontSize: '12px',
});
export const participantSortSelect = style({
  minHeight: '28px',
  borderRadius: '5px',
  border: '1px solid ' + vars.colorGray300,
  color: vars.colorGray800,
  backgroundColor: vars.colorGray50,
});
