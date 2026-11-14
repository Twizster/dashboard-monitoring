import React, { useState } from 'react';
import { Globe, RefreshCw, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';

export const PingMonitoring: React.FC = () => {
  const { googlePing, cloudflarePing } = useDashboard();
  const [testingTarget, setTestingTarget] = useState<string | null>(null);

  const handleTestPing = (target: string) => {
    setTestingTarget(target);
    setTimeout(() => {
      setTestingTarget(null);
    }, 600);
  };

  const renderPingCard = (ping: typeof googlePing, isGoogle: boolean) => {
    const isTesting = testingTarget === ping.target;

    return (
      <div className="bg-[#111726]/60 border border-[#1E293F] rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#1E293F]/60">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#0E1422] border border-[#1E293F] flex items-center justify-center text-slate-300">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-200">{ping.target}</h4>
              <p className="text-[10px] font-mono text-slate-400">{ping.ip}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Badge variant="success" size="sm" dot>
              Optimal
            </Badge>
            <button
              onClick={() => handleTestPing(ping.target)}
              title="Ping ICMP Test"
              className="p-1 text-slate-400 hover:text-slate-200 hover:bg-[#0E1422] rounded transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin text-blue-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Latency & Loss Numbers */}
        <div className="my-2.5 grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="bg-[#0E1422] p-2 rounded-lg border border-[#1E293F]/50">
            <span className="text-[10px] text-slate-400 block font-sans">Latensi (RTT)</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-bold text-emerald-400">{ping.latency.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400">ms</span>
            </div>
          </div>
          <div className="bg-[#0E1422] p-2 rounded-lg border border-[#1E293F]/50">
            <span className="text-[10px] text-slate-400 block font-sans">Packet Loss</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-bold text-cyan-400">{ping.packetLoss.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400">%</span>
            </div>
          </div>
        </div>

        {/* Mini Sparkline Chart */}
        <div className="h-10 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ping.history}>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#090D16] border border-[#1E293F] px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-200">
                        {payload[0].value} ms
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="latency"
                stroke={isGoogle ? '#06B6D4' : '#3B82F6'}
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 pt-2 border-t border-[#1E293F]/50 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" /> Normal
          </span>
          <span>Update {ping.lastChecked}</span>
        </div>
      </div>
    );
  };

  return (
    <Card
      title="DNS & Latency Gateway"
      subtitle="Konektivitas upstream DNS WAN dan stabilitas routing UTM"
      icon={<Globe className="w-4 h-4 text-slate-400" />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {renderPingCard(googlePing, true)}
        {renderPingCard(cloudflarePing, false)}
      </div>
    </Card>
  );
};
