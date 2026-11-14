import React from 'react';
import { 
  Server, 
  Clock, 
  Cpu, 
  MemoryStick, 
  Activity, 
  AlertOctagon, 
  MessageSquareWarning,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Badge } from '../common/Badge';

export const StatCards: React.FC = () => {
  const { 
    selectedServer, 
    servers, 
    cpuUsage, 
    ramUsage, 
    ramTotalGb, 
    ramUsedGb,
    downloadSpeed, 
    uploadSpeed, 
    incidents, 
    complaints,
    setActiveTab 
  } = useDashboard();

  const activeIncidents = incidents.filter(i => i.status === 'Active' || i.status === 'Investigating').length;
  const pendingComplaints = complaints.filter(c => c.status === 'Menunggu').length;
  const totalSpeedGbps = ((downloadSpeed + uploadSpeed) / 1000).toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* 1. Server Status & Uptime (Combined Vitals) */}
      <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium">Status & Uptime</span>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 99.98% SLA
          </span>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-100">
              {selectedServer.uptime.split(' ')[0]}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {selectedServer.uptime.split(' ').slice(1).join(' ')}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            {selectedServer.name.split('.')[0]} • {selectedServer.location.split('Lt')[0]}
          </p>
        </div>

        <div className="pt-2.5 border-t border-[#1E293F]/70 flex items-center justify-between text-[11px]">
          <Badge variant="success" size="sm" dot>
            Normal Operation
          </Badge>
          <span className="text-slate-500 font-mono text-[10px]">
            {servers.filter(s => s.status === 'online').length}/{servers.length} Node Aktif
          </span>
        </div>
      </div>

      {/* 2. CPU Utilization */}
      <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium">Beban Komputasi (CPU)</span>
          <span className="text-[11px] font-mono text-slate-400">
            {selectedServer.cpuCores} Threads
          </span>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-100">
              {cpuUsage.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400 font-mono">%</span>
          </div>
          {/* Subtle clean progress meter */}
          <div className="w-full bg-[#162032] h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                cpuUsage > 80 ? 'bg-amber-400' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(cpuUsage, 100)}%` }}
            />
          </div>
        </div>

        <div className="pt-2.5 border-t border-[#1E293F]/70 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Load Avg: 1.42</span>
          <span>Suhu 48.5°C</span>
        </div>
      </div>

      {/* 3. Memory & Traffic Bandwidth */}
      <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium">RAM & Throughput</span>
          <span className="text-[11px] font-mono text-cyan-400">
            {totalSpeedGbps} Gbps
          </span>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-100">
              {ramUsage.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400 font-mono">% RAM ({ramUsedGb} GB)</span>
          </div>
          <div className="w-full bg-[#162032] h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-cyan-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(ramUsage, 100)}%` }}
            />
          </div>
        </div>

        <div className="pt-2.5 border-t border-[#1E293F]/70 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>↓ {downloadSpeed.toFixed(0)}M</span>
          <span>↑ {uploadSpeed.toFixed(0)}M</span>
          <span>Total {ramTotalGb} GB</span>
        </div>
      </div>

      {/* 4. Actionable Alerts & Complaints Ticket */}
      <div 
        onClick={() => setActiveTab('complaints')}
        className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-4 flex flex-col justify-between hover:border-blue-500/50 transition-colors cursor-pointer group"
      >
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium group-hover:text-slate-200">Pengaduan & Insiden</span>
          <span className="text-[11px] text-blue-400 flex items-center gap-0.5">
            Kelola <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

        <div className="my-3 flex items-baseline gap-3">
          <div>
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-100">
              {complaints.length}
            </span>
            <span className="text-[11px] text-slate-400 ml-1">Laporan</span>
          </div>
          <span className="text-slate-600">•</span>
          <div>
            <span className={`text-2xl font-bold font-mono tracking-tight ${activeIncidents > 0 ? 'text-amber-400' : 'text-slate-100'}`}>
              {activeIncidents}
            </span>
            <span className="text-[11px] text-slate-400 ml-1">Insiden</span>
          </div>
        </div>

        <div className="pt-2.5 border-t border-[#1E293F]/70 flex items-center justify-between text-[11px]">
          {pendingComplaints > 0 ? (
            <Badge variant="warning" size="sm" dot>
              {pendingComplaints} Laporan Menunggu
            </Badge>
          ) : (
            <Badge variant="success" size="sm">
              Semua Ditangani
            </Badge>
          )}
          <span className="text-slate-500 text-[10px]">UPT TIK Sarpras</span>
        </div>
      </div>
    </div>
  );
};
