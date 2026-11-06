import * as styles from './Chip.css.js';

const stackStyle = {
  'Next.js': styles.stack.nextjs,
  'Modern JS': styles.stack.modernjs,
  API: styles.stack.api,
  Web: styles.stack.web,
  Career: styles.stack.career,
};

export default function Chip({
  kind = 'docType',
  variant = '',
  children,
  className = '',
  ...restProps
}) {
  const content = children ?? variant;
  const tone = styles.tone[kind] ?? styles.tone.docType;
  const category = kind === 'stack' && typeof content === 'string' ? stackStyle[content] : '';
  const status =
    kind === 'cardStatus' && restProps['data-status'] === 'closed' ? styles.closedStatus : '';
  return (
    <span
      className={[styles.base, tone, category, status, className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {content}
    </span>
  );
}
