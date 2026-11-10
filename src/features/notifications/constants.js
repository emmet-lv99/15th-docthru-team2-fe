export const NOTIFICATION_TYPES = {
  CHALLENGE_APPROVED: 'CHALLENGE_APPROVED',
  CHALLENGE_REJECTED: 'CHALLENGE_REJECTED',
  CHALLENGE_UPDATED: 'CHALLENGE_UPDATED',
  CHALLENGE_DELETED: 'CHALLENGE_DELETED',
  WORK_ADDED: 'WORK_ADDED',
  FEEDBACK_ADDED: 'FEEDBACK_ADDED',
  FEEDBACK_UPDATED: 'FEEDBACK_UPDATED',
  FEEDBACK_DELETED: 'FEEDBACK_DELETED',
  CHALLENGE_DEADLINE: 'CHALLENGE_DEADLINE',
};

export function getNotificationMessage(notification) {
  const { type, relatedChallengeTitle } = notification;

  const challengeTitle = relatedChallengeTitle ? `'${relatedChallengeTitle}'` : '챌린지';

  switch (type) {
    case NOTIFICATION_TYPES.CHALLENGE_APPROVED:
      return `${challengeTitle}이/가 승인되었어요`;

    case NOTIFICATION_TYPES.CHALLENGE_REJECTED:
      return `${challengeTitle}이/가 거절되었어요`;

    case NOTIFICATION_TYPES.CHALLENGE_UPDATED:
      return `${challengeTitle}이/가 수정되었어요`;

    case NOTIFICATION_TYPES.CHALLENGE_DELETED:
      return `${challengeTitle}이/가 삭제되었어요`;

    case NOTIFICATION_TYPES.CHALLENGE_DEADLINE:
      return `${challengeTitle}이/가 마감되었어요`;

    case NOTIFICATION_TYPES.WORK_ADDED:
      return `${challengeTitle}에 작업물이 추가되었어요`;

    case NOTIFICATION_TYPES.FEEDBACK_ADDED:
      return `${challengeTitle}에 도전한 작업물에 피드백이 추가되었어요`;

    case NOTIFICATION_TYPES.FEEDBACK_UPDATED:
      return `${challengeTitle} 작업물에 작성한 피드백이 수정되었어요`;

    case NOTIFICATION_TYPES.FEEDBACK_DELETED:
      return `${challengeTitle} 작업물에 작성한 피드백이 삭제되었어요`;

    default:
      return '새로운 알림이 도착했어요';
  }
}

export function getNotificationHref(notification) {
  const { type, relatedChallengeId, relatedWorkId } = notification;

  const challengeHref = relatedChallengeId ? `/challenges/${relatedChallengeId}` : '/challenges';

  const workHref =
    relatedChallengeId && relatedWorkId
      ? `/challenges/${relatedChallengeId}/works/${relatedWorkId}`
      : challengeHref;

  switch (type) {
    case NOTIFICATION_TYPES.CHALLENGE_APPROVED:
      return relatedChallengeId ? challengeHref : '/my-applications';
      
    case NOTIFICATION_TYPES.CHALLENGE_REJECTED:
      return '/my-applications';

    case NOTIFICATION_TYPES.CHALLENGE_UPDATED:
    case NOTIFICATION_TYPES.CHALLENGE_DEADLINE:
      return challengeHref;

    case NOTIFICATION_TYPES.CHALLENGE_DELETED:
      return '/challenges';

    case NOTIFICATION_TYPES.WORK_ADDED:
    case NOTIFICATION_TYPES.FEEDBACK_ADDED:
    case NOTIFICATION_TYPES.FEEDBACK_UPDATED:
    case NOTIFICATION_TYPES.FEEDBACK_DELETED:
      return workHref;

    default:
      return '/notifications';
  }
}
