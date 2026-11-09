import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
});

export const modal = style({
  width: '100%',
  maxWidth: '500px',
  padding: '24px',
  backgroundColor: '#FFFFFF',
  border: '2px solid #262626',
  borderRadius: '8px',
  boxSizing: 'border-box',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
});

export const title = style({
  fontSize: '18px',
  fontWeight: 700,
  color: '#262626',
});

export const closeButton = style({
  border: 'none',
  backgroundColor: 'transparent',
  fontSize: '32px',
  lineHeight: 1,
  color: '#525252',
  cursor: 'pointer',
});

export const label = style({
  display: 'block',
  marginBottom: '8px',
  fontSize: '16px',
  fontWeight: '400',
  color: '#171717',
});

export const textarea = style({
  width: '100%',
  height: '220px',
  padding: '16px 20px',
  border: '1px solid #D4D4D4',
  borderRadius: '8px',
  boxSizing: 'border-box',
  resize: 'none',
  fontFamily: 'inherit',
  fontSize: '16px',
  outlineColor: '#262626',

  '::placeholder': {
    color: '#737373',
  },
});

export const submitButton = style({
  width: '100%',
  height: '50px',
  marginTop: '24px',
  border: 'none',
  borderRadius: '12px',
  backgroundColor: '#262626',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});
