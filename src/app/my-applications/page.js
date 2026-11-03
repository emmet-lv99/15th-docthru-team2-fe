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

import { AuthGuard } from '@/components/AuthGuard';
import Link from 'next/link';
import * as styles from './page.css.js';

export default function MeApplicationsPage() {
  return (
    <AuthGuard>
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
          />

          <select
            className={styles.statusSelect}
            defaultValue="PENDING"
            aria-label="신청 상태 필터"
          >
            <option value="ALL">전체 상태</option>
            <option value="PENDING">승인 대기</option>
            <option value="APPROVED">신청 승인</option>
            <option value="REJECTED">신청 거절</option>
            <option value="CANCELLED">신청 취소</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>분야</th>
              <th>카테고리</th>
              <th>챌린지 제목</th>
              <th>모집 인원</th>
              <th>신청일</th>
              <th>마감 기한</th>
              <th>상태</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1023</td>
              <td>공식문서</td>
              <td>API</td>
              <td>번역 챌린지</td>
              <td>10</td>
              <td>24/01/16</td>
              <td>24/02/24</td>
              <td>승인대기</td>
            </tr>
          </tbody>
        </table>
      </main>
    </AuthGuard>
  );
}
