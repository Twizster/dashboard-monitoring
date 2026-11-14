import React from 'react';

interface ResourceGaugeProps {
  percentage: number;
  label: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export const ResourceGauge: React.FC<ResourceGaugeProps> = ({
  percentage,
  label,
  sublabel,
  size = 170,
  strokeWidth = 12,
  color,
}) => {
  const clamped = Math.min(Math.max(percentage, 0), 100);

  const getColor = () => {
    if (color) return color;
    if (clamped < 70) return '#3B82F6'; // clean blue
    if (clamped < 85) return '#F59E0B'; // amber
    return '#F43F5E'; // rose
  };

  const activeColor = getColor();
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg
          width={size}
          height={size / 2 + strokeWidth}
          viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}
          className="overflow-visible"
        >
          {/* Subtle Background Arc */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke="#162032"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active Arc */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke={activeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center">
          <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-slate-100">
            {clamped.toFixed(1)}%
          </span>
          <span className="text-[11px] font-medium text-slate-400">{label}</span>
        </div>
      </div>
      {sublabel && (
        <p className="text-[11px] text-slate-400 font-mono mt-1 text-center">
          {sublabel}
        </p>
      )}
    </div>
  );
};
