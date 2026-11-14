import React from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Badge, type BadgeVariant } from '../common/Badge';
import { Card } from '../common/Card';
import type { IncidentSeverity } from '../../types';

export const IncidentOverview: React.FC = () => {
  const { incidents, resolveIncident, setActiveTab } = useDashboard();

  const totalIncidents = incidents.length;
  const activeIncidents = incidents.filter(i => i.status === 'Active' || i.status === 'Investigating').length;
  const resolvedIncidents = incidents.filter(i => i.status === 'Resolved').length;

  const getSeverityBadge = (sev: IncidentSeverity) => {
    const map: Record<IncidentSeverity, { variant: BadgeVariant; label: string }> = {
      Critical: { variant: 'danger', label: 'CRITICAL' },
      High: { variant: 'danger', label: 'HIGH' },
      Medium: { variant: 'warning', label: 'MEDIUM' },
      Low: { variant: 'info', label: 'LOW' },
    };
    const config = map[sev];
    return (
      <Badge variant={config.variant} size="sm" dot>
        {config.label}
      </Badge>
    );
  };

  return (
    <Card
      title="Riwayat Insiden & Peringatan Sistem"
      subtitle="Catatan anomali infrastruktur dan resolusi penanganan teknisi"
      icon={<ShieldAlert className="w-4 h-4 text-slate-400" />}
      action={
        <button
          onClick={() => setActiveTab('monitoring')}
          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
        >
          <span>Buka Monitoring Lengkap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      }
    >
      {/* 3 Metric Pills */}
      <div className="grid grid-cols-3 gap-3 mb-3.5 text-xs font-mono">
        <div className="bg-[#111726]/60 border border-[#1E293F] rounded-lg p-2.5">
          <span className="text-[10px] text-slate-400 block font-sans">Total Insiden Terdata</span>
          <span className="text-base font-bold text-slate-200 mt-0.5 block">{totalIncidents} Kasus</span>
        </div>
        <div className="bg-[#111726]/60 border border-[#1E293F] rounded-lg p-2.5">
          <span className="text-[10px] text-slate-400 block font-sans">Perlu Investigasi</span>
          <span className="text-base font-bold text-amber-400 mt-0.5 block">{activeIncidents} Aktif</span>
        </div>
        <div className="bg-[#111726]/60 border border-[#1E293F] rounded-lg p-2.5">
          <span className="text-[10px] text-slate-400 block font-sans">Selesai Diatasi</span>
          <span className="text-base font-bold text-emerald-400 mt-0.5 block">{resolvedIncidents} Tuntas</span>
        </div>
      </div>

      {/* Incident List Table */}
      <div className="overflow-x-auto rounded-lg border border-[#1E293F]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#111726] text-slate-400 uppercase font-mono text-[10px] border-b border-[#1E293F]">
            <tr>
              <th className="px-3.5 py-2.5">Tingkat</th>
              <th className="px-3.5 py-2.5">Deskripsi Gangguan</th>
              <th className="px-3.5 py-2.5">Node Server</th>
              <th className="px-3.5 py-2.5">Waktu</th>
              <th className="px-3.5 py-2.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293F]/50 font-mono">
            {incidents.slice(0, 4).map(incident => (
              <tr key={incident.id} className="hover:bg-[#111726]/40 transition-colors">
                <td className="px-3.5 py-2.5 whitespace-nowrap">
                  {getSeverityBadge(incident.severity)}
                </td>
                <td className="px-3.5 py-2.5 font-sans">
                  <div className="font-medium text-slate-200">{incident.title}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{incident.description}</div>
                </td>
                <td className="px-3.5 py-2.5 whitespace-nowrap text-slate-400 text-[11px]">
                  {incident.server.split('.')[0]}
                </td>
                <td className="px-3.5 py-2.5 whitespace-nowrap text-slate-400 text-[11px]">
                  <div>{incident.timestamp.split(' ')[1]} WIB</div>
                  <div className="text-[10px] text-slate-500">Durasi: {incident.duration}</div>
                </td>
                <td className="px-3.5 py-2.5 whitespace-nowrap text-right">
                  {incident.status !== 'Resolved' ? (
                    <button
                      onClick={() => resolveIncident(incident.id)}
                      className="px-2.5 py-1 text-[11px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 rounded cursor-pointer transition-colors"
                    >
                      Selesaikan
                    </button>
                  ) : (
                    <span className="text-emerald-400 text-[11px] flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Resolved
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
