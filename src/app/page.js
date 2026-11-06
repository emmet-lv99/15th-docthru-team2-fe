import { redirect } from 'next/navigation';
import { getLandingRedirect } from '@/features/landing/getLandingRedirect';
import LandingPageView from '@/features/landing/components/LandingPageView';

export const metadata = {
  title: '개발자와 함께 성장하는 번역 챌린지',
  description:
    '독스루에서 개발 기술 문서를 동료들과 함께 번역하고, 작업물에 피드백을 주고받으며 성장하세요.',
};

/** 랜딩 진입에서는 로그인 여부만 판별하고 나머지 화면 구성은 독립 컴포넌트에 위임합니다. */
export default async function LandingPage() {
  const destination = await getLandingRedirect();
  if (destination) redirect(destination);

  return <LandingPageView />;
}
