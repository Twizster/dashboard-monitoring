# UTM SERVER MONITORING & FACILITY MANAGEMENT DASHBOARD

Aplikasi Web Enterprise Monitoring & Manajemen Fasilitas berbasis React, TypeScript, Tailwind CSS, dan Recharts yang dirancang untuk lingkungan **Universitas Trunojoyo Madura (UTM)**.

Mengusung konsep desain **Modern Enterprise Dark Interface** (terinspirasi dari Linear App, Vercel Dashboard, dan Datadog), aplikasi ini berfungsi sebagai pusat operasi telemetri server, monitoring jaringan backbone, ketersediaan Virtual Lab, dan pelaporan kendala fasilitas kampus.

---

## Fitur Utama

### 1. Server Overview (Pusat Telemetri)
- **Executive Vitals Grid**: Ringkasan kesehatan server, uptime kontinu dengan SLA 99.98%, utilisasi CPU & thread, alokasi memori fisik RAM, serta ringkasan tiket fasilitas.
- **Network Throughput Monitoring (Recharts)**: Grafik real-time download dan upload (Mbps) dengan pemilihan antarmuka (`eth0`, `eth1`, `wlan0`) dan rentang waktu (`1h`, `6h`, `24h`, `7d`).
- **Resource Allocation**: Indikator semi-circle gauge untuk beban CPU dan konsumsi RAM fisik beserta pembagian user/system load dan suhu thermal.
- **DNS Latency Gateway**: Pemantauan ICMP ping probe ke Google DNS (`8.8.8.8`) dan Cloudflare DNS (`1.1.1.1`) dilengkapi grafik sparkline.
- **Triage Insiden**: Tabel riwayat gangguan server dan penanganan cepat tim NOC.

### 2. Pengaduan Fasilitas Kampus (Facility Complaints)
- **Status Workflow**: Filter status terintegrasi (*Semua, Menunggu, Diproses, Selesai, Ditolak*).
- **Formulir Pengaduan Modern**: Input nama, NIM/NIP, kategori fasilitas, lokasi presisi, tingkat urgensi, serta **upload foto bukti fisik (Drag & Drop + Image Preview)**.
- **Detail & Tracking**: Modal inspeksi bukti foto, penugasan teknisi sarpras, dan pembaruan status perbaikan.

### 3. Virtual Laboratory Management
- **Cluster Node Cards**: Pemantauan mesin virtual (*Ubuntu 24.04 LTS, Windows Server 2022, Debian 12, CentOS Stream 9*).
- **Spesifikasi & Okupansi**: Alokasi vCPU, RAM, kapasitas storage NVMe, port layanan, serta progress bar okupansi mahasiswa.
- **Power Control & Terminal**: Aksi daya (*Start, In-Use, Maintenance, Stop*) dan perintah akses SSH gateway.

### 4. Deep Server Monitoring
- Pemilihan multi-node server UTM (`utm-core-srv01`, `utm-siakad-prod`, `utm-vlab-hypervisor01`, dll).
- Grafik time-series beban prosesor dan memori.
- Kapasitas partisi storage ZFS Pool (`/`, `/var/log`, `/data/vlab`).
- Diagnostik proses sistem aktif teratas (*TOP/HTOP snapshot*).

### 5. Log Aktivitas & Audit Trail
- Catatan event autentikasi SSO, service daemon, firewall Fail2ban, dan resource alerts.
- Tingkat keparahan semantik: `INFO`, `WARNING`, `ERROR`, `CRITICAL`.
- Fitur pencarian multi-kolom dan **Ekspor Log ke CSV**.

### 6. Pengaturan Sistem
- **Profil Admin**: Identitas operator UPT TIK UTM.
- **Keamanan Akun**: Pengaturan password, Two-Factor Authentication (2FA), dan daftar sesi aktif.
- **Konfigurasi Server**: Ambang batas alarm CPU/RAM dan integrasi webhook Discord/Telegram.
- **Info Sistem**: Status hypervisor Proxmox VE, router Mikrotik border gateway, dan sensor fisik ruangan data center.

---

## Teknologi yang Digunakan

- **Frontend Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Pro Enterprise Dark Palette)
- **Visualisasi Data**: [Recharts](https://recharts.org/)
- **Ikonografi**: [Lucide React](https://lucide.dev/)
- **Tipografi**: Inter & JetBrains Mono

---

## Panduan Instalasi & Menjalankan Proyek

Pastikan Anda telah menginstal **Node.js** (versi 18 ke atas) dan **npm**.

### 1. Clone Repositori
```bash
git clone <URL_REPOSITORI_GITHUB_ANDA>
cd utm-dashboard
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```

Buka browser Anda di:
```text
http://localhost:5173/
```

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build siap rilis akan tersimpan di dalam folder `dist/`.

---

## Struktur Folder

```text
src/
├── types/             # Type definitions TypeScript
├── data/              # Mock data & initial states
├── context/           # React Context (Dashboard state & real-time simulation)
├── components/
│   ├── common/        # Komponen UI atomik (Badge, Button, Card, Modal, Input)
│   ├── layout/        # Sidebar, Navbar, dan DashboardLayout
│   ├── dashboard/     # Halaman utama Server Overview
│   ├── complaints/    # Halaman dan modal Pengaduan Fasilitas
│   ├── virtuallab/    # Halaman dan modal Virtual Laboratory
│   ├── monitoring/    # Halaman Deep Server Monitoring
│   ├── activitylogs/  # Halaman Log Aktivitas & Audit
│   └── settings/      # Halaman Pengaturan Sistem
├── App.tsx            # Root component
└── main.tsx           # Entry point
```

---

## Lisensi & Hak Cipta

Dikembangkan untuk lingkungan **UPT Teknologi Informasi dan Komunikasi (TIK) Universitas Trunojoyo Madura (UTM)**.
