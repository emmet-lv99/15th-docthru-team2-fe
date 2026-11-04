'use client';

import * as styles from './ApplicationForm.css';
import { useState } from 'react';
import ApplicationDropdown from './ApplicationDropdown';

export default function ApplicationForm() {
  //분야
  const [category, setCategory] = useState('');

  //문서타입
  const [documentType, setDocumentType] = useState('');

  //마감일
  const [desiredDeadline, setDesiredDeadline] = useState('');

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
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>신규 챌린지 신청</h1>

      <form className={styles.form}>
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
              id="desiredDeadline"
              name="desiredDeadline"
              type="date"
              value={desiredDeadline}
              onChange={(e) => setDesiredDeadline(e.target.value)}
              className={desiredDeadline ? styles.dateSelected : styles.dateEmpty}
              required
            />
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
        <button className={styles.submitButton} type="submit">
          신청하기
        </button>
      </form>
    </main>
  );
}
