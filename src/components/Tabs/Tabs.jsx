// src/components/Tabs/Tabs.jsx
//
// ★ 탭 (위 / 아래 배치 모두) (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 나의 챌린지(참여중/완료) · 알림함에서 항목을 바꿔 보는 수단이에요. role(tablist/tab/panel)을 갖추면 접근성이 좋습니다.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/Tab_middle.png (중앙 배치) · Tab_top.png (상단 배치)
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   items      Array<{ key, label }>        탭 목록
//   defaultKey string                       초기 활성 탭
//   position   'bottom' | 'top'             기본 'bottom' — 'top' 이면 Tab_top.png 처럼 위에 붙어요
//   children   node                         탭별 본문 — key 순서대로 배치된다고 지침을 정하면 안내가 쉬워요
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · aria-selected · aria-controls · aria-labelledby 를 useId 로 잡으면 보조기구에서도 안내가 자연스러워요
//    · 'use client' 가 필요합니다 (클릭 상태)

// 🗺️ 이 부품을 어디에 쓰나요 — my-challenges · notifications
// 🧱 만들기 전에 — 없음
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② Tabs.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function Tabs() {
  return <span>Tabs — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default Tabs;
