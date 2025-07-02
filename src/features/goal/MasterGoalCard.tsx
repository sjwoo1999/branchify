import React from 'react';
import { MasterGoal } from '@/types';
import GoalCard from './GoalCard';

export default function MasterGoalCard({ goal }: { goal: MasterGoal }) {
  return <GoalCard goal={goal} large />;
} 