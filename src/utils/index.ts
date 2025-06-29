import { Goal, Routine } from '@/types';

// 날짜 관련 유틸리티
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatDateShort = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isThisWeek = (date: Date): boolean => {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);
  return date >= weekAgo && date <= today;
};

export const isThisMonth = (date: Date): boolean => {
  const today = new Date();
  return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

// 목표 관련 유틸리티
export const calculateProgress = (goal: Goal): number => {
  if (goal.children.length === 0) {
    return goal.progress;
  }
  
  const childrenProgress = goal.children.reduce((acc, child) => acc + calculateProgress(child), 0);
  return Math.round(childrenProgress / goal.children.length);
};

export const getGoalStatusColor = (status: Goal['status']): string => {
  switch (status) {
    case 'completed':
      return 'text-neon-cyan';
    case 'paused':
      return 'text-neon-pink';
    default:
      return 'text-neon-purple';
  }
};

export const getPriorityColor = (priority: Goal['priority']): string => {
  switch (priority) {
    case 'high':
      return 'text-neon-pink';
    case 'medium':
      return 'text-electric-yellow';
    default:
      return 'text-neon-cyan';
  }
};

export const getGoalColorClass = (color: Goal['color']): string => {
  switch (color) {
    case 'purple':
      return 'neon-glow';
    case 'cyan':
      return 'neon-glow-cyan';
    case 'pink':
      return 'neon-glow-pink';
    case 'yellow':
      return 'shadow-[0_0_20px_rgba(255,234,0,0.5)]';
    default:
      return 'neon-glow';
  }
};

// 루틴 관련 유틸리티
export const getRoutineFrequencyText = (frequency: Routine['frequency']): string => {
  switch (frequency) {
    case 'daily':
      return '매일';
    case 'weekly':
      return '매주';
    case 'monthly':
      return '매월';
    default:
      return '알 수 없음';
  }
};

export const shouldCompleteRoutine = (routine: Routine): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastCompleted = routine.completedDates[routine.completedDates.length - 1];
  if (!lastCompleted) return true; // 아직 완료한 적이 없으면 오늘 해야 함
  
  const lastCompletedDate = new Date(lastCompleted);
  lastCompletedDate.setHours(0, 0, 0, 0);
  
  switch (routine.frequency) {
    case 'daily':
      return lastCompletedDate.getTime() < today.getTime();
    case 'weekly':
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      return lastCompletedDate.getTime() < weekAgo.getTime();
    case 'monthly':
      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);
      return lastCompletedDate.getTime() < monthAgo.getTime();
    default:
      return false;
  }
};

// 문자열 관련 유틸리티
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// 배열 관련 유틸리티
export const groupBy = <T, K extends keyof any>(array: T[], key: (item: T) => K): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const group = key(item);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// 로컬 스토리지 유틸리티
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const removeFromStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// 검증 유틸리티
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

// 디바운스 유틸리티
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// 쿠키 유틸리티
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const setCookie = (name: string, value: string, days: number = 7): void => {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export const removeCookie = (name: string): void => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}; 