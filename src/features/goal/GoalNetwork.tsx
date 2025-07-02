'use client';
import React from 'react';
import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { SubGoal } from '@/types';

export default function GoalNetwork({ subGoals }: { subGoals: SubGoal[] }) {
  // Simple horizontal layout for demo; can be improved for real dependencies
  const nodes = subGoals.map((goal, i) => ({
    id: goal.id,
    data: { label: (
      <div className="px-6 py-4 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#23234d] border border-white/10 shadow-xl text-white font-semibold text-base min-w-[180px] text-center">
        {goal.title}
      </div>
    ) },
    position: { x: 220 * i, y: 100 },
    style: { border: 'none', background: 'transparent' }
  }));
  // No edges for now; can be added if sub-goal dependencies exist
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ReactFlow nodes={nodes} edges={[]} fitView>
        <MiniMap />
        <Controls />
        <Background color="#222244" gap={24} />
      </ReactFlow>
    </div>
  );
} 