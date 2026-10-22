// src/components/Container/Container.jsx — 페이지 공통 폭 래퍼
import clsx from 'clsx';
import * as styles from './Container.css.js';

/** size: default(1280) | narrow(720) | narrowest(520) */
function Container({ as: Component = 'div', size = 'default', className, ...restProps }) {
  const widthStyle = {
    default: styles.container,
    narrow: styles.containerNarrow,
    narrowest: styles.containerNarrowest,
  }[size];

  return <Component {...restProps} className={clsx(widthStyle, className)} />;
}

export default Container;
