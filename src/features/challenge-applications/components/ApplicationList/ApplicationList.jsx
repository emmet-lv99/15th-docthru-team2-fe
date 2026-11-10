'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthProvider';

import { queryKeys } from '@/lib/queryKeys.js';
import { getMyApplications } from '@/features/challenge-applications/api.js';

import ApplicationTable from './ApplicationTable';
import ApplicationPagination from './ApplicationPagination';
import ApplicationFilterDropdown from '../ApplicationFilterDropdown/ApplicationFilterDropdown';

import * as styles from '@/app/my-applications/page.css.js';

import Image from 'next/image';
import searchIcon from '@/features/challenge-applications/assets/ic_search.svg';

export default function ApplicationList() {
  const { user } = useAuth(true);

  //현재 선택된 페이지
  const [currentPage, setCurrentPage] = useState(1);

  //검색창에 입력한 글자
  const [searchKeyword, setSearchKeyword] = useState('');

  //api 요청에 사용할 검색어
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  //검색입력이 멈춘뒤 300ms이후 검색어 갱신
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(searchKeyword.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKeyword, setDebouncedKeyword, setCurrentPage]);

  //선택한 신청 상태
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('');

  // 한 페이지에 표시할 데이터 수
  const itemsPerPage = 10;

  const searchQuery = debouncedKeyword;

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

  const currentApplications = [...myApplications].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortOrder === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sortOrder === 'deadlineAsc') {
      return new Date(a.desiredDeadline) - new Date(b.desiredDeadline);
    }

    if (sortOrder === 'deadlineDesc') {
      return new Date(b.desiredDeadline) - new Date(a.desiredDeadline);
    }

    return 0;
  });

  if (isError) {
    console.error('신청 목록 조회 실패:', error);
  }

  return (
    <>
      {/* 검색 및 필터 */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <Image src={searchIcon} alt="" width={24} height={24} className={styles.searchIcon} />

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
        </div>

        <ApplicationFilterDropdown
          value={sortOrder || selectedStatus}
          onChange={(value) => {
            if (['ALL', 'PENDING', 'APPROVED', 'REJECTED'].includes(value)) {
              setSelectedStatus(value);
              setSortOrder('');
            } else {
              setSelectedStatus('ALL');
              setSortOrder(value);
            }

            setCurrentPage(1);
          }}
        />
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
