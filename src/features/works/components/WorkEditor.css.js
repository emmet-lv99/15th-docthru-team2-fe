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

// 1. 불릿 목록 (disc 점 + 들여쓰기)
globalStyle(`${editorContent} .tiptap ul`, {
  listStyleType: 'disc',
  paddingLeft: '24px',
  margin: '8px 0',
});
// 2. 번호 목록 (1, 2, 3 숫자 + 들여쓰기)
globalStyle(`${editorContent} .tiptap ol`, {
  listStyleType: 'decimal',
  paddingLeft: '24px',
  margin: '8px 0',
});
// 3. 목록 항목 간 여백
globalStyle(`${editorContent} .tiptap li`, {
  margin: '4px 0',
});
globalStyle(`${editorContent} .tiptap li p`, {
  margin: 0, // li 내부 문단 기본 여백 제거
});

// 1. 코드 블록 (```code```) - 깔끔한 다크 박스 스타일
globalStyle(`${editorContent} .tiptap pre`, {
  backgroundColor: '#1E1E1E', // 또는 vars.colorGray900
  color: '#D4D4D4',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  padding: '16px',
  borderRadius: '8px',
  margin: '16px 0',
  overflowX: 'auto',
});
globalStyle(`${editorContent} .tiptap pre code`, {
  color: 'inherit',
  padding: 0,
  background: 'none',
  fontSize: '0.9rem',
});
// 2. 인라인 코드 (`code`) - 가벼운 칩 스타일
globalStyle(`${editorContent} .tiptap :not(pre) > code`, {
  backgroundColor: '#F3F4F6',
  color: '#EB5757',
  padding: '2px 6px',
  borderRadius: '4px',
  fontFamily: 'ui-monospace, monospace',
  fontSize: '0.875em',
});
// 3. 인용구 (> blockquote)
globalStyle(`${editorContent} .tiptap blockquote`, {
  borderLeft: '3px solid #E5E7EB',
  paddingLeft: '16px',
  margin: '16px 0',
  color: '#6B7280',
  fontStyle: 'italic',
});
