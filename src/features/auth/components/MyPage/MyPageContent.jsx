'use client';

// 마이페이지 — 프로필·등급 진행도·로그아웃·회원 탈퇴(확인 모달)를 한 화면에 모았어요.
//
//   · 공용 Modal/ConfirmDialog 가 아직 뼈대라, 탈퇴 확인은 이 화면 안의 가벼운 dialog 로 만들었어요.
//   · 공용 부품은 건드리지 않았고, 인증 도메인(③) 안에서만 스타일을 씁니다.
//   · 사용자 정보가 도착한 뒤에만 폼을 마운트(key=user.id)해서 닉네임 초기값을 안전하게 잡아요.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthProvider';
import { AuthField } from '../AuthForm/AuthField.jsx';
import * as styles from './MyPage.css.js';

const BCRYPT_MAX_BYTES = 72;
const byteLength = (value) => new TextEncoder().encode(value).length;

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('ko-KR');
};

export function MyPageContent() {
  const { user, isPending } = useAuth();

  if (isPending) {
    return <main className={styles.page}>불러오는 중…</main>;
  }

  if (!user) return null;

  return <MyPageView key={user.id} />;
}

function MyPageView() {
  const router = useRouter();
  const { user, logout, isLoggingOut, updateMe, isUpdatingMe, deleteMe, isDeletingMe } = useAuth();

  const [nickname, setNickname] = useState(user.nickname);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ESC 로 탈퇴 확인 모달을 닫아요.
  useEffect(() => {
    if (!isDeleteOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsDeleteOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDeleteOpen]);

  const stats = user.stats ?? {};
  const progress = user.gradeProgress ?? {};
  const thresholds = progress.thresholds ?? {};

  const handleUpdate = async (event) => {
    event.preventDefault();
    setFormError(null);
    setSuccess(null);

    const nextErrors = {};
    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) nextErrors.nickname = '닉네임을 입력해 주세요.';
    else if (trimmedNickname.length < 2 || trimmedNickname.length > 20) {
      nextErrors.nickname = '닉네임은 2자 이상 20자 이하로 입력해 주세요.';
    }

    if (password) {
      if (password.length < 8) nextErrors.password = '비밀번호는 8자 이상이어야 해요.';
      else if (byteLength(password) > BCRYPT_MAX_BYTES) {
        nextErrors.password = '비밀번호는 72바이트 이하여야 해요.';
      }
      if (password !== confirmPassword) {
        nextErrors.confirmPassword = '비밀번호가 서로 달라요.';
      }
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {};
    if (trimmedNickname !== user.nickname) payload.nickname = trimmedNickname;
    if (password) payload.password = password;

    if (Object.keys(payload).length === 0) {
      setSuccess('변경된 내용이 없어요.');
      return;
    }

    try {
      await updateMe(payload);
      setPassword('');
      setConfirmPassword('');
      setSuccess('내 정보를 수정했어요.');
    } catch (error) {
      setFormError(error?.message ?? '수정에 실패했어요. 잠시 후 다시 시도해 주세요.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
      router.refresh();
    } catch {
      setFormError('로그아웃에 실패했어요. 잠시 후 다시 시도해 주세요.');
    }
  };

  const handleDelete = async () => {
    setFormError(null);
    try {
      await deleteMe();
      setIsDeleteOpen(false);
    } catch (error) {
      setFormError(error?.message ?? '탈퇴에 실패했어요. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>마이페이지</h1>
          <p className={styles.subtitle}>
            {user.nickname}님의 프로필과 활동을 확인하고 수정할 수 있어요.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? '로그아웃 중…' : '로그아웃'}
        </Button>
      </header>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>내 프로필</h2>
          <div className={styles.profileRow}>
            <span>이메일</span>
            <span className={styles.profileValue}>{user.email}</span>
          </div>
          <div className={styles.profileRow}>
            <span>닉네임</span>
            <span className={styles.profileValue}>{user.nickname}</span>
          </div>
          <div className={styles.profileRow}>
            <span>권한</span>
            <span className={styles.profileValue}>{user.role}</span>
          </div>
          <div className={styles.profileRow}>
            <span>등급</span>
            <span className={styles.profileValue}>{user.grade}</span>
          </div>
          <div className={styles.profileRowLast}>
            <span>가입일</span>
            <span className={styles.profileValue}>{formatDate(user.createdAt)}</span>
          </div>

          <div className={styles.statGrid}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.participationCount ?? 0}</span>
              <span className={styles.statLabel}>참여</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.applicationCount ?? 0}</span>
              <span className={styles.statLabel}>신청</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.feedbackCount ?? 0}</span>
              <span className={styles.statLabel}>피드백</span>
            </div>
          </div>

          <p className={styles.progressText}>
            등급 진행도 — 참여 {progress.participationCount ?? 0} · 추천{' '}
            {progress.recommendationCount ?? 0}
            <br />
            전문가 조건: 참여 {thresholds.PARTICIPATION ?? 5} + 추천{' '}
            {thresholds.RECOMMENDATION ?? 5}, 또는 참여 {thresholds.PARTICIPATION_ALONE ?? 10} /
            추천 {thresholds.RECOMMENDATION_ALONE ?? 10}
          </p>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>내 정보 수정</h2>
          <form className={styles.form} onSubmit={handleUpdate} noValidate>
            {formError && <p className={styles.feedback}>{formError}</p>}
            {success && <p className={styles.success}>{success}</p>}

            <AuthField
              label="닉네임"
              name="nickname"
              type="text"
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
                setErrors((prev) => ({ ...prev, nickname: undefined }));
                setSuccess(null);
              }}
              hint="2자 이상 20자 이하"
              errorMessage={errors.nickname}
            />

            <AuthField
              label="새 비밀번호 (선택)"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="바꿀 때만 입력해 주세요"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
                setSuccess(null);
              }}
              showPasswordToggle
              hint="8자 이상. 비밀번호를 바꾸면 다른 기기 로그인은 해제돼요."
              errorMessage={errors.password}
            />

            <AuthField
              label="새 비밀번호 확인"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="새 비밀번호를 한 번 더 입력해 주세요"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                setSuccess(null);
              }}
              showPasswordToggle
              errorMessage={errors.confirmPassword}
            />

            <div className={styles.actions}>
              <Button type="submit" variant="solid" size="md" disabled={isUpdatingMe}>
                {isUpdatingMe ? '저장 중…' : '저장하기'}
              </Button>
            </div>
          </form>

          <button
            type="button"
            className={styles.dangerButton}
            onClick={() => setIsDeleteOpen(true)}
          >
            회원 탈퇴
          </button>
        </section>
      </div>

      {isDeleteOpen && (
        <div className={styles.overlay} role="presentation" onClick={() => setIsDeleteOpen(false)}>
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="delete-account-title" className={styles.dialogTitle}>
              정말 탈퇴할까요?
            </h2>
            <p className={styles.dialogText}>
              탈퇴하면 이메일·닉네임 등 개인정보가 익명 처리되고 다시 로그인할 수 없어요. 챌린지
              참여 기록과 작업물은 보존됩니다.
            </p>
            {formError && <p className={styles.feedback}>{formError}</p>}
            <div className={styles.dialogActions}>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setIsDeleteOpen(false)}
                disabled={isDeletingMe}
              >
                취소
              </Button>
              <Button
                type="button"
                variant="filledTonal"
                size="md"
                onClick={handleDelete}
                disabled={isDeletingMe}
              >
                {isDeletingMe ? '탈퇴 처리 중…' : '탈퇴하기'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyPageContent;
