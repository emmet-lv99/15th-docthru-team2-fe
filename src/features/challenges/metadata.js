/** 챌린지 상세 검색/공유용 메타데이터를 API 응답에서 생성합니다. */
export function buildChallengeDetailMetadata(challengeId, challenge) {
  const title = String(challenge?.title ?? '').trim() || '번역 챌린지';
  // 사용자 작성 원문에 HTML이나 줄바꿈이 섞여도 메타 설명은 단일 텍스트로 표시합니다.
  const plainContent = String(challenge?.content ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const description = plainContent
    ? plainContent.slice(0, 160)
    : `${title}의 원문과 참여 현황을 독스루에서 확인하세요.`;
  const url = `/challenges/${challengeId}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
    },
  };
}
