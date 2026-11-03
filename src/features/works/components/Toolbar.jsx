'use client';

import { useEditorState } from '@tiptap/react';
import clsx from 'clsx';
import Image from 'next/image.js';
import iconBold from '../assets/icon_bold.svg';
import iconItalic from '../assets/icon_italic.svg';
import iconUnderline from '../assets/icon_underline.svg';
import * as styles from './Toolbar.css.js';

function Toolbar({ editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive('bold') ?? false,
      isItalic: ctx.editor?.isActive('italic') ?? false,
      isUnderline: ctx.editor?.isActive('underline') ?? false,
    }),
  });

  if (!editor) return null;

  return (
    <div className={styles.toolbar}>
      {/* 그룹 1: 서식 (3개) */}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
          className={clsx(styles.toolbarButton, editorState.isBold && styles.activeButton)}
        >
          <Image src={iconBold} alt="굵게 아이콘" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
          }}
          className={clsx(styles.toolbarButton, editorState.isItalic && styles.activeButton)}
        >
          <Image src={iconItalic} alt="기울여 쓰기 아이콘" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
          className={clsx(styles.toolbarButton, editorState.isUnderline && styles.activeButton)}
        >
          <Image src={iconUnderline} alt="밑줄 아이콘" />
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
