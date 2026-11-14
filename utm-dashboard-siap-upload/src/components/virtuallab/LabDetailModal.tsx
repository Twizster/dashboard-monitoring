import React from 'react';
import { 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Users, 
  Terminal, 
  Power, 
  RotateCcw, 
  PauseCircle, 
  Trash2,
  ExternalLink
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { type VirtualLab, type LabStatus } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface LabDetailModalProps {
  lab: VirtualLab | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (lab: VirtualLab) => void;
}

export const LabDetailModal: React.FC<LabDetailModalProps> = ({
  lab,
  isOpen,
  onClose,
  onEdit,
}) => {
  const { changeLabStatus, deleteVirtualLab } = useDashboard();

  if (!lab) return null;

  const getStatusBadge = (status: LabStatus) => {
    switch (status) {
      case 'Available':
        return <Badge variant="success" size="md" dot>Available (Siap)</Badge>;
      case 'In Use':
        return <Badge variant="info" size="md" dot pulse>In Use (Praktikum)</Badge>;
      case 'Maintenance':
        return <Badge variant="warning" size="md" dot>Maintenance</Badge>;
      case 'Offline':
        return <Badge variant="danger" size="md">Offline</Badge>;
    }
  };

  const handleAction = (status: LabStatus) => {
    changeLabStatus(lab.id, status);
  };

  const handleDelete = () => {
    if (confirm(`Hapus permanen laboratorium virtual [${lab.labCode}]?`)) {
      deleteVirtualLab(lab.id);
      onClose();
    }
  };

  const userPercent = Math.round((lab.activeUsers / lab.maxUsers) * 100);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${lab.labCode} - ${lab.name}`}
      description={lab.faculty}
      maxWidth="lg"
      footer={
        <div className="w-full flex items-center justify-between">
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 className="w-3.5 h-3.5" />}
            onClick={handleDelete}
          >
            Hapus Lab
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onEdit(lab);
              }}
            >
              Edit Konfigurasi
            </Button>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Tutup
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4 text-xs">
        {/* Header Status & IP Bar */}
        <div className="p-3.5 bg-[#111726]/80 border border-[#1E293F] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-cyan-400">
                {lab.ipAddress}:{lab.port}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-[11px] text-slate-400 font-mono">{lab.os}</span>
            </div>
          </div>
          <div>{getStatusBadge(lab.status)}</div>
        </div>

        {/* Hypervisor Power Controls */}
        <div className="bg-[#111726]/50 border border-[#1E293F] rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Power className="w-3.5 h-3.5 text-blue-400" /> Kontrol Daya Node (KVM / QEMU)
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Last update: {lab.lastUpdated}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              onClick={() => handleAction('Available')}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 font-medium cursor-pointer transition-colors text-xs"
            >
              <Power className="w-3 h-3" />
              <span>Start Node</span>
            </button>

            <button
              onClick={() => handleAction('In Use')}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/25 font-medium cursor-pointer transition-colors text-xs"
            >
              <Users className="w-3 h-3" />
              <span>Set In-Use</span>
            </button>

            <button
              onClick={() => handleAction('Maintenance')}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 font-medium cursor-pointer transition-colors text-xs"
            >
              <PauseCircle className="w-3 h-3" />
              <span>Maintenance</span>
            </button>

            <button
              onClick={() => handleAction('Offline')}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/25 font-medium cursor-pointer transition-colors text-xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>PowerOff</span>
            </button>
          </div>
        </div>

        {/* Resources Allocated */}
        <div className="grid grid-cols-3 gap-2.5 font-mono">
          <div className="bg-[#111726]/40 border border-[#1E293F] rounded-lg p-2.5">
            <span className="text-[10px] text-slate-500 block font-sans">Alokasi CPU</span>
            <div className="text-sm font-bold text-slate-200 mt-0.5">{lab.cpuAllocated}</div>
          </div>
          <div className="bg-[#111726]/40 border border-[#1E293F] rounded-lg p-2.5">
            <span className="text-[10px] text-slate-500 block font-sans">Alokasi RAM</span>
            <div className="text-sm font-bold text-slate-200 mt-0.5">{lab.ramAllocated}</div>
          </div>
          <div className="bg-[#111726]/40 border border-[#1E293F] rounded-lg p-2.5">
            <span className="text-[10px] text-slate-500 block font-sans">Storage Disk</span>
            <div className="text-sm font-bold text-slate-200 mt-0.5">{lab.diskAllocated}</div>
          </div>
        </div>

        {/* User Occupancy Progress */}
        <div className="bg-[#111726]/40 border border-[#1E293F] rounded-lg p-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Users className="w-3 h-3 text-blue-400" /> Okupansi Pengguna
            </span>
            <span className="font-mono text-slate-200 font-medium">
              {lab.activeUsers} / {lab.maxUsers} Kursi ({userPercent}%)
            </span>
          </div>
          <div className="w-full bg-[#162032] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                userPercent > 80 ? 'bg-amber-400' : 'bg-blue-500'
              }`}
              style={{ width: `${userPercent}%` }}
            />
          </div>
        </div>

        {/* Connection terminal */}
        <div className="bg-[#090D16] border border-[#1E293F] rounded-xl p-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-200 pb-1.5 border-b border-[#1E293F]">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Akses Terminal Mahasiswa (SSH Gateway)</span>
            </span>
            <button
              onClick={() => alert(`Membuka console ke ${lab.ipAddress}:${lab.port}...`)}
              className="text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Console</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            $ ssh student@{lab.ipAddress} -p {lab.port}
          </p>
        </div>
      </div>
    </Modal>
  );
};
