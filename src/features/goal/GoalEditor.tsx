import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Goal, CreateGoalRequest, UpdateGoalRequest } from '@/types';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';

interface GoalEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goalData: CreateGoalRequest | UpdateGoalRequest) => void;
  goal?: Goal;
  parentId?: string;
  loading?: boolean;
}

const GoalEditor: React.FC<GoalEditorProps> = ({
  isOpen,
  onClose,
  onSave,
  goal,
  parentId,
  loading = false,
}) => {
  const [formData, setFormData] = useState<CreateGoalRequest>({
    title: '',
    description: '',
    priority: 'medium',
    color: 'purple',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (goal) {
      setFormData({
        title: goal.title,
        description: goal.description || '',
        priority: goal.priority,
        color: goal.color,
        tags: goal.tags || [],
        dueDate: goal.dueDate,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        color: 'purple',
        tags: [],
      });
    }
  }, [goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const goalData = {
      ...formData,
      parentId: parentId,
      tags: formData.tags || [],
    };

    onSave(goalData);
  };

  const addTag = () => {
    if (tagInput.trim() && !(formData.tags || []).includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(tag => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <GlassCard className="p-6 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold font-poppins text-glass-white">
                  {goal ? '목표 수정' : '새 목표 생성'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-glass-white mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-glass-white/10 border border-glass-white/20 rounded-xl text-glass-white placeholder-glass-white/50 focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                    placeholder="목표 제목을 입력하세요"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-glass-white mb-2">
                    설명
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-glass-white/10 border border-glass-white/20 rounded-xl text-glass-white placeholder-glass-white/50 focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20 resize-none"
                    placeholder="목표에 대한 자세한 설명을 입력하세요"
                    rows={3}
                  />
                </div>

                {/* Priority and Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-glass-white mb-2">
                      우선순위
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full px-4 py-3 bg-glass-white/10 border border-glass-white/20 rounded-xl text-glass-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                    >
                      <option value="low">낮음</option>
                      <option value="medium">보통</option>
                      <option value="high">높음</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-glass-white mb-2">
                      색상
                    </label>
                    <select
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value as any }))}
                      className="w-full px-4 py-3 bg-glass-white/10 border border-glass-white/20 rounded-xl text-glass-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                    >
                      <option value="purple">보라</option>
                      <option value="cyan">청록</option>
                      <option value="pink">핑크</option>
                      <option value="yellow">노랑</option>
                    </select>
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-glass-white mb-2">
                    마감일
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value ? new Date(e.target.value) : undefined }))}
                    className="w-full px-4 py-3 bg-glass-white/10 border border-glass-white/20 rounded-xl text-glass-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-glass-white mb-2">
                    태그
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-4 py-2 bg-glass-white/10 border border-glass-white/20 rounded-xl text-glass-white placeholder-glass-white/50 focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                      placeholder="태그를 입력하고 Enter를 누르세요"
                    />
                    <NeonButton
                      size="sm"
                      variant="cyan"
                      onClick={addTag}
                      type="button"
                    >
                      추가
                    </NeonButton>
                  </div>
                  {formData.tags && formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {(formData.tags || []).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-neon-purple hover:text-neon-pink"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <NeonButton
                    type="button"
                    variant="pink"
                    onClick={onClose}
                    className="flex-1"
                    disabled={loading}
                  >
                    취소
                  </NeonButton>
                  <NeonButton
                    type="submit"
                    variant="purple"
                    className="flex-1"
                    loading={loading}
                  >
                    {goal ? '수정' : '생성'}
                  </NeonButton>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GoalEditor; 