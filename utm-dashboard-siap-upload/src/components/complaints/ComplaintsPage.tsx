import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  ArrowUpDown, 
  Eye, 
  Trash2, 
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Layers,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { type FacilityComplaint, type ComplaintStatus, type ComplaintCategory } from '../../types';
import { Badge, type BadgeVariant } from '../common/Badge';
import { Button } from '../common/Button';
import { SearchInput } from '../common/FormControls';
import { ComplaintFormModal } from './ComplaintFormModal';
import { ComplaintDetailModal } from './ComplaintDetailModal';

export const ComplaintsPage: React.FC = () => {
  const { complaints, deleteComplaint } = useDashboard();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<FacilityComplaint | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalCount = complaints.length;
  const waitingCount = complaints.filter(c => c.status === 'Menunggu').length;
  const inProgressCount = complaints.filter(c => c.status === 'Diproses').length;
  const resolvedCount = complaints.filter(c => c.status === 'Selesai').length;

  const filteredComplaints = useMemo(() => {
    return complaints.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    }).sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [complaints, searchQuery, statusFilter, categoryFilter, sortOrder]);

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage) || 1;
  const paginatedComplaints = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredComplaints.slice(start, start + itemsPerPage);
  }, [filteredComplaints, currentPage, itemsPerPage]);

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'Menunggu':
        return <Badge variant="warning" size="sm" dot>Menunggu</Badge>;
      case 'Diproses':
        return <Badge variant="info" size="sm" dot pulse>Diproses</Badge>;
      case 'Selesai':
        return <Badge variant="success" size="sm" dot>Selesai</Badge>;
      case 'Ditolak':
        return <Badge variant="danger" size="sm">Ditolak</Badge>;
    }
  };

  const getCategoryBadgeVariant = (cat: ComplaintCategory): BadgeVariant => {
    switch (cat) {
      case 'Jaringan & Internet':
        return 'cyan';
      case 'Komputer & Hardware':
        return 'purple';
      case 'AC & Kelistrikan':
        return 'warning';
      case 'Proyektor & Audio':
        return 'info';
      default:
        return 'neutral';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E293F]">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
            Pengaduan Fasilitas Kampus
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola dan pantau laporan kendala infrastruktur laboratorium, jaringan, dan sarana akademik UTM.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsCreateOpen(true)}
        >
          + Buat Pengaduan
        </Button>
      </div>

      {/* 4 Status Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Total Laporan</span>
            <span className="text-xl font-bold font-mono text-slate-100 mt-0.5 block">{totalCount}</span>
            <span className="text-[10px] text-slate-500">Semua riwayat tiket</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Menunggu Verifikasi</span>
            <span className="text-xl font-bold font-mono text-amber-400 mt-0.5 block">{waitingCount}</span>
            <span className="text-[10px] text-amber-400/70">Perlu tindakan teknisi</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Sedang Dikerjakan</span>
            <span className="text-xl font-bold font-mono text-blue-400 mt-0.5 block">{inProgressCount}</span>
            <span className="text-[10px] text-blue-400/70">Dalam penanganan tim</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Selesai Diperbaiki</span>
            <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">{resolvedCount}</span>
            <span className="text-[10px] text-emerald-400/70">Fasilitas normal kembali</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
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
            placeholder="Cari ID tiket, pelapor, NIM, atau lokasi..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Segmented Status Pill Filter */}
          <div className="flex items-center bg-[#111726] border border-[#1E293F] rounded-lg p-0.5 text-xs">
            {['ALL', 'Menunggu', 'Diproses', 'Selesai'].map(st => (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
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

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={e => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#111726] border border-[#1E293F] rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none cursor-pointer"
          >
            <option value="ALL">Semua Kategori</option>
            <option value="Jaringan & Internet">Jaringan & Internet</option>
            <option value="Komputer & Hardware">Komputer & Hardware</option>
            <option value="AC & Kelistrikan">AC & Kelistrikan</option>
            <option value="Proyektor & Audio">Proyektor & Audio</option>
            <option value="Fasilitas Ruang">Fasilitas Ruang</option>
          </select>

          {/* Sort Date */}
          <button
            onClick={() => setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'))}
            className="flex items-center gap-1 bg-[#111726] hover:bg-[#141C2E] border border-[#1E293F] rounded-lg px-2.5 py-1 text-xs text-slate-300 transition-colors cursor-pointer"
            title="Urutan Waktu"
          >
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <span className="text-[11px]">{sortOrder === 'desc' ? 'Terbaru' : 'Terlama'}</span>
          </button>
        </div>
      </div>

      {/* Complaint Table */}
      <div className="bg-[#0E1422] border border-[#1E293F] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111726] text-slate-400 uppercase font-mono text-[10px] border-b border-[#1E293F]">
              <tr>
                <th className="px-4 py-3">ID Tiket</th>
                <th className="px-4 py-3">Pelapor / Mahasiswa</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Kendala & Lokasi</th>
                <th className="px-4 py-3">Tanggal Laporan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293F]/50">
              {paginatedComplaints.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    Tidak ada pengaduan fasilitas yang cocok dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                paginatedComplaints.map(item => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#111726]/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedComplaint(item)}
                  >
                    <td className="px-4 py-3 whitespace-nowrap font-mono font-medium text-blue-400">
                      {item.id}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-[#162032] border border-[#1E293F] flex items-center justify-center text-[10px] font-bold text-slate-300 font-mono">
                          {getInitials(item.reporterName)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-200">{item.reporterName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">NIM {item.nim}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={getCategoryBadgeVariant(item.category)} size="sm">
                        {item.category}
                      </Badge>
                    </td>

                    <td className="px-4 py-3 max-w-xs">
                      <div className="font-medium text-slate-200 truncate">{item.title}</div>
                      <div className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap font-mono text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{item.date}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedComplaint(item)}
                          title="Lihat Detail"
                          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#141C2E] rounded-md transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus pengaduan [${item.id}]?`)) {
                              deleteComplaint(item.id);
                            }
                          }}
                          title="Hapus Laporan"
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Clean Pagination Bar */}
        <div className="px-4 py-2.5 border-t border-[#1E293F] bg-[#111726]/40 flex items-center justify-between text-xs text-slate-400">
          <div>
            Menampilkan <span className="font-mono text-slate-200">{filteredComplaints.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span>–<span className="font-mono text-slate-200">{Math.min(currentPage * itemsPerPage, filteredComplaints.length)}</span> dari <span className="font-mono text-slate-200">{filteredComplaints.length}</span> tiket
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

      <ComplaintFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <ComplaintDetailModal
        complaint={selectedComplaint}
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />
    </div>
  );
};
