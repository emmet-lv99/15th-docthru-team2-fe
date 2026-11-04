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
'use client';

import { AuthGuard } from '@/components/AuthGuard';
import Link from 'next/link';
import * as styles from './page.css.js';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys.js';
import { getMyApplications } from '@/features/challenge-applications/api.js';
import ApplicationTable from '@/features/challenge-applications/components/ApplicationList/ApplicationTable';
import ApplicationPagination from '@/features/challenge-applications/components/ApplicationList/ApplicationPagination';

export default function MeApplicationsPage() {
  //현재 선택된 페이지
  const [currentPage, setCurrentPage] = useState(1);
  //검색창에 입력한 글자
  const [searchKeyword, setSearchKeyword] = useState('');
  //선택한 신청 상태
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // 한 페이지에 표시할 데이터 수
  const itemsPerPage = 10;

  // 신청 목록 API 요청
  const { data, isPending, isError, error } = useQuery({
    queryKey: queryKeys.applications.mine({
      page: currentPage,
      size: itemsPerPage,
    }),
    queryFn: () =>
      getMyApplications({
        page: currentPage,
        size: itemsPerPage,
      }),
  });

  // 실제 API 신청 목록
  const myApplications = data?.items ?? [];

  // 검색 및 상태 필터 (현재 페이지 데이터에만 적용되는 임시 방식)
  const filteredApplications = myApplications.filter((application) => {
    const matchesSearch = String(application.title ?? '')
      .toLowerCase()
      .includes(searchKeyword.trim().toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || application.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // 서버가 반환한 전체 페이지 수
  const totalPages = data?.totalPages ?? 0;

  // 테이블에 전달할 데이터
  const currentApplications = filteredApplications;

  if (isError) {
    console.error('신청 목록 조회 실패:', error);
  }

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
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                setCurrentPage(1);
              }}
            />

            <select
              className={styles.statusSelect}
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="신청 상태 필터"
            >
              <option value="ALL">전체 상태</option>
              <option value="PENDING">승인 대기</option>
              <option value="APPROVED">신청 승인</option>
              <option value="REJECTED">신청 거절</option>
              <option value="DELETED">챌린지 삭제</option>
            </select>
          </div>

          {/* 신청한 챌린지 목록 */}
          <ApplicationTable
            applications={currentApplications}
            isPending={isPending}
            isError={isError}
          />
          {/* 페이지네이션 */}
          <ApplicationPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </AuthGuard>
  );
}
