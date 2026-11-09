'use client';

import { usePathname } from 'next/navigation';

import { Tabs } from '@/components/Tabs';

const TABS = [
  { key: 'participating', label: '참여중인 챌린지', href: '/my-challenges/participating' },
  { key: 'completed', label: '완료한 챌린지', href: '/my-challenges/completed' },
  { key: 'applied', label: '신청한 챌린지', href: '/my-applications' },
];

export function MyChallengesTabs() {
  const pathname = usePathname();
  const activeKey = TABS.find((tab) => tab.href === pathname)?.key;

  return <Tabs items={TABS} activeKey={activeKey} />;
}

export default MyChallengesTabs;
