function SourceViewer({ onClose }) {
  return (
    <>
      <iframe src="https://nextjs.org/docs" width={100} />
      <button onClick={() => onClose()}>닫기</button>
    </>
  );
}

export default SourceViewer;
