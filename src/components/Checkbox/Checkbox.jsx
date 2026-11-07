import * as styles from './Checkbox.css.js';

export function Checkbox({ type = 'checkbox', label, className, ...restProps }) {
  const boxClass = type === 'radio' ? `${styles.box} ${styles.boxRadio}` : styles.box;

  return (
    <label className={className ? `${styles.root} ${className}` : styles.root}>
      <input type={type} className={styles.input} {...restProps} />
      <span className={boxClass} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

export default Checkbox;
