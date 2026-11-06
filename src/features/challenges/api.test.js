import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { httpClient } from '@/lib/client';
import {
  getChallengeList,
  getChallengeDetail,
  getChallengeParticipants,
  joinChallenge,
  abandonChallenge,
  getMyChallengeParticipation,
  getTopLikedWorks,
} from '@/features/challenges/api';
import { buildChallengeQuery, normalizeChallengeFilters } from '@/features/challenges/query';

let mock;

beforeEach(() => {
  mock = new MockAdapter(httpClient);
});
afterEach(() => {
  mock.restore();
});

describe('챌린지 URL 계약', () => {
  it('기술 분야를 반복 파라미터로 직렬화한다', () => {
    const q = new URLSearchParams(
      buildChallengeQuery({
        q: '  Node ',
        category: ['API', 'WEB'],
        status: 'IN_PROGRESS',
        page: 2,
      }),
    );
    expect(q.getAll('category')).toEqual(['API', 'WEB']);
    expect(q.get('q')).toBe('Node');
    expect(q.get('status')).toBe('IN_PROGRESS');
    expect(q.get('page')).toBe('2');
    expect(q.get('size')).toBe('9');
  });

  it('잘못된 URL 값은 안전하게 기본값으로 바꾼다', () => {
    expect(
      normalizeChallengeFilters({ category: ['API', 'BAD', 'API'], page: '-1' }),
    ).toMatchObject({
      category: ['API'],
      page: 1,
      sort: 'latest',
    });
  });
});

describe('빈 필터 입력의 기본값 처리', () => {
  it('null도 기본 목록 필터로 정규화한다', () => {
    expect(normalizeChallengeFilters(null)).toMatchObject({
      q: '',
      category: [],
      sort: 'latest',
      page: 1,
      size: 9,
    });
    expect(new URLSearchParams(buildChallengeQuery(null)).get('page')).toBe('1');
  });

  it('클라이언트 목록 조회에 null을 전달해도 기본 쿼리로 요청한다', async () => {
    mock.onGet('/challenges?sort=latest&page=1&size=9').reply(200, { items: [] });
    await expect(getChallengeList(null)).resolves.toMatchObject({ items: [] });
  });

  it('클라이언트 참여자 조회에 null을 전달해도 기본 정렬을 사용한다', async () => {
    mock.onGet('/challenges/5/participants').reply((config) => {
      expect(config.params).toEqual({ page: 1, size: 10, sort: 'likes' });
      return [200, { items: [] }];
    });
    await expect(getChallengeParticipants(5, null)).resolves.toMatchObject({ items: [] });
  });
});

describe('챌린지 HTTP 계약', () => {
  it('검색·필터 포함 목록 조회를 API 클라이언트로 호출한다', async () => {
    mock.onGet(/\/challenges\?/).reply((config) => {
      const query = new URL(config.url, 'http://test.local').searchParams;
      expect(query.getAll('category')).toEqual(['NEXT_JS', 'WEB']);
      return [200, { items: [], page: 1, size: 9, totalItems: 0, totalPages: 0 }];
    });
    const response = await getChallengeList({ category: ['NEXT_JS', 'WEB'] });
    expect(response.items).toEqual([]);
  });

  it('상세 조회 응답을 전달한다', async () => {
    mock.onGet('/challenges/5').reply(200, { id: 5, title: '챌린지' });
    await expect(getChallengeDetail(5)).resolves.toMatchObject({ id: 5 });
  });

  it('참여자 조회는 페이지·정렬을 전달한다', async () => {
    mock.onGet('/challenges/5/participants').reply((config) => {
      expect(config.params).toEqual({ page: 2, size: 10, sort: 'submittedAt' });
      return [200, { items: [], totalPages: 0 }];
    });
    await expect(
      getChallengeParticipants(5, { page: 2, size: 10, sort: 'submittedAt' }),
    ).resolves.toMatchObject({ items: [] });
  });

  it('없는 챌린지 상세는 404 API 오류로 구분한다', async () => {
    mock.onGet('/challenges/999999').reply(404, {
      code: 'NOT_FOUND',
      message: '챌린지를 찾을 수 없습니다',
    });
    await expect(getChallengeDetail(999999)).rejects.toMatchObject({
      name: 'ApiError',
      status: 404,
      code: 'NOT_FOUND',
    });
  });

  it('잘못된 필터는 요청에 포함되지 않는다', async () => {
    mock.onGet(/\/challenges\?/).reply((config) => {
      const params = new URL(config.url, 'http://test.local').searchParams;
      expect(params.getAll('category')).toEqual([]);
      expect(params.has('status')).toBe(false);
      expect(params.get('page')).toBe('1');
      return [200, { items: [], totalPages: 0 }];
    });
    await getChallengeList({ category: ['UNKNOWN'], status: 'FINISHED', page: -1 });
  });

  it('도전·포기 API 경로와 메서드를 유지한다', async () => {
    mock.onPost('/challenges/5/participation').reply(201, { participantId: 3 });
    mock.onDelete('/challenges/5/participation').reply(204);
    await expect(joinChallenge(5)).resolves.toMatchObject({ participantId: 3 });
    await expect(abandonChallenge(5)).resolves.toBeNull();
  });
});

describe('목록·상세·참여·포기 통합 시나리오의 API 경계', () => {
  it('내 참여 상태는 현재 참여자 페이지가 아닌 works/me의 200으로 확인한다', async () => {
    mock.onGet('/challenges/5/works/me').reply(200, {
      challengeId: 5,
      participantId: 51,
      work: null,
      totalWorks: 0,
    });
    await expect(getMyChallengeParticipation(5)).resolves.toEqual({
      participating: true,
      totalWorks: 0,
    });
  });

  it('비참여 404는 참여 가능 상태이며, 그 밖의 서버 오류는 숨기지 않는다', async () => {
    mock
      .onGet('/challenges/5/works/me')
      .replyOnce(404, {
        code: 'NOT_FOUND',
      })
      .onGet('/challenges/5/works/me')
      .replyOnce(500, {
        code: 'INTERNAL_ERROR',
        message: '서버 오류',
      });
    await expect(getMyChallengeParticipation(5)).resolves.toEqual({
      participating: false,
      totalWorks: 0,
    });
    await expect(getMyChallengeParticipation(5)).rejects.toMatchObject({ status: 500 });
  });

  it('마감 후 1위 동률은 참여자 페이지 100명 경계를 넘어 모두 포함한다', async () => {
    const makeItem = (i) => ({
      participantId: i,
      user: { id: i, nickname: String(i) },
      isAbandoned: false,
      works: [{ id: 100 + i, likeCount: 7, content: '번역' }],
    });
    mock.onGet('/challenges/5/participants').reply((config) => {
      expect(config.params.sort).toBe('likes');
      expect(config.params.size).toBe(100);
      return config.params.page === 1
        ? [200, { items: Array.from({ length: 100 }, (_, i) => makeItem(i + 1)), totalPages: 2 }]
        : [200, { items: [makeItem(101)], totalPages: 2 }];
    });
    const works = await getTopLikedWorks(5);
    expect(works).toHaveLength(101);
    expect(works.at(-1).work.id).toBe(201);
  });

  it('1위 추천이 0개라면 최다 추천작 카드를 임의로 만들지 않는다', async () => {
    mock.onGet('/challenges/5/participants').reply(200, {
      items: [{ participantId: 1, isAbandoned: false, works: [{ id: 1, likeCount: 0 }] }],
      totalPages: 1,
    });
    await expect(getTopLikedWorks(5)).resolves.toEqual([]);
  });
});
