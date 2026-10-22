// src/styles/theme.css.js — 디자인 토큰 (Tier 1)
//
// 근거: 팀 디자인 자료의 `color system.png` · `font system.png`
//
// ⚠️ brand 색 3개는 원문 라벨이 모두 "brand" 로만 표기돼 있어
//    고유 이름이 없어 순서대로 -1/-2/-3 을 부여했다. Figma 원본에서 이름 확인 필요.
import { createVar } from '@vanilla-extract/css';

export const vars = {
  // ── 색상 ────────────────────────────────────────────────────
  colorGray900: createVar(),
  colorGray800: createVar(),
  colorGray700: createVar(),
  colorGray600: createVar(),
  colorGray500: createVar(),
  colorGray400: createVar(),
  colorGray300: createVar(),
  colorGray200: createVar(),
  colorGray100: createVar(),
  colorGray50: createVar(),
  /** 원문 라벨 "brand" 1번째 = 본문 텍스트용 blacks */
  colorBrand1: createVar(),
  /** 원문 라벨 "brand" 2번째 = 노랑 (아바타 · 원문보기 버튼 · 마감 배지) */
  colorBrand2: createVar(),
  /** 원문 라벨 "brand" 3번째 = 연회색 배경 (탭 비활성 · chip 회색) */
  colorBrand3: createVar(),
  colorRedError: createVar(),

  // ── 폰트 ────────────────────────────────────────────────────
  fontFamily: createVar(),
  /** 로고·배지 전용 (Quantico) — next/font 의 --font-quantico 와 이어집니다 */
  fontQuantico: createVar(),

  // ── line-height ─────────────────────────────────────────────
  /** Regular 14·16pt 에 원본으로 주어진 값 */
  lineHeightTight: createVar(),
  lineHeightRelaxed: createVar(),

  // ── 레이아웃 ────────────────────────────────────────────────
  /** GNB 높이 (gnb.png 실측) */
  headerHeight: createVar(),
  /** 카드·컨테이너 공통 테두리 색 (card.png 실측) */
  borderColor: createVar(),
  /** 카드 기본 그림자 (근거 라벨 미확인 보수 지정 → 보수적으로 지정) */
  shadowCard: createVar(),
};

/** 타이포 스탠다드 26종 (근거 좌측 컬럼) — size × weight 조합 */
export const typeScale = {
  size24: [
    { weight: 'bold', value: 'var(--font-size-24)' },
    { weight: 'semibold', value: 'var(--font-size-24)' },
  ],
  size22: [
    { weight: 'bold', value: 'var(--font-size-22)' },
    { weight: 'semibold', value: 'var(--font-size-22)' },
  ],
  size20: [
    { weight: 'bold', value: 'var(--font-size-20)' },
    { weight: 'semibold', value: 'var(--font-size-20)' },
    { weight: 'medium', value: 'var(--font-size-20)' },
  ],
  size18: [
    { weight: 'bold', value: 'var(--font-size-18)' },
    { weight: 'semibold', value: 'var(--font-size-18)' },
    { weight: 'medium', value: 'var(--font-size-18)' },
    { weight: 'regular', value: 'var(--font-size-18)' },
  ],
  size16: [
    { weight: 'bold', value: 'var(--font-size-16)' },
    { weight: 'semibold', value: 'var(--font-size-16)' },
    { weight: 'medium', value: 'var(--font-size-16)' },
    { weight: 'regular', value: 'var(--font-size-16)' },
  ],
  size14: [
    { weight: 'bold', value: 'var(--font-size-14)' },
    { weight: 'semibold', value: 'var(--font-size-14)' },
    { weight: 'medium', value: 'var(--font-size-14)' },
    { weight: 'regular', value: 'var(--font-size-14)' },
  ],
  size13: [
    { weight: 'bold', value: 'var(--font-size-13)' },
    { weight: 'semibold', value: 'var(--font-size-13)' },
    { weight: 'medium', value: 'var(--font-size-13)' },
    { weight: 'regular', value: 'var(--font-size-13)' },
  ],
  size12: [
    { weight: 'bold', value: 'var(--font-size-12)' },
    { weight: 'medium', value: 'var(--font-size-12)' },
    { weight: 'regular', value: 'var(--font-size-12)' },
  ],
};
