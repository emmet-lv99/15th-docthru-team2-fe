export default async function sitemap() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://docthru-35785506844.asia-northeast3.run.app';

  // 1. 기본 정적 페이지
  const staticRoutes = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/challenges`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  try {
    const backendUrl = process.env.BACKEND_BASE_URL || 'http://localhost:5010/api/v1';

    // 2. 챌린지 목록 조회
    const res = await fetch(`${backendUrl}/challenges?limit=100`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return staticRoutes;

    const data = await res.json();
    const challenges = data.items || data.challenges || [];

    // 2-1. 챌린지 상세 페이지 URL
    const challengeRoutes = challenges.map((challenge) => ({
      url: `${siteUrl}/challenges/${challenge.id}`,
      lastModified:
        challenge.updatedAt || challenge.createdAt
          ? new Date(challenge.updatedAt || challenge.createdAt)
          : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // 2-2. 각 챌린지에 제출된 작업물(Work) 상세 페이지 URL 동적 수집 ✨
    const workRoutePromises = challenges.map(async (challenge) => {
      try {
        const pRes = await fetch(`${backendUrl}/challenges/${challenge.id}/participants?size=50`, {
          next: { revalidate: 3600 },
        });
        if (!pRes.ok) return [];

        const pData = await pRes.json();
        const participants = pData.items || [];
        // 참여자들의 works 배열을 펼쳐서 작업물 URL 목록 생성
        return participants.flatMap((p) => {
          const works = Array.isArray(p.works) ? p.works : [];
          return works
            .filter((w) => w && w.id)
            .map((w) => ({
              url: `${siteUrl}/challenges/${challenge.id}/works/${w.id}`,
              lastModified: w.submittedAt ? new Date(w.submittedAt) : new Date(),
              changeFrequency: 'monthly',
              priority: 0.7, // 고품질 사용자 작성 콘텐츠
            }));
        });
      } catch {
        return [];
      }
    });

    const workRoutesNested = await Promise.all(workRoutePromises);
    const workRoutes = workRoutesNested.flat();

    // 정적 페이지 + 챌린지 상세 + 작업물 상세를 모두 합쳐서 반환!
    return [...staticRoutes, ...challengeRoutes, ...workRoutes];
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    return staticRoutes;
  }
}
