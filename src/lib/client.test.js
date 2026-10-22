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
