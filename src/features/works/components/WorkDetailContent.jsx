'use client';

import DOMPurify from 'dompurify';
import { useMemo } from 'react';
import * as styles from './WorkDetailContent.css.js';

function WorkDetailContent({ content }) {
  const sanitizedContent = useMemo(() => {
    if (!content) return '';
    if (typeof window === 'undefined') return content;
    return DOMPurify.sanitize(content, { ADD_ATTR: ['target'] });
  }, [content]);

  if (!content) {
    return (
      <article className={styles.container}>
        <p className={styles.emptyText}>작성된 본문 내용이 없습니다.</p>
      </article>
    );
  }

  return (
    <article className={styles.container} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
  );
}

export default WorkDetailContent;
