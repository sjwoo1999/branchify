import { useState, useEffect, useCallback } from 'react';
import { Goal, CreateGoalRequest, UpdateGoalRequest } from '@/types';
import apiClient from '@/lib/api';

export const useGoal = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedGoals = await apiClient.getGoals();
      setGoals(fetchedGoals);
    } catch (err) {
      setError(err instanceof Error ? err.message : '목표를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createGoal = useCallback(async (goalData: CreateGoalRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newGoal = await apiClient.createGoal(goalData);
      setGoals(prev => [...prev, newGoal]);
      return newGoal;
    } catch (err) {
      setError(err instanceof Error ? err.message : '목표 생성에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateGoal = useCallback(async (id: string, goalData: UpdateGoalRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updatedGoal = await apiClient.updateGoal(id, goalData);
      setGoals(prev => prev.map(goal => goal.id === id ? updatedGoal : goal));
      return updatedGoal;
    } catch (err) {
      setError(err instanceof Error ? err.message : '목표 수정에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteGoal = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.deleteGoal(id);
      setGoals(prev => prev.filter(goal => goal.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '목표 삭제에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const completeGoal = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const completedGoal = await apiClient.completeGoal(id);
      setGoals(prev => prev.map(goal => goal.id === id ? completedGoal : goal));
      return completedGoal;
    } catch (err) {
      setError(err instanceof Error ? err.message : '목표 완료 처리에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getGoalById = useCallback((id: string) => {
    return goals.find(goal => goal.id === id);
  }, [goals]);

  const getRootGoals = useCallback(() => {
    return goals.filter(goal => !goal.parentId);
  }, [goals]);

  const getChildGoals = useCallback((parentId: string) => {
    return goals.filter(goal => goal.parentId === parentId);
  }, [goals]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return {
    goals,
    loading,
    error,
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    completeGoal,
    getGoalById,
    getRootGoals,
    getChildGoals,
  };
}; 