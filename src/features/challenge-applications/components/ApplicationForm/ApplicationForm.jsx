'use client';

import * as styles from './ApplicationForm.css';
import { useRef, useState } from 'react';
import ApplicationDropdown from './ApplicationDropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createApplication } from '../../api';
import Image from 'next/image';
import calendarIcon from '../../assets/icon_calendar.svg';

export default function ApplicationForm() {
  //분야
  const [category, setCategory] = useState('');

  //문서타입
  const [documentType, setDocumentType] = useState('');

  //마감일
  const [desiredDeadline, setDesiredDeadline] = useState('');

  const dateInputRef = useRef(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  // 신규 신청 API 요청
  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: createApplication,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['applications'],
      });

      router.push('/my-applications');
    },

    onError: (error) => {
      console.error('챌린지 신청 실패:', error);
      alert('신청에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  // 신청하기 버튼을 눌렀을 때 실행
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!category || !documentType) {
      alert('분야와 문서 타입을 선택해 주세요.');
      return;
    }

    if (!desiredDeadline) {
      alert('마감일을 선택해 주세요.');
      return;
    }

    const formData = new FormData(event.currentTarget);

    const title = String(formData.get('title')).trim();
    const content = String(formData.get('content')).trim();

    if (!title) {
      alert('제목을 입력해 주세요.');
      return;
    }

    if (!content) {
      alert('내용을 입력해 주세요.');
      return;
    }

    const maxParticipants = Number(formData.get('maxParticipants'));

    if (!Number.isInteger(maxParticipants) || maxParticipants < 1 || maxParticipants > 1000) {
      alert('최대 인원은 1명부터 1,000명까지 입력할 수 있습니다.');
      return;
    }

    const data = {
      title,
      sourceUrl: String(formData.get('sourceUrl')).trim(),
      category,
      documentType,
      desiredDeadline: new Date(`${desiredDeadline}T00:00:00.000Z`).toISOString(),
      maxParticipants,
      content,
    };

    submitApplication(data);
  };

  const categoryOptions = [
    { value: 'NEXT_JS', label: 'Next.js' },
    { value: 'API', label: 'API' },
    { value: 'CAREER', label: 'Career' },
    { value: 'MODERN_JS', label: 'Modern JS' },
    { value: 'WEB', label: 'Web' },
  ];

  const documentTypeOptions = [
    { value: 'OFFICIAL', label: '공식문서' },
    { value: 'BLOG', label: '블로그' },
    { value: 'BOOK', label: '책' },
    { value: 'OTHER', label: '기타' },
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>신규 챌린지 신청</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 제목 */}
        <div className={styles.formGroup}>
          <label htmlFor="title">제목</label>
          <input id="title" name="title" type="text" placeholder="제목을 입력해 주세요" required />
        </div>

        {/* 원문 링크 */}
        <div className={styles.formGroup}>
          <label htmlFor="sourceUrl">원문 링크</label>
          <input
            id="sourceUrl"
            name="sourceUrl"
            type="url"
            placeholder="원문 링크를 입력해 주세요"
            required
          />
        </div>

        {/* 분야 */}
        <div className={styles.formGroup}>
          <label id="category-label">분야</label>

          <ApplicationDropdown
            id="category"
            name="category"
            value={category}
            onChange={setCategory}
            options={categoryOptions}
          />
        </div>

        {/* 문서 타입 */}
        <div className={styles.formGroup}>
          <label id="documentType-label">문서 타입</label>

          <ApplicationDropdown
            id="documentType"
            name="documentType"
            value={documentType}
            onChange={setDocumentType}
            options={documentTypeOptions}
          />
        </div>

        {/* 마감일 */}
        <div className={styles.formGroup}>
          <label htmlFor="desiredDeadline">마감일</label>

          <div className={styles.dateWrapper}>
            {!desiredDeadline && (
              <span className={styles.datePlaceholder} aria-hidden="true">
                YY/MM/DD
              </span>
            )}

            <input
              ref={dateInputRef}
              id="desiredDeadline"
              name="desiredDeadline"
              type="date"
              value={desiredDeadline}
              onChange={(e) => setDesiredDeadline(e.target.value)}
              className={desiredDeadline ? styles.dateSelected : styles.dateEmpty}
              required
            />

            <button
              type="button"
              className={styles.calendarButton}
              aria-label="마감일 선택"
              onClick={() => {
                if (dateInputRef.current?.showPicker) {
                  dateInputRef.current.showPicker();
                } else {
                  dateInputRef.current?.focus();
                }
              }}
            >
              <Image src={calendarIcon} alt="" width={24} height={24} />
            </button>
          </div>
        </div>

        {/* 최대인원 */}
        <div className={styles.formGroup}>
          <label htmlFor="maxParticipants">최대 인원</label>
          <input
            id="maxParticipants"
            name="maxParticipants"
            type="number"
            min="1"
            max="1000"
            step="1"
            placeholder="인원을 입력해 주세요"
            required
          />
        </div>

        {/* 내용 */}
        <div className={styles.formGroup}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            rows={7}
            placeholder="내용을 입력해 주세요"
            required
          />
        </div>

        {/* 신청 버튼 */}
        <button className={styles.submitButton} type="submit" disabled={isPending}>
          {isPending ? '신청 중...' : '신청하기'}
        </button>
      </form>
    </main>
  );
}
