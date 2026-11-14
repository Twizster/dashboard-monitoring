import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Cpu, 
  MemoryStick, 
  Users, 
  Edit3, 
  Trash2, 
  Clock, 
  Layers,
  CheckCircle2,
  Activity,
  Copy,
  Check
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { type VirtualLab, type LabStatus } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { SearchInput } from '../common/FormControls';
import { LabFormModal } from './LabFormModal';
import { LabDetailModal } from './LabDetailModal';

export const VirtualLabPage: React.FC = () => {
  const { virtualLabs, deleteVirtualLab } = useDashboard();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [copiedIp, setCopiedIp] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLab, setEditingLab] = useState<VirtualLab | null>(null);
  const [inspectLab, setInspectLab] = useState<VirtualLab | null>(null);

  const availableCount = virtualLabs.filter(l => l.status === 'Available').length;
  const inUseCount = virtualLabs.filter(l => l.status === 'In Use').length;
  const totalActiveStudents = virtualLabs.reduce((acc, curr) => acc + curr.activeUsers, 0);

  const filteredLabs = useMemo(() => {
    return virtualLabs.filter(lab => {
      const matchSearch =
        lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.labCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.faculty.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || lab.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [virtualLabs, searchQuery, statusFilter]);

  const getStatusBadge = (status: LabStatus) => {
    switch (status) {
      case 'Available':
        return <Badge variant="success" size="sm" dot>Available</Badge>;
      case 'In Use':
        return <Badge variant="info" size="sm" dot pulse>In Use</Badge>;
      case 'Maintenance':
        return <Badge variant="warning" size="sm" dot>Maintenance</Badge>;
      case 'Offline':
        return <Badge variant="danger" size="sm">Offline</Badge>;
    }
  };

  const handleCopyIp = (ip: string) => {
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 1500);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E293F]">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
            Virtual Laboratory Management
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola cluster mesin virtual praktikum mahasiswa, alokasi komputasi, dan status ketersediaan node.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => {
            setEditingLab(null);
            setIsFormOpen(true);
          }}
        >
          + Tambah Laboratorium
        </Button>
      </div>

      {/* Cluster Vitals Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Total Node VLab</span>
            <span className="text-xl font-bold font-mono text-slate-100 mt-0.5 block">{virtualLabs.length} Cluster</span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Siap Digunakan</span>
            <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">{availableCount} Lab</span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Sesi Praktikum</span>
            <span className="text-xl font-bold font-mono text-blue-400 mt-0.5 block">{inUseCount} Lab</span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Activity className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Mahasiswa Aktif</span>
            <span className="text-xl font-bold font-mono text-cyan-400 mt-0.5 block">{totalActiveStudents} User</span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <Users className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="w-full sm:max-w-sm">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari kode lab, nama, OS, atau IP..."
          />
        </div>

        <div className="flex items-center bg-[#111726] border border-[#1E293F] rounded-lg p-0.5 text-xs w-full sm:w-auto">
          {['ALL', 'Available', 'In Use', 'Maintenance', 'Offline'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st === 'ALL' ? 'Semua Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredLabs.length === 0 ? (
          <div className="col-span-full bg-[#0E1422] border border-[#1E293F] rounded-xl p-8 text-center text-slate-500 text-xs">
            Tidak ada laboratorium virtual yang sesuai kriteria pencarian.
          </div>
        ) : (
          filteredLabs.map(lab => {
            const occupancyPercent = Math.round((lab.activeUsers / lab.maxUsers) * 100);

            return (
              <div
                key={lab.id}
                className="bg-[#0E1422] border border-[#1E293F] hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between transition-colors group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.2 rounded">
                        {lab.labCode}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        Port {lab.port}
                      </span>
                    </div>
                    {getStatusBadge(lab.status)}
                  </div>

                  <h3 className="text-xs sm:text-[13px] font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
                    {lab.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{lab.faculty}</p>

                  {/* OS & IP Row */}
                  <div className="mt-3 p-2 bg-[#111726] border border-[#1E293F]/70 rounded-lg space-y-1 text-xs font-mono">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">OS:</span>
                      <span className="text-slate-200 truncate max-w-[180px]">{lab.os.split('(')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">IP Host:</span>
                      <button
                        onClick={() => handleCopyIp(lab.ipAddress)}
                        className="text-cyan-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        title="Salin IP"
                      >
                        <span>{lab.ipAddress}</span>
                        {copiedIp === lab.ipAddress ? (
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-2.5 h-2.5 text-slate-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Hardware specs */}
                  <div className="grid grid-cols-2 gap-2 mt-2.5 text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 p-1.5 bg-[#111726]/50 rounded border border-[#1E293F]/50">
                      <Cpu className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="text-slate-300 truncate">{lab.cpuAllocated}</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 bg-[#111726]/50 rounded border border-[#1E293F]/50">
                      <MemoryStick className="w-3 h-3 text-indigo-400 shrink-0" />
                      <span className="text-slate-300 truncate">{lab.ramAllocated}</span>
                    </div>
                  </div>

                  {/* Occupancy bar */}
                  <div className="mt-2.5 pt-2.5 border-t border-[#1E293F]/60">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Users className="w-3 h-3 text-blue-400" /> Okupansi Mahasiswa
                      </span>
                      <span className="font-mono text-slate-200 font-medium">
                        {lab.activeUsers} / {lab.maxUsers}
                      </span>
                    </div>
                    <div className="w-full bg-[#162032] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          occupancyPercent > 80 ? 'bg-amber-400' : 'bg-cyan-500'
                        }`}
                        style={{ width: `${occupancyPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-3.5 pt-2.5 border-t border-[#1E293F]/60 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> {lab.lastUpdated}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setInspectLab(lab)}
                      className="px-2.5 py-1 text-[11px] bg-[#111726] hover:bg-[#141C2E] text-slate-200 border border-[#1E293F] rounded-md transition-colors cursor-pointer font-medium"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => {
                        setEditingLab(lab);
                        setIsFormOpen(true);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-200 hover:bg-[#111726] rounded-md transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus Virtual Lab [${lab.labCode}]?`)) deleteVirtualLab(lab.id);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <LabFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingLab(null);
        }}
        editLab={editingLab}
      />

      <LabDetailModal
        lab={inspectLab}
        isOpen={!!inspectLab}
        onClose={() => setInspectLab(null)}
        onEdit={lab => {
          setEditingLab(lab);
          setIsFormOpen(true);
        }}
      />
    </div>
  );
};
