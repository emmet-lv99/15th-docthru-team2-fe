// src/components/Warn/Warn.jsx
//
// 문제가 생겼을 때 보여 주는 경고 문구 + 아이콘이에요.
// 오류 화면(app/error.js)과 QueryBoundary 에서 함께 써요.
//   · 아이콘은 외부 이미지 대신 인라인 SVG 로 그려서 색 토큰(currentColor)을 따라가게 했어요.
import clsx from 'clsx';
import * as styles from './Warn.css.js';

export function Warn({ title = '', description = '', className }) {
  return (
    <div className={clsx(styles.wrapper, className)} role="alert">
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3 2 20h20L12 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M12 9v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      {title && <p className={styles.title}>{title}</p>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}

export default Warn;
