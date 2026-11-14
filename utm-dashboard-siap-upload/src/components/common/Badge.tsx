import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'cyan' | 'neutral' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  pulse = false,
  className = '',
}) => {
  // Understated Linear-style palette (subtle background, clean border, muted text)
  const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string; dotColor: string }> = {
    success: {
      bg: 'bg-emerald-500/[0.08]',
      text: 'text-emerald-400',
      border: 'border-emerald-500/20',
      dotColor: 'bg-emerald-400',
    },
    warning: {
      bg: 'bg-amber-500/[0.08]',
      text: 'text-amber-300',
      border: 'border-amber-500/20',
      dotColor: 'bg-amber-400',
    },
    danger: {
      bg: 'bg-rose-500/[0.08]',
      text: 'text-rose-400',
      border: 'border-rose-500/20',
      dotColor: 'bg-rose-400',
    },
    info: {
      bg: 'bg-blue-500/[0.08]',
      text: 'text-blue-400',
      border: 'border-blue-500/20',
      dotColor: 'bg-blue-400',
    },
    cyan: {
      bg: 'bg-cyan-500/[0.08]',
      text: 'text-cyan-400',
      border: 'border-cyan-500/20',
      dotColor: 'bg-cyan-400',
    },
    purple: {
      bg: 'bg-purple-500/[0.08]',
      text: 'text-purple-300',
      border: 'border-purple-500/20',
      dotColor: 'bg-purple-400',
    },
    neutral: {
      bg: 'bg-slate-800/40',
      text: 'text-slate-300',
      border: 'border-slate-700/50',
      dotColor: 'bg-slate-400',
    },
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium leading-none',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium leading-none',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  };

  const style = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center rounded-md border ${style.bg} ${style.text} ${style.border} ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {pulse && (
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${style.dotColor}`}
            />
          )}
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${style.dotColor}`} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
