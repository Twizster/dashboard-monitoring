import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Modal } from '../common/Modal';
import { Input, Textarea, Select } from '../common/FormControls';
import { Button } from '../common/Button';
import { type ComplaintCategory } from '../../types';

interface ComplaintFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplaintFormModal: React.FC<ComplaintFormModalProps> = ({ isOpen, onClose }) => {
  const { addComplaint } = useDashboard();

  const [reporterName, setReporterName] = useState('');
  const [nim, setNim] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('Jaringan & Internet');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [priority, setPriority] = useState<'Rendah' | 'Sedang' | 'Tinggi' | 'Kritis'>('Sedang');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryOptions = [
    { label: 'Jaringan & Internet (WiFi / LAN / Switch)', value: 'Jaringan & Internet' },
    { label: 'Komputer & Hardware (PC Lab / Monitor / RAM)', value: 'Komputer & Hardware' },
    { label: 'AC & Kelistrikan (Suhu Ruangan / Stopkontak)', value: 'AC & Kelistrikan' },
    { label: 'Proyektor & Audio (Ruang Kuliah / Auditorium)', value: 'Proyektor & Audio' },
    { label: 'Fasilitas Ruang (Kabel / Meja / Pintu)', value: 'Fasilitas Ruang' },
    { label: 'Lainnya', value: 'Lainnya' },
  ];

  const priorityOptions = [
    { label: 'Rendah (Pengecekan rutin sarpras)', value: 'Rendah' },
    { label: 'Sedang (Mengganggu sebagian mahasiswa)', value: 'Sedang' },
    { label: 'Tinggi (Praktikum / kuliah terganggu)', value: 'Tinggi' },
    { label: 'Kritis (Layanan server / ruangan padam)', value: 'Kritis' },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!reporterName.trim()) errs.reporterName = 'Nama pelapor harus diisi';
    if (!nim.trim()) errs.nim = 'NIM atau NIP harus diisi';
    if (!location.trim()) errs.location = 'Lokasi fasilitas harus diisi';
    if (!title.trim()) errs.title = 'Judul pengaduan harus diisi';
    if (!description.trim()) errs.description = 'Deskripsi masalah harus diisi';
    else if (description.trim().length < 10) errs.description = 'Berikan deskripsi minimal 10 karakter';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleImageFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addComplaint({
      reporterName: reporterName.trim(),
      nim: nim.trim(),
      category,
      location: location.trim(),
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl || undefined,
      status: 'Menunggu',
      priority,
      notes: 'Laporan baru dicatat dan menunggu penugasan teknisi UPT TIK.',
    });

    setReporterName('');
    setNim('');
    setLocation('');
    setTitle('');
    setDescription('');
    setImageUrl('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Buat Pengaduan Fasilitas Kampus"
      description="Sampaikan kendala fasilitas untuk segera ditindaklanjuti oleh tim teknisi sarpras UTM."
      maxWidth="lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Batal
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} type="button">
            Kirim Laporan
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Nama Pelapor *"
            placeholder="Contoh: Muhammad Ilham"
            value={reporterName}
            onChange={e => setReporterName(e.target.value)}
            error={errors.reporterName}
          />
          <Input
            label="NIM / NIP *"
            placeholder="Contoh: 210411100099"
            value={nim}
            onChange={e => setNim(e.target.value)}
            error={errors.nim}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Kategori Fasilitas *"
            options={categoryOptions}
            value={category}
            onChange={e => setCategory(e.target.value as ComplaintCategory)}
          />
          <Select
            label="Tingkat Urgensi"
            options={priorityOptions}
            value={priority}
            onChange={e => setPriority(e.target.value as any)}
          />
        </div>

        <Input
          label="Lokasi Fasilitas Spesifik *"
          placeholder="Contoh: Lab Jaringan Komputer, Gedung Lab Terpadu Lt. 2"
          value={location}
          onChange={e => setLocation(e.target.value)}
          error={errors.location}
        />

        <Input
          label="Judul Pengaduan *"
          placeholder="Contoh: Sinyal WiFi Drop Saat Jam Praktikum"
          value={title}
          onChange={e => setTitle(e.target.value)}
          error={errors.title}
        />

        <Textarea
          label="Deskripsi Kendala *"
          placeholder="Ceritakan detail kendala atau kerusakan yang dialami..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          error={errors.description}
        />

        {/* Drag and drop image upload */}
        <div>
          <label className="block text-[11px] font-medium text-slate-300 mb-1">
            Lampiran Foto Bukti (Opsional)
          </label>

          {imageUrl ? (
            <div className="rounded-lg border border-[#1E293F] bg-[#111726] p-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={imageUrl} alt="Lampiran" className="w-12 h-12 object-cover rounded-md border border-[#1E293F]" />
                <div>
                  <p className="text-xs font-medium text-slate-200">Foto terlampir</p>
                  <p className="text-[10px] text-emerald-400">Siap diunggah</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-[#1E293F] hover:border-slate-500 bg-[#111726]/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) handleImageFile(e.target.files[0]);
                }}
              />
              <div className="flex flex-col items-center justify-center gap-1.5">
                <Upload className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-300">
                  <span className="text-blue-400 font-medium">Pilih file foto</span> atau seret ke sini
                </span>
                <span className="text-[10px] text-slate-500">Maks 5MB (PNG, JPG)</span>
              </div>
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};
