import React from 'react';
import { motion } from 'framer-motion';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'purple' | 'cyan' | 'pink' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  onClick,
  variant = 'purple',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  loading = false,
}) => {
  const variantClasses = {
    purple: 'bg-neon-purple/20 border-neon-purple text-neon-purple hover:bg-neon-purple/30 neon-glow',
    cyan: 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/30 neon-glow-cyan',
    pink: 'bg-neon-pink/20 border-neon-pink text-neon-pink hover:bg-neon-pink/30 neon-glow-pink',
    yellow: 'bg-electric-yellow/20 border-electric-yellow text-electric-yellow hover:bg-electric-yellow/30',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = `
    font-medium font-poppins rounded-xl border-2 transition-all duration-300
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
    ${loading ? 'cursor-wait' : ''}
  `;

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="ml-2">로딩중...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default NeonButton; 