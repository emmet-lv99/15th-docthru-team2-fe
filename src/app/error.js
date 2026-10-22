// src/app/error.js — 라우트 오류 경계 (Next App Router 규칙 파일)
//
// 자식 화면에서 오류가 나면 이 파일이 대신 그려져요.
//   · error : 발생한 오류 객체 (원인 파악용으로 콘솔에 남겨요)
//   · reset : 이 함수를 호출하면 해당 부분을 다시 렌더해요 → "다시 시도" 버튼에 연결
//
// ⚠️ 루트 layout 자체에서 난 오류는 여기서 잡히지 않아요 (그때는 global-error.js 담당).
'use client';

import { useEffect } from 'react';
import { Warn } from '@/components/Warn';
import { Button } from '@/components/Button';
// QueryBoundary 의 오류 화면 스타일을 그대로 재사용해 화면 톤을 맞춰요.
import * as styles from '@/components/QueryBoundary/QueryBoundary.css.js';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorFallback}>
      <Warn title="페이지를 불러오지 못했어요" description="잠시 후 다시 시도해 주세요." />
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
