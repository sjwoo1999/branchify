import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Goal, GoalNode, EnergyLine } from '@/types';
import GoalCard from './GoalCard';
import NeonButton from '@/components/NeonButton';
import GlassCard from '@/components/GlassCard';

interface GoalMapProps {
  goals: Goal[];
  onGoalClick?: (goal: Goal) => void;
  onGoalComplete?: (goalId: string) => void;
  onGoalEdit?: (goal: Goal) => void;
  onGoalDelete?: (goalId: string) => void;
  selectedGoalId?: string;
}

const GoalMap: React.FC<GoalMapProps> = ({
  goals,
  onGoalClick,
  onGoalComplete,
  onGoalEdit,
  onGoalDelete,
  selectedGoalId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<GoalNode[]>([]);
  const [lines, setLines] = useState<EnergyLine[]>([]);
  const [centerNode, setCenterNode] = useState<GoalNode | null>(null);

  // 목표를 노드로 변환하는 함수
  const createNodes = (goals: Goal[]): GoalNode[] => {
    const rootGoals = goals.filter(goal => !goal.parentId);
    const nodes: GoalNode[] = [];
    
    const addNode = (goal: Goal, x: number, y: number, level: number) => {
      const node: GoalNode = {
        id: goal.id,
        x,
        y,
        goal,
        connections: [],
      };
      nodes.push(node);
      
      // 하위 목표들 추가
      const children = goals.filter(g => g.parentId === goal.id);
      const angleStep = (2 * Math.PI) / Math.max(children.length, 1);
      const radius = 200 + level * 100;
      
      children.forEach((child, index) => {
        const childAngle = angleStep * index;
        const childX = x + Math.cos(childAngle) * radius;
        const childY = y + Math.sin(childAngle) * radius;
        
        node.connections.push(child.id);
        addNode(child, childX, childY, level + 1);
      });
    };
    
    // 루트 목표들을 원형으로 배치
    const centerX = 400;
    const centerY = 300;
    const rootRadius = 150;
    const rootAngleStep = (2 * Math.PI) / Math.max(rootGoals.length, 1);
    
    rootGoals.forEach((goal, index) => {
      const angle = rootAngleStep * index;
      const x = centerX + Math.cos(angle) * rootRadius;
      const y = centerY + Math.sin(angle) * rootRadius;
      addNode(goal, x, y, 0);
    });
    
    return nodes;
  };

  // 에너지 라인 생성
  const createLines = (nodes: GoalNode[]): EnergyLine[] => {
    const lines: EnergyLine[] = [];
    
    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const targetNode = nodes.find(n => n.id === connectionId);
        if (targetNode) {
          const line: EnergyLine = {
            id: `${node.id}-${connectionId}`,
            fromNodeId: node.id,
            toNodeId: connectionId,
            strength: 0.8,
            color: node.goal.color,
          };
          lines.push(line);
        }
      });
    });
    
    return lines;
  };

  useEffect(() => {
    if (goals.length > 0) {
      const newNodes = createNodes(goals);
      const newLines = createLines(newNodes);
      setNodes(newNodes);
      setLines(newLines);
      
      // 첫 번째 루트 목표를 중심 노드로 설정
      const rootNodes = newNodes.filter(node => !node.goal.parentId);
      if (rootNodes.length > 0) {
        setCenterNode(rootNodes[0]);
      }
    }
  }, [goals]);

  const getNodeColor = (color: Goal['color']) => {
    switch (color) {
      case 'purple':
        return 'neon-glow';
      case 'cyan':
        return 'neon-glow-cyan';
      case 'pink':
        return 'neon-glow-pink';
      case 'yellow':
        return 'shadow-[0_0_20px_rgba(255,234,0,0.5)]';
      default:
        return 'neon-glow';
    }
  };

  const getLineColor = (color: Goal['color']) => {
    switch (color) {
      case 'purple':
        return '#A259FF';
      case 'cyan':
        return '#00E0FF';
      case 'pink':
        return '#FF2E63';
      case 'yellow':
        return '#FFEA00';
      default:
        return '#A259FF';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[600px] overflow-hidden bg-deep-navy"
    >
      {/* 에너지 라인들 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {lines.map((line) => {
          const fromNode = nodes.find(n => n.id === line.fromNodeId);
          const toNode = nodes.find(n => n.id === line.toNodeId);
          
          if (!fromNode || !toNode) return null;
          
          return (
            <motion.path
              key={line.id}
              d={`M ${fromNode.x} ${fromNode.y} Q ${(fromNode.x + toNode.x) / 2} ${(fromNode.y + toNode.y) / 2 - 50} ${toNode.x} ${toNode.y}`}
              stroke={getLineColor(line.color as Goal['color'])}
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          );
        })}
      </svg>

      {/* 목표 노드들 */}
      <AnimatePresence>
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className={`absolute ${getNodeColor(node.goal.color)}`}
            style={{
              left: node.x - 100,
              top: node.y - 75,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GoalCard
              goal={node.goal}
              onClick={() => onGoalClick?.(node.goal)}
              onComplete={() => onGoalComplete?.(node.id)}
              onEdit={() => onGoalEdit?.(node.goal)}
              onDelete={() => onGoalDelete?.(node.id)}
              isSelected={selectedGoalId === node.id}
              showActions={false}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 중심 노드 강조 */}
      {centerNode && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            left: centerNode.x - 150,
            top: centerNode.y - 125,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-80 h-60 border-2 border-neon-purple/30 rounded-full glow-pulse" />
        </motion.div>
      )}

      {/* 컨트롤 버튼들 */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <NeonButton
          size="sm"
          variant="purple"
          onClick={() => {
            // 줌 인/아웃 기능
          }}
        >
          줌
        </NeonButton>
        <NeonButton
          size="sm"
          variant="cyan"
          onClick={() => {
            // 중심으로 이동
          }}
        >
          중심
        </NeonButton>
      </div>

      {/* 통계 정보 */}
      <div className="absolute top-4 left-4">
        <GlassCard className="p-4">
          <div className="text-sm text-glass-white/70">
            <div>총 목표: {goals.length}개</div>
            <div>완료: {goals.filter(g => g.status === 'completed').length}개</div>
            <div>진행중: {goals.filter(g => g.status === 'active').length}개</div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default GoalMap; 