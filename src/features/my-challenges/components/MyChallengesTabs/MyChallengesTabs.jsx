'use client';

// src/features/my-challenges/components/MyChallengesTabs/MyChallengesTabs.jsx
//
// 나의 챌린지 상단 탭 3개 — 참여중 · 완료 · 신청.
// 공용 `Tabs` 부품이 아직 뼈대라, 화면 안에서만 쓰는 링크형 탭으로 시작합니다.
// (공용 부품이 완성되면 그때 교체하면 됩니다)
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import * as styles from './MyChallengesTabs.css.js';

/** 탭 목록 — 신청한 챌린지는 팀원 ⑤ 화면(/my-applications)으로 연결해요 */
const TABS = [
  { key: 'participating', label: '참여중인 챌린지', href: '/my-challenges/participating' },
  { key: 'completed', label: '완료한 챌린지', href: '/my-challenges/completed' },
  { key: 'applied', label: '신청한 챌린지', href: '/my-applications' },
];

export function MyChallengesTabs() {
  // 현재 경로와 같은 탭에만 밑줄·진한 글자를 줘요
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="나의 챌린지 탭">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={isActive ? styles.activeTab : styles.tab}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default MyChallengesTabs;
