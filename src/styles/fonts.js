// src/styles/fonts.js — 서체 로딩 (Pretendard 는 self-host, Quantico 는 next/font)
//
// 왜 이렇게 나눴나요?
//   · 본문 서체(Pretendard)는 public/ 로 self-host 해서 비차단으로 불러와요 (layout.js 의 link + FontLoader).
//     dynamic-subset 이라 @font-face 가 92개여서 번들 import 로 넣으면 첫 페인트가 늦어져요.
//   · 로고·배지 전용 서체(Quantico)는 next/font/google 로 가볍게 불러와요 (원본 prisma-7 과 동일).
import { Quantico } from 'next/font/google';

/** 로고·기술 배지·랜딩 등에 쓰는 영문 슬랩 세리프 서체 (원본과 동일 설정) */
export const quantico = Quantico({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-quantico',
  display: 'swap',
});
