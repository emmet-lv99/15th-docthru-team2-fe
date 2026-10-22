// src/components/FontLoader/FontLoader.jsx — Pretendard 폰트 로더 (요구 99)
//
// 왜 이렇게 복잡한가 (2026-10-06 실측) ──────────────────────────
//   Figma `공용 컴퍼넌트/font system.png` 이 Pretendard 를 명시하는데,
//   이전엔 `font-family: 'Pretendard'` 선언만 있고 **로드가 없었다.**
//
//   시도 1) layout.js 에서 CSS 를 import
//     → Next 가 렌더 블로킹 스타일시트로 만든다.
//     → dynamic-subset 은 @font-face 92개(53K) 라 파싱 비용이 크다.
//     → **performance 100 → 87** (FCP 0.9s → 2.6s, 블로킹 1,910ms)
//
//   시도 2) <link media="print" onLoad="this.media='all'"> 인라인 핸들러
//     → performance 98 로 회복. 다만 문자열 onLoad 는 Next/React 가
//        그대로 보존한다는 보장이 없고, 실측에서 폰트 요청이 0건이었다.
//
//   → 그래서 **클라이언트에서 media 를 바꾸는 방식**으로 확정.
//     media="print" 로 시작 = 낮은 우선순위(비차단) → mount 후 "all" 로 올린다.
//     폰트가 늦게 와도 fallback 글꼴로 먼저 보여준다(FOIT 아님).
'use client';

import { useEffect } from 'react';

const HREF = '/pretendard.css';

export function FontLoader() {
  useEffect(() => {
    const link = document.querySelector(`link[rel="stylesheet"][href="${HREF}"]`);

    if (link) {
      link.media = 'all';
    }
  }, []);

  return null;
}
