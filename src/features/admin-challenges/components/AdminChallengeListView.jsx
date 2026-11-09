'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Checkbox } from '@/components/Checkbox';
import { Modal } from '@/components/Modal';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { deleteAdminChallenge, getAdminChallenges } from '@/features/admin-challenges/api';
import { CATEGORY_LABEL, DOCUMENT_LABEL, formatChallengeDate } from '@/features/challenges/labels';
import { queryKeys } from '@/lib/queryKeys';
import * as styles from '@/features/admin-challenges/components/adminChallenges.css.js';

const PAGE_SIZE = 9;

/** 관리 목록에서 검색·필터·페이지 정보를 별도의 서버 쿼리 키로 관리합니다. */
export default function AdminChallengeListView() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState('');
  const [draft, setDraft] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('latest');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const filters = {
    q,
    category: category ? [category] : [],
    status,
    sort,
    page,
    size: PAGE_SIZE,
    includeDeleted,
  };
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['adminChallenges', 'list', filters],
    queryFn: () => getAdminChallenges(filters),
    staleTime: 30_000,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, reason }) => deleteAdminChallenge(id, reason),
    onSuccess: async () => {
      setDeleteTarget(null);
      setDeleteReason('');
      setDeleteError('');
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['adminChallenges'] }),
        queryClient.invalidateQueries({ queryKey: queryKeys.challenges.all() }),
        queryClient.invalidateQueries({ queryKey: queryKeys.myChallenges.all() }),
      ]);
      setPage(1);
    },
  });

  async function submitDelete(event) {
    event.preventDefault();
    const reason = deleteReason.trim();
    if (!deleteTarget || !reason) {
      setDeleteError('삭제 사유를 입력해 주세요.');
      return;
    }
    if (reason.length > 500) {
      setDeleteError('삭제 사유는 500자 이내로 입력해 주세요.');
      return;
    }
    setDeleteError('');
    try {
      await deleteMutation.mutateAsync({ id: deleteTarget.challengeId, reason });
    } catch (error) {
      setDeleteError(error?.message || '삭제 요청에 실패했습니다. 다시 시도해 주세요.');
    }
  }

  function changeFilter(update) {
    update();
    setPage(1);
  }

  function closeDelete() {
    if (deleteMutation.isPending) return;
    setDeleteTarget(null);
    setDeleteReason('');
    setDeleteError('');
  }

  return (
    <div className={styles.listPage}>
      <h1 className={styles.pageTitle}>챌린지 목록</h1>
      <div className={styles.toolbar}>
        <details className={styles.filterMenu}>
          <summary className={styles.filterToggle}>
            필터 <span aria-hidden="true">☰</span>
          </summary>
          <div className={styles.filterPanel}>
            <label className={styles.filterField}>
              <span>분야</span>
              <select
                value={category}
                onChange={(event) => changeFilter(() => setCategory(event.target.value))}
              >
                <option value="">전체 분야</option>
                {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.filterField}>
              <span>진행 상태</span>
              <select
                value={status}
                onChange={(event) => changeFilter(() => setStatus(event.target.value))}
              >
                <option value="">전체 상태</option>
                <option value="IN_PROGRESS">진행 중</option>
                <option value="CLOSED">마감</option>
              </select>
            </label>
            <label className={styles.filterField}>
              <span>정렬</span>
              <select
                value={sort}
                onChange={(event) => changeFilter(() => setSort(event.target.value))}
              >
                <option value="latest">최신순</option>
                <option value="deadline">마감일순</option>
              </select>
            </label>
            <Checkbox
              label="삭제된 챌린지도 표시"
              checked={includeDeleted}
              onChange={(event) => changeFilter(() => setIncludeDeleted(event.target.checked))}
            />
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                setCategory('');
                setStatus('');
                setSort('latest');
                setIncludeDeleted(false);
                setQ('');
                setDraft('');
                setPage(1);
              }}
            >
              초기화
            </Button>
          </div>
        </details>
        <div className={styles.searchWrap}>
          <Search
            value={draft}
            onChange={setDraft}
            onSubmit={(value) => changeFilter(() => setQ(value))}
            placeholder="챌린지 이름을 검색해보세요"
          />
        </div>
      </div>

      {isPending && (
        <p role="status" className={styles.stateMessage}>
          챌린지 목록을 불러오는 중입니다.
        </p>
      )}
      {isError && (
        <div role="alert" className={styles.stateMessage}>
          목록을 불러오지 못했습니다.{' '}
          <Button size="sm" variant="outline" type="button" onClick={() => refetch()}>
            다시 시도
          </Button>
        </div>
      )}
      {!isPending && !isError && (data?.items?.length ?? 0) === 0 && (
        <p className={styles.stateMessage}>검색 조건에 맞는 챌린지가 없습니다.</p>
      )}
      {!isPending && !isError && data?.items?.length > 0 && (
        <>
          <div className={styles.cards}>
            {data.items.map((item) => {
              const id = item.challengeId;
              const deleted = Boolean(item.deletedAt);
              return (
                <div key={id} className={styles.cardShell}>
                  <Card
                    title={item.title}
                    stack={CATEGORY_LABEL[item.category] ?? item.category}
                    docType={DOCUMENT_LABEL[item.documentType] ?? item.documentType}
                    deadline={formatChallengeDate(item.deadline)}
                    participants={item.participantCount}
                    maxParticipants={item.maxParticipants}
                    hideStatus={item.status !== 'CLOSED'}
                    status="closed"
                    showMore={false}
                    href={deleted ? undefined : `/challenges/${id}`}
                  />
                  {deleted && <span className={styles.deletedBadge}>삭제됨</span>}
                  {!deleted && (
                    <details className={styles.actionMenu}>
                      <summary aria-label={`${item.title} 관리 메뉴`} title="수정 또는 삭제">
                        ⋮
                      </summary>
                      <div className={styles.actionPopover}>
                        {item.status === 'IN_PROGRESS' ? (
                          <Link href={`/admin/challenges/list/${id}/edit`}>수정하기</Link>
                        ) : (
                          <span
                            className={styles.disabledAction}
                            title="마감된 챌린지는 수정할 수 없습니다"
                          >
                            수정 불가
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteTarget(item);
                            setDeleteReason('');
                            setDeleteError('');
                          }}
                        >
                          삭제하기
                        </button>
                      </div>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
          <Pagination page={page} totalPages={data.totalPages ?? 1} onChange={setPage} />
        </>
      )}

      <Modal
        isOpen={Boolean(deleteTarget)}
        title="챌린지 삭제"
        onClose={closeDelete}
        footer={
          <div className={styles.modalActions}>
            <Button
              variant="outline"
              type="button"
              disabled={deleteMutation.isPending}
              onClick={closeDelete}
            >
              취소
            </Button>
            <Button
              variant="solid"
              type="submit"
              form="admin-challenge-delete-form"
              disabled={deleteMutation.isPending || !deleteReason.trim()}
            >
              {deleteMutation.isPending ? '삭제 중...' : '삭제하기'}
            </Button>
          </div>
        }
      >
        <form id="admin-challenge-delete-form" onSubmit={submitDelete}>
          <p className={styles.modalMessage}>
            <strong>{deleteTarget?.title}</strong> 챌린지를 삭제하시겠습니까? 삭제 시 참여 중인
            사용자에게 사유와 함께 알림이 발송됩니다.
          </p>
          <label htmlFor="admin-delete-reason" className={styles.reasonLabel}>
            삭제 사유 (필수)
          </label>
          <textarea
            id="admin-delete-reason"
            rows={4}
            maxLength={500}
            required
            disabled={deleteMutation.isPending}
            placeholder="참가자에게 전달할 삭제 사유를 입력하세요"
            className={styles.reasonInput}
            value={deleteReason}
            onChange={(event) => {
              setDeleteReason(event.target.value);
              setDeleteError('');
            }}
          />
          {deleteError && (
            <p className={styles.errorText} role="alert">
              {deleteError}
            </p>
          )}
        </form>
      </Modal>
    </div>
  );
}
