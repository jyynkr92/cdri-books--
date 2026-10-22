export const API_ERROR_MESSAGE = {
  BAD_REQUEST: '요청 형식이 올바르지 않습니다.',
  UNAUTHORIZED: 'API 인증에 실패했습니다.',
  TOO_MANY_REQUESTS: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
  INTERNAL_SERVER_ERROR: '일시적인 오류가 발생했습니다.',
  NETWORK: '네트워크 연결을 확인해 주세요.',
} as const;
