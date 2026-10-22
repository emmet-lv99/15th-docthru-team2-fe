// src/components/ConfirmDialog/ConfirmDialog.jsx
//
// ★ 네/아니요 쌍을 묻는 작은 확인 대화상자 (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 삭제 · 임시저장 복구 같은 "확실히 물어 보고 넘어가야" 하는 동작 앞에 겹쳐 떠요. Modal 을 바탕으로 만들면 닫기 처리를 두 번 만들지 않아도 됩니다.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/Modal (1).png (+ popup.png 는 오른쪽 정렬 완료 알림 형태)
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   isOpen       boolean                      기본 true
//   message      string                       본문 문구
//   cancelLabel  string                       생략하면 단일 버튼만 나와요
//   confirmLabel string                       기본 '네'
//   onConfirm    () => void                   네(단일 포함) 클릭
//   onCancel     () => void                   아니요 · 배경 클릭
//   align        'left' | 'right'             기본 'left' — 'right' 는 popup.png 의 완료 알림 모양
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · Modal 을 품고 만들면 ESC · 배경 처리가 공짜로 생겨요
//    · 체크 아이콘은 근거 PNG 의 위치·크기를 참고하면 닮게 됩니다

// 🗺️ 이 부품을 어디에 쓰나요 — 제출 전 확인 · 임시저장 삭제 · 로그아웃 확인
// 🧱 만들기 전에 — 먼저 완성 필요 — Modal · Button
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② ConfirmDialog.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function ConfirmDialog() {
  return <span>ConfirmDialog — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default ConfirmDialog;
