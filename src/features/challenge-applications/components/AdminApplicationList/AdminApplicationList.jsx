'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthProvider';

import { getAdminApplications } from '@/features/challenge-applications/api.js';

import AdminApplicationTable from './AdminApplicationTable';
import ApplicationPagination from '../ApplicationList/ApplicationPagination';

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
      setCurrentPage(1);
      setDebouncedKeyword(searchKeyword.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKeyword, setDebouncedKeyword, setCurrentPage]);

  //선택한 신청 상태
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // 한 페이지에 표시할 데이터 수
  const itemsPerPage = 10;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['adminApplications', user?.id, currentPage, debouncedKeyword, selectedStatus],
    queryFn: () =>
      getAdminApplications({
        page: currentPage,
        size: itemsPerPage,
        q: debouncedKeyword,
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
        </select>
      </div>

      {/* 신청한 챌린지 목록 */}
      <AdminApplicationTable
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
