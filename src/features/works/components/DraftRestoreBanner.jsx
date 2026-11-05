import * as styles from './DraftRestoreBanner.css.js';

function DraftRestoreBanner({ onRestore, onClose }) {
  return (
    <div className={styles.bannerContainer}>
      <button type="button" className={styles.closeButton} onClick={onClose} aria-label="닫기">
        ✕
      </button>
      <span className={styles.bannerText}>
        임시 저장된 작업물이 있어요. 저장된 작업들을 불러오시겠어요?
      </span>
      <button type="button" className={styles.restoreButton} onClick={onRestore}>
        불러오기
      </button>
    </div>
  );
}

export default DraftRestoreBanner;
