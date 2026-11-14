import React from 'react';
import { Search } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-[11px] font-medium text-slate-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-slate-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-[#111726] border ${
            error ? 'border-rose-500/80 focus:border-rose-500' : 'border-[#1E293F] focus:border-blue-500'
          } rounded-lg text-xs text-slate-100 placeholder-slate-500 ${
            icon ? 'pl-8' : 'pl-3'
          } pr-3 py-2 outline-none transition-colors duration-150 focus:ring-1 focus:ring-blue-500/30 ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-rose-400 mt-1">{error}</p>}
      {helper && !error && <p className="text-[11px] text-slate-500 mt-1">{helper}</p>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helper,
  className = '',
  id,
  rows = 3,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-[11px] font-medium text-slate-300 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full bg-[#111726] border ${
          error ? 'border-rose-500/80 focus:border-rose-500' : 'border-[#1E293F] focus:border-blue-500'
        } rounded-lg text-xs text-slate-100 placeholder-slate-500 px-3 py-2 outline-none transition-colors duration-150 focus:ring-1 focus:ring-blue-500/30 ${className}`}
        {...props}
      />
      {error && <p className="text-[11px] text-rose-400 mt-1">{error}</p>}
      {helper && !error && <p className="text-[11px] text-slate-500 mt-1">{helper}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helper,
  options,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-[11px] font-medium text-slate-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full bg-[#111726] border ${
            error ? 'border-rose-500/80 focus:border-rose-500' : 'border-[#1E293F] focus:border-blue-500'
          } rounded-lg text-xs text-slate-200 px-3 py-2 outline-none transition-colors duration-150 focus:ring-1 focus:ring-blue-500/30 appearance-none cursor-pointer ${className}`}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-[#0E1422] text-slate-200">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-[11px] text-rose-400 mt-1">{error}</p>}
      {helper && !error && <p className="text-[11px] text-slate-500 mt-1">{helper}</p>}
    </div>
  );
};

export const SearchInput: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}> = ({ value, onChange, placeholder = 'Cari data...', className = '' }) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#111726] border border-[#1E293F] rounded-lg pl-8 pr-12 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/20 transition-all"
      />
      {value ? (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 text-slate-500 hover:text-slate-300 text-xs px-1 rounded cursor-pointer"
        >
          ✕
        </button>
      ) : (
        <span className="absolute right-2.5 text-[10px] text-slate-500 font-mono bg-[#162032] px-1.5 py-0.5 rounded border border-[#1E293F]/60 pointer-events-none">
          /
        </span>
      )}
    </div>
  );
};
