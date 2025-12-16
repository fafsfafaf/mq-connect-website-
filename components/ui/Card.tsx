import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-3xl border border-slate-100 p-6 sm:p-8",
        hover && "transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
};