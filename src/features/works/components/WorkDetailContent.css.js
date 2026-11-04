import { vars } from '@/styles/theme.css';
import { radius, space } from '@/styles/tokens';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  paddingTop: space.xl,
  paddingBottom: space['2xl'],
  color: vars.colorGray800,
  fontSize: 'var(--font-size-16)',
  lineHeight: vars.lineHeightRelaxed,
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  borderBottom: `1px solid ${vars.colorGray200}`,
});

/* ── 문단 & 제목 ──────────────────────────── */
globalStyle(`${container} p`, {
  margin: `0 0 ${space.md} 0`,
});

globalStyle(`${container} h1`, {
  fontSize: 'var(--font-size-24)',
  fontWeight: 700,
  margin: `${space.xl} 0 ${space.md} 0`,
  color: vars.colorGray900,
});

globalStyle(`${container} h2`, {
  fontSize: 'var(--font-size-20)',
  fontWeight: 700,
  margin: `${space.lg} 0 ${space.sm} 0`,
  color: vars.colorGray900,
});

globalStyle(`${container} h3`, {
  fontSize: 'var(--font-size-18)',
  fontWeight: 600,
  margin: `${space.md} 0 ${space.xs} 0`,
  color: vars.colorGray900,
});

/* ── 불릿 / 번호 목록 ──────────────────────── */
globalStyle(`${container} ul`, {
  listStyleType: 'disc',
  paddingLeft: '24px',
  margin: `${space.sm} 0`,
});

globalStyle(`${container} ol`, {
  listStyleType: 'decimal',
  paddingLeft: '24px',
  margin: `${space.sm} 0`,
});

globalStyle(`${container} li`, {
  margin: '4px 0',
});

globalStyle(`${container} li p`, {
  margin: 0,
});

/* ── 인용구 (blockquote) ──────────────────── */
globalStyle(`${container} blockquote`, {
  borderLeft: `3px solid ${vars.colorGray300}`,
  paddingLeft: space.lg,
  margin: `${space.lg} 0`,
  color: vars.colorGray600,
  fontStyle: 'italic',
});

/* ── 코드 블록 (pre code) ─────────────────── */
globalStyle(`${container} pre`, {
  backgroundColor: vars.colorGray900,
  color: vars.colorGray200,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  padding: space.lg,
  borderRadius: radius.md,
  margin: `${space.lg} 0`,
  overflowX: 'auto',
  fontSize: '0.9rem',
});

globalStyle(`${container} pre code`, {
  color: 'inherit',
  background: 'none',
  padding: 0,
  fontSize: 'inherit',
});

/* ── 인라인 코드 (code) ───────────────────── */
globalStyle(`${container} :not(pre) > code`, {
  backgroundColor: vars.colorBrand3,
  color: vars.colorRedError,
  padding: '2px 6px',
  borderRadius: radius.sm,
  fontFamily: 'ui-monospace, monospace',
  fontSize: '0.875em',
});

/* ── 구분선 & 링크 ────────────────────────── */
globalStyle(`${container} hr`, {
  border: 'none',
  borderTop: `1px solid ${vars.colorGray200}`,
  margin: `${space.xl} 0`,
});

globalStyle(`${container} a`, {
  color: '#2563EB',
  textDecoration: 'underline',
});

/* ── 빈 내용 플레이스홀더 ─────────────────── */
export const emptyText = style({
  color: vars.colorGray400,
  fontStyle: 'italic',
  padding: `${space.xl} 0`,
});
