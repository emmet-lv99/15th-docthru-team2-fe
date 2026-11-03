import clsx from 'clsx';
import * as styles from './Toolbar.css.js';

function Toolbar({ editor }) {
  if (!editor) return null;

  return (
    <div className={styles.toolbar}>
      {/* 그룹 1: 서식 (3개) */}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
          className={clsx(styles.toolbarButton, editor.isActive('bold') && styles.activeButton)}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
          }}
          className={clsx(styles.toolbarButton, editor.isActive('italic') && styles.activeButton)}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
          className={clsx(
            styles.toolbarButton,
            editor.isActive('underline') && styles.activeButton,
          )}
        >
          U
        </button>
      </div>
      {/* 그룹 2: 정렬 (3개) */}
      <div className={styles.buttonGroup}>{/* 정렬 버튼 3개 */}</div>
      {/* 그룹 3: 목록 (2개) */}
      <div className={styles.buttonGroup}>{/* 목록 버튼 2개 */}</div>
      {/* 그룹 4: 페인트통 (1개) */}
      <div className={styles.buttonGroup}>{/* 페인트통 버튼 */}</div>
    </div>
  );
}

export default Toolbar;
