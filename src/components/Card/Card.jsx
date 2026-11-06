import Link from 'next/link';
import Image from 'next/image';
import { Chip } from '@/components/Chip';
import * as styles from './Card.css.js';

export default function Card({
  title,
  stack = 'nextjs',
  docType,
  status = 'closed',
  hideStatus = false,
  deadline,
  participants,
  maxParticipants,
  supportCount,
  isUrgent = false,
  width = 'wide',
  showMore = true,
  ctaLabel,
  href,
}) {
  const content = (
    <>
      {!hideStatus && (
        <div className={styles.statusRow}>
          <Chip kind="cardStatus" data-status={status}>
            {status === 'deadline' || status === 'closed'
              ? '챌린지가 마감되었어요'
              : '모집이 완료된 상태에요'}
          </Chip>
        </div>
      )}
      {isUrgent && <Chip kind="status">마감 임박</Chip>}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.tags}>
        <Chip kind="stack">{stack}</Chip>
        {docType && <Chip kind="docType">{docType}</Chip>}
      </div>
      <div className={styles.details}>
        <span className={styles.detailItem}>
          <Image src="/icons/challenges/deadline.svg" alt="" width={16} height={16} />
          {deadline ?? '-'} 마감
        </span>
        {typeof participants === 'number' && (
          <span className={styles.detailItem}>
            <Image src="/icons/challenges/people.svg" alt="" width={16} height={16} />
            {participants}
            {typeof maxParticipants === 'number' ? '/' + maxParticipants : ''}명 참여 중
          </span>
        )}
        {typeof supportCount === 'number' && <span>하트 {supportCount}</span>}
      </div>
      {showMore && ctaLabel && <span className={styles.callToAction}>{ctaLabel} →</span>}
    </>
  );
  const className = [styles.card, styles.widths[width] ?? styles.widths.wide].join(' ');
  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <article className={className}>{content}</article>
  );
}
