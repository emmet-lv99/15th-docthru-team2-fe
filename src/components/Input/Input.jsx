// src/components/Input/Input.jsx
//
// ★ 텍스트 입력 한 줄 (에러 표시 + 비밀번호 눈 토글 지원) (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 회원가입 · 로그인 양식 같은 문자 입력 전반에서 쓰여요. errorMessage 만 넘겨도 테두리가 에러색으로 바뀌면 쓰는 쪽이 편합니다.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/input.png (+ 눈 아이콘은 btn_visibility_off_24px.png · btn_visibility_on_24px.png)
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   label              string                       입력 위 안내 문구
//   errorMessage       string                       값이 있으면 error 상태(테두리 색 · aria-invalid)로 자동 전환
//   hint               string                       하단 보조 문구 (예: 8자 이상)
//   trailingIcon       node                         입력 뒤쪽에 들어가는 아이콘 슬롯 (날짜 등)
//   showPasswordToggle boolean                      type='password' 일 때 눈 토글을 붙일지 (기본 false)
//   state              'default' | 'focused' | 'error' 강제 지정 — 안 주면 errorMessage/focus 로 자동 계산해요
//   ...restProps       -                            input 속성(type · placeholder · autocomplete ...) 전달
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · useId 로 label htmlFor 을 잊지 말고 연결하면 접근성이 챙겨져요
//    · showPasswordToggle 이 켜지면 revealed 상태로 type='password' → 'text' 를 번갈아 주면 됩니다
//    · 'use client' 가 필요한 상호작용 컴포넌트예요 (focus 추적 등)

// 🗺️ 이 부품을 어디에 쓰나요 — login · signup · 제안 폼
// 🧱 만들기 전에 — 없음
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② Input.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function Input() {
  return <span>Input — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default Input;
