import React, { useState, useMemo } from 'react';
import { 
  Download, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw,
  Clock
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { type LogSeverity } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { SearchInput } from '../common/FormControls';

export const ActivityLogsPage: React.FC = () => {
  const { activityLogs, addActivityLog } = useDashboard();

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredLogs = useMemo(() => {
    return activityLogs.filter(log => {
      const matchSearch =
        log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.userComponent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.ipAddress && log.ipAddress.includes(searchQuery)) ||
        log.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSeverity = severityFilter === 'ALL' || log.severity === severityFilter;
      const matchEventType = eventTypeFilter === 'ALL' || log.eventType.startsWith(eventTypeFilter);

      return matchSearch && matchSeverity && matchEventType;
    });
  }, [activityLogs, searchQuery, severityFilter, eventTypeFilter]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(start, start + itemsPerPage);
  }, [filteredLogs, currentPage, itemsPerPage]);

  const getSeverityBadge = (sev: LogSeverity) => {
    switch (sev) {
      case 'INFO':
        return <Badge variant="info" size="sm">INFO</Badge>;
      case 'WARNING':
        return <Badge variant="warning" size="sm" dot>WARNING</Badge>;
      case 'ERROR':
        return <Badge variant="danger" size="sm" dot>ERROR</Badge>;
      case 'CRITICAL':
        return <Badge variant="danger" size="sm" dot pulse className="font-bold">CRITICAL</Badge>;
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'Event Type', 'Severity', 'User/Component', 'IP Address', 'Description'];
    const rows = filteredLogs.map(l => [
      l.id,
      `"${l.timestamp}"`,
      `"${l.eventType}"`,
      l.severity,
      `"${l.userComponent}"`,
      `"${l.ipAddress || '-'}"`,
      `"${l.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `utm_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSimulateLog = () => {
    addActivityLog({
      eventType: 'SYS_AUDIT_MANUAL',
      description: 'Audit integritas kernel dan pemeriksaan keamanan SHA-256 dijalankan oleh operator',
      severity: 'INFO',
      userComponent: 'AgySecAudit / Daemon',
      ipAddress: '10.10.1.1',
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E293F]">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
            Log Aktivitas & Audit Sistem
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Jejak rekaman aktivitas autentikasi, perubahan konfigurasi, event container, dan sistem keamanan server.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={handleExportCSV}
          >
            Ekspor CSV
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className="w-3 h-3" />}
            onClick={handleSimulateLog}
          >
            Trigger Audit
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={searchQuery}
            onChange={val => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            placeholder="Cari deskripsi, komponen, ID log, IP..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Segmented Severity */}
          <div className="flex items-center bg-[#111726] border border-[#1E293F] rounded-lg p-0.5 text-xs">
            {['ALL', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'].map(sev => (
              <button
                key={sev}
                onClick={() => {
                  setSeverityFilter(sev);
                  setCurrentPage(1);
                }}
                className={`px-2 py-1 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                  severityFilter === sev
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sev === 'ALL' ? 'Semua' : sev}
              </button>
            ))}
          </div>

          <select
            value={eventTypeFilter}
            onChange={e => {
              setEventTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#111726] border border-[#1E293F] rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none cursor-pointer font-mono"
          >
            <option value="ALL">Semua Event</option>
            <option value="AUTH">AUTH (Login & SSO)</option>
            <option value="SERVICE">SERVICE (Daemon & Nginx)</option>
            <option value="RESOURCE">RESOURCE (Beban RAM & CPU)</option>
            <option value="SECURITY">SECURITY (Firewall / Fail2ban)</option>
            <option value="VLAB">VLAB (Virtual Machine)</option>
            <option value="BACKUP">BACKUP (Snapshot ZFS)</option>
          </select>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#111726] text-slate-400 uppercase text-[10px] border-b border-[#1E293F]">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Event Type</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Deskripsi Event</th>
                <th className="px-4 py-3">User / Komponen</th>
                <th className="px-4 py-3">Alamat IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293F]/50">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-500 font-sans">
                    Tidak ada log aktivitas yang cocok dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                paginatedLogs.map(log => (
                  <tr key={log.id} className="hover:bg-[#111726]/40 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-slate-400 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{log.timestamp}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="bg-[#111726] text-blue-400 border border-[#1E293F] px-1.5 py-0.5 rounded text-[10px] font-semibold">
                        {log.eventType}
                      </span>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {getSeverityBadge(log.severity)}
                    </td>

                    <td className="px-4 py-3 font-sans text-xs text-slate-200 max-w-md">
                      {log.description}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap text-cyan-400 text-[11px]">
                      {log.userComponent}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap text-slate-400 text-[11px]">
                      {log.ipAddress || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-4 py-2.5 border-t border-[#1E293F] bg-[#111726]/40 flex items-center justify-between text-xs text-slate-400">
          <div>
            Menampilkan <span className="font-mono text-slate-200">{filteredLogs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span>–<span className="font-mono text-slate-200">{Math.min(currentPage * itemsPerPage, filteredLogs.length)}</span> dari <span className="font-mono text-slate-200">{filteredLogs.length}</span> event
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md border border-[#1E293F] hover:bg-[#141C2E] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-6 h-6 rounded-md font-mono text-xs cursor-pointer transition-colors ${
                  currentPage === page ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-[#141C2E] text-slate-400'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md border border-[#1E293F] hover:bg-[#141C2E] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
