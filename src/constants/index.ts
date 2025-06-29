// 색상 상수
export const COLORS = {
  NEON_PURPLE: '#A259FF',
  NEON_CYAN: '#00E0FF',
  NEON_PINK: '#FF2E63',
  DEEP_NAVY: '#0D0D2B',
  GLASS_WHITE: '#F0F0F5',
  ELECTRIC_YELLOW: '#FFEA00',
} as const;

// 목표 상태
export const GOAL_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PAUSED: 'paused',
} as const;

// 우선순위
export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// 목표 색상
export const GOAL_COLORS = {
  PURPLE: 'purple',
  CYAN: 'cyan',
  PINK: 'pink',
  YELLOW: 'yellow',
} as const;

// 루틴 빈도
export const ROUTINE_FREQUENCY = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const;

// 알림 타입
export const NOTIFICATION_TYPE = {
  GOAL: 'goal',
  ROUTINE: 'routine',
  ACHIEVEMENT: 'achievement',
  REMINDER: 'reminder',
} as const;

// 애니메이션 지속 시간
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 1.0,
} as const;

// API 엔드포인트
export const API_ENDPOINTS = {
  GOALS: '/goals',
  ROUTINES: '/routines',
  USER: '/user',
  DASHBOARD: '/dashboard',
} as const;

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
} as const;

// 뷰 모드
export const VIEW_MODE = {
  MAP: 'map',
  LIST: 'list',
} as const;

// 페이지 제한
export const LIMITS = {
  GOALS_PER_PAGE: 20,
  ROUTINES_PER_PAGE: 50,
  TAGS_MAX_COUNT: 10,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;

// 성취 배지
export const ACHIEVEMENTS = {
  FIRST_GOAL: 'first_goal',
  GOAL_STREAK_7: 'goal_streak_7',
  GOAL_STREAK_30: 'goal_streak_30',
  COMPLETE_10_GOALS: 'complete_10_goals',
  COMPLETE_50_GOALS: 'complete_50_goals',
  PERFECT_WEEK: 'perfect_week',
  PERFECT_MONTH: 'perfect_month',
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  VALIDATION_ERROR: '입력 정보를 확인해주세요.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  GOAL_NOT_FOUND: '목표를 찾을 수 없습니다.',
  ROUTINE_NOT_FOUND: '루틴을 찾을 수 없습니다.',
} as const;

// 성공 메시지
export const SUCCESS_MESSAGES = {
  GOAL_CREATED: '목표가 성공적으로 생성되었습니다.',
  GOAL_UPDATED: '목표가 성공적으로 수정되었습니다.',
  GOAL_DELETED: '목표가 성공적으로 삭제되었습니다.',
  GOAL_COMPLETED: '목표를 완료했습니다! 축하합니다! 🎉',
  ROUTINE_CREATED: '루틴이 성공적으로 생성되었습니다.',
  ROUTINE_COMPLETED: '루틴을 완료했습니다!',
  PROFILE_UPDATED: '프로필이 성공적으로 수정되었습니다.',
} as const; 