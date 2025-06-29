import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  glow?: boolean;
  onClick?: () => void;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'dark',
  glow = false,
  onClick,
  hover = true,
}) => {
  const baseClasses = `
    rounded-2xl p-6 transition-all duration-300 ease-out
    ${variant === 'light' ? 'glass' : 'glass-dark'}
    ${glow ? 'neon-glow' : ''}
    ${hover ? 'hover:scale-105 hover:shadow-2xl' : ''}
    ${onClick ? 'cursor-pointer' : ''}
  `;

  const MotionComponent = onClick ? motion.div : motion.div;

  return (
    <MotionComponent
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </MotionComponent>
  );
};

export default GlassCard; 