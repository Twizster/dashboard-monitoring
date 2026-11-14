import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Info, 
  CheckCircle2, 
  Save, 
  Key, 
  Smartphone, 
  Sliders
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Card } from '../common/Card';
import { Input } from '../common/FormControls';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

type SettingsTab = 'profile' | 'security' | 'server' | 'system';

export const SettingsPage: React.FC = () => {
  const { addActivityLog } = useDashboard();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Form States
  const [adminName, setAdminName] = useState('Ir. Budi Santoso, M.Kom');
  const [nip, setNip] = useState('198205142008121002');
  const [email, setEmail] = useState('budi.santoso@trunojoyo.ac.id');
  const [phone, setPhone] = useState('+62 812-3456-7890');
  const [dept, setDept] = useState('UPT Teknologi Informasi dan Komunikasi (TIK UTM)');

  // Server Configuration States
  const [pollInterval, setPollInterval] = useState('3.5');
  const [cpuAlertThreshold, setCpuAlertThreshold] = useState('85');
  const [ramAlertThreshold, setRamAlertThreshold] = useState('90');
  const [webhookUrl, setWebhookUrl] = useState('https://discord.com/api/webhooks/utm-noc-alerts');
  const [pingTarget1, setPingTarget1] = useState('8.8.8.8');
  const [pingTarget2, setPingTarget2] = useState('1.1.1.1');

  // Security States
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleSave = () => {
    setSaveSuccess(true);
    addActivityLog({
      eventType: 'CONFIG_UPDATE',
      description: `Pengaturan modul [${activeTab.toUpperCase()}] diperbarui oleh administrator`,
      severity: 'INFO',
      userComponent: 'SettingsModule / Admin'
    });

    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E293F]">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
            Pengaturan Sistem & Preferensi
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Konfigurasi profil operator, keamanan akun, parameter alert, dan spesifikasi infrastruktur UTM.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-medium animate-in fade-in duration-150">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Perubahan berhasil disimpan!</span>
          </div>
        )}
      </div>

      {/* Settings layout with internal sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Sub-tabs */}
        <div className="lg:col-span-1 space-y-1 bg-[#0E1422] border border-[#1E293F] rounded-xl p-2.5 h-fit">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#111726]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profil Pengguna</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'security'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#111726]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Keamanan & 2FA</span>
          </button>

          <button
            onClick={() => setActiveTab('server')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'server'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#111726]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Konfigurasi Server</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'system'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#111726]'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Info Sistem Kampus</span>
          </button>
        </div>

        {/* Right Tab Content Panels */}
        <div className="lg:col-span-3 space-y-4">
          {/* Profile */}
          {activeTab === 'profile' && (
            <Card
              title="Profil Administrator NOC"
              subtitle="Data identitas penanggung jawab operasional server UTM"
              icon={<User className="w-4 h-4 text-slate-400" />}
            >
              <div className="space-y-3.5">
                <div className="flex items-center gap-3.5 pb-3 border-b border-[#1E293F]">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-lg font-bold text-blue-400">
                    BS
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-100">{adminName}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">NIP {nip}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Button variant="secondary" size="sm">
                        Ubah Foto
                      </Button>
                      <span className="text-[10px] text-slate-500">Maks 2MB</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="Nama Lengkap & Gelar" value={adminName} onChange={e => setAdminName(e.target.value)} />
                  <Input label="NIP Pegawai" value={nip} onChange={e => setNip(e.target.value)} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="Email Dinas UTM" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  <Input label="Nomor Kontak Darurat" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>

                <Input label="Unit Kerja / Departemen" value={dept} onChange={e => setDept(e.target.value)} />

                <div className="pt-2 flex justify-end">
                  <Button variant="primary" size="md" icon={<Save className="w-3.5 h-3.5" />} onClick={handleSave}>
                    Simpan Profil
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <Card
              title="Keamanan Akun & Akses"
              subtitle="Kelola kata sandi, otentikasi dua faktor, dan sesi aktif"
              icon={<Shield className="w-4 h-4 text-slate-400" />}
            >
              <div className="space-y-4 text-xs">
                {/* 2FA */}
                <div className="p-3 bg-[#111726] border border-[#1E293F] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200">Two-Factor Authentication (2FA)</h4>
                      <p className="text-[11px] text-slate-400">Verifikasi login via Google Authenticator atau FIDO2 Key.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      twoFactorEnabled
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {twoFactorEnabled ? 'Aktif' : 'Non-aktif'}
                  </button>
                </div>

                {/* Password Change */}
                <div className="p-3.5 bg-[#111726]/60 border border-[#1E293F] rounded-xl space-y-2.5">
                  <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-blue-400" /> Ganti Kata Sandi
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <Input label="Kata Sandi Lama" type="password" placeholder="••••••••••••" />
                    <Input label="Kata Sandi Baru" type="password" placeholder="Minimal 12 karakter" />
                  </div>
                  <div className="flex justify-end pt-1">
                    <Button variant="secondary" size="sm" onClick={handleSave}>
                      Perbarui Password
                    </Button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 mb-2">Sesi Login Aktif</h4>
                  <div className="border border-[#1E293F] rounded-xl overflow-hidden divide-y divide-[#1E293F]">
                    <div className="p-2.5 bg-[#111726]/80 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200">Browser Sesi Ini (Host Laptop)</span>
                          <Badge variant="success" size="sm">Aktif</Badge>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">IP 10.10.15.42 • Ruang NOC Rektorat</p>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Sedang berjalan</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Server Config */}
          {activeTab === 'server' && (
            <Card
              title="Konfigurasi Parameter Server"
              subtitle="Atur interval waktu polling metrik dan batas ambang alarm"
              icon={<Sliders className="w-4 h-4 text-slate-400" />}
            >
              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input
                    label="Interval Refresh Metrik (Detik)"
                    type="number"
                    value={pollInterval}
                    onChange={e => setPollInterval(e.target.value)}
                    helper="Standar: 2 - 5 detik"
                  />
                  <Input
                    label="Ambang Alarm CPU (%)"
                    type="number"
                    value={cpuAlertThreshold}
                    onChange={e => setCpuAlertThreshold(e.target.value)}
                    helper="Beban > 85%"
                  />
                  <Input
                    label="Ambang Alarm RAM (%)"
                    type="number"
                    value={ramAlertThreshold}
                    onChange={e => setRamAlertThreshold(e.target.value)}
                    helper="Memori > 90%"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="Primary DNS Target" value={pingTarget1} onChange={e => setPingTarget1(e.target.value)} />
                  <Input label="Secondary DNS Target" value={pingTarget2} onChange={e => setPingTarget2(e.target.value)} />
                </div>

                <Input
                  label="Webhook URL Notifikasi Alert (Discord / Telegram)"
                  value={webhookUrl}
                  onChange={e => setWebhookUrl(e.target.value)}
                  helper="Notifikasi insiden kritis otomatis diteruskan ke saluran ini."
                />

                <div className="pt-2 flex justify-end">
                  <Button variant="primary" size="md" icon={<Save className="w-3.5 h-3.5" />} onClick={handleSave}>
                    Terapkan Konfigurasi
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* System Info */}
          {activeTab === 'system' && (
            <Card
              title="Spesifikasi Platform Monitoring"
              subtitle="Lingkungan server data center Universitas Trunojoyo Madura"
              icon={<Info className="w-4 h-4 text-slate-400" />}
            >
              <div className="space-y-3 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 bg-[#111726] rounded-lg border border-[#1E293F]">
                    <span className="text-slate-400 text-[10px] block font-sans">Aplikasi Monitoring</span>
                    <span className="text-sm font-bold text-slate-100 block mt-0.5">UTM NetMon Suite v2.4</span>
                    <span className="text-emerald-400 text-[10px]">Production Enterprise Build</span>
                  </div>

                  <div className="p-3 bg-[#111726] rounded-lg border border-[#1E293F]">
                    <span className="text-slate-400 text-[10px] block font-sans">Institusi Kampus</span>
                    <span className="text-sm font-bold text-slate-100 block mt-0.5">Universitas Trunojoyo Madura</span>
                    <span className="text-slate-400 text-[10px]">Bangkalan, Jawa Timur</span>
                  </div>
                </div>

                <div className="p-3.5 bg-[#111726]/60 border border-[#1E293F] rounded-xl space-y-2 text-[11px]">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#1E293F]/50">
                    <span className="text-slate-400 font-sans">Cluster Hypervisor:</span>
                    <span className="text-slate-200">Proxmox VE 8.2 (Ceph Distributed Storage)</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#1E293F]/50">
                    <span className="text-slate-400 font-sans">Border Gateway Router:</span>
                    <span className="text-slate-200">Mikrotik CCR2216 (100G Backbone)</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#1E293F]/50">
                    <span className="text-slate-400 font-sans">Suhu Ruang Server:</span>
                    <span className="text-emerald-400">19.2°C (Optimal) • Kelembaban 45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-sans">Cadangan Daya UPS:</span>
                    <span className="text-emerald-400">APC Symmetra PX 96kVA (Online Redundant)</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
