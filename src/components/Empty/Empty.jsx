import * as styles from './Empty.css.js';

export default function Empty({ title = '아직 등록된 항목이 없어요', description, action }) {
  return (
    <div className={styles.container} role="status">
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <rect x="9" y="12" width="34" height="29" rx="5" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M17 23H35M17 30H29"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {action}
    </div>
  );
}
