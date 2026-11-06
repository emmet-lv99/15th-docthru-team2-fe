// src/app/challenges/[challengeId]/works/[workId]/edit/page.js
// 작업물 수정 (작성자 · ADMIN)
//
// ══════════════════════════════════════════════════════════════
// 👤 담당: 팀원 ②(작업물 · 임시저장) — 작업물 수정
// 📍 이 파일: src/app/challenges/[challengeId]/works/[workId]/edit/page.js → /challenges/{challengeId}/works/{workId}/edit
// 🔗 협력: ①(작업물 상세에서 진입) · ⑤(어드민이 남의 작업물을 수정할 때도 이 화면)
// 🔨 상태: 뼈대(지침서) — 아래 주석(📏 · 🧩 · 💡 · 🏁)을 따라 구현해 주세요
// ══════════════════════════════════════════════════════════════
//
// 이 화면이 뭔가요 — 이미 올라온 번역 작업물의 본문을 고치는 화면 (요구 2.7).
//   작업물 상세의 케밥(⋮) → "수정하기" 로 들어와요 (내 작업물이거나, 어드민이 남의 작업물을 고칠 때).
//
// 📏 쓸 API (정확한 필드는 /api-docs 확인)
//    ① GET /challenges/{challengeId}/works/{workId} — 본문 초기값(비회원도 조회 가능)
//    ② PATCH /works/{workId} — 작업물 수정 `{content}` (작성자 또는 ADMIN · 챌린지 마감 후 409 CHALLENGE_CLOSED)
//
// 🧩 쓸 부품 — 리치 텍스트 에디터(TipTap) · Button
//    (뼈대 부품은 src/components/<이름>/ 폴더 — 파일을 열면 주석 지침서가 있어요)
//
// 🧠 에디터 메모
//    · 작성(도전) 화면과 **같은 에디터**를 재사용해요 — 본문 형식은 TipTap JSON 문자열이라 그대로 넣고 빼면 돼요.
//      참고 구현: 완성본 prisma-8 `src/features/works/editor/`(TiptapEditor · Toolbar).
//    · 제목은 챌린지 이름을 그대로 보여 주고, 본문만 편집하게 해요.
//
// 💡 구현 메모
//    · **권한을 서버에서 먼저 확인**하세요 — 작성자 또는 ADMIN 이 아니면 안내(Warn)만 보여 주고 편집 UI 는 감춥니다.
//    · 어드민이 남의 작업물을 고치는 경우, 삭제와 달리 사유는 받지 않아요(PATCH 는 `{content}` 만 — 계약).
//
// 🏁 완료 판정 —
//    ① 이 화면이 쓰는 API 경로가 pnpm test:contract 에서 초록인지
//    ② 자리표 텍스트(TODO)가 화면에 더 이상 남지 않는지
//    ③ 본인 화면의 디자인 근거(PNG · 토큰)를 충실히 따라 어긋나는 것이 없는지
//
// 아래 자리표는 구현 전 안내 화면이에요 — 구현을 마치면 교체해 주세요

'use client';

