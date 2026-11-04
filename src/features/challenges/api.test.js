import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { httpClient } from '../../lib/client.js';
import {
  getChallengeList,
  getChallengeDetail,
  getChallengeParticipants,
  joinChallenge,
  abandonChallenge,
} from './api.js';
import { buildChallengeQuery, normalizeChallengeFilters } from './query.js';

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
