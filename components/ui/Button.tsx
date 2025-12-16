import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  isLoading = false,
  className = '',
  ...props 
}) => {
  // Changed rounded-[2px] to rounded-xl for sleek/clean design
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold uppercase tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Primary: Blue background, White text
    primary: "bg-[#004e82] text-white hover:bg-[#003d66] shadow-sm",
    // Secondary: White background, Black text (was slate-900, changed to black for max contrast)
    secondary: "bg-white text-black border border-slate-200 hover:bg-slate-50",
    // Outline: White border, White text (for dark backgrounds)
    outline: "border-2 border-white text-white hover:bg-white/10",
    // Ghost: Dark text (was slate-600, changed to slate-900 for readability)
    ghost: "text-slate-900 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], widthClass, className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};