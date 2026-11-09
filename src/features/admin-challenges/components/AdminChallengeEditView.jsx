'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { getChallengeDetail } from '@/features/challenges/api';
import { updateAdminChallenge } from '@/features/admin-challenges/api';
import { buildChallengeChanges, toChallengeForm } from '@/features/admin-challenges/form';
import { CATEGORY_LABEL, DOCUMENT_LABEL } from '@/features/challenges/labels';
import { queryKeys } from '@/lib/queryKeys';
import * as styles from '@/features/admin-challenges/components/adminChallenges.css.js';

const initialForm = {
  title: '',
  sourceUrl: '',
  category: '',
  documentType: '',
  deadline: '',
  maxParticipants: '',
  content: '',
};

/** 기존 공개 상세 API로 필드 초기값을 받고 관리자 전용 PATCH로 수정합니다. */
export default function AdminChallengeEditView({ challengeId }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState('');
  const initializedRef = useRef(null);

  const {
    data: challenge,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.challenges.detail(challengeId),
    queryFn: () => getChallengeDetail(challengeId),
    retry: false,
  });

  useEffect(() => {
    if (challenge && initializedRef.current !== challengeId) {
      setForm(toChallengeForm(challenge));
      initializedRef.current = challengeId;
    }
  }, [challenge, challengeId]);

  const updateMutation = useMutation({
    mutationFn: (changes) => updateAdminChallenge(challengeId, changes),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['adminChallenges'] }),
        queryClient.invalidateQueries({ queryKey: queryKeys.challenges.all() }),
        queryClient.invalidateQueries({ queryKey: queryKeys.myChallenges.all() }),
      ]);
      router.push('/admin/challenges/list');
      router.refresh();
    },
  });

  const canEdit = challenge?.status === 'IN_PROGRESS' && !challenge?.deletedAt;

  function changeField(name) {
    return (event) => {
      setForm((previous) => ({ ...previous, [name]: event.target.value }));
      setErrorMessage('');
    };
  }

  function submitEdit(event) {
    event.preventDefault();
    if (!challenge || !canEdit || updateMutation.isPending) return;
    try {
      const changes = buildChallengeChanges(challenge, form);
      setErrorMessage('');
      updateMutation.mutate(changes, {
        onError: (error) => {
          setErrorMessage(error?.message || '수정에 실패했습니다. 다시 확인해 주세요.');
        },
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className={styles.editPage}>
      <h1 className={styles.editTitle}>챌린지 수정</h1>
      {isPending && (
        <p role="status" className={styles.editState}>
          챌린지 정보를 불러오는 중입니다.
        </p>
      )}
      {isError && (
        <div role="alert" className={styles.editActions}>
          <p>챌린지 정보를 불러오지 못했습니다.</p>
          <Button type="button" variant="outline" onClick={() => refetch()}>
            다시 시도
          </Button>
        </div>
      )}
      {challenge && !isPending && !isError && (
        <>
          {!canEdit && (
            <p role="status" className={styles.editState}>
              진행 중인 챌린지만 수정할 수 있습니다.
            </p>
          )}
          <form className={styles.editForm} onSubmit={submitEdit}>
            <Input
              label="제목"
              id="admin-challenge-title"
              required
              maxLength={100}
              value={form.title}
              onChange={changeField('title')}
              disabled={!canEdit || updateMutation.isPending}
            />
            <Input
              label="원문 링크"
              id="admin-challenge-source"
              type="url"
              required
              maxLength={500}
              value={form.sourceUrl}
              onChange={changeField('sourceUrl')}
              disabled={!canEdit || updateMutation.isPending}
            />
            <label className={styles.formSelectGroup} htmlFor="admin-challenge-category">
              <span className={styles.formLabel}>분야</span>
              <select
                id="admin-challenge-category"
                className={styles.formSelect}
                required
                value={form.category}
                onChange={changeField('category')}
                disabled={!canEdit || updateMutation.isPending}
              >
                <option value="">분야 선택</option>
                {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.formSelectGroup} htmlFor="admin-challenge-document-type">
              <span className={styles.formLabel}>문서 타입</span>
              <select
                id="admin-challenge-document-type"
                className={styles.formSelect}
                required
                value={form.documentType}
                onChange={changeField('documentType')}
                disabled={!canEdit || updateMutation.isPending}
              >
                <option value="">문서 타입 선택</option>
                {Object.entries(DOCUMENT_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <Input
              label="마감일"
              id="admin-challenge-deadline"
              type="date"
              required
              value={form.deadline}
              onChange={changeField('deadline')}
              disabled={!canEdit || updateMutation.isPending}
            />
            <Input
              label="최대 인원"
              id="admin-challenge-capacity"
              type="number"
              min={1}
              max={1000}
              step={1}
              required
              value={form.maxParticipants}
              onChange={changeField('maxParticipants')}
              disabled={!canEdit || updateMutation.isPending}
            />
            <label className={styles.formSelectGroup} htmlFor="admin-challenge-content">
              <span className={styles.formLabel}>내용</span>
              <textarea
                id="admin-challenge-content"
                className={styles.formTextarea}
                maxLength={100000}
                value={form.content}
                onChange={changeField('content')}
                disabled={!canEdit || updateMutation.isPending}
              />
            </label>
            {errorMessage && (
              <p role="alert" className={styles.errorText}>
                {errorMessage}
              </p>
            )}
            <Button
              type="submit"
              variant="solid"
              size="lg"
              className={styles.editSubmit}
              disabled={!canEdit || updateMutation.isPending}
            >
              {updateMutation.isPending ? '수정 중...' : '수정하기'}
            </Button>
          </form>
        </>
      )}
      <p className={styles.editState}>
        <Link href="/admin/challenges/list">← 챌린지 목록으로 돌아가기</Link>
      </p>
    </div>
  );
}
