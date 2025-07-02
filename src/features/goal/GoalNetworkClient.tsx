'use client';
import { SubGoal } from '@/types';

export default function GoalNetworkClient({ subGoals }: { subGoals: SubGoal[] }) {
  return (
    <div className="flex items-center justify-center gap-4 w-full overflow-x-auto py-4">
      {subGoals.map((goal, idx) => (
        <div key={goal.id} className="flex items-center">
          {/* Step Circle */}
          <div className={`flex flex-col items-center min-w-[100px]`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full
              ${goal.progress === 100 ? 'bg-neon-cyan text-white' : goal.progress > 0 ? 'border-2 border-neon-cyan text-neon-cyan' : 'border-2 border-white/30 text-white/50'}
            `}>
              {idx + 1}
            </div>
            <div className="mt-2 text-xs text-center max-w-[80px] text-white/90">{goal.title}</div>
          </div>
          {/* Connector */}
          {idx < subGoals.length - 1 && (
            <div className="w-8 h-1 bg-gradient-to-r from-neon-cyan to-white/10 mx-2 rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
} 