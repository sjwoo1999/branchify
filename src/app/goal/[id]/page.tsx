import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MasterGoal } from '@/types';
import GoalNetworkClient from '@/features/goal/GoalNetworkClient';

// 임시 마스터 목표 데이터 (실제 프로젝트에서는 API/DB에서 가져옴)
const masterGoals: MasterGoal[] = [
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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GoalDetailPage({ params }: PageProps) {
  const { id } = await params;
  const masterGoal = masterGoals.find(g => g.id === id);
  if (!masterGoal) return notFound();

  return (
    <div className="min-h-screen bg-deep-navy text-glass-white">
      {/* Header with back button */}
      <header className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로 돌아가기
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">{masterGoal.title}</h2>
        <p className="text-lg text-white/80 mb-8">{masterGoal.description}</p>
        <GoalNetworkClient subGoals={masterGoal.subGoals} />
      </div>
    </div>
  );
}
