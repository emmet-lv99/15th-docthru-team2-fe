// src/styles/global.css.js — 전역 리셋 + 토큰 값 바인딩 (Tier 1)
//
// 근거: 팀 디자인 자료의 `color system.png` · `font system.png`
import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css.js';

// ── 폰트 ──────────────────────────────────────────────────────
// ⚠️ 이곳에 4개의 globalFontFace('Pretendard', …) 가 있었는데 **전부 깨져 있었다.**
//    src 로 CSS 파일(.css)을 format('woff2') 로 선언하고 있었다:
//
//      src: url('…/pretendard.css') format('woff2')   ← 브라우저가 폰트로 못 쓴다
//
//    production CSS 번들에서도 그대로 확인했다(2026-10-06):
//      @font-face{src:url(…pretendard.css)format("woff2");font-weight:400;…}
//    → Pretendard 는 **한 번도 로드된 적이 없다.**
//
//    이제는 `pretendard` npm 패키지에서 뽑은 서브셋을 public/ 으로 self-host 한다.
//      CSS   : /pretendard.css   (dynamic-subset · @font-face 92개)
//      폰트  : /fonts/*.woff2    (문자 범위별 · 평균 31KB)
//      적용  : layout.js 의 <link media="print"> + FontLoader (비차단 로드)
//
//    여기서는 규칙만 선언하지 않는다 — 로드는 layout.js 가 맡는다.

// ── 리셋 ──────────────────────────────────────────────────────
globalStyle('*', {
  boxSizing: 'border-box',
  wordBreak: 'keep-all',
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  minHeight: '100%',
});

// ── 토큰 값 ───────────────────────────────────────────────────
globalStyle(':root', {
  vars: {
    // 색상 — color system.png 근거 그대로
    [vars.colorGray900]: '#171717',
    [vars.colorGray800]: '#262626',
    [vars.colorGray700]: '#404040',
    [vars.colorGray600]: '#525252',
    [vars.colorGray500]: '#737373',
    [vars.colorGray400]: '#A3A3A3',
    [vars.colorGray300]: '#D4D4D4',
    [vars.colorGray200]: '#E5E5E5',
    [vars.colorGray100]: '#E8EBED',
    [vars.colorGray50]: '#FAFAFA',
    [vars.colorBrand1]: '#262626',
    [vars.colorBrand2]: '#FFC117',
    [vars.colorBrand3]: '#F1F2F5',
    [vars.colorRedError]: '#EB3E3E',

    // 폰트 — Pretendard
    // ⚠️ 폰트 패밀리명은 패키지 CSS 의 'Pretendard Variable' 과 **정확히 일치**해야 한다.
    //    선언만 있고 로드되지 않던 문제(D-89)의 원인이기도 했다.
    [vars.fontFamily]:
      "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
    // 로고·배지용 Quantico — layout.js 의 next/font 변수(--font-quantico)와 이어집니다
    [vars.fontQuantico]:
      "var(--font-quantico), 'Quantico', -apple-system, BlinkMacSystemFont, sans-serif",

    // ── line-height ─────────────────────────────────────────
    // 근거: Regular 14·16pt 만 130% / 160% 가 주어져 있어요.
    // ⚠️ 확인 필요 — 나머지 size 는 아래 추정값이고, Figma 근본에서 확인하면 좋아요.
    //    추정 근거: 큰 글(18pt+)은 조밀하게 → 130%, 작은 글(12·13pt)은 느슨하게 → 160%
    [vars.lineHeightTight]: '130%',
    [vars.lineHeightRelaxed]: '160%',

    // 레이아웃
    [vars.headerHeight]: '60px',
    [vars.borderColor]: vars.colorGray300,
    [vars.shadowCard]: 'none',

    // ── 폰트 크기 ───────────────────────────────────────────
    // 근거: 12 · 13 · 14 · 16 · 18 · 20 · 22 · 24pt (px 동일 취급)
    '--font-size-12': '12px',
    '--font-size-13': '13px',
    '--font-size-14': '14px',
    '--font-size-16': '16px',
    '--font-size-18': '18px',
    '--font-size-20': '20px',
    '--font-size-22': '22px',
    '--font-size-24': '24px',
  },
});

// ── 요소 기본값 ───────────────────────────────────────────────
globalStyle('body', {
  fontFamily: vars.fontFamily,
  fontSize: '16px',
  fontWeight: '400',
  // 근거 좌측 26행 전부 letter-spacing 0%
  letterSpacing: '0%',
  // 원본(prisma-7)과 동일: 본문 16px · 흰 배경 · gray800 텍스트 · 행간 1.5
  lineHeight: '1.5',
  backgroundColor: '#FFFFFF',
  color: vars.colorGray800,
  WebkitFontSmoothing: 'antialiased',
});

globalStyle(':where(a, a:hover, a:active, a:visited)', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('button', {
  fontFamily: vars.fontFamily,
  border: 'none',
  cursor: 'pointer',
  background: 'none',
});

globalStyle('input, textarea, select', {
  fontFamily: vars.fontFamily,
  fontSize: 'var(--font-size-14)',
  color: vars.colorGray900,
});

globalStyle('input::placeholder, textarea::placeholder', {
  color: vars.colorGray400,
});

globalStyle('ul, ol', {
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  margin: 0,
  fontWeight: '700',
});

globalStyle('p', {
  margin: 0,
});
