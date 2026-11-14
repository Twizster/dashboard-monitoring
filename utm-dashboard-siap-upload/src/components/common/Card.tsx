import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  header,
  title,
  subtitle,
  action,
  icon,
  padding = 'md',
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4 sm:p-5',
    lg: 'p-6',
  };

  return (
    <div
      className={`bg-[#0E1422] border border-[#1E293F] rounded-xl transition-colors duration-150 ${className}`}
    >
      {(header || title) && (
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-[#1E293F]/80">
          {header ? (
            header
          ) : (
            <div className="flex items-center gap-2.5">
              {icon && <div className="text-slate-400 shrink-0">{icon}</div>}
              <div>
                <h3 className="text-xs sm:text-[13px] font-semibold text-[#F8FAFC] tracking-tight">{title}</h3>
                {subtitle && <p className="text-[11px] text-[#94A3B8] mt-0.5">{subtitle}</p>}
              </div>
            </div>
          )}
          {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
    </div>
  );
};
