import React from 'react';
import NeonButton from '@/components/NeonButton';
import { SubGoal, MasterGoal } from '@/types';

type GoalCardProps = {
  goal: SubGoal | MasterGoal;
  large?: boolean;
};

export default function GoalCard({ goal, large }: GoalCardProps) {
  const neonColor = goal.color === 'purple' ? 'from-[#a259ff] to-[#6c3fd2]' :
    goal.color === 'cyan' ? 'from-[#00e0ff] to-[#3fd2e6]' :
    goal.color === 'pink' ? 'from-[#ff2e63] to-[#a259ff]' : 'from-[#ffea00] to-[#ffb300]';
  const variant = goal.color === 'purple' ? 'purple' : goal.color === 'cyan' ? 'cyan' : goal.color === 'pink' ? 'pink' : 'yellow';

  return (
    <div className={`relative ${large ? 'w-full max-w-3xl p-12 rounded-3xl bg-gradient-to-br from-[#2a174d] via-[#6c3fd2] to-[#a259ff] bg-opacity-80 shadow-2xl border border-white/20' : 'w-80 p-6 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#23234d] bg-opacity-90 border border-white/10 shadow-xl'} transition-all duration-300`}> 
      <div className={`font-extrabold ${large ? 'text-4xl mb-4' : 'text-xl mb-2'} text-white drop-shadow-lg`}>{goal.title}</div>
      <div className={`${large ? 'text-white/90 mb-8 text-lg leading-relaxed' : 'text-white/80 mb-4 text-base'}`}>{goal.description}</div>
      <div className={`w-full ${large ? 'h-5 mb-8' : 'h-3 mb-4'} bg-white/10 rounded-full overflow-hidden`}>
        <div className={`h-full rounded-full bg-gradient-to-r ${neonColor} shadow-[0_0_24px_4px_rgba(162,89,255,0.5)]`} style={{ width: `${goal.progress}%` }} />
      </div>
      <div className={`flex gap-3 ${large ? 'mb-8' : 'mb-4'}`}>
        {goal.tags.map((tag, i) => (
          <span key={i} className={`px-4 py-2 rounded-full ${large ? 'text-base' : 'text-xs'} font-semibold bg-white/10 border border-white/20 text-white/90 shadow`}>{tag}</span>
        ))}
      </div>
      <div className="flex gap-4">
        <NeonButton variant={variant} size={large ? 'lg' : 'md'}>상세 보기</NeonButton>
        <NeonButton variant={variant} size={large ? 'lg' : 'md'}>진행</NeonButton>
      </div>
    </div>
  );
} 