import * as styles from '@/app/challenges/[challengeId]/edit/page.css.js';
import { AuthGuard } from '@/components/AuthGuard';
import { useAuth } from '@/contexts/AuthProvider';
import { getChallenge, getWorkDetail, updateWork } from '@/features/works/api';
import ConfirmModal from '@/features/works/components/ConfirmModal';
import EditorActionBar from '@/features/works/components/EditorActionBar';
import SourceViewer from '@/features/works/components/SourceViewer';
import WorkEditor from '@/features/works/components/WorkEditor';
import { queryKeys } from '@/lib/queryKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function WorkEditPage() {
  const { challengeId, workId } = useParams();
  const router = useRouter();
  const { user, isPending: isAuthPending } = useAuth();
  const [editor, setEditor] = useState(null);
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // 챌린지 정보 조회(원문 링크 및 마감 여부 조회)
  const { data: challenge, isLoading: isChallengeLoading } = useQuery({
    queryKey: queryKeys.challenges.detail(challengeId),
    queryFn: () => getChallenge(challengeId),
    enabled: Boolean(challengeId),
  });

  // 수정할 기존 작업물 조회
  const {
    data: work,
    isLoading: isWorkLoading,
    isError: isWorkError,
    error: workError,
  } = useQuery({
    queryKey: queryKeys.works.detail(Number(workId), user?.id),
    queryFn: () => getWorkDetail(challengeId, workId),
    enabled: Boolean(challengeId && workId),
  });

  const isLoading = isAuthPending || isChallengeLoading || isWorkLoading;

  // 권한 가드: 작성자 본인 또는 관리자가 아니면 차단
  useEffect(() => {
    // 데이터가 아직 로딩 중일 때는 검사를 건너뜁니다
    if (isLoading) return;

    // 네트워크 / 서버 에러 분기
    if (isWorkError) {
      toast.error(workError?.message || '작업물 정보를 불러오는 데 실패했습니다.');
      router.replace(`/challenges/${challengeId}/works/${workId}`);
      return;
    }

    // 작업물이 없는 경우
    if (!work) {
      toast.error('존재하지 않는 작업물입니다.');
      router.replace(`/challenges/${challengeId}`);
      return;
    }
    // 작성자 본인 또는 관리자 여부 확인
    const isAuthor = Number(user?.id) === Number(work.author?.id ?? work.authorId ?? work.userId);
    const isAdmin = user?.role === 'ADMIN';
    if (!isAuthor && !isAdmin) {
      toast.error('작업물 수정 권한이 없습니다.');
      router.replace(`/challenges/${challengeId}/works/${workId}`);
    }

    // 마감된 챌린지 수정 차단 방어
    const isClosed =
      challenge?.status === 'CLOSED' ||
      (challenge?.deadline && new Date() >= new Date(challenge.deadline));
    if (isClosed) {
      toast.error('이미 마감된 챌린지의 작업물은 수정할 수 없습니다.');
      router.replace(`/challenges/${challengeId}/works/${workId}`);
    }
  }, [isLoading, work, user, challengeId, workId, router, challenge, isWorkError, workError]);

  const queryClient = useQueryClient();

  const { mutate: handleUpdateWork, isPending: isSubmitting } = useMutation({
    mutationFn: (content) => updateWork(workId, content),
    onSuccess: () => {
      toast.success('작업물이 성공적으로 수정되었습니다!');
      // 작업물 상세 리리 쿼리캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['works', 'detail', Number(workId)] });
      router.refresh();
      router.push(`/challenges/${challengeId}/works/${workId}`);
    },
    onError: (error) => {
      toast.error(error.message || '작업물 수정에 실패했습니다.');
    },
  });

  const handleSubmit = () => {
    if (!editor || editor.getText().trim() === '') {
      toast.warn('수정할 본문 내용을 입력해주세요.');
      return;
    }
    handleUpdateWork(editor.getHTML());
  };

  return (
    <AuthGuard>
      <div className={styles.pageLayout}>
        <div className={styles.mainContent}>
          <div className={styles.innerContainer}>
            {/* 상단 수정 전용 액션바 (Docthru 로고 ─── [취소] [수정 완료]) */}
            <EditorActionBar
              mode="edit"
              onCancel={() => setIsCancelModalOpen(true)}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
            {/* 챌린지 원문 제목 */}
            <h1 className={styles.challengeTitle}>
              {isLoading ? '작업물 정보를 불러오는 중...' : challenge?.title}
            </h1>
            {/* 본문 에디터 */}
            {isLoading ? (
              <div style={{ padding: '60px 0', textAlign: 'center', color: '#64748b' }}>
                기존 작업물 본문을 불러오는 중입니다...
              </div>
            ) : (
              <WorkEditor
                initialContent={work?.content}
                onEditorReady={(editorInstance) => setEditor(editorInstance)}
              />
            )}
          </div>
        </div>
        {/* 우측 원문 사이드 패널 */}
        {isSourceOpen && (
          <SourceViewer
            sourceUrl={challenge?.sourceUrl}
            onClose={() => setIsSourceOpen(false)}
            onApplyTranslation={(translatedHtml) => {
              if (editor) {
                editor.commands.setContent(translatedHtml);
              }
            }}
          />
        )}

        {/* 우측 원문 보기 플로팅 버튼 */}
        {!isSourceOpen && (
          <button
            type="button"
            onClick={() => setIsSourceOpen(true)}
            className={styles.floatingSourceButton}
          >
            원문
          </button>
        )}
      </div>
      {/* 수정 취소 확인 모달 */}
      <ConfirmModal
        isOpen={isCancelModalOpen}
        title="수정 취소"
        description="수정을 취소하시겠습니까?&#10;작성 중인 수정 내용은 저장되지 않습니다."
        confirmLabel="취소하고 나가기"
        cancelLabel="계속 수정"
        isDanger={true}
        onConfirm={() => {
          setIsCancelModalOpen(false);
          router.push(`/challenges/${challengeId}/works/${workId}`);
        }}
        onClose={() => setIsCancelModalOpen(false)}
      />
    </AuthGuard>
  );
}
