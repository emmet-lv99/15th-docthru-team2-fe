import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const pageLayout = style({
  width: '100%',
  display: 'flex',
});

export const mainContent = style({
  flex: 1,
  margin: '24px',
  display: 'flex',
  flexDirection: 'column',
});

export const innerContainer = style({
  width: '100%',
  maxWidth: '890px',
  margin: '0 auto',
});

export const challengeTitle = style({
  padding: '24px 0',
  borderBottom: `1px solid ${vars.colorGray200}`,
  fontSize: 'var(--font-size-20)',
  lineHeight: 1,
});

export const floatingSourceButton = style({
  position: 'fixed',
  right: 0,
  top: '180px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  padding: '12px 10px',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRight: 'none',
  borderRadius: '12px 0 0 12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 600,
  color: '#334155',
  zIndex: 40,
  transition: 'all 0.15s ease',
  ':hover': {
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
  },
});

export const workspace = style({});
