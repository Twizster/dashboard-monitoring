import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ArrowDownLeft, ArrowUpRight, Network } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Card } from '../common/Card';

type TimeRange = '1h' | '6h' | '24h' | '7d';

export const NetworkTrafficChart: React.FC = () => {
  const { downloadSpeed, uploadSpeed, trafficHistory } = useDashboard();
  const [timeRange, setTimeRange] = useState<TimeRange>('1h');
  const [selectedInterface, setSelectedInterface] = useState<string>('eth0');

  const getDisplayData = () => {
    switch (timeRange) {
      case '6h':
        return [
          { time: '14:00', download: 520, upload: 310 },
          { time: '15:00', download: 680, upload: 380 },
          { time: '16:00', download: 840, upload: 460 },
          { time: '17:00', download: 710, upload: 390 },
          { time: '18:00', download: 790, upload: 440 },
          { time: '19:00', download: Number(downloadSpeed.toFixed(0)), upload: Number(uploadSpeed.toFixed(0)) },
        ];
      case '24h':
        return [
          { time: '00:00', download: 180, upload: 90 },
          { time: '04:00', download: 120, upload: 60 },
          { time: '08:00', download: 650, upload: 380 },
          { time: '12:00', download: 920, upload: 540 },
          { time: '16:00', download: 880, upload: 510 },
          { time: '20:00', download: Number(downloadSpeed.toFixed(0)), upload: Number(uploadSpeed.toFixed(0)) },
        ];
      case '7d':
        return [
          { time: 'Sen', download: 720, upload: 410 },
          { time: 'Sel', download: 810, upload: 480 },
          { time: 'Rab', download: 890, upload: 520 },
          { time: 'Kam', download: 860, upload: 490 },
          { time: 'Jum', download: 940, upload: 550 },
          { time: 'Sab', download: 460, upload: 260 },
          { time: 'Min', download: 380, upload: 210 },
        ];
      case '1h':
      default:
        const copy = [...trafficHistory];
        if (copy.length > 0) {
          copy[copy.length - 1] = {
            ...copy[copy.length - 1],
            download: Number(downloadSpeed.toFixed(0)),
            upload: Number(uploadSpeed.toFixed(0)),
          };
        }
        return copy;
    }
  };

  const data = getDisplayData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#090D16] border border-[#1E293F] p-2.5 rounded-lg shadow-xl font-mono text-xs">
          <p className="text-slate-400 font-medium mb-1.5 flex items-center justify-between gap-4">
            <span>Waktu:</span> <span className="text-slate-200">{label}</span>
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-cyan-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Download:
              </span>
              <span className="font-semibold text-slate-100">{payload[0]?.value} Mbps</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-blue-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Upload:
              </span>
              <span className="font-semibold text-slate-100">{payload[1]?.value} Mbps</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      title="Network Throughput Traffic"
      subtitle="Monitoring debit transfer antarmuka backbone kampus UTM"
      icon={<Network className="w-4 h-4 text-slate-400" />}
      action={
        <div className="flex flex-wrap items-center gap-2">
          {/* Interface Selector */}
          <select
            value={selectedInterface}
            onChange={e => setSelectedInterface(e.target.value)}
            className="bg-[#111726] border border-[#1E293F] rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none cursor-pointer font-mono"
          >
            <option value="eth0" className="bg-[#0E1422]">eth0 (10G Core Uplink)</option>
            <option value="eth1" className="bg-[#0E1422]">eth1 (LAN Mahasiswa)</option>
            <option value="wlan0" className="bg-[#0E1422]">wlan0 (WiFi Hotspot)</option>
          </select>

          {/* Time Range Segmented Pills */}
          <div className="flex items-center bg-[#111726] border border-[#1E293F] rounded-lg p-0.5 text-xs">
            {(['1h', '6h', '24h', '7d'] as TimeRange[]).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2 py-0.5 rounded font-mono text-[11px] font-medium transition-colors cursor-pointer ${
                  timeRange === range
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      }
    >
      {/* Real-time speed numbers */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3 pb-3 border-b border-[#1E293F]/70">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Download Rate</p>
              <p className="text-lg font-bold font-mono text-cyan-400">
                {downloadSpeed.toFixed(1)} <span className="text-xs font-normal text-slate-500">Mbps</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Upload Rate</p>
              <p className="text-lg font-bold font-mono text-blue-400">
                {uploadSpeed.toFixed(1)} <span className="text-xs font-normal text-slate-500">Mbps</span>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-slate-500">
          <span>MTU 9000</span>
          <span>•</span>
          <span className="text-emerald-400">Full Duplex 10G</span>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorUl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#162032" vertical={false} />
            <XAxis dataKey="time" stroke="#64748B" fontSize={11} fontFamily="monospace" tickLine={false} axisLine={{ stroke: '#1E293F' }} />
            <YAxis stroke="#64748B" fontSize={11} fontFamily="monospace" tickLine={false} axisLine={{ stroke: '#1E293F' }} tickFormatter={v => `${v}M`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '8px', fontSize: '11px', fontFamily: 'monospace' }} />
            <Area type="monotone" dataKey="download" name="Download (Mbps)" stroke="#06B6D4" strokeWidth={1.5} fillOpacity={1} fill="url(#colorDl)" />
            <Area type="monotone" dataKey="upload" name="Upload (Mbps)" stroke="#3B82F6" strokeWidth={1.5} fillOpacity={1} fill="url(#colorUl)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
