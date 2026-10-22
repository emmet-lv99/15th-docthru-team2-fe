// src/components/Sort/Sort.jsx
//
// ★ 정렬 선택기 (라벨 + 알약 드롭다운) (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 목록 상단에 놓이는 "최신순 ▾" 계열 UI 예요. Dropdown 위에 라벨과 활성 스타일을 얹은 조합이에요.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/sort.png
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   options   Array<{ value, label }>      기본 최신순/인기순/마감 임박순 — API 는 sort=latest|popular|deadline 이에요
//   value     string                       제어형 값
//   onChange  (value) => void
//   label     string                       기본 '정렬'
//   hideLabel boolean                      true 면 드롭다운만 남아요
//   active    boolean                      true 면 sort.png 의 검정 활성 모양 (Dropdown appearance='solid' 로 전달)
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · Dropdown 을 불러 조립하면 바깥 닫힘 · 키보드 처리를 다시 만들 필요가 없어져요

// 🗺️ 이 부품을 어디에 쓰나요 — challenges 목록 · 참여자 현황
// 🧱 만들기 전에 — 먼저 완성 필요 — Dropdown
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② Sort.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function Sort() {
  return <span>Sort — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default Sort;
