import { breakpoint } from '@/styles/breakpoints';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '520px',
  minWidth: '420px',
  maxWidth: '640px',
  height: '100vh',
  backgroundColor: '#0B0F17',
  color: '#E2E8F0',
  borderLeft: '1px solid #1E293B',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  '@media': {
    '(min-width: 768px) and (max-width: 1024px)': {
      width: '45%',
      minWidth: '340px',
    },
    [breakpoint.maxMd]: {
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%',
      height: '42vh',
      borderLeft: 'none',
      borderBottom: '1px solid #1E293B',
    },
  },
});

export const circleCloseButton = style({
  display: 'none',
  '@media': {
    '(max-width: 1024px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: '12px',
      top: '8px',
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(4px)',
      color: '#0F172A',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
      border: 'none',
      cursor: 'pointer',
      zIndex: 30,
      fontSize: '18px',
      fontWeight: 700,
      transition: 'transform 0.15s ease, background-color 0.15s ease',
      ':hover': {
        backgroundColor: '#FFFFFF',
        transform: 'scale(1.05)',
      },
    },
  },
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  borderBottom: '1px solid #1E293B',
  backgroundColor: '#0B0F17',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  '@media': {
    '(max-width: 1024px)': {
      paddingLeft: '58px',
    },
  },
});

export const title = style({
  fontSize: '15px',
  fontWeight: 600,
  color: '#F8FAFC',
  margin: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '320px',
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const externalLink = style({
  color: '#38BDF8',
  textDecoration: 'none',
  fontSize: '13px',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const closeButton = style({
  background: 'none',
  border: 'none',
  color: '#94A3B8',
  cursor: 'pointer',
  padding: '4px',
  fontSize: '16px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'color 0.15s ease',
  ':hover': {
    color: '#F8FAFC',
  },
  '@media': {
    '(max-width: 1024px)': {
      display: 'none',
    },
  },
});

export const body = style({
  flex: 1,
  overflowY: 'auto',
  padding: '24px 28px 48px',
});

export const noticeBanner = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  padding: '12px 14px',
  backgroundColor: '#0F172A',
  border: '1px solid #1E293B',
  borderRadius: '8px',
  marginBottom: '20px',
});

export const noticeText = style({
  fontSize: '12.5px',
  lineHeight: 1.55,
  color: '#94A3B8',
  margin: 0,
});

export const messageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '60px 20px',
  textAlign: 'center',
  gap: '16px',
});

export const messageText = style({
  color: '#94A3B8',
  fontSize: '14px',
  lineHeight: 1.6,
  margin: 0,
});

export const openButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '10px 18px',
  backgroundColor: '#1E293B',
  color: '#38BDF8',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 500,
  border: '1px solid #334155',
  transition: 'all 0.15s ease',
  ':hover': {
    backgroundColor: '#334155',
    color: '#7DD3FC',
  },
});

export const content = style({
  fontSize: '14.5px',
  lineHeight: '1.75',
  color: '#CBD5E1',
});

/* Content Children Typography */
globalStyle(`${content} h1`, {
  fontSize: '22px',
  fontWeight: 700,
  color: '#F8FAFC',
  marginTop: '28px',
  marginBottom: '14px',
  borderBottom: '1px solid #1E293B',
  paddingBottom: '8px',
});

globalStyle(`${content} h2`, {
  fontSize: '18px',
  fontWeight: 600,
  color: '#F8FAFC',
  marginTop: '24px',
  marginBottom: '12px',
});

globalStyle(`${content} h3`, {
  fontSize: '16px',
  fontWeight: 600,
  color: '#F1F5F9',
  marginTop: '20px',
  marginBottom: '8px',
});

globalStyle(`${content} p`, {
  marginTop: '0',
  marginBottom: '16px',
});

globalStyle(`${content} a`, {
  color: '#38BDF8',
  textDecoration: 'none',
});

globalStyle(`${content} a:hover`, {
  textDecoration: 'underline',
});

globalStyle(`${content} pre`, {
  backgroundColor: '#1E293B',
  color: '#E2E8F0',
  padding: '14px 16px',
  borderRadius: '8px',
  overflowX: 'auto',
  fontSize: '13px',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  margin: '16px 0',
  border: '1px solid #334155',
});

globalStyle(`${content} :not(pre) > code`, {
  backgroundColor: '#1E293B',
  color: '#F472B6',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '13px',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
});

globalStyle(`${content} img`, {
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '8px',
  margin: '16px 0',
  border: '1px solid #1E293B',
});

globalStyle(`${content} ul`, {
  listStyleType: 'disc',
  paddingLeft: '24px',
  margin: '12px 0 16px',
});

globalStyle(`${content} ol`, {
  listStyleType: 'decimal',
  paddingLeft: '24px',
  margin: '12px 0 16px',
});

globalStyle(`${content} li`, {
  marginBottom: '6px',
});

globalStyle(`${content} blockquote`, {
  borderLeft: '4px solid #38BDF8',
  margin: '16px 0',
  padding: '8px 16px',
  backgroundColor: '#0F172A',
  color: '#94A3B8',
  borderRadius: '0 6px 6px 0',
});
