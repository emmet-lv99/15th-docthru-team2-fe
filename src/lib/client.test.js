import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { apiClient, httpClient } from './client.js';

let apiMock;

beforeEach(() => {
  apiMock = new MockAdapter(httpClient);
});

afterEach(() => {
  apiMock.restore();
});

describe('apiClient 응답 처리', () => {
  it('2xx JSON 응답은 data 만 돌려준다', async () => {
    apiMock.onGet('/challenges').reply(200, { items: [1, 2] });

    await expect(apiClient.get('/challenges')).resolves.toEqual({ items: [1, 2] });
  });

  it('204 응답은 null 을 돌려준다', async () => {
    apiMock.onPost('/auth/logout').reply(204);

    await expect(apiClient.post('/auth/logout')).resolves.toBeNull();
  });

  it('서버 오류의 code 와 field 를 ApiError 로 옮긴다', async () => {
    apiMock.onPost('/auth/login').reply(400, {
      code: 'VALIDATION_ERROR',
      message: '이메일을 확인해 주세요',
      details: { field: 'email' },
    });

    await expect(apiClient.post('/auth/login', {})).rejects.toMatchObject({
      name: 'ApiError',
      status: 400,
      code: 'VALIDATION_ERROR',
      field: 'email',
      message: '이메일을 확인해 주세요',
    });
  });
});

describe('네트워크 오류 변환', () => {
  it('timeout 은 408 TIMEOUT 으로 변환한다', async () => {
    apiMock.onGet('/slow').timeout();

    await expect(apiClient.get('/slow')).rejects.toMatchObject({
      status: 408,
      code: 'TIMEOUT',
    });
  });

  it('네트워크 오류는 status 0 NETWORK_ERROR 로 변환한다', async () => {
    apiMock.onGet('/offline').networkError();

    await expect(apiClient.get('/offline')).rejects.toMatchObject({
      status: 0,
      code: 'NETWORK_ERROR',
    });
  });
});

describe('401 세션 갱신', () => {
  it('401 이면 /auth/me 로 한 번 갱신하고 원 요청을 재시도한다', async () => {
    apiMock.onGet('/challenges').replyOnce(401).onGet('/challenges').replyOnce(200, {
      items: [],
    });
    apiMock.onGet('/auth/me').replyOnce(200, { id: 1 });

    await expect(apiClient.get('/challenges')).resolves.toEqual({ items: [] });

    expect(apiMock.history.get.filter((request) => request.url === '/auth/me')).toHaveLength(1);
  });

  it('로그인 401 은 세션 갱신을 시도하지 않는다', async () => {
    apiMock.onPost('/auth/login').reply(401, {
      code: 'UNAUTHORIZED',
      message: '이메일 또는 비밀번호를 확인해 주세요',
    });

    await expect(apiClient.post('/auth/login', {})).rejects.toMatchObject({
      status: 401,
      code: 'UNAUTHORIZED',
    });

    expect(apiMock.history.get.filter((request) => request.url === '/auth/me')).toHaveLength(0);
  });

  it('동시 401 은 /auth/me 를 한 번만 호출한다 (single-flight)', async () => {
    apiMock.onGet('/a').replyOnce(401).onGet('/a').replyOnce(200, { a: 1 });
    apiMock.onGet('/b').replyOnce(401).onGet('/b').replyOnce(200, { b: 2 });
    apiMock.onGet('/auth/me').reply(200, { id: 1 });

    const [a, b] = await Promise.all([apiClient.get('/a'), apiClient.get('/b')]);

    expect(a).toEqual({ a: 1 });
    expect(b).toEqual({ b: 2 });
    expect(apiMock.history.get.filter((request) => request.url === '/auth/me')).toHaveLength(1);
  });
});
