function SourceViewer({ onClose }) {
  return (
    <>
      소스 뷰어
      <button onClick={() => onClose()}>닫기</button>
    </>
  );
}

export default SourceViewer;
