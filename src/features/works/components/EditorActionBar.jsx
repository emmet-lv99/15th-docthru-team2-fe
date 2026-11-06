'use client';

import Image from 'next/image';
import Link from 'next/link';
import IconAbandon from '../assets/icon_abandon.svg';
import * as styles from './EditorActionBar.css';

function EditorActionBar({
  mode = 'create',
  onAbandon,
  onSaveDraft,
  onSubmit,
  onCancel,
  isSaving = false,
  isSubmitting = false,
}) {
  const isEditMode = mode === 'edit';

  return (
    <nav className={styles.actionBarLayout}>
      <Link href={'/'} className={styles.logoWrapper}>
        <Image src="/icons/docthru-logo.svg" alt="로고 이미지" width={18} height={25} />
        Docthru
      </Link>
      <div className={styles.actions}>
        {/* 신규 작성 모드일 때만 포기버튼 노출 */}
        {!isEditMode && onAbandon && (
          <button
            className={styles.actionDrop}
            type="button"
            onClick={onAbandon}
            aria-label="챌린지 포기"
          >
            <span className={styles.actionDropText}>포기</span>
            <Image src={IconAbandon} alt="포기 아이콘" />
          </button>
        )}
        {isEditMode ? (
          <button
            className={styles.actionDraft}
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            취소
          </button>
        ) : (
          <button
            className={styles.actionDraft}
            type="button"
            onClick={onSaveDraft}
            disabled={isSaving}
          >
            {isSaving ? '저장 중...' : '임시저장'}
          </button>
        )}
        <button
          className={styles.actionSubmit}
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isEditMode
              ? '수정 중...'
              : '제출 중...'
            : isEditMode
              ? '수정 완료'
              : '제출하기'}
        </button>
      </div>
    </nav>
  );
}

export default EditorActionBar;
