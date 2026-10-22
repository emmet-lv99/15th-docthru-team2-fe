// src/components/Filter/FilterDialog.jsx
//
// ★ 필터 모달 (분야 다중 · 문서타입 단일 · 상태 단일) (공용 부품 — 담당자가 구현합니다)
//
// 이 부품이 하는 일 — 목록 위 "필터(N)" 배지를 눌렀을 때 뜨는 다이얼로그예요. 적용을 누르면 쿼리스트링으로 바꾸는 흐름이 기본입니다.
//
// 🎨 디자인 근거: 공용 컴퍼넌트/filter.png (+ 항목은 btn_checkbox.png · btn_radio.png)
//    PNG 는 팀 디자인 자료의 `공용 컴퍼넌트/` 폴더에 있어요 — 픽셀 값은 이 근거를 우선해 주세요.
//
// 📏 props — 아래 명세대로 만들면 페이지 쪽에서 부담 없이 쓸 수 있어요
//   isOpen       boolean                      기본 true
//   onClose      () => void                   닫기
//   onApply      (state) => void              적용 클릭 — state 분야 키는 여기선 fields 로 담아요. 실제 쿼리 파라미터는 category 로 바꿔 붙이세요 (쿼리 enum은 challenges.schema.js · D-11)
//   initialValue object                       다시 열 때 — { fields: [], documentType: '', status: '' }
//
// 🧠 동작 요점 (이유가 함께 있어요)
//    · FIELDS(5종) · DOC_TYPES · STATUSES 상수는 결정사항 enum(§3.3 · 3.4)과 값이 일치해야 해요
//    · 참고 — 문서타입은 스키마 enum 이 4종(OFFICIAL/BLOG/BOOK/OTHER)인데 화면 근거는 2종이에요. 원본은 화면 근거 2종을 따랐으니 늘리려면 팀 회의에서 담으면 됩니다 (M-08)
//    · 분야는 체크 박스로 여러 개 · 문서타입/상태는 라디오로 한 개만. 필터 UI 규칙(M-08)과 일치해요
//    · 'use client' 가 필요합니다 (선택 상태)

// 🗺️ 이 부품을 어디에 쓰나요 — challenges 목록 "필터" 버튼
// 🧱 만들기 전에 — 먼저 완성 필요 — Modal · Checkbox · Button
//
// 🧪 만드는 방법 (3파일 패턴)
//    ① 이 파일의 자리표를 지우고 본문을 구현해요 (상호작용이 있으면 파일 첫 줄에 use client)
//    ② FilterDialog.css.js 를 근거 PNG 값으로 채워요 — 색·간격은 vars 토큰만
//    ③ index.js 는 export 를 이미 갖고 있으니 그대로 두면 돼요
//    ④ 궁금할 때 표본 → components/Button (구현 6종 중 표본) — 같은 3파일 구조를 벤치마크해 주세요
//
// 📚 마지막 안전망 — 스스로 해 보는 편이 학습에 훨씬 좋지만, 정말 막히면
//    정본(client/src/components/)을 잠깐 열어 보는 것도 방법이에요 — 팀 동의 후에 참고하는 편이 안전합니다

// 아래 자리표는 구현 전 화면에서 안내용으로만 보입니다 — 구현하시면 교체하시면 돼요
function FilterDialog() {
  return <span>FilterDialog — TODO(담당자): 이 파일 상단의 주석 지침서를 따라 구현해 주세요</span>;
}

export default FilterDialog;
