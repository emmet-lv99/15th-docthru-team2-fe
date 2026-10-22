// src/components/Card/Card.jsx
//
// ★ 챌린지 목록의 한 칸 (카드) (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 목록 화면의 주인공 부품이에요 — 제목·칩(상태/기술)·날짜·인원으로 정보를 담고, 카드 전체가 상세 페이지로 이동하는 링크가 되면 좋아요.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/card.png (+ 내부 상태 배지 chip-card-status.png · 기술 칩 chip-type.png)
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   status       'closed' | 'deadline'        기본 'closed' — chip-card-status.png 의 두 라벨과 연결돼요
//   hideStatus   boolean                      진행 중처럼 상태 배지가 없을 때 true
//   stack        'nextjs' | 'api' | 'career' | 'modernjs' | 'web' 기술 스택 (기본 'nextjs', chip-type.png 5색)
//   docType      string                       문서타입 — 흰 배경 + 테두리 칩
//   title        string                       카드 큰 제목
//   deadline     string                       마감일 표기
//   participants number                       참여 인원
//   supportCount number                       기본 0 — 좋아요 수
//   isUrgent     boolean                      기본 false — 마감 임박 배지 자동 노출
//   width        'wide' | 'medium' | 'narrow' 기본 'wide' — 카드 3변형
//   showMore     boolean                      기본 true — '작업물 더 보기' 표시 여부
//   ctaLabel     string                       기본 '도전 계속하기' — 참여 여부에 따라 부모가 바꿔 주세요 (M-10)
//   href         string                       링크 목적지 — 목록에서 '/challenges/{challengeId}' 를 넘기면 카드 전체가 링크로 동작해요
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · next/link 로 감싸 카드 전체가 이동하게 하면 힘 정도로는 꺾이지 않아요
//    · 칩은 자체 문구 대신 Chip 을 불러 쓰면 색 체계가 한 곳에서 관리됩니다
//    · 참고 — 완성되면 Card.jsx 로 만들면 패턴에 맞아요 (파일명이 ChallengeCard 였다는 과거 흔적은 참고만)

// 🗺️ 이 부품을 어디에 쓰나요 — 챌린지 목록 · 관련 배치 하단
// 🧱 만들기 전에 — 먼저 완성 필요 — Button · Chip
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② Card.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function Card() {
  return <span>Card — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default Card;
