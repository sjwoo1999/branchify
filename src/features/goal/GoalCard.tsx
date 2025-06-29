import React from 'react';
import { motion } from 'framer-motion';
import { Goal } from '@/types';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';

interface GoalCardProps {
  goal: Goal;
  onClick?: () => void;
  onComplete?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isSelected?: boolean;
  showActions?: boolean;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onClick,
  onComplete,
  onEdit,
  onDelete,
  isSelected = false,
  showActions = true,
}) => {
  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return 'text-neon-cyan';
      case 'paused':
        return 'text-neon-pink';
      default:
        return 'text-neon-purple';
    }
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-neon-pink';
      case 'medium':
        return 'text-electric-yellow';
      default:
        return 'text-neon-cyan';
    }
  };

  const getProgressColor = (color: Goal['color']) => {
    switch (color) {
      case 'purple':
        return 'bg-neon-purple';
      case 'cyan':
        return 'bg-neon-cyan';
      case 'pink':
        return 'bg-neon-pink';
      case 'yellow':
        return 'bg-electric-yellow';
      default:
        return 'bg-neon-purple';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <GlassCard
        className={`relative ${isSelected ? 'neon-glow' : ''}`}
        onClick={onClick}
        glow={isSelected}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold font-poppins text-glass-white mb-1">
                {goal.title}
              </h3>
              {goal.description && (
                <p className="text-sm text-glass-white/70 line-clamp-2">
                  {goal.description}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-medium ${getStatusColor(goal.status)}`}>
                {goal.status === 'completed' ? '완료' : 
                 goal.status === 'paused' ? '일시정지' : '진행중'}
              </span>
              <span className={`text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                {goal.priority === 'high' ? '높음' : 
                 goal.priority === 'medium' ? '보통' : '낮음'}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-glass-white/70">
              <span>진행률</span>
              <span>{goal.progress}%</span>
            </div>
            <div className="w-full bg-glass-white/10 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full ${getProgressColor(goal.color)} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Tags */}
          {goal.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {goal.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-neon-purple/20 text-neon-purple rounded-full"
                >
                  {tag}
                </span>
              ))}
              {goal.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-glass-white/20 text-glass-white rounded-full">
                  +{goal.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Due Date */}
          {goal.dueDate && (
            <div className="text-xs text-glass-white/60">
              마감일: {new Date(goal.dueDate).toLocaleDateString('ko-KR')}
            </div>
          )}

          {/* Actions */}
          {showActions && (
            <div className="flex items-center justify-between pt-2">
              <div className="flex space-x-2">
                {goal.status !== 'completed' && (
                  <NeonButton
                    size="sm"
                    variant="cyan"
                    onClick={(e) => {
                      e.stopPropagation();
                      onComplete?.();
                    }}
                  >
                    완료
                  </NeonButton>
                )}
                <NeonButton
                  size="sm"
                  variant="purple"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.();
                  }}
                >
                  수정
                </NeonButton>
              </div>
              <NeonButton
                size="sm"
                variant="pink"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
              >
                삭제
              </NeonButton>
            </div>
          )}

          {/* Children count */}
          {goal.children.length > 0 && (
            <div className="text-xs text-glass-white/60">
              하위 목표: {goal.children.length}개
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default GoalCard; 