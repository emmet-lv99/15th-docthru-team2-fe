/** 백엔드 ISO 시각을 한국 날짜 입력 필드의 YYYY-MM-DD 형태로 변환합니다. */
export function formatDeadlineInput(iso) {
  if (!iso || Number.isNaN(Date.parse(iso))) return '';
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso));
}

/** 상세 API에 있는 모든 편집 필드를 입력 가능한 문자열로 초기화합니다. */
export function toChallengeForm(challenge = {}) {
  return {
    title: challenge.title ?? '',
    sourceUrl: challenge.sourceUrl ?? '',
    category: challenge.category ?? '',
    documentType: challenge.documentType ?? '',
    deadline: formatDeadlineInput(challenge.deadline),
    maxParticipants: String(challenge.maxParticipants ?? ''),
    content: challenge.content ?? '',
  };
}

const validCategories = new Set(['NEXT_JS', 'MODERN_JS', 'API', 'WEB', 'CAREER']);
const validDocuments = new Set(['OFFICIAL', 'BLOG', 'BOOK', 'OTHER']);

/**
 * 서버 PATCH는 부분 변경을 지원합니다.
 * 기존 값과 동일한 항목은 보내지 않아 마감 시각 등을 의도치 않게 변경하지 않습니다.
 */
export function buildChallengeChanges(original, form) {
  const initial = toChallengeForm(original);
  const input = {
    title: String(form.title ?? '').trim(),
    sourceUrl: String(form.sourceUrl ?? '').trim(),
    category: form.category,
    documentType: form.documentType,
    deadline: form.deadline,
    maxParticipants: String(form.maxParticipants ?? ''),
    content: String(form.content ?? ''),
  };
  if (!input.title || input.title.length > 100) throw new Error('제목은 1~100자로 입력해 주세요.');
  let url;
  try {
    url = new URL(input.sourceUrl);
  } catch {
    throw new Error('올바른 원문 주소를 입력해 주세요.');
  }
  if (!['http:', 'https:'].includes(url.protocol) || input.sourceUrl.length > 500) {
    throw new Error('원문 주소는 http(s) 링크로 500자 이내로 입력해 주세요.');
  }
  if (!validCategories.has(input.category)) throw new Error('분야를 선택해 주세요.');
  if (!validDocuments.has(input.documentType)) throw new Error('문서 타입을 선택해 주세요.');
  // Date.parse 는 2월 30일 같은 잘못된 날짜를 3월로 자동 보정할 수 있습니다.
  // 달력에서 실제 존재하는 날짜인지 구성 요소를 한 번 더 검증합니다.
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.deadline);
  const year = Number(dateMatch?.[1]);
  const month = Number(dateMatch?.[2]);
  const day = Number(dateMatch?.[3]);
  const daysInMonth =
    year >= 1 && month >= 1 && month <= 12 ? new Date(Date.UTC(year, month, 0)).getUTCDate() : 0;
  if (!dateMatch || !daysInMonth || day < 1 || day > daysInMonth) {
    throw new Error('마감일을 확인해 주세요.');
  }
  const count = Number(input.maxParticipants);
  if (!Number.isSafeInteger(count) || count < 1 || count > 1000) {
    throw new Error('최대 인원은 1~1,000명으로 입력해 주세요.');
  }
  if (count < Number(original.participantCount ?? 0)) {
    throw new Error('최대 인원을 현재 참여 인원보다 적게 설정할 수 없습니다.');
  }
  if (input.content.length > 100000) throw new Error('내용은 100,000자 이내로 입력해 주세요.');

  const changes = {};
  for (const name of ['title', 'sourceUrl', 'category', 'documentType', 'content']) {
    if (input[name] !== initial[name]) changes[name] = input[name];
  }
  if (count !== Number(initial.maxParticipants)) changes.maxParticipants = count;
  if (input.deadline !== initial.deadline) {
    changes.deadline = new Date(input.deadline + 'T23:59:59+09:00').toISOString();
  }
  if (Object.keys(changes).length === 0) throw new Error('변경된 항목이 없습니다.');
  return changes;
}
