import { style } from '@vanilla-extract/css';

export const dropdown = style({
  position: 'relative',
  width: '160px',
  flexShrink: 0,
});

export const trigger = style({
  width: '100%',
  height: '40px',
  padding: '0 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
  border: '1px solid #E5E5E5',
  borderRadius: '30px',
  backgroundColor: '#FFFFFF',
  color: '#A3A3A3',
  fontSize: '16px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '14px',
      padding: '0 12px',
    },
  },
});

export const menu = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  width: '160px',
  maxWidth: 'calc(100vw - 32px)',
  maxHeight: '360px',
  overflowY: 'auto',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E5E5',
  borderRadius: '12px',
  zIndex: 20,
});

export const option = style({
  display: 'block',
  width: '100%',
  padding: '12px 16px',
  border: 'none',
  borderBottom: '1px solid #E5E5E5',
  backgroundColor: '#FFFFFF',
  color: '#737373',
  fontSize: '16px',
  textAlign: 'left',
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

export const arrow = style({
  width: '23px',
  height: '23px',
  flexShrink: 0,
  transition: 'transform 0.2s ease',
});
