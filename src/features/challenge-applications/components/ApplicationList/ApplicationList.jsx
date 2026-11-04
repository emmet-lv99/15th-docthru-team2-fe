'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthProvider';

import { queryKeys } from '@/lib/queryKeys.js';
import { getMyApplications } from '@/features/challenge-applications/api.js';

import ApplicationTable from './ApplicationTable';
import ApplicationPagination from './ApplicationPagination';

import * as styles from '@/app/my-applications/page.css.js';

export default function ApplicationList() {
  const { user } = useAuth(true);

  //현재 선택된 페이지
  const [currentPage, setCurrentPage] = useState(1);

  //검색창에 입력한 글자
  const [searchKeyword, setSearchKeyword] = useState('');

  //선택한 신청 상태
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // 한 페이지에 표시할 데이터 수
  const itemsPerPage = 10;

  const searchQuery = searchKeyword.trim();

  // 신청 목록 API 요청
  const { data, isPending, isError, error } = useQuery({
    queryKey: [
      ...queryKeys.applications.mine({
        page: currentPage,
        size: itemsPerPage,
        q: searchQuery,
        status: selectedStatus,
      }),
      user?.id,
    ],
    queryFn: () =>
      getMyApplications({
        page: currentPage,
        size: itemsPerPage,
        q: searchQuery,
        status: selectedStatus,
      }),
    enabled: user?.id != null,
  });

  // 실제 API 신청 목록
  const myApplications = data?.items ?? [];

  // 서버가 반환한 전체 페이지 수
  const totalPages = data?.totalPages ?? 0;

  // 테이블에 전달할 데이터
  const currentApplications = myApplications;

  if (isError) {
    console.error('신청 목록 조회 실패:', error);
  }

  return (
    <>
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
    </>
  );
}
