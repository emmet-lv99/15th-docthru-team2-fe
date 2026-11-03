// src/app/my-applications/page.js
// 내 제안 목록
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ⑤(제안 · 승인)
// 📍 이 파일: src/app/my-applications/page.js → /my-applications
// 🔗 협력: ③(제안 이력) · ④(승인·거절 알림 수신)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 신청한 챌린지 목록 + 상태(대기·승인·거절)처리 (요구 2.8). 취소는 PENDING 만 가능해요.
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET /challenge-applications/me
//    ② DELETE /challenge-applications/me/{applicationId} — PENDING 취소
//    ③ GET /challenge-applications/me/{applicationId} — 상태·사유
//
// 🧩 쓸 부품 — Card · Modal 부품
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요
//     먼저 만들어야 쓸 수 있는 것도 있으니, components/README.md 의 순서표를 보면 편해요)
//
// 💡 구현 메모
//    · 승인 상태면 해당 챌린지 상세로 이동하는 링크가 있으면 사용자 편리할게요 (요구 2.8)
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

import { AuthGuard } from '@/components/AuthGuard';
import Link from 'next/link';
import * as styles from './page.css.js';

// 임시 신청 데이터
const applications = [
  {
    id: 1023,
    field: '공식문서',
    category: 'Next.js',
    title: 'Next.js - App Router: Routing Fundamentals',
    maxParticipants: 10,
    appliedAt: '24/01/16',
    deadline: '24/02/24',
    status: 'PENDING',
  },
  {
    id: 1022,
    field: '블로그',
    category: 'API',
    title: 'Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?',
    maxParticipants: 5,
    appliedAt: '24/01/16',
    deadline: '24/02/23',
    status: 'PENDING',
  },
  {
    id: 1021,
    field: '공식문서',
    category: 'API',
    title: 'Fetch API 사용법 번역 챌린지',
    maxParticipants: 10,
    appliedAt: '24/01/16',
    deadline: '24/02/22',
    status: 'PENDING',
  },
  {
    id: 1020,
    field: '블로그',
    category: 'Career',
    title: '개발자로서 자신만의 브랜드를 구축하는 방법',
    maxParticipants: 5,
    appliedAt: '24/01/16',
    deadline: '24/02/22',
    status: 'REJECTED',
  },
  {
    id: 1019,
    field: '공식문서',
    category: 'Next.js',
    title: 'Next.js - App Router: Routing Fundamentals',
    maxParticipants: 10,
    appliedAt: '24/01/16',
    deadline: '24/02/22',
    status: 'APPROVED',
  },
  {
    id: 1018,
    field: '공식문서',
    category: 'API',
    title: 'Fetch API 에러 핸들링 챌린지',
    maxParticipants: 5,
    appliedAt: '24/01/16',
    deadline: '24/02/22',
    status: 'REJECTED',
  },
  {
    id: 1017,
    field: '공식문서',
    category: 'API',
    title: 'Fetch API 활용하기',
    maxParticipants: 10,
    appliedAt: '24/01/16',
    deadline: '24/02/22',
    status: 'APPROVED',
  },
  {
    id: 1016,
    field: '블로그',
    category: 'Career',
    title: '개발자로서 자신만의 브랜드를 구축하는 방법',
    maxParticipants: 5,
    appliedAt: '24/01/16',
    deadline: '24/02/22',
    status: 'APPROVED',
  },
  {
    id: 1015,
    field: '블로그',
    category: 'Next.js',
    title: 'Next.js - App Router: Routing Fundamentals',
    maxParticipants: 10,
    appliedAt: '24/01/16',
    deadline: '24/02/22',
    status: 'APPROVED',
  },
  {
    id: 1014,
    field: '블로그',
    category: 'Next.js',
    title: 'Next.js - App Router: Routing Fundamentals',
    maxParticipants: 10,
    appliedAt: '24/01/16',
    deadline: '24/02/22',
    status: 'DELETED',
  },
];

export default function MeApplicationsPage() {
  return (
    <AuthGuard>
      <div className={styles.pageBackground}>
        <main className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>나의 챌린지</h1>
            <Link href="/my-applications/new" className={styles.newButton}>
              신규 챌린지 신청 +
            </Link>
          </div>

          {/* 탭메뉴 */}
          <nav className={styles.tabs} aria-label="나의 챌린지 메뉴">
            <Link href="/my-challenges/participating" className={styles.tab}>
              참여중인 챌린지
            </Link>
            <Link href="/my-challenges/completed" className={styles.tab}>
              완료한 챌린지
            </Link>
            <Link href="/my-applications" className={`${styles.tab} ${styles.activeTab}`}>
              신청한 챌린지
            </Link>
          </nav>

          {/* 검색 및 필터 */}
          <div className={styles.filterBar}>
            <input
              type="search"
              placeholder="챌린지 이름을 검색해 보세요"
              aria-label="챌린지 검색"
              className={styles.searchInput}
            />

            <select
              className={styles.statusSelect}
              defaultValue="PENDING"
              aria-label="신청 상태 필터"
            >
              <option value="ALL">전체 상태</option>
              <option value="PENDING">승인 대기</option>
              <option value="APPROVED">신청 승인</option>
              <option value="REJECTED">신청 거절</option>
              <option value="CANCELLED">신청 취소</option>
            </select>
          </div>

          {/* 신청한 챌린지 목록 */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeading}>No.</th>
                  <th className={styles.tableHeading}>분야</th>
                  <th className={styles.tableHeading}>카테고리</th>
                  <th className={styles.tableHeading}>챌린지 제목</th>
                  <th className={styles.tableHeading}>모집 인원</th>
                  <th className={styles.tableHeading}>신청일</th>
                  <th className={styles.tableHeading}>마감 기한</th>
                  <th className={styles.tableHeading}>상태</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => (
                  <tr
                    key={application.id}
                    className={
                      application.status === 'DELETED' ? styles.deletedRow : styles.tableRow
                    }
                  >
                    <td className={styles.tableCell}>{application.id}</td>
                    <td className={styles.tableCell}>{application.field}</td>
                    <td className={styles.tableCell}>{application.category}</td>
                    <td className={`${styles.tableCell} ${styles.challengeTitle}`}>
                      {application.title}
                    </td>
                    <td className={styles.tableCell}>{application.maxParticipants}</td>
                    <td className={styles.tableCell}>{application.appliedAt}</td>
                    <td className={styles.tableCell}>{application.deadline}</td>
                    <td className={styles.tableCell}>
                      <span className={styles.statusBadge}>
                        {application.status === 'PENDING'
                          ? '승인 대기'
                          : application.status === 'APPROVED'
                            ? '신청 승인'
                            : application.status === 'REJECTED'
                              ? '신청 거절'
                              : '챌린지 삭제'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
