'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import iconFilter from '@/features/challenges/assets/filter.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/Card';
import { Search } from '@/components/Search';
import { Empty } from '@/components/Empty';
import { Pagination } from '@/components/Pagination';
import { useChallenges } from '@/features/challenges/hooks/useChallenges';
import {
  buildChallengeQuery,
  CHALLENGE_CATEGORIES,
  CHALLENGE_DOCUMENT_TYPES,
  CHALLENGE_STATUSES,
  CHALLENGE_SORTS,
} from '@/features/challenges/query';
import {
  CATEGORY_LABEL,
  DOCUMENT_LABEL,
  STATUS_LABEL,
  formatChallengeDate,
} from '@/features/challenges/labels';
import * as styles from '@/features/challenges/components/challenges.css.js';

const SORT_LABEL = { latest: '최신순', popular: '인기순', deadline: '마감 임박순' };

export default function ChallengeListView({ filters, initialData }) {
  const router = useRouter();
  const filterRef = useRef(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [q, setQ] = useState(filters.q);
  const [categories, setCategories] = useState(filters.category);
  const [documentType, setDocumentType] = useState(filters.documentType);
  const [status, setStatus] = useState(filters.status);
  const [sort, setSort] = useState(filters.sort);
  const { data, isPending, isError, error } = useChallenges(filters, initialData);
  const appliedCount =
    filters.category.length +
    Number(Boolean(filters.documentType)) +
    Number(Boolean(filters.status));

  useEffect(() => {
    if (!filterOpen) return undefined;
    function handleOutside(event) {
      if (!filterRef.current?.contains(event.target)) setFilterOpen(false);
    }
    function handleEscape(event) {
      if (event.key === 'Escape') setFilterOpen(false);
    }
    document.addEventListener('pointerdown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [filterOpen]);

  function navigate(next) {
    const query = buildChallengeQuery({ ...filters, ...next });
    router.push('/challenges?' + query);
  }

  function toggleCategory(category) {
    setCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  function applyFilters(event) {
    event.preventDefault();
    setFilterOpen(false);
    navigate({ q, category: categories, documentType, status, sort, page: 1 });
  }

  function resetFilters() {
    setCategories([]);
    setDocumentType('');
    setStatus('');
    setSort('latest');
    setFilterOpen(false);
    navigate({ category: [], documentType: '', status: '', sort: 'latest', page: 1 });
  }

  return (
    <main className={styles.page}>
      <div className={styles.listHeader}>
        <h1 className={styles.listTitle}>챌린지 목록</h1>
        <Link href="/my-applications/new" className={styles.newChallenge}>
          신규 챌린지 신청 <span aria-hidden="true">＋</span>
        </Link>
      </div>

      <div className={styles.listToolbar}>
        <div
          className={[styles.filterAnchor, filterOpen && styles.filterAnchorOpen]
            .filter(Boolean)
            .join(' ')}
          ref={filterRef}
        >
          <button
            type="button"
            aria-expanded={filterOpen}
            aria-controls="challenge-filters"
            className={styles.filterToggle}
            onClick={() => setFilterOpen((open) => !open)}
          >
            필터{appliedCount ? ' (' + appliedCount + ')' : ''}
            <Image src={iconFilter} alt="" width={18} height={18} />
          </button>
          {filterOpen && (
            <form
              id="challenge-filters"
              className={styles.filterPopover}
              aria-label="챌린지 필터"
              onSubmit={applyFilters}
            >
              <div className={styles.popoverHeading}>
                <strong>필터</strong>
                <button
                  type="button"
                  aria-label="필터 닫기"
                  className={styles.closeFilter}
                  onClick={() => setFilterOpen(false)}
                >
                  ×
                </button>
              </div>
              <fieldset className={styles.filterGroup}>
                <legend>분야</legend>
                {CHALLENGE_CATEGORIES.map((item) => (
                  <label className={styles.filterOption} key={item}>
                    <input
                      type="checkbox"
                      checked={categories.includes(item)}
                      onChange={() => toggleCategory(item)}
                    />
                    {CATEGORY_LABEL[item]}
                  </label>
                ))}
              </fieldset>
              <fieldset className={styles.filterGroup}>
                <legend>문서 타입</legend>
                <label className={styles.filterOption}>
                  <input
                    type="radio"
                    name="documentType"
                    checked={!documentType}
                    onChange={() => setDocumentType('')}
                  />
                  전체
                </label>
                {CHALLENGE_DOCUMENT_TYPES.map((item) => (
                  <label className={styles.filterOption} key={item}>
                    <input
                      type="radio"
                      name="documentType"
                      checked={documentType === item}
                      onChange={() => setDocumentType(item)}
                    />
                    {DOCUMENT_LABEL[item]}
                  </label>
                ))}
              </fieldset>
              <fieldset className={styles.filterGroup}>
                <legend>상태</legend>
                <label className={styles.filterOption}>
                  <input
                    type="radio"
                    name="challengeStatus"
                    checked={!status}
                    onChange={() => setStatus('')}
                  />
                  전체
                </label>
                {CHALLENGE_STATUSES.map((item) => (
                  <label className={styles.filterOption} key={item}>
                    <input
                      type="radio"
                      name="challengeStatus"
                      checked={status === item}
                      onChange={() => setStatus(item)}
                    />
                    {STATUS_LABEL[item]}
                  </label>
                ))}
              </fieldset>
              <label className={styles.filterSort}>
                정렬
                <select
                  className={styles.sortSelect}
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  {CHALLENGE_SORTS.map((item) => (
                    <option key={item} value={item}>
                      {SORT_LABEL[item]}
                    </option>
                  ))}
                </select>
              </label>
              <div className={styles.filterFooter}>
                <button type="button" onClick={resetFilters} className={styles.filterReset}>
                  초기화
                </button>
                <button type="submit" className={styles.filterApply}>
                  적용하기
                </button>
              </div>
            </form>
          )}
        </div>
        <Search value={q} onChange={setQ} onSubmit={(value) => navigate({ q: value, page: 1 })} />
      </div>

      {isPending ? (
        <p role="status" className={styles.muted}>
          챌린지를 불러오는 중입니다.
        </p>
      ) : isError ? (
        <div role="alert" className={styles.error}>
          목록을 가져오지 못했습니다. {error?.message ?? '잠시 후 다시 시도해 주세요.'}
        </div>
      ) : !data?.items?.length ? (
        <Empty title="조건에 맞는 챌린지가 없어요" description="검색어나 필터를 바꿔 보세요." />
      ) : (
        <div className={styles.cards} aria-label="챌린지 검색 결과">
          {data.items.map((challenge) => {
            const closed = challenge.isClosed || challenge.status === 'CLOSED';
            return (
              <Card
                key={challenge.id}
                title={challenge.title}
                stack={CATEGORY_LABEL[challenge.category] ?? challenge.category}
                docType={DOCUMENT_LABEL[challenge.documentType] ?? challenge.documentType}
                status={closed ? 'closed' : challenge.isFull ? 'full' : undefined}
                hideStatus={!closed && !challenge.isFull}
                deadline={formatChallengeDate(challenge.deadline)}
                participants={challenge.participantCount}
                maxParticipants={challenge.maxParticipants}
                showMore={false}
                href={'/challenges/' + challenge.id}
              />
            );
          })}
        </div>
      )}
      {Boolean(data?.totalPages > 1) && (
        <div className={styles.paginationArea}>
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            onChange={(page) => navigate({ page })}
          />
        </div>
      )}
    </main>
  );
}
