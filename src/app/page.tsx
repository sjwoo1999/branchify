'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Goal, CreateGoalRequest, UpdateGoalRequest } from '@/types';
import { useGoal } from '@/hooks/useGoal';
import { useRoutine } from '@/hooks/useRoutine';
import GoalMap from '@/features/goal/GoalMap';
import GoalCard from '@/features/goal/GoalCard';
import GoalEditor from '@/features/goal/GoalEditor';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import GoalList from '@/features/goal/GoalList';
import GoalSection from '@/features/goal/GoalSection';
import Link from 'next/link';
import MasterGoalCard from '@/features/goal/MasterGoalCard';

// 샘플 데이터
const masterGoals = [
  {
    id: '1',
    title: '개발자 성장하기',
    description: '프론트엔드 개발 실력을 향상시키고 새로운 기술을 습득한다',
    progress: 65,
    color: 'purple',
    tags: ['개발', '성장', '프론트엔드'],
    subGoals: [
      {
        id: '2',
        title: 'React 마스터하기',
        description: 'React의 고급 기능들을 학습하고 실제 프로젝트에 적용한다',
        progress: 80,
        color: 'cyan',
        tags: ['React', 'JavaScript', '프론트엔드'],
      },
      {
        id: '3',
        title: 'TypeScript 학습',
        description: 'TypeScript의 타입 시스템을 깊이 있게 학습한다',
        progress: 45,
        color: 'pink',
        tags: ['TypeScript', '타입', '개발'],
      },
      {
        id: '4',
        title: '건강한 생활습관 만들기',
        description: '규칙적인 운동과 건강한 식습관을 형성한다',
        progress: 30,
        color: 'yellow',
        tags: ['건강', '운동', '생활습관'],
      },
    ],
  },
  {
    id: '5',
    title: 'AI 프로젝트 완성하기',
    description: 'AI 모델을 개발하고 실제 서비스에 배포한다',
    progress: 40,
    color: 'cyan',
    tags: ['AI', '딥러닝', '서비스'],
    subGoals: [
      {
        id: '6',
        title: '데이터 수집',
        description: 'AI 학습을 위한 데이터셋을 구축한다',
        progress: 60,
        color: 'purple',
        tags: ['데이터', '수집'],
      },
      {
        id: '7',
        title: '모델 학습',
        description: '딥러닝 모델을 설계하고 학습시킨다',
        progress: 30,
        color: 'pink',
        tags: ['딥러닝', '모델'],
      },
      {
        id: '8',
        title: '서비스 배포',
        description: '학습된 모델을 실제 서비스에 배포한다',
        progress: 10,
        color: 'yellow',
        tags: ['배포', '서비스'],
      },
    ],
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
  const loading = false;
  const error = null;

  const handleCreateGoal = async (goalData: CreateGoalRequest | UpdateGoalRequest) => {
    // CreateGoalRequest만 처리
    if (!('title' in goalData) || typeof goalData.title !== 'string') return;
    console.log('새 목표 생성:', goalData);
    setIsEditorOpen(false);
    // 실제로는 createGoal(goalData) 호출
  };

  const handleUpdateGoal = async (goalData: CreateGoalRequest | UpdateGoalRequest) => {
    // UpdateGoalRequest만 처리
    if (!('id' in goalData)) return;
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

  const todayRoutines: any[] = []; // getTodayRoutines();
  const completedToday = []; // getCompletedToday();

  return (
    <div className="min-h-screen flex flex-col bg-deep-navy text-glass-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">Branchify</h1>
        <button className="border border-neon-cyan text-neon-cyan rounded-full px-6 py-2 hover:bg-neon-cyan/10 transition">새 목표</button>
      </header>
      {/* Main: Only two cards, centered, minimal info */}
      <main className="flex-1 flex items-center justify-center gap-8">
        {masterGoals.slice(0, 2).map(goal => (
          <Link key={goal.id} href={`/goal/${goal.id}`} className="block">
            <div className="rounded-2xl bg-glass/60 p-8 min-w-[320px] flex flex-col items-start shadow-lg border border-white/10">
              <h2 className="text-xl font-bold mb-2 text-white drop-shadow">{goal.title}</h2>
              <div className="w-full h-2 bg-white/10 rounded mb-2">
                <div className="h-2 bg-neon-cyan rounded" style={{width: `${goal.progress}%`}} />
              </div>
              <div className="flex gap-2 mb-4">
                {goal.tags.slice(0,2).map(tag => (
                  <span key={tag} className="text-xs border border-neon-cyan rounded-full px-2 py-0.5 text-neon-cyan bg-white/5">{tag}</span>
                ))}
              </div>
              <span className="text-neon-cyan text-sm font-medium mt-2">상세 보기 →</span>
            </div>
          </Link>
        ))}
      </main>
      {/* Stats Bar */}
      <footer className="w-full flex justify-center gap-8 py-6 border-t border-white/10 bg-deep-navy/80">
        <div className="text-center">
          <div className="text-lg font-bold">{masterGoals.length}</div>
          <div className="text-xs text-glass-white/60">총 목표</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold">{masterGoals.reduce((acc, g) => acc + g.subGoals.length, 0)}</div>
          <div className="text-xs text-glass-white/60">총 하위 목표</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold">{Math.round(masterGoals.reduce((acc, g) => acc + g.progress, 0) / masterGoals.length)}%</div>
          <div className="text-xs text-glass-white/60">평균 진행률</div>
        </div>
      </footer>

      {/* Goal Editor Modal */}
      <GoalEditor
        isOpen={isEditorOpen}
        onClose={closeEditor}
        onSave={editingGoal ? handleUpdateGoal : handleCreateGoal}
        goal={editingGoal ?? undefined}
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
