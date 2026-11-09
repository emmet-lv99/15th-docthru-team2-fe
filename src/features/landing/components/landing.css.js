import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

// Figma 랜딩의 gray/gray100은 #F5F5F5이며 전역 colorGray100 값과 다릅니다.
// 다른 화면의 팀 공통 토큰을 변경하지 않고 해당 랜딩 배경만 원본에 맞춥니다.
const landingBackground = '#F5F5F5';

export const page = style({
  width: '100%',
  minHeight: 'calc(100vh - 60px)',
  backgroundColor: landingBackground,
  overflowX: 'clip',
});

export const hero = style({
  height: '278px',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: vars.colorGray800,
  color: vars.colorGray50,
  '@media': { '(max-width: 640px)': { height: '248px' } },
});

export const heroBackground = style({
  display: 'block',
  position: 'absolute',
  inset: 0,
});

export const heroBackgroundImage = style({
  objectFit: 'cover',
  objectPosition: 'center',
});

export const heroContent = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: '32px 16px',
  textAlign: 'center',
  '@media': { '(max-width: 640px)': { padding: '26px 16px' } },
});

export const heroBrand = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  height: '29px',
  color: '#D8D8D8',
  fontFamily: vars.fontQuantico,
  fontWeight: 700,
  fontSize: '23px',
  letterSpacing: '0.29px',
});

export const heroTitle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  margin: '12px 0 20px',
  color: '#FFFFFF',
  fontSize: '24px',
  fontWeight: 600,
  letterSpacing: '0.39px',
  lineHeight: '36px',
  '@media': {
    '(max-width: 640px)': {
      fontSize: '20px',
      lineHeight: '28px',
      margin: '12px 0 28px',
    },
  },
});

export const heroButton = style({
  minWidth: '120px',
  height: '40px',
  borderRadius: '12px',
  '@media': {
    '(max-width: 640px)': {
      minWidth: '112px',
      height: '32px',
      fontSize: '14px',
      borderRadius: '10px',
    },
  },
});

export const content = style({
  maxWidth: '992px',
  margin: '0 auto',
  '@media': {
    '(min-width: 641px) and (max-width: 1024px)': { maxWidth: '744px' },
    '(max-width: 640px)': { width: '100%' },
  },
});

export const feature = style({
  display: 'grid',
  gridTemplateColumns: '309px minmax(0, 570px)',
  alignItems: 'start',
  columnGap: '64px',
  paddingLeft: '24px',
  paddingRight: '24px',
  borderBottom: `1px dashed ${vars.colorGray300}`,
  '@media': {
    '(min-width: 641px) and (max-width: 1024px)': {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '68px',
      paddingRight: '68px',
      alignItems: 'center',
    },
    '(max-width: 640px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      marginLeft: '16px',
      marginRight: '16px',
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
});

export const firstFeature = style({
  minHeight: '508px',
  paddingTop: '88px',
  '@media': {
    '(min-width: 641px) and (max-width: 1024px)': { minHeight: '669px', paddingTop: '46px' },
    '(max-width: 640px)': { minHeight: 0, paddingTop: '38px', paddingBottom: '7px' },
  },
});

export const secondFeature = style({
  minHeight: '473px',
  paddingTop: '8px',
  '@media': {
    '(min-width: 641px) and (max-width: 1024px)': { minHeight: '697px', paddingTop: '62px' },
    '(max-width: 640px)': { minHeight: 0, paddingTop: '33px', paddingBottom: '6px' },
  },
});

export const thirdFeature = style({
  minHeight: '480px',
  paddingTop: '41px',
  borderBottom: 'none',
  '@media': {
    '(min-width: 641px) and (max-width: 1024px)': { minHeight: '599px', paddingTop: '62px' },
    '(max-width: 640px)': { minHeight: 0, paddingTop: '48px' },
  },
});

export const featureText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minWidth: 0,
  selectors: {
    [`${secondFeature} &`]: { paddingTop: '32px' },
    [`${thirdFeature} &`]: { paddingTop: 0 },
  },
  '@media': {
    '(min-width: 641px) and (max-width: 1024px)': {
      alignSelf: 'stretch',
      marginLeft: '50px',
      selectors: {
        [`${secondFeature} &`]: { paddingTop: 0 },
      },
    },
    '(max-width: 640px)': {
      marginLeft: '5px',
      selectors: {
        [`${secondFeature} &`]: { paddingTop: 0 },
      },
    },
  },
});

export const featureIcon = style({
  display: 'block',
  width: '24px',
  height: '24px',
  marginBottom: '8px',
});

export const featureTitle = style({
  margin: 0,
  whiteSpace: 'pre-line',
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '32px',
  color: vars.colorGray800,
  '@media': { '(max-width: 640px)': { fontSize: '20px', lineHeight: '28px' } },
});

export const featureDescription = style({
  maxWidth: '315px',
  margin: '12px 0 0',
  fontSize: '16px',
  lineHeight: '19px',
  fontWeight: 400,
  color: vars.colorGray600,
  '@media': { '(max-width: 640px)': { fontSize: '16px', lineHeight: '19px' } },
});

export const featureImage = style({
  display: 'block',
  width: '100%',
  maxWidth: '570px',
  minWidth: 0,
  selectors: {
    [`${thirdFeature} &`]: {
      maxWidth: '505px',
      marginTop: '34px',
      marginLeft: '35px',
    },
  },
  '@media': {
    '(min-width: 641px) and (max-width: 1024px)': {
      marginTop: '31px',
      selectors: {
        [`${thirdFeature} &`]: { marginTop: '36px', marginLeft: 0 },
        [`${secondFeature} &`]: { marginTop: '16px' },
      },
    },
    '(max-width: 640px)': {
      marginTop: '22px',
      maxWidth: 'none',
      selectors: {
        [`${secondFeature} &`]: {
          marginTop: '12px',
          width: 'calc(100% + 32px)',
          marginLeft: '-16px',
        },
        [`${thirdFeature} &`]: { marginTop: '35px', marginLeft: 0, maxWidth: 'none' },
      },
    },
  },
});

export const featureImageElement = style({
  display: 'block',
  width: '100%',
  height: 'auto',
});

export const footerCallToAction = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  padding: '36px 16px 123px',
  textAlign: 'center',
  '@media': {
    '(min-width: 641px) and (max-width: 1024px)': { paddingTop: '26px' },
    '(max-width: 640px)': { paddingTop: '48px', paddingBottom: '89px', gap: '12px' },
  },
});

export const footerTitle = style({
  margin: 0,
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '32px',
  letterSpacing: '0.39px',
});

export const footerButton = style({
  height: '48px',
  minWidth: '153px',
  borderRadius: '12px',
  '@media': { '(max-width: 640px)': { height: '40px', minWidth: '120px', fontSize: '14px' } },
});

export const desktopCtaLabel = style({
  '@media': { '(max-width: 640px)': { display: 'none' } },
});

export const mobileCtaLabel = style({
  display: 'none',
  '@media': { '(max-width: 640px)': { display: 'inline' } },
});
