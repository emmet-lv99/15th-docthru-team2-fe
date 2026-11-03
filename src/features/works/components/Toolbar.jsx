'use client';

import { useEditorState } from '@tiptap/react';
import clsx from 'clsx';
import Image from 'next/image.js';
import iconAlignCenter from '../assets/icon_alignment_center.svg';
import iconAlignLeft from '../assets/icon_alignment_left.svg';
import iconAlignRight from '../assets/icon_alignment_right.svg';
import iconBold from '../assets/icon_bold.svg';
import iconBullet from '../assets/icon_bullet.svg';
import iconItalic from '../assets/icon_italic.svg';
import iconNumbering from '../assets/icon_numbering.svg';
import iconUnderline from '../assets/icon_underline.svg';
import * as styles from './Toolbar.css.js';

function Toolbar({ editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive('bold') ?? false,
      isItalic: ctx.editor?.isActive('italic') ?? false,
      isUnderline: ctx.editor?.isActive('underline') ?? false,
      isBulletList: ctx.editor?.isActive('bulletList') ?? false,
      isOrderList: ctx.editor?.isActive('orderedList') ?? false,
      isAlignCenter: ctx.editor?.isActive({ textAlign: 'center' }) ?? false,
      isAlignRight: ctx.editor?.isActive({ textAlign: 'right' }) ?? false,
      isAlignLeft: ctx.editor?.isActive({ textAlign: 'left' }) ?? false,
    }),
  });

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
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().setTextAlign('center').run();
          }}
          className={clsx(styles.toolbarButton, editorState.isAlignCenter && styles.activeButton)}
        >
          <Image src={iconAlignCenter} alt="가운데 정렬 아이콘" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().setTextAlign('right').run();
          }}
          className={clsx(styles.toolbarButton, editorState.isAlignRight && styles.activeButton)}
        >
          <Image src={iconAlignRight} alt="오른쪽 정렬 아이콘" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().setTextAlign('left').run();
          }}
          className={clsx(styles.toolbarButton, editorState.isAlignLeft && styles.activeButton)}
        >
          <Image src={iconAlignLeft} alt="왼쪽 정렬 아이콘" />
        </button>
      </div>

      {/* 그룹 3: 목록 (2개) */}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
          className={clsx(styles.toolbarButton, editorState.isBulletList && styles.activeButton)}
        >
          <Image src={iconBullet} alt="불릿 목록 아이콘" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={clsx(styles.toolbarButton, editorState.isOrderList && styles.activeButton)}
        >
          <Image src={iconNumbering} alt="번호 목록 아이콘" />
        </button>
      </div>
      {/* 그룹 4: 페인트통 (1개) */}
      <div className={styles.buttonGroup}>{/* 페인트통 버튼 */}</div>
    </div>
  );
}

export default Toolbar;
