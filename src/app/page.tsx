'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Goal, CreateGoalRequest } from '@/types';
import { useGoal } from '@/hooks/useGoal';
import { useRoutine } from '@/hooks/useRoutine';
import GoalMap from '@/features/goal/GoalMap';
import GoalCard from '@/features/goal/GoalCard';
import GoalEditor from '@/features/goal/GoalEditor';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';

// 샘플 데이터
const sampleGoals: Goal[] = [
  {
    id: '1',
    title: '개발자 성장하기',
    description: '프론트엔드 개발 실력을 향상시키고 새로운 기술을 습득한다',
    status: 'active',
    priority: 'high',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    dueDate: new Date('2024-12-31'),
    children: [],
    progress: 65,
    color: 'purple',
    tags: ['개발', '성장', '프론트엔드'],
  },
  {
    id: '2',
    title: 'React 마스터하기',
    description: 'React의 고급 기능들을 학습하고 실제 프로젝트에 적용한다',
    status: 'active',
    priority: 'high',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    parentId: '1',
    children: [],
    progress: 80,
    color: 'cyan',
    tags: ['React', 'JavaScript', '프론트엔드'],
  },
  {
    id: '3',
    title: 'TypeScript 학습',
    description: 'TypeScript의 타입 시스템을 깊이 있게 학습한다',
    status: 'active',
    priority: 'medium',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    parentId: '1',
    children: [],
    progress: 45,
    color: 'pink',
    tags: ['TypeScript', '타입', '개발'],
  },
  {
    id: '4',
    title: '건강한 생활습관 만들기',
    description: '규칙적인 운동과 건강한 식습관을 형성한다',
    status: 'active',
    priority: 'medium',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    children: [],
    progress: 30,
    color: 'yellow',
    tags: ['건강', '운동', '생활습관'],
  },
];

export default function HomePage() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // 실제 API 연동 시에는 이 훅들을 사용
  // const { goals, loading, error, createGoal, updateGoal, deleteGoal, completeGoal } = useGoal();
  // const { routines, getTodayRoutines, getCompletedToday } = useRoutine();

  // 샘플 데이터 사용
  const goals = sampleGoals;
  const loading = false;
  const error = null;

  const handleCreateGoal = async (goalData: CreateGoalRequest) => {
    console.log('새 목표 생성:', goalData);
    setIsEditorOpen(false);
    // 실제로는 createGoal(goalData) 호출
  };

  const handleUpdateGoal = async (goalData: any) => {
    console.log('목표 수정:', goalData);
    setIsEditorOpen(false);
    setEditingGoal(null);
    // 실제로는 updateGoal(editingGoal!.id, goalData) 호출
  };

  const handleDeleteGoal = async (goalId: string) => {
    console.log('목표 삭제:', goalId);
    // 실제로는 deleteGoal(goalId) 호출
  };

  const handleCompleteGoal = async (goalId: string) => {
    console.log('목표 완료:', goalId);
    // 실제로는 completeGoal(goalId) 호출
  };

  const openEditor = (goal?: Goal) => {
    setEditingGoal(goal || null);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditingGoal(null);
  };

  const todayRoutines = []; // getTodayRoutines();
  const completedToday = []; // getCompletedToday();

  return (
    <div className="min-h-screen bg-deep-navy text-glass-white">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent">
                Branchify
              </h1>
              <p className="text-glass-white/70 mt-1">네온 기반 목표 관리 플랫폼</p>
            </motion.div>

            <div className="flex items-center gap-4">
              <NeonButton
                variant="purple"
                onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
              >
                {viewMode === 'map' ? '목록 보기' : '맵 보기'}
              </NeonButton>
              <NeonButton
                variant="cyan"
                onClick={() => openEditor()}
              >
                새 목표
              </NeonButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-0">
        <div className="max-w-7xl mx-auto px-6 pb-6">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <GlassCard className="text-center">
              <div className="text-2xl font-bold text-neon-purple">{goals.length}</div>
              <div className="text-sm text-glass-white/70">총 목표</div>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-2xl font-bold text-neon-cyan">
                {goals.filter(g => g.status === 'completed').length}
              </div>
              <div className="text-sm text-glass-white/70">완료</div>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-2xl font-bold text-neon-pink">
                {goals.filter(g => g.status === 'active').length}
              </div>
              <div className="text-sm text-glass-white/70">진행중</div>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-2xl font-bold text-electric-yellow">
                {Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%
              </div>
              <div className="text-sm text-glass-white/70">평균 진행률</div>
            </GlassCard>
          </motion.div>

          {/* Today's Routines */}
          {todayRoutines.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold font-poppins mb-4">오늘의 루틴</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todayRoutines.map((routine) => (
                  <GlassCard key={routine.id} className="p-4">
                    <h3 className="font-semibold mb-2">{routine.title}</h3>
                    <p className="text-sm text-glass-white/70 mb-3">{routine.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-neon-cyan">연속 {routine.streak}일</span>
                      <NeonButton size="sm" variant="cyan">
                        완료
                      </NeonButton>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}

          {/* Goals Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-poppins">목표 관리</h2>
              <div className="flex gap-2">
                <NeonButton
                  size="sm"
                  variant="purple"
                  onClick={() => openEditor()}
                >
                  새 목표 추가
                </NeonButton>
              </div>
            </div>

            {viewMode === 'map' ? (
              <div className="h-[600px] rounded-2xl overflow-hidden">
                <GoalMap
                  goals={goals}
                  onGoalClick={setSelectedGoal}
                  onGoalComplete={handleCompleteGoal}
                  onGoalEdit={openEditor}
                  onGoalDelete={handleDeleteGoal}
                  selectedGoalId={selectedGoal?.id}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onClick={() => setSelectedGoal(goal)}
                    onComplete={() => handleCompleteGoal(goal.id)}
                    onEdit={() => openEditor(goal)}
                    onDelete={() => handleDeleteGoal(goal.id)}
                    isSelected={selectedGoal?.id === goal.id}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* AI Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <GlassCard className="p-6 neon-glow-cyan">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neon-cyan/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neon-cyan mb-2">AI 피드백</h3>
                  <p className="text-glass-white/80">
                    "개발자 성장하기" 목표가 65% 완료되었습니다! React 학습이 잘 진행되고 있네요. 
                    다음 단계로 TypeScript 학습에 더 집중해보시는 것을 추천합니다.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>

      {/* Goal Editor Modal */}
      <GoalEditor
        isOpen={isEditorOpen}
        onClose={closeEditor}
        onSave={editingGoal ? handleUpdateGoal : handleCreateGoal}
        goal={editingGoal}
        loading={loading}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-glass-white">로딩중...</p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 right-4 z-50">
          <GlassCard className="p-4 bg-neon-pink/20 border-neon-pink">
            <p className="text-neon-pink">{error}</p>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
