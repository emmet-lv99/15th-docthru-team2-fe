// src/components/Checkbox/Checkbox.jsx
//
// ★ 체크박스 (라디오 겸용) (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 필터 모달의 항목 선택에 쓰여요. type="radio" 를 주면 같은 마크업으로 라디오처럼 동작하게 만들면 파일 하나로 두 용도를 다 청깅할 수 있어요.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/btn_checkbox.png (+ 라디오는 btn_radio.png)
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   type         'checkbox' | 'radio'         기본 'checkbox' — 'radio' 를 주면 라디오 외형이 돼요
//   label        string                       옆에 붙는 문구 (생략 가능)
//   ...restProps -                            input 속성(checked · name · value ...)이 그대로 input 으로 전달돼요
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · "input 은 사라지고 대신 박스가 보인다" 접근이 편하지만, 접근성 때문에 input 은 DOM 에 남겨 두는 것을 권해요
//    · vanilla-extract 병합 셀렉터는 & 로 끝나는 형태로 씁니다 (예상되는 ":checked + &" 조합)

// 🗺️ 이 부품을 어디에 쓰나요 — FilterDialog 항목 · 목록 필터
// 🧱 만들기 전에 — 없음
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② Checkbox.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function Checkbox() {
  return <span>Checkbox — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default Checkbox;
