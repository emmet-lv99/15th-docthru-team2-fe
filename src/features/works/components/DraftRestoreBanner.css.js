import { vars } from '@/styles/theme.css';
import { radius, shadow, space, zIndex } from '@/styles/tokens';
import { keyframes, style } from '@vanilla-extract/css';

const slideUp = keyframes({
  from: {
    transform: 'translate(-50%, 20px)',
    opacity: 0,
  },
  to: {
    transform: 'translate(-50%, 0)',
    opacity: 1,
  },
});

export const bannerContainer = style({
  position: 'fixed',
  bottom: space['2xl'],
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: zIndex.toast,
  display: 'flex',
  alignItems: 'center',
  gap: space.md,
  backgroundColor: vars.colorGray900,
  padding: `${space.md} ${space.xl}`,
  borderRadius: radius.xl,
  boxShadow: shadow.lg,
  color: '#FFFFFF',
  animation: `${slideUp} 0.25s ease-out forwards`,
});

export const closeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  padding: space.xs,
  cursor: 'pointer',
  color: vars.colorGray400,
  fontSize: '14px',
  transition: 'color 0.2s ease',
  ':hover': {
    color: '#FFFFFF',
  },
});

export const bannerText = style({
  fontSize: 'var(--font-size-14)',
  fontWeight: '500',
  color: vars.colorGray100,
  lineHeight: 1.5,
});

export const restoreButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.colorBrand2,
  color: vars.colorGray900,
  border: 'none',
  borderRadius: radius.md,
  padding: '6px 14px',
  fontSize: 'var(--font-size-14)',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'opacity 0.2s ease, transform 0.1s ease',
  ':hover': {
    opacity: 0.9,
  },
  ':active': {
    transform: 'scale(0.97)',
  },
});
