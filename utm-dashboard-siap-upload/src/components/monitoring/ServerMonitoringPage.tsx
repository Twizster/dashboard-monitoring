import React, { useState } from 'react';
import { 
  Activity, 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Server, 
  Terminal, 
  ShieldAlert,
  Globe
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { initialProcesses } from '../../data/mockData';

type TimeRange = '1h' | '6h' | '24h' | '7d';

export const ServerMonitoringPage: React.FC = () => {
  const { 
    selectedServer, 
    servers, 
    setSelectedServerId, 
    cpuUsage, 
    ramUsage, 
    ramTotalGb, 
    ramUsedGb, 
    ramAvailableGb,
    downloadSpeed, 
    uploadSpeed, 
    googlePing, 
    cloudflarePing,
    incidents,
    resolveIncident 
  } = useDashboard();

  const [timeRange, setTimeRange] = useState<TimeRange>('1h');

  const cpuRamHistoryData = [
    { time: '18:40', cpu: 38.2, ram: 65.4 },
    { time: '18:45', cpu: 42.1, ram: 65.8 },
    { time: '18:50', cpu: 55.4, ram: 66.5 },
    { time: '18:55', cpu: 48.0, ram: 66.2 },
    { time: '19:00', cpu: 62.5, ram: 67.8 },
    { time: '19:05', cpu: 51.3, ram: 67.0 },
    { time: '19:10', cpu: 47.9, ram: 66.9 },
    { time: '19:15', cpu: 44.0, ram: 67.1 },
    { time: '19:20', cpu: Number(cpuUsage.toFixed(1)), ram: Number(ramUsage.toFixed(1)) },
  ];

  const pingCombinedData = [
    { time: '18:40', google: 14.8, cloudflare: 12.1 },
    { time: '18:45', google: 15.2, cloudflare: 11.9 },
    { time: '18:50', google: 14.1, cloudflare: 12.4 },
    { time: '18:55', google: 16.0, cloudflare: 11.7 },
    { time: '19:00', google: 14.5, cloudflare: 12.0 },
    { time: '19:05', google: 13.9, cloudflare: 11.5 },
    { time: '19:10', google: 14.2, cloudflare: 11.8 },
    { time: '19:15', google: Number(googlePing.latency.toFixed(1)), cloudflare: Number(cloudflarePing.latency.toFixed(1)) },
  ];

  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#090D16] border border-[#1E293F] p-2 rounded-lg text-xs font-mono shadow-xl">
          <p className="text-slate-400 font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-3 py-0.5">
              <span style={{ color: entry.color }} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-semibold text-slate-100">
                {entry.value} {entry.unit || '%'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#1E293F]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
              Monitoring Server & Telemetri
            </h1>
            <Badge variant="neutral" size="sm">
              Node Level
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Analisis beban hardware, throughput antarmuka, respon latensi, dan proses sistem aktif.
          </p>
        </div>

        {/* Server & Time controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#0E1422] border border-[#1E293F] rounded-lg px-2.5 py-1 text-xs">
            <Server className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedServer.id}
              onChange={e => setSelectedServerId(e.target.value)}
              className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer font-mono font-medium"
            >
              {servers.map(srv => (
                <option key={srv.id} value={srv.id} className="bg-[#0E1422]">
                  {srv.name.split('.')[0]} ({srv.ip})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center bg-[#0E1422] border border-[#1E293F] rounded-lg p-0.5 text-xs">
            {(['1h', '6h', '24h', '7d'] as TimeRange[]).map(r => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] font-medium transition-colors cursor-pointer ${
                  timeRange === r ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 1. Node Health Info Card */}
      <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-100 font-mono">
                  {selectedServer.name}
                </h2>
                <Badge variant={selectedServer.status === 'online' ? 'success' : 'warning'} size="sm" dot>
                  {selectedServer.status.toUpperCase()}
                </Badge>
                <span className="text-[10px] bg-[#111726] text-slate-400 px-1.5 py-0.5 rounded border border-[#1E293F] font-mono">
                  {selectedServer.environment}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {selectedServer.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="bg-[#111726] p-2 rounded-lg border border-[#1E293F]/60">
              <span className="text-[10px] text-slate-500 block font-sans">Linux Kernel</span>
              <span className="text-slate-200 truncate block mt-0.5">{selectedServer.kernel.split('-')[0]}</span>
            </div>
            <div className="bg-[#111726] p-2 rounded-lg border border-[#1E293F]/60">
              <span className="text-[10px] text-slate-500 block font-sans">CPU Cores</span>
              <span className="text-cyan-400 block mt-0.5">{selectedServer.cpuCores} Core</span>
            </div>
            <div className="bg-[#111726] p-2 rounded-lg border border-[#1E293F]/60">
              <span className="text-[10px] text-slate-500 block font-sans">Physical RAM</span>
              <span className="text-indigo-400 block mt-0.5">{selectedServer.totalRamGb} GB</span>
            </div>
            <div className="bg-[#111726] p-2 rounded-lg border border-[#1E293F]/60">
              <span className="text-[10px] text-slate-500 block font-sans">System Uptime</span>
              <span className="text-emerald-400 block mt-0.5">{selectedServer.uptime.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2 & 3: CPU & RAM Chronological Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card
          title="Beban Penggunaan CPU"
          subtitle={`Rata-rata utilisasi prosesor periode ${timeRange.toUpperCase()}`}
          icon={<Cpu className="w-4 h-4 text-cyan-400" />}
          action={<span className="text-xs font-mono font-semibold text-cyan-400">{cpuUsage.toFixed(1)}%</span>}
        >
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuRamHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cpuG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#162032" vertical={false} />
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} fontFamily="monospace" tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} fontFamily="monospace" tickLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomChartTooltip />} />
                <Area type="monotone" dataKey="cpu" name="CPU" unit="%" stroke="#06B6D4" strokeWidth={1.5} fillOpacity={1} fill="url(#cpuG)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#1E293F]/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Load 1m: 1.48 • 5m: 1.34</span>
            <span className="text-emerald-400">Normal</span>
          </div>
        </Card>

        <Card
          title="Konsumsi Memori RAM"
          subtitle={`Alokasi RAM fisik dan buffer cache periode ${timeRange.toUpperCase()}`}
          icon={<MemoryStick className="w-4 h-4 text-blue-400" />}
          action={<span className="text-xs font-mono font-semibold text-blue-400">{ramUsage.toFixed(1)}%</span>}
        >
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuRamHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ramG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#162032" vertical={false} />
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} fontFamily="monospace" tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} fontFamily="monospace" tickLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomChartTooltip />} />
                <Area type="monotone" dataKey="ram" name="RAM" unit="%" stroke="#3B82F6" strokeWidth={1.5} fillOpacity={1} fill="url(#ramG)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#1E293F]/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Used {ramUsedGb} GB • Free {ramAvailableGb} GB</span>
            <span className="text-cyan-400">Buffer: 24.6 GB</span>
          </div>
        </Card>
      </div>

      {/* 4 & 5: Network & Ping Combined Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card
          title="Throughput & Paket Jaringan"
          subtitle="Tingkat transfer paket data antarmuka 10G"
          icon={<Activity className="w-4 h-4 text-slate-400" />}
        >
          <div className="grid grid-cols-2 gap-2.5 mb-3 font-mono text-xs">
            <div className="bg-[#111726] p-2.5 rounded-lg border border-[#1E293F]">
              <span className="text-[10px] text-slate-400 block font-sans">RX (Download)</span>
              <span className="text-base font-bold text-cyan-400">{downloadSpeed.toFixed(1)} Mbps</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">84.2k pkt/s</span>
            </div>
            <div className="bg-[#111726] p-2.5 rounded-lg border border-[#1E293F]">
              <span className="text-[10px] text-slate-400 block font-sans">TX (Upload)</span>
              <span className="text-base font-bold text-blue-400">{uploadSpeed.toFixed(1)} Mbps</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">42.9k pkt/s</span>
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] font-mono">
            <div className="flex items-center justify-between p-2 bg-[#111726]/40 rounded border border-[#1E293F]/50">
              <span className="text-slate-400 font-sans">CRC Frame Error:</span>
              <span className="text-emerald-400">0 Drop (Optimal)</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#111726]/40 rounded border border-[#1E293F]/50">
              <span className="text-slate-400 font-sans">TCP Sockets:</span>
              <span className="text-slate-200">1,420 Established</span>
            </div>
          </div>
        </Card>

        <Card
          title="Telemetri Latensi DNS (ICMP)"
          subtitle="Perbandingan respon latensi Google vs Cloudflare DNS"
          icon={<Globe className="w-4 h-4 text-slate-400" />}
        >
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pingCombinedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#162032" vertical={false} />
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} fontFamily="monospace" tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} fontFamily="monospace" tickLine={false} domain={[5, 25]} />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Line type="monotone" dataKey="google" name="Google 8.8.8.8" unit="ms" stroke="#06B6D4" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="cloudflare" name="Cloudflare 1.1.1.1" unit="ms" stroke="#3B82F6" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 6. Disk Partitions */}
      <Card
        title="Partisi Kapasitas Disk Storage"
        subtitle="Volume ZFS Pool dan SSD NVMe data center"
        icon={<HardDrive className="w-4 h-4 text-slate-400" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#111726] rounded-lg border border-[#1E293F]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-slate-200">/ (Root OS)</span>
              <span className="text-emerald-400">32.4%</span>
            </div>
            <div className="w-full bg-[#162032] h-1.5 rounded-full overflow-hidden mb-1.5">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '32.4%' }} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-sans">
              <span>Terpakai 64.8 GB</span>
              <span>Total 200 GB</span>
            </div>
          </div>

          <div className="p-3 bg-[#111726] rounded-lg border border-[#1E293F]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-slate-200">/var/log</span>
              <span className="text-amber-400">78.1%</span>
            </div>
            <div className="w-full bg-[#162032] h-1.5 rounded-full overflow-hidden mb-1.5">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: '78.1%' }} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-sans">
              <span>Terpakai 78.1 GB</span>
              <span>Total 100 GB</span>
            </div>
          </div>

          <div className="p-3 bg-[#111726] rounded-lg border border-[#1E293F]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-slate-200">/data/vlab</span>
              <span className="text-cyan-400">54.2%</span>
            </div>
            <div className="w-full bg-[#162032] h-1.5 rounded-full overflow-hidden mb-1.5">
              <div className="bg-cyan-500 h-full rounded-full" style={{ width: '54.2%' }} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-sans">
              <span>Terpakai 1,084 GB</span>
              <span>Total 2,000 GB</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 7. Active Top Linux Processes */}
      <Card
        title="Daftar Proses Sistem (TOP / HTOP Snapshot)"
        subtitle="Proses aktif dengan konsumsi CPU dan memori tertinggi"
        icon={<Terminal className="w-4 h-4 text-slate-400" />}
      >
        <div className="overflow-x-auto rounded-lg border border-[#1E293F]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#111726] text-slate-400 text-[10px] uppercase border-b border-[#1E293F]">
              <tr>
                <th className="px-3.5 py-2">PID</th>
                <th className="px-3.5 py-2">USER</th>
                <th className="px-3.5 py-2">CPU %</th>
                <th className="px-3.5 py-2">MEM %</th>
                <th className="px-3.5 py-2">TIME+</th>
                <th className="px-3.5 py-2">COMMAND</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293F]/50">
              {initialProcesses.map(proc => (
                <tr key={proc.pid} className="hover:bg-[#111726]/40 transition-colors">
                  <td className="px-3.5 py-1.5 text-blue-400">{proc.pid}</td>
                  <td className="px-3.5 py-1.5 text-slate-200">{proc.user}</td>
                  <td className="px-3.5 py-1.5 text-emerald-400 font-semibold">{proc.cpuPercent}%</td>
                  <td className="px-3.5 py-1.5 text-indigo-400">{proc.memPercent}%</td>
                  <td className="px-3.5 py-1.5 text-slate-400">{proc.time}</td>
                  <td className="px-3.5 py-1.5 text-slate-200 truncate max-w-sm">{proc.command}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 8. Incident History on this node */}
      <Card
        title="Riwayat Insiden & Peringatan Terkait"
        subtitle={`Catatan gangguan pada ${selectedServer.name}`}
        icon={<ShieldAlert className="w-4 h-4 text-slate-400" />}
      >
        <div className="divide-y divide-[#1E293F]/50">
          {incidents.map(inc => (
            <div key={inc.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={inc.severity === 'Critical' || inc.severity === 'High' ? 'danger' : 'warning'} size="sm">
                    {inc.severity}
                  </Badge>
                  <span className="font-semibold text-slate-200">{inc.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{inc.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-slate-500">
                  {inc.timestamp} ({inc.duration})
                </span>
                {inc.status === 'Resolved' ? (
                  <Badge variant="success" size="sm">Selesai</Badge>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => resolveIncident(inc.id)}>
                    Selesaikan
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
