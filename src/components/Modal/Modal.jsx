// src/components/Modal/Modal.jsx
//
// ★ 어디서든 겹쳐 뜨는 다이얼로그 그릇 (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 삭제 확인 · 임시저장 복구 같은 "겹쳐 올라오는 것"의 바탕이 되는 부품이에요. ConfirmDialog · FilterDialog 가 Modal 을 바탕으로 만들어지니, 가장 먼저 만들면 뒤로가 훨씬 편해요.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/modal.png
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   isOpen    boolean                      기본 true — false 면 아무것도 그리지 않아요
//   title     string                       생략하면 제목줄 없이 본문만
//   onClose   () => void                   ESC · 배경 클릭 두 가지 닫기 경로가 모두 이 콜백을 불러 주면 좋아요
//   footer    node                         하단 버튼 영역 (선택)
//   children  node                         본문 내용
//   className string                       바깥에서 디자인을 조정할 때
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · ESC 와 배경(overlay) 클릭 둘 다로 닫히게 하면 어떤 방식으로 닫을지 사용자가 고를 수 있어요
//    · role="dialog" · aria-modal="true" · aria-label=title 를 갖추면 보조기구 사용자에게 도움이 돼요
//    · ESC 감지 · 상태 관리가 들어가면 파일 첫 줄에 'use client' 를 붙여 주세요

// 🗺️ 이 부품을 어디에 쓰나요 — ConfirmDialog · FilterDialog · 비밀번호 모달 — 페이지별 README 에서 참조
// 🧱 만들기 전에 — 없음 (다른 여러 부품이 이것을 기다립니다)
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② Modal.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function Modal() {
  return <span>Modal — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default Modal;
