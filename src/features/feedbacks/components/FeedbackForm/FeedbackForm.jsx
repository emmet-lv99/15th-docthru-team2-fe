'use client';

import { useState } from 'react';
import Image from 'next/image';
import TextBox from '@/components/Input/TextBox.jsx';
import { useCreateFeedback } from '@/features/feedbacks/hooks/useFeedbacks.js';
import * as styles from '@/features/feedbacks/components/FeedbackForm/FeedbackForm.css';

export default function FeedbackForm({ workId }) {
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: createFeedback, isPending } = useCreateFeedback(workId);

  const isDisabled = !content.trim() || isPending;

  function handleSubmit(event) {
    event.preventDefault();

    if (isDisabled) return;

    setErrorMessage('');

    createFeedback(content.trim(), {
      onSuccess: () => {
        setContent('');
      },
      onError: (error) => {
        setErrorMessage(error.message ?? '피드백 등록에 실패했어요.');
      },
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <TextBox
          rows={3}
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            if (errorMessage) setErrorMessage('');
          }}
          placeholder="피드백을 남겨주세요"
          aria-label="피드백 내용"
          disabled={isPending}
          className={styles.textBox}
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isDisabled}
        aria-label="피드백 등록"
      >
        <Image
          src={isDisabled ? '/icons/inacitve.svg' : '/icons/active.svg'}
          alt=""
          width={36}
          height={36}
          aria-hidden="true"
        />
      </button>

      {errorMessage && (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
