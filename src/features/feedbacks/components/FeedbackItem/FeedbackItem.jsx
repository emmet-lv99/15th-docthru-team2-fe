'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useAuth } from '@/contexts/AuthProvider';
import TextBox from '@/components/Input/TextBox.jsx';
import { useUpdateFeedback, useDeleteFeedback } from '@/features/feedbacks/hooks/useFeedbacks.js';
import * as styles from '@/features/feedbacks/components/FeedbackItem/FeedbackItem.css.js';

const MIN_TEXTAREA_HEIGHT = 20;
const MAX_TEXTAREA_HEIGHT = 107;

function formatFeedbackDate(createdAt) {
  if (!createdAt) return '';

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) return '';

  const formatted = new Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'Asia/Seoul',
  }).formatToParts(date);

  const getPart = (type) => formatted.find((part) => part.type === type)?.value ?? '';

  return `${getPart('year')}/${getPart('month')}/${getPart('day')} ${getPart('hour')}:${getPart('minute')}`;
}

export default function FeedbackItem({ feedback }) {
  const { user } = useAuth();

  const { mutate: updateFeedback, isPending: isUpdating } = useUpdateFeedback();
  const { mutate: deleteFeedback, isPending: isDeleting } = useDeleteFeedback();

  const [mode, setMode] = useState('view');
  const [menuOpen, setMenuOpen] = useState(false);
  const [content, setContent] = useState(feedback.content);
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const menuRef = useRef(null);
  const editTextBoxRef = useRef(null);

  const { id, author, createdAt } = feedback;

  const nickname = author?.nickname ?? '알 수 없는 사용자';
  const formattedDate = formatFeedbackDate(createdAt);

  const isMine = user?.id != null && author?.id != null && String(user.id) === String(author.id);

  const isAdmin = user?.role === 'ADMIN';
  const canManage = isMine || isAdmin;
  const needsReason = isAdmin && !isMine;

  const isPending = isUpdating || isDeleting;
  const isReasonInvalid = needsReason && !reason.trim();

  useEffect(() => {
    if (!menuOpen) return;

    function handleMouseDown(event) {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (mode !== 'edit') return;

    const textarea = editTextBoxRef.current?.querySelector('textarea');

    if (!textarea) return;

    textarea.style.height = 'auto';

    const nextHeight = Math.min(
      Math.max(textarea.scrollHeight, MIN_TEXTAREA_HEIGHT),
      MAX_TEXTAREA_HEIGHT,
    );

    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden';
  }, [mode, content]);

  function resetForm() {
    setMode('view');
    setMenuOpen(false);
    setContent(feedback.content);
    setReason('');
    setErrorMessage('');
  }

  function handleEdit() {
    if (!canManage || isPending) return;

    setMenuOpen(false);
    setContent(feedback.content);
    setReason('');
    setErrorMessage('');
    setMode('edit');
  }

  function handleDeleteMode() {
    if (!canManage || isPending) return;

    setMenuOpen(false);
    setReason('');
    setErrorMessage('');
    setMode('delete');
  }

  function handleUpdate(event) {
    event.preventDefault();

    if (!canManage || !content.trim() || isReasonInvalid || isPending) {
      return;
    }

    setErrorMessage('');

    updateFeedback(
      {
        feedbackId: id,
        content: content.trim(),
        ...(needsReason && { reason: reason.trim() }),
      },
      {
        onSuccess: resetForm,
        onError: (error) => {
          setErrorMessage(error.message ?? '피드백 수정에 실패했어요.');
        },
      },
    );
  }

  function handleDelete(event) {
    event.preventDefault();

    if (!canManage || isReasonInvalid || isPending) return;

    setErrorMessage('');

    deleteFeedback(
      {
        feedbackId: id,
        ...(needsReason && { reason: reason.trim() }),
      },
      {
        onSuccess: resetForm,
        onError: (error) => {
          setErrorMessage(error.message ?? '피드백 삭제에 실패했어요.');
        },
      },
    );
  }

  return (
    <li className={clsx(styles.item, mode !== 'view' && styles.itemEditing)}>
      <div className={styles.authorRow}>
        <div className={styles.avatar}>
          <Image src="/icons/profile.svg" alt="" width={24} height={24} aria-hidden="true" />
        </div>

        <div className={styles.authorInfo}>
          <span className={styles.nickname}>{nickname}</span>

          {formattedDate && (
            <time className={styles.date} dateTime={createdAt}>
              {formattedDate}
            </time>
          )}
        </div>

        {canManage && mode === 'view' && (
          <div className={styles.menuWrapper} ref={menuRef}>
            <button
              type="button"
              className={styles.menuButton}
              aria-label="피드백 관리"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ⋮
            </button>

            {menuOpen && (
              <div className={styles.dropdown} role="menu">
                <button
                  type="button"
                  role="menuitem"
                  className={styles.dropdownItem}
                  onClick={handleEdit}
                >
                  수정하기
                </button>

                <button
                  type="button"
                  role="menuitem"
                  className={styles.dropdownItem}
                  onClick={handleDeleteMode}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}

        {mode === 'edit' && (
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.topCancelButton}
              onClick={resetForm}
              disabled={isPending}
            >
              취소
            </button>

            <button
              type="submit"
              form={`feedback-edit-${id}`}
              className={styles.confirmButton}
              disabled={!content.trim() || isReasonInvalid || isPending}
            >
              {isUpdating ? '수정 중...' : '수정 완료'}
            </button>
          </div>
        )}

        {mode === 'delete' && (
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.topCancelButton}
              onClick={resetForm}
              disabled={isPending}
            >
              취소
            </button>

            <button
              type="submit"
              form={`feedback-delete-${id}`}
              className={styles.deleteButton}
              disabled={isReasonInvalid || isPending}
            >
              {isDeleting ? '삭제 중...' : '삭제하기'}
            </button>
          </div>
        )}
      </div>

      {mode !== 'edit' && <p className={styles.content}>{feedback.content}</p>}

      {mode === 'edit' && (
        <form id={`feedback-edit-${id}`} className={styles.form} onSubmit={handleUpdate}>
          <div ref={editTextBoxRef}>
            <TextBox
              className={styles.editTextBox}
              rows={1}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              aria-label="피드백 수정 내용"
              disabled={isPending}
              autoFocus
            />
          </div>

          {needsReason && (
            <input
              className={styles.reasonInput}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="수정 사유를 입력해 주세요"
              aria-label="수정 사유"
              disabled={isPending}
              required
            />
          )}
        </form>
      )}

      {mode === 'delete' && (
        <form id={`feedback-delete-${id}`} className={styles.form} onSubmit={handleDelete}>
          <p className={styles.confirmMessage}>이 피드백을 삭제하시겠어요?</p>

          {needsReason && (
            <input
              className={styles.reasonInput}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="삭제 사유를 입력해 주세요"
              aria-label="삭제 사유"
              disabled={isPending}
              required
            />
          )}
        </form>
      )}

      {errorMessage && (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}
    </li>
  );
}
