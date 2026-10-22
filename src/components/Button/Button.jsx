// src/components/Button/Button.jsx
// ★ 벤치마크 표본 — 새 공용 부품을 만들 때 이 파일의 3파일 구조 · 스타일 습관을 그대로 따라가면 편해요
import clsx from 'clsx';
import * as styles from './Button.css.js';

/**
 * variant: solid | outline | filledTonal | transparent | yellow
 *          yellow = container.png 의 "원문 보기" (노랑 배경 + 검은 테두리)
 * size:    sm | md | lg
 * shape:   기본(사각) | pill(알약형 · btn-outline-icon · sort) | circular (btn_right · btn_feedback)
 *
 * `as` 로 <button> 이 아닌 <a> · <Link> 등으로 바꿀 수 있다.
 */
function Button({
  as: Component = 'button',
  variant = 'solid',
  size = 'md',
  shape,
  fullWidth = false,
  className,
  ...restProps
}) {
  return (
    <Component
      {...restProps}
      className={clsx(
        styles.buttonBase,
        styles.buttonSize[size],
        styles.buttonVariant[variant],
        shape === 'pill' && styles.buttonPill,
        shape === 'circular' && styles.buttonCircular[size],
        fullWidth && styles.fullWidth,
        className,
      )}
    />
  );
}

export default Button;
