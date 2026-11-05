import { vars } from '@/styles/theme.css';
import { radius, shadow, space, zIndex } from '@/styles/tokens';
import { keyframes, style, styleVariants } from '@vanilla-extract/css';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const popIn = keyframes({
  from: {
    transform: 'scale(0.95)',
    opacity: 0,
  },
  to: {
    transform: 'scale(1)',
    opacity: 1,
  },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: zIndex.modal,
  animation: `${fadeIn} 0.15s ease-out forwards`,
});

export const modal = style({
  backgroundColor: '#FFFFFF',
  borderRadius: radius.xl,
  padding: `${space.xl} ${space.xl} 20px`,
  width: '100%',
  maxWidth: '400px',
  boxShadow: shadow.xl,
  animation: `${popIn} 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
});

export const title = style({
  fontSize: 'var(--font-size-18)',
  fontWeight: '700',
  color: vars.colorGray900,
  marginBottom: space.sm,
});

export const description = style({
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray600,
  lineHeight: 1.5,
  whiteSpace: 'pre-line',
  marginBottom: space.xl,
});

export const buttonGroup = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: space.sm,
});

export const baseButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '38px',
  padding: '0 16px',
  borderRadius: radius.md,
  fontSize: 'var(--font-size-14)',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, opacity 0.15s ease',
});

export const cancelButton = style([
  baseButton,
  {
    backgroundColor: '#FFFFFF',
    border: `1px solid ${vars.colorGray300}`,
    color: vars.colorGray700,
    ':hover': {
      backgroundColor: vars.colorGray50,
    },
  },
]);

export const confirmButtonVariants = styleVariants({
  normal: [
    baseButton,
    {
      backgroundColor: vars.colorGray900,
      color: '#FFFFFF',
      border: 'none',
      ':hover': {
        backgroundColor: vars.colorGray800,
      },
    },
  ],
  danger: [
    baseButton,
    {
      backgroundColor: vars.colorRedError,
      color: '#FFFFFF',
      border: 'none',
      ':hover': {
        opacity: 0.9,
      },
    },
  ],
});
