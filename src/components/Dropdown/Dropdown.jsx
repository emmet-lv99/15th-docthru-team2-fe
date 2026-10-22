// src/components/Dropdown/Dropdown.jsx
//
// ★ 누르면 목록이 펼쳐지는 선택 박스 (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 정렬 선택 · 필터 단일 선택에서 쓰여요. 바깥 클릭 · ESC 로 닫히도록 해 두면 자연스럽습니다.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/_Dropdown.png · dropdown.png · dropdown list.png (+ 알약형 트리거는 sort.png)
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   options      Array<{ value, label }>      선택지 목록
//   value        string                       제어형 값 — 안 주면 내부 state 로 동작해요
//   defaultValue string                       비제어 초기값
//   onChange     (value) => void              값이 바뀔 때
//   align        'left' | 'right'             목록이 펼쳐질 방향 (기본 left)
//   placeholder  string                       기본 '선택'
//   appearance   'pill' | 'solid'             기본 'pill' — 'solid' 은 sort.png 의 검정 활성 모양
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · useRef + useEffect 로 문서 클릭을 감지하면 바깥 클릭 닫힘이 편해요
//    · Escape 키 처리도 함께 두면 키보드 사용자에게 친절해요
//    · 외부 이벤트가 있으니 'use client' 가 필요합니다

// 🗺️ 이 부품을 어디에 쓰나요 — Sort 내부 · 목록 필터 단일 선택
// 🧱 만들기 전에 — 없음 (Sort 가 이것을 기다립니다)
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② Dropdown.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function Dropdown() {
  return <span>Dropdown — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default Dropdown;
