import React from 'react';
import { MasterGoal } from '@/types';
import MasterGoalCard from './MasterGoalCard';
import GoalList from './GoalList';

export default function GoalSection({ masterGoal }: { masterGoal: MasterGoal }) {
  return (
    <div className="flex flex-col items-center gap-10 py-10">
      <MasterGoalCard goal={masterGoal} />
      <GoalList subGoals={masterGoal.subGoals} />
    </div>
  );
} 