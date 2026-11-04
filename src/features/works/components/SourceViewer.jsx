'use client';

import { getReaderContent } from '@/features/works/api.js';
import { queryKeys } from '@/lib/queryKeys.js';
import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import * as styles from './SourceViewer.css.js';

function SourceViewer({
  sourceUrl = 'https://nextjs.org/docs/app/getting-started/images',
  onClose,
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.reader.doc(sourceUrl),
    queryFn: () => getReaderContent(sourceUrl),
    enabled: Boolean(sourceUrl),
    staleTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
  });

  const sanitizedContent =
    data?.content && typeof window !== 'undefined'
      ? DOMPurify.sanitize(data.content, { ADD_ATTR: ['target'] })
      : '';

  return (
    <aside className={styles.container}>
      {/* 태블릿/모바일 전용 플로팅 원형 닫기 버튼 */}
      <button
        type="button"
        onClick={onClose}
        aria-label="원문 닫기"
        className={styles.circleCloseButton}
      >
        ✕
      </button>

      {/* 고정 상단 헤더 */}
      <header className={styles.header}>
        <h2 className={styles.title} title={data?.title || '원문 문서'}>
          {data?.title || '원문 문서'}
        </h2>
        <div className={styles.actions}>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.externalLink}
            >
              링크 열기 ↗
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="원문 닫기"
            className={styles.closeButton}
          >
            ✕
          </button>
        </div>
      </header>

      {/* 스크롤 가능한 본문 영역 */}
      <div className={styles.body}>
        {isLoading && (
          <div className={styles.messageContainer}>
            <p className={styles.messageText}>
              원문 문서를 가독성 높게 정제하여 불러오는 중입니다...
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div className={styles.messageContainer}>
            <p className={styles.messageText}>
              🔒 외부 보안 정책 또는 네트워크 사유로 본문을 직접 표시할 수 없는 문서입니다.
            </p>
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.openButton}
              >
                새 창에서 공식 문서 열기 ↗
              </a>
            )}
          </div>
        )}

        {!isLoading && !error && data?.content && (
          <>
            <div className={styles.noticeBanner}>
              <span style={{ fontSize: '14px', flexShrink: 0 }}>💡</span>
              <p className={styles.noticeText}>
                본문 텍스트 빠른 참조용 뷰어입니다. 동적 코드 예제나 탭 메뉴는 우측 상단{' '}
                <strong style={{ color: '#38BDF8', fontWeight: 600 }}>[링크 열기 ↗]</strong>를
                이용해 주세요.
              </p>
            </div>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </>
        )}
      </div>
    </aside>
  );
}

export default SourceViewer;
