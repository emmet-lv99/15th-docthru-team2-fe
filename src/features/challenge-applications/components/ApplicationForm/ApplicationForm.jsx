'use Client';

import * as styles from './ApplicationForm.css';

export default function ApplicationForm() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>신규 챌린지 신청</h1>

      <from className={styles.form}>
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
          <label htmlFor="category">분야</label>
          <select id="category" name="category" defaultValue="" required>
            <option value="" disabled>
              분야를 선택해주세요
            </option>
            <option value="NEXT_JS">NEXT_JS</option>
            <option value="MODERN_JS">Modern JavaScript</option>
            <option value="API">API</option>
            <option value="WEB">Web</option>
            <option value="CAREER">Career</option>
          </select>
        </div>

        {/* 문서 타입 */}
        <div className={styles.formGroup}>
          <label htmlFor="documentType">문서 타입</label>
          <select id="documentType" name="documentType" defaultValue="" required>
            <option value="" disabled>
              문서타입을 선택해 주세요
            </option>
            <option value="OFFICIAL">공식 문서</option>
            <option value="BLOG">블로그</option>
          </select>
        </div>

        {/* 마감일 */}
        <div className={styles.formGroup}>
          <label htmlFor="desiredDeadline">마감일</label>
          <input id="desiredDeadline" name="desiredDeadline" type="date" required />
        </div>

        {/* 최대인원 */}
        <div className={styles.formGroup}>
          <label htmlFor="maxParticipants">최대 인원</label>
          <input
            id="maxParticipants"
            name="maxParticipants"
            type="number"
            placeholder="최대 인원을 입력해 주세요"
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
      </from>
    </main>
  );
}
