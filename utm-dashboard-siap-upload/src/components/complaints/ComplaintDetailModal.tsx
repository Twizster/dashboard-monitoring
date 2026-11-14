import React, { useState } from 'react';
import { 
  MapPin, 
  User, 
  Trash2,
  ExternalLink,
  Wrench
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { type FacilityComplaint, type ComplaintStatus } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface ComplaintDetailModalProps {
  complaint: FacilityComplaint | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ComplaintDetailModal: React.FC<ComplaintDetailModalProps> = ({
  complaint,
  isOpen,
  onClose,
}) => {
  const { updateComplaintStatus, deleteComplaint } = useDashboard();
  const [selectedStatus, setSelectedStatus] = useState<ComplaintStatus>(
    complaint?.status || 'Menunggu'
  );
  const [notes, setNotes] = useState<string>(complaint?.notes || '');

  if (!complaint) return null;

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'Menunggu':
        return <Badge variant="warning" size="md" dot>Menunggu Tindakan</Badge>;
      case 'Diproses':
        return <Badge variant="info" size="md" dot pulse>Sedang Diproses</Badge>;
      case 'Selesai':
        return <Badge variant="success" size="md" dot>Selesai Diperbaiki</Badge>;
      case 'Ditolak':
        return <Badge variant="danger" size="md">Laporan Ditolak</Badge>;
    }
  };

  const handleStatusChange = (newStatus: ComplaintStatus) => {
    setSelectedStatus(newStatus);
    updateComplaintStatus(complaint.id, newStatus, notes);
  };

  const handleSaveNotes = () => {
    updateComplaintStatus(complaint.id, selectedStatus, notes);
  };

  const handleDelete = () => {
    if (confirm(`Hapus permanen laporan [${complaint.id}]?`)) {
      deleteComplaint(complaint.id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Tiket Pengaduan: ${complaint.id}`}
      description={`Dilaporkan pada ${complaint.date} WIB`}
      maxWidth="lg"
      footer={
        <div className="w-full flex items-center justify-between">
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 className="w-3.5 h-3.5" />}
            onClick={handleDelete}
          >
            Hapus Laporan
          </Button>

          <Button variant="secondary" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </div>
      }
    >
      <div className="space-y-4 text-xs">
        {/* Title bar */}
        <div className="p-3.5 bg-[#111726]/80 border border-[#1E293F] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <span className="text-[10px] text-cyan-400 font-mono font-medium block">
              {complaint.category} • Urgensi {complaint.priority}
            </span>
            <h3 className="text-sm font-semibold text-slate-100 mt-0.5">
              {complaint.title}
            </h3>
          </div>
          <div>{getStatusBadge(complaint.status)}</div>
        </div>

        {/* Reporter info & location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono">
          <div className="bg-[#111726]/40 border border-[#1E293F]/70 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-0.5">
              <User className="w-3 h-3 text-blue-400" />
              <span>Pelapor:</span>
            </div>
            <div className="text-slate-200 font-semibold">{complaint.reporterName}</div>
            <div className="text-[10px] text-slate-400">NIM/NIP: {complaint.nim}</div>
          </div>

          <div className="bg-[#111726]/40 border border-[#1E293F]/70 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-0.5">
              <MapPin className="w-3 h-3 text-rose-400" />
              <span>Lokasi:</span>
            </div>
            <div className="text-slate-200 font-semibold">{complaint.location}</div>
            <div className="text-[10px] text-slate-400">{complaint.date} WIB</div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-semibold text-slate-300 mb-1">Deskripsi Masalah</h4>
          <div className="bg-[#111726]/50 border border-[#1E293F] rounded-lg p-3 text-slate-300 leading-relaxed font-sans">
            {complaint.description}
          </div>
        </div>

        {/* Image preview */}
        {complaint.imageUrl && (
          <div>
            <h4 className="text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span>Lampiran Foto Bukti</span>
              <a
                href={complaint.imageUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 font-normal font-mono"
              >
                <span>Lihat Ukuran Penuh</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </h4>
            <div className="rounded-lg overflow-hidden border border-[#1E293F] max-h-48 bg-black/40 flex items-center justify-center">
              <img
                src={complaint.imageUrl}
                alt="Bukti Pengaduan"
                className="w-full h-auto max-h-48 object-cover"
              />
            </div>
          </div>
        )}

        {/* Technician workflow status update */}
        <div className="p-3 bg-[#111726] border border-[#1E293F] rounded-xl space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-blue-400" /> Penanganan Teknisi
            </span>
            <span className="text-[11px] text-slate-400">
              Penanggung jawab: <strong className="text-slate-200">{complaint.assignedTo || 'Tim Sarpras UTM'}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {(['Menunggu', 'Diproses', 'Selesai', 'Ditolak'] as ComplaintStatus[]).map(st => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  complaint.status === st
                    ? st === 'Menunggu'
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 font-semibold'
                      : st === 'Diproses'
                      ? 'bg-blue-500/15 text-blue-300 border-blue-500/30 font-semibold'
                      : st === 'Selesai'
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 font-semibold'
                      : 'bg-rose-500/15 text-rose-300 border-rose-500/30 font-semibold'
                    : 'bg-[#0E1422] text-slate-400 border-[#1E293F] hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">
              Catatan Tindak Lanjut:
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              className="w-full bg-[#0E1422] border border-[#1E293F] rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-blue-500"
              placeholder="Catatan progres perbaikan teknisi..."
            />
            <div className="flex justify-end mt-1.5">
              <Button variant="secondary" size="sm" onClick={handleSaveNotes}>
                Simpan Catatan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
