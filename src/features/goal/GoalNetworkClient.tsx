'use client';
import dynamic from 'next/dynamic';
import { SubGoal } from '@/types';

const GoalNetwork = dynamic(() => import('./GoalNetwork'), { ssr: false });

export default function GoalNetworkClient({ subGoals }: { subGoals: SubGoal[] }) {
  return <GoalNetwork subGoals={subGoals} />;
} 