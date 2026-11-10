import { describe, expect, it } from 'vitest';
import { buildChallengeDetailMetadata } from '@/features/challenges/metadata';

describe('챌린지 상세 메타데이터', () => {
  it('챌린지별 제목·설명과 canonical·Open Graph 주소를 생성한다', () => {
    const metadata = buildChallengeDetailMetadata(18, {
      title: 'Next.js App Router 가이드',
      content: '  <p>서버   컴포넌트</p> 와 라우팅 정리  ',
    });
    expect(metadata).toEqual({
      title: 'Next.js App Router 가이드',
      description: '서버 컴포넌트 와 라우팅 정리',
      alternates: { canonical: '/challenges/18' },
      openGraph: {
        title: 'Next.js App Router 가이드',
        description: '서버 컴포넌트 와 라우팅 정리',
        type: 'article',
        url: '/challenges/18',
      },
    });
  });

  it('설명 내용이 없는 챌린지도 검색용 기본 설명을 제공한다', () => {
    const metadata = buildChallengeDetailMetadata(9, {
      title: 'API 문서 번역',
      content: null,
    });
    expect(metadata.description).toContain('API 문서 번역');
    expect(metadata.alternates.canonical).toBe('/challenges/9');
  });

  it('장문은 160자로 제한하고 공백 제목에는 대체 제목을 사용한다', () => {
    const metadata = buildChallengeDetailMetadata(3, {
      title: '   ',
      content: '설명'.repeat(200),
    });
    expect(metadata.title).toBe('번역 챌린지');
    expect(metadata.description.length).toBeLessThanOrEqual(160);
  });
});
