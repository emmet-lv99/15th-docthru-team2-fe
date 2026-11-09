import { describe, expect, it } from 'vitest';
import {
  buildChallengeChanges,
  formatDeadlineInput,
  toChallengeForm,
} from '@/features/admin-challenges/form';

const challenge = {
  id: 18,
  title: '원래 챌린지',
  sourceUrl: 'https://nextjs.org/docs',
  category: 'NEXT_JS',
  documentType: 'OFFICIAL',
  deadline: '2026-12-01T14:59:59.000Z',
  maxParticipants: 10,
  participantCount: 3,
  content: null,
  status: 'IN_PROGRESS',
};

describe('관리자 챌린지 수정 폼', () => {
  it('마감 시각을 한국 날짜로 표시한다', () => {
    expect(formatDeadlineInput(challenge.deadline)).toBe('2026-12-01');
    expect(toChallengeForm(challenge).content).toBe('');
    expect(toChallengeForm(challenge).maxParticipants).toBe('10');
  });

  it('기존 날짜를 유지하고 제목만 수정하면 title만 보낸다', () => {
    const form = { ...toChallengeForm(challenge), title: '제목 변경' };
    expect(buildChallengeChanges(challenge, form)).toEqual({ title: '제목 변경' });
  });

  it('마감일이 변경된 경우에만 UTC ISO 시각을 전송한다', () => {
    const form = { ...toChallengeForm(challenge), deadline: '2026-12-15' };
    expect(buildChallengeChanges(challenge, form)).toEqual({
      deadline: '2026-12-15T14:59:59.000Z',
    });
  });

  it('수정이 없으면 불필요한 PATCH 요청을 막는다', () => {
    expect(() => buildChallengeChanges(challenge, toChallengeForm(challenge))).toThrow(
      '변경된 항목이 없습니다.',
    );
  });

  it('정원을 실제 참여자 수 아래로 줄이지 않는다', () => {
    const form = { ...toChallengeForm(challenge), maxParticipants: '2' };
    expect(() => buildChallengeChanges(challenge, form)).toThrow(
      '최대 인원을 현재 참여 인원보다 적게 설정할 수 없습니다.',
    );
  });

  it('위험한 원문 URL 프로토콜을 허용하지 않는다', () => {
    const form = { ...toChallengeForm(challenge), sourceUrl: 'javascript:alert(1)' };
    expect(() => buildChallengeChanges(challenge, form)).toThrow('http(s)');
  });

  it('실제로 존재하지 않는 날짜는 다음 달로 보정하지 않고 차단한다', () => {
    for (const deadline of ['2026-02-30', '2026-11-31', '2025-02-29', '2026-13-20']) {
      expect(() =>
        buildChallengeChanges(challenge, {
          ...toChallengeForm(challenge),
          deadline,
        }),
      ).toThrow('마감일을 확인해 주세요.');
    }
    const validLeapDate = { ...toChallengeForm(challenge), deadline: '2028-02-29' };
    expect(buildChallengeChanges(challenge, validLeapDate)).toEqual({
      deadline: '2028-02-29T14:59:59.000Z',
    });
  });

  it('유효하지 않은 분야 값과 인원 값은 전송하지 않는다', () => {
    const form = { ...toChallengeForm(challenge), category: 'INVALID' };
    expect(() => buildChallengeChanges(challenge, form)).toThrow('분야');
    const invalidCount = { ...toChallengeForm(challenge), maxParticipants: '1.5' };
    expect(() => buildChallengeChanges(challenge, invalidCount)).toThrow('최대 인원');
  });

  it('필드 둘 이상을 고치면 변경 필드만 묶어서 전송한다', () => {
    const form = {
      ...toChallengeForm(challenge),
      title: '변경',
      category: 'WEB',
      maxParticipants: '20',
    };
    expect(buildChallengeChanges(challenge, form)).toEqual({
      title: '변경',
      category: 'WEB',
      maxParticipants: 20,
    });
  });
});
