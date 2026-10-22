// src/components/Loading/Loading.jsx
//
// 무언가를 기다리는 동안 보여 주는 회전 스피너 + 안내 문구예요.
// QueryBoundary 의 Suspense fallback, app/loading.js 등에서 함께 써요.
import clsx from 'clsx';
import * as styles from './Loading.css.js';

export function Loading({ title = '', description = '', className }) {
  return (
    <div className={clsx(styles.wrapper, className)} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      {title && <p className={styles.title}>{title}</p>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}

export default Loading;
