'use client';

// src/features/my-challenges/components/ParticipatingList/ParticipatingList.jsx
//
// 참여 중인 챌린지 목록 — 3단계에서는 **제목만** 그립니다.
// (데이터가 화면까지 흐르는 것을 먼저 확인하고, 카드 모양은 다음 단계에서 입혀요)
import { useParticipating } from '../../hooks/useParticipating';

export function ParticipatingList() {
  const { data, isPending, isError, error } = useParticipating();

  if (isPending) return <p>불러오는 중…</p>;

  if (isError) {
    return <p>목록을 불러오지 못했어요: {error?.message ?? '알 수 없는 오류'}</p>;
  }

  const items = data.pages.flatMap((page) => page.items);

  if (items.length === 0) return <p>참여 중인 챌린지가 없어요.</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.participationId}>{item.challenge.title}</li>
      ))}
    </ul>
  );
}

export default ParticipatingList;
