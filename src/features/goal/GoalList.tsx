import React from 'react';
import GoalCard from './GoalCard';
import { SubGoal } from '@/types';

export default function GoalList({ subGoals }: { subGoals: SubGoal[] }) {
  return (
    <div className="flex flex-wrap gap-10 justify-center py-10">
      {subGoals.map(goal => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
} 