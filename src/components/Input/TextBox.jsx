// src/components/TextBox/TextBox.jsx
//
// ★ 여러 줄 입력 (textarea) (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 제안 본문 입력 · 작업물 원문 표시처럼 넓은 영역에서 쓰여요. readOnly 를 주면 원문 미리보기 모드로도 쓸 수 있어요.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/text-box.png
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   label        string                       상단 안내 문구 (생략 가능)
//   errorMessage string                       값이 있으면 error 테두리
//   hint         string                       하단 보조 문구
//   rows         number                       기본 5 — 세로 높이
//   ...restProps -                            textarea 속성(placeholder · readOnly · value ...) 전달
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · readonly 모드를 별도 스타일로 두면 '원문 보기'를 자연스럽게 그릴 수 있어요
//    · Input 과 같은 id 패턴(label htmlFor · aria-describedby)을 쓰면 두 부품이 마치 쌍둥이처럼 일관됩니다

// 🗺️ 이 부품을 어디에 쓰나요 — 제안 신청 폼 · 작업물 원문 표시
// 🧱 만들기 전에 — 없음 (Input 과 별개 부품 — 같은 폴더에 둔 이유는 세트 가독성이에요)
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② TextBox.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function TextBox() {
  return <span>TextBox — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default TextBox;
