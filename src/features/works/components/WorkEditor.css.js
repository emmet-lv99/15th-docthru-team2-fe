import { vars } from '@/styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const editorWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const editorContent = style({
  width: '100%',
  minHeight: '400px',
  cursor: 'text',
  outline: 'none',
});

globalStyle(`${editorContent} .tiptap`, {
  outline: 'none',
  minHeight: '400px',
  fontSize: 'var(--font-size-16)',
  lineHeight: '1.6',
});

globalStyle(`${editorContent} .tiptap p`, {
  margin: '0 0 12px 0',
});

globalStyle(`${editorContent} .tiptap p.is-editor-empty:first-child::before`, {
  content: 'attr(data-placeholder)',
  float: 'left',
  color: vars.colorGray400, // 또는 '#9E9E9E'
  pointerEvents: 'none',
  height: 0,
});
