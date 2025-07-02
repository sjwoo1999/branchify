'use client';
import { SubGoal } from '@/types';

export default function GoalNetworkClient({ subGoals }: { subGoals: SubGoal[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {subGoals.map((goal) => (
        <div key={goal.id} className="rounded-xl bg-glass/60 p-4 flex flex-col items-start border border-white/10 shadow">
          <div className="font-semibold text-white mb-1">{goal.title}</div>
          <div className="w-full h-2 bg-white/10 rounded mb-2">
            <div className="h-2 bg-neon-cyan rounded" style={{width: `${goal.progress}%`}} />
          </div>
          <div className="flex gap-2 mb-1">
            {goal.tags.slice(0,2).map(tag => (
              <span key={tag} className="text-xs border border-neon-cyan rounded-full px-2 py-0.5 text-neon-cyan bg-white/5">{tag}</span>
            ))}
          </div>
          <div className="text-xs text-white/60">{goal.description}</div>
        </div>
      ))}
    </div>
  );
} 