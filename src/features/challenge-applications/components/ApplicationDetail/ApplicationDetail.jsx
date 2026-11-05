'use client';

import ApplicationStatus from './ApplicationStatus';
import ApplicationInfo from './ApplicationInfo';

// 임시데이터
const sampleApplication = {
  applicationId: 20,
  title: 'Next.js 공식 문서 번역',
  category: 'NEXT_JS',
  documentType: 'OFFICIAL',
  content: 'Next.js 공식 문서를 번역하는 챌린지입니다.',
  desiredDeadline: '2026-11-20T00:00:00.000Z',
  maxParticipants: 10,
  sourceUrl: 'https://nextjs.org/docs',
  status: 'PENDING',
};

export default function ApplicationDetail() {
  return (
    <main>
      <ApplicationStatus status={sampleApplication.status} />
      <ApplicationInfo application={sampleApplication} />

      {sampleApplication.status === 'PENDING' && <button type="button">취소하기</button>}
    </main>
  );
}
