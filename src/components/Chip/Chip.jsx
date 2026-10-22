// src/components/Chip/Chip.jsx
//
// ★ 상태·분류를 짧은 문구로 보여 주는 작은 표식 (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 카드 상단 배지 · 목록 필터 결과 등에서 "이것은 어떤 종류인가"를 알려 줘요. 문구만 넣으면 배경·라운딩이 함께 붙는 구조가 쓰기 편합니다.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/chip-status.png(알약형 4종) · chip-card-status.png(카드용 2종) · chip-type.png(기술 스택 5색) · chip-category.png
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   kind         'status' | 'cardStatus' | 'stack' | 'docType' | 'category' 기본 'docType' — 종류에 따라 배경 스타일이 달라져요
//   variant      string                       kind='status' 는 상태 키, kind='stack' 은 nextjs · api 같은 색상 키를 넣어 주세요
//   children     string                       표시할 문구
//   className    string                       조합용
//   ...restProps -                            span 의 기본 속성도 전달할 수 있게 편해요
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · styleVariants({ status: {...}, stack: {...} }) 처럼 종류별 스타일을 뭉쳐 두면 늘릴 때 편합니다 (Button.css.js 를 표본으로)
//    · kind='stack' 의 5색은 chip-type.png 의 체계를 따르고, 키 이름은 결정사항 enum(NEXT_JS, MODERN_JS ...) 의 언더스코어를 제거한 소문자 값으로 약속하면 API 와 알맞아요

// 🗺️ 이 부품을 어디에 쓰나요 — ChallengeCard 상단 · 필터 배지 · 나의 챌린지 목록
// 🧱 만들기 전에 — 없음
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② Chip.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function Chip() {
  return <span>Chip — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default Chip;
