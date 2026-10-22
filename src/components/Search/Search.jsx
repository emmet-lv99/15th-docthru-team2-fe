// src/components/Search/Search.jsx
//
// ★ 검색 입력 + 제출 폼 (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 목록 상단에서 검색어를 받아 서버 쿼리(q=)로 전달해요. Enter 제출 시 부모가 새로 불러오도록 onSubmit 로 전달하는 구조가 편합니다.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/search.png
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   value        string                       제어형 값 — 안 주면 내부 state 로 동작해요
//   defaultValue string                       비제어 초기값
//   onChange     (value) => void              타이핑할 때마다
//   onSubmit     (value) => void              Enter 또는 아이콘 클릭 — 내부에서 e.preventDefault() 후 호출해 주세요
//   placeholder  string                       기본 '챌린지 이름을 검색해보세요'
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · form 에 role='search' 를 주는 손질이 의미를 명확히 해요
//    · 'use client' 가 필요합니다 (입력 상태가 있습니다)

// 🗺️ 이 부품을 어디에 쓰나요 — challenges 목록 상단
// 🧱 만들기 전에 — 없음
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② Search.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function Search() {
  return <span>Search — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default Search;
