import { useState, useEffect, useCallback } from 'react';
import { Routine, CreateRoutineRequest } from '@/types';
import apiClient from '@/lib/api';

export const useRoutine = (goalId?: string) => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoutines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let fetchedRoutines: Routine[];
      
      if (goalId) {
        fetchedRoutines = await apiClient.getRoutinesByGoal(goalId);
      } else {
        fetchedRoutines = await apiClient.getRoutines();
      }
      
      setRoutines(fetchedRoutines);
    } catch (err) {
      setError(err instanceof Error ? err.message : '루틴을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [goalId]);

  const createRoutine = useCallback(async (routineData: CreateRoutineRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newRoutine = await apiClient.createRoutine(routineData);
      setRoutines(prev => [...prev, newRoutine]);
      return newRoutine;
    } catch (err) {
      setError(err instanceof Error ? err.message : '루틴 생성에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const completeRoutine = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const completedRoutine = await apiClient.completeRoutine(id);
      setRoutines(prev => prev.map(routine => routine.id === id ? completedRoutine : routine));
      return completedRoutine;
    } catch (err) {
      setError(err instanceof Error ? err.message : '루틴 완료 처리에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRoutine = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.deleteRoutine(id);
      setRoutines(prev => prev.filter(routine => routine.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '루틴 삭제에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRoutineById = useCallback((id: string) => {
    return routines.find(routine => routine.id === id);
  }, [routines]);

  const getTodayRoutines = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return routines.filter(routine => {
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
    });
  }, [routines]);

  const getCompletedToday = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return routines.filter(routine => {
      return routine.completedDates.some(date => {
        const completedDate = new Date(date);
        completedDate.setHours(0, 0, 0, 0);
        return completedDate.getTime() === today.getTime();
      });
    });
  }, [routines]);

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  return {
    routines,
    loading,
    error,
    fetchRoutines,
    createRoutine,
    completeRoutine,
    deleteRoutine,
    getRoutineById,
    getTodayRoutines,
    getCompletedToday,
  };
}; 