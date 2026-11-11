import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';
import { space, radius } from '@/styles/tokens.js';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 240px)',
  padding: `${space['2xl']} ${space.lg}`,
  textAlign: 'center',
});

export const errorCode = style({
  fontFamily: vars.fontQuantico,
  fontSize: '84px',
  fontWeight: 700,
  lineHeight: 1,
  color: vars.colorGray900,
  letterSpacing: '-2px',
  marginBottom: space.md,
});

export const badge = style({
  display: 'inline-block',
  padding: `${space.xs} ${space.md}`,
  backgroundColor: vars.colorBrand2,
  color: vars.colorBrand1,
  fontSize: '12px',
  fontWeight: 700,
  fontFamily: vars.fontQuantico,
  borderRadius: radius.full,
  marginBottom: space.lg,
});

export const title = style({
  fontSize: '22px',
  fontWeight: 700,
  color: vars.colorGray900,
  margin: `0 0 ${space.sm} 0`,
});

export const description = style({
  fontSize: '15px',
  color: vars.colorGray600,
  lineHeight: 1.6,
  margin: `0 0 ${space['2xl']} 0`,
  maxWidth: '420px',
});

export const buttonGroup = style({
  display: 'flex',
  gap: space.md,
  alignItems: 'center',
});

