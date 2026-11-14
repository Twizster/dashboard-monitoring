import { 
  ServerInfo, 
  FacilityComplaint, 
  VirtualLab, 
  ServerIncident, 
  ActivityLog, 
  PingData,
  NetworkTrafficPoint,
  SystemProcess
} from '../types';

export const initialServers: ServerInfo[] = [
  {
    id: 'srv-01',
    name: 'utm-core-srv01.trunojoyo.ac.id',
    ip: '10.10.1.1',
    environment: 'Production',
    location: 'Server Room Data Center Lt. 3 Gedung Rektorat UTM',
    status: 'online',
    uptime: '148d 18h 42m',
    os: 'Ubuntu 24.04.1 LTS x86_64',
    kernel: 'Linux 6.8.0-45-generic',
    cpuModel: 'Dual AMD EPYC 7763 64-Core Processor',
    cpuCores: 128,
    totalRamGb: 256,
  },
  {
    id: 'srv-02',
    name: 'utm-siakad-prod.trunojoyo.ac.id',
    ip: '10.10.1.20',
    environment: 'Production',
    location: 'Cluster Rack B2 Data Center UTM',
    status: 'online',
    uptime: '92d 06h 15m',
    os: 'Debian 12 Bookworm x86_64',
    kernel: 'Linux 6.1.0-21-amd64',
    cpuModel: 'Intel Xeon Gold 6330 @ 2.00GHz',
    cpuCores: 56,
    totalRamGb: 128,
  },
  {
    id: 'srv-03',
    name: 'utm-vlab-hypervisor01.trunojoyo.ac.id',
    ip: '10.10.5.10',
    environment: 'Production',
    location: 'Lab Terpadu Lantai 2 UTM',
    status: 'online',
    uptime: '45d 12h 09m',
    os: 'Proxmox VE 8.2 (Debian 12)',
    kernel: 'Linux 6.8.4-2-pve',
    cpuModel: 'AMD EPYC 7543 32-Core Processor',
    cpuCores: 64,
    totalRamGb: 512,
  },
  {
    id: 'srv-04',
    name: 'utm-moodle-lms.trunojoyo.ac.id',
    ip: '10.10.2.15',
    environment: 'Production',
    location: 'Cluster Rack C1 Data Center UTM',
    status: 'warning',
    uptime: '18d 03h 51m',
    os: 'Ubuntu 22.04.4 LTS',
    kernel: 'Linux 5.15.0-107-generic',
    cpuModel: 'Intel Xeon Silver 4314 @ 2.40GHz',
    cpuCores: 32,
    totalRamGb: 64,
  },
  {
    id: 'srv-05',
    name: 'utm-backup-nas01.trunojoyo.ac.id',
    ip: '10.10.8.50',
    environment: 'Production',
    location: 'Offsite Storage Room Gedung Graha Utama',
    status: 'online',
    uptime: '210d 22h 30m',
    os: 'TrueNAS SCALE 23.10.2',
    kernel: 'Linux 6.1.74-production+truenas',
    cpuModel: 'Intel Xeon E-2388G @ 3.20GHz',
    cpuCores: 16,
    totalRamGb: 128,
  }
];

export const initialGooglePing: PingData = {
  target: 'Google DNS',
  ip: '8.8.8.8',
  latency: 14.2,
  packetLoss: 0.0,
  status: 'optimal',
  lastChecked: 'Baru saja',
  history: [
    { time: '10:00', latency: 15.2 },
    { time: '10:05', latency: 14.8 },
    { time: '10:10', latency: 16.1 },
    { time: '10:15', latency: 13.9 },
    { time: '10:20', latency: 14.4 },
    { time: '10:25', latency: 14.2 },
    { time: '10:30', latency: 15.0 },
    { time: '10:35', latency: 14.2 }
  ]
};

export const initialCloudflarePing: PingData = {
  target: 'Cloudflare DNS',
  ip: '1.1.1.1',
  latency: 11.8,
  packetLoss: 0.0,
  status: 'optimal',
  lastChecked: 'Baru saja',
  history: [
    { time: '10:00', latency: 12.4 },
    { time: '10:05', latency: 11.9 },
    { time: '10:10', latency: 13.2 },
    { time: '10:15', latency: 11.6 },
    { time: '10:20', latency: 12.0 },
    { time: '10:25', latency: 11.8 },
    { time: '10:30', latency: 12.1 },
    { time: '10:35', latency: 11.8 }
  ]
};

export const initialTrafficData: NetworkTrafficPoint[] = [
  { time: '14:00', download: 480, upload: 290 },
  { time: '14:30', download: 620, upload: 340 },
  { time: '15:00', download: 780, upload: 410 },
  { time: '15:30', download: 840, upload: 470 },
  { time: '16:00', download: 720, upload: 390 },
  { time: '16:30', download: 890, upload: 520 },
  { time: '17:00', download: 650, upload: 380 },
  { time: '17:30', download: 540, upload: 310 },
  { time: '18:00', download: 610, upload: 350 },
  { time: '18:30', download: 760, upload: 430 },
  { time: '19:00', download: 885, upload: 495 },
  { time: '19:30', download: 820, upload: 460 },
];

export const initialComplaints: FacilityComplaint[] = [
  {
    id: 'PGD-2026-081',
    reporterName: 'Ahmad Faiz Ramadhan',
    nim: '210411100045',
    category: 'Jaringan & Internet',
    location: 'Lab Rekayasa Perangkat Lunak (Gedung Lab Terpadu Lt. 2)',
    title: 'Koneksi WiFi Mahasiswa Terputus saat Ujian Praktikum',
    description: 'Access Point UTM-Student di Lab RPL lantai 2 mengalami drop sinyal setiap 10 menit. Sebanyak 35 mahasiswa praktikum web mengalami timeout saat push ke repositori.',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    date: '2026-11-14 09:15',
    status: 'Diproses',
    priority: 'Tinggi',
    assignedTo: 'Budi Santoso, S.Kom (NOC UTM)',
    notes: 'Sedang dilakukan penggantian kabel patch cord Cat6 dan pengecekan switch Cisco PoE.'
  },
  {
    id: 'PGD-2026-080',
    reporterName: 'Siti Nurhaliza',
    nim: '220411100112',
    category: 'AC & Kelistrikan',
    location: 'Ruang Server NOC & Ruang Rapat Rektorat Lt. 3',
    title: 'AC Central Ruang Server 02 Kurang Dingin (Suhu Naik ke 27°C)',
    description: 'Sensor suhu di rak C1 mendeteksi peningkatan suhu dari standar 19°C menjadi 27.4°C. Suara blower AC outdoor terdengar berdecit.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    date: '2026-11-14 08:30',
    status: 'Menunggu',
    priority: 'Kritis',
    assignedTo: 'Tim Sarpras & Teknisi HVAC',
    notes: 'Sudah diteruskan ke Bagian Umum & Perlengkapan Kampus.'
  },
  {
    id: 'PGD-2026-079',
    reporterName: 'Dimas Arya Pratama',
    nim: '230411100088',
    category: 'Komputer & Hardware',
    location: 'Lab Komputasi Cerdas (Fakultas Teknik Lt. 1)',
    title: 'PC Client No. 12 dan No. 15 Gagal Booting (No Bootable Device)',
    description: 'Dua unit PC workstation AI tidak mendeteksi SSD NVMe saat dinyalakan. Lampu indikator motherboard berwarna merah menyala.',
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
    date: '2026-11-13 14:20',
    status: 'Diproses',
    priority: 'Sedang',
    assignedTo: 'Rian Hidayat (Teknisi Lab)',
    notes: 'Unit SSD pengganti sedang disiapkan dari inventaris jurusan Teknik Informatika.'
  },
  {
    id: 'PGD-2026-078',
    reporterName: 'Dr. Indah Suryani, M.T.',
    nim: '198504122010122003',
    category: 'Proyektor & Audio',
    location: 'Auditorium Gedung Pertemuan Rektorat',
    title: 'Proyektor Laser Utama Warna Tampilan Menguning dan Berkedip',
    description: 'HDMI extender dari mimbar utama ke proyektor laser auditorium mengalami distorsi warna cyan-yellow dan berkedip setiap 30 detik.',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
    date: '2026-11-13 11:05',
    status: 'Selesai',
    priority: 'Tinggi',
    assignedTo: 'M. Syarif (Audio Visual Sarpras)',
    notes: 'Kabel fiber optical HDMI 30m telah diganti baru. Kalibrasi warna proyektor selesai.'
  },
  {
    id: 'PGD-2026-077',
    reporterName: 'Rahmat Hidayatullah',
    nim: '200411100019',
    category: 'Fasilitas Ruang',
    location: 'Gedung Kuliah Bersama (GKB) Ruang 304',
    title: 'Kabel LAN Dinding Terkelupas Dekat Meja Dosen',
    description: 'Faceplate socket RJ45 di dinding terlepas dan kabel UTP tertarik sehingga pin konektor bengkok.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    date: '2026-11-12 16:40',
    status: 'Selesai',
    priority: 'Rendah',
    assignedTo: 'NOC Lapangan',
    notes: 'Modular jack RJ45 dan faceplate baru telah terpasang rapi dan diuji dengan LAN tester.'
  },
  {
    id: 'PGD-2026-076',
    reporterName: 'Fajar Nugroho',
    nim: '230411100201',
    category: 'Jaringan & Internet',
    location: 'Kantin Pusat Mahasiswa UTM',
    title: 'Permintaan Penambahan Bandwidth WiFi Kantin',
    description: 'Koneksi internet di kantin sangat padat saat jam makan siang sehingga browsing lambat.',
    date: '2026-11-11 13:10',
    status: 'Ditolak',
    priority: 'Rendah',
    assignedTo: 'Koordinator Jaringan',
    notes: 'Kantin bukan zona prioritas akademik. Bandwidth dibatasi sesuai kebijakan IT kampus UTM.'
  }
];

export const initialVirtualLabs: VirtualLab[] = [
  {
    id: 'vlab-01',
    labCode: 'VLAB-RPL-01',
    name: 'Virtual Lab Rekayasa Perangkat Lunak',
    os: 'Ubuntu 24.04 LTS (Docker, Node 22, Py 3.12, VSCode Server)',
    osType: 'ubuntu',
    ipAddress: '10.10.5.101',
    status: 'In Use',
    cpuAllocated: '16 vCPU',
    ramAllocated: '32 GB RAM',
    activeUsers: 34,
    maxUsers: 45,
    diskAllocated: '500 GB NVMe',
    faculty: 'Fakultas Teknik - Teknik Informatika',
    lastUpdated: '1 menit yang lalu',
    port: 8443
  },
  {
    id: 'vlab-02',
    labCode: 'VLAB-JARKOM-02',
    name: 'Virtual Lab Jaringan Komputer & Cisco GNS3',
    os: 'Debian 12 (EVE-NG Pro, Wireshark, Mininet, FRRouting)',
    osType: 'debian',
    ipAddress: '10.10.5.102',
    status: 'Available',
    cpuAllocated: '24 vCPU',
    ramAllocated: '48 GB RAM',
    activeUsers: 8,
    maxUsers: 40,
    diskAllocated: '800 GB NVMe',
    faculty: 'Fakultas Teknik - Sistem Informasi',
    lastUpdated: '3 menit yang lalu',
    port: 8080
  },
  {
    id: 'vlab-03',
    labCode: 'VLAB-AI-03',
    name: 'Virtual Lab AI & Machine Learning Cluster',
    os: 'Ubuntu 22.04 LTS (NVIDIA CUDA 12.4, PyTorch, JupyterHub)',
    osType: 'ubuntu',
    ipAddress: '10.10.5.103',
    status: 'In Use',
    cpuAllocated: '32 vCPU (2x A100 GPU)',
    ramAllocated: '96 GB RAM',
    activeUsers: 28,
    maxUsers: 30,
    diskAllocated: '2.0 TB NVMe',
    faculty: 'Fakultas Teknik - Sains Data',
    lastUpdated: 'Baru saja',
    port: 8888
  },
  {
    id: 'vlab-04',
    labCode: 'VLAB-CYBER-04',
    name: 'Virtual Lab Keamanan Siber & Ethical Hacking',
    os: 'Kali Linux 2024.3 Rolling (Isolated Sandboxed Segment)',
    osType: 'debian',
    ipAddress: '10.10.5.104',
    status: 'Maintenance',
    cpuAllocated: '16 vCPU',
    ramAllocated: '32 GB RAM',
    activeUsers: 0,
    maxUsers: 35,
    diskAllocated: '400 GB SSD',
    faculty: 'Fakultas Teknik - Teknik Komputer',
    lastUpdated: '25 menit yang lalu',
    port: 4443
  },
  {
    id: 'vlab-05',
    labCode: 'VLAB-WIN-05',
    name: 'Virtual Lab Enterprise CAD & Visual Studio',
    os: 'Windows Server 2022 Datacenter (Remote Desktop Gateway)',
    osType: 'windows',
    ipAddress: '10.10.5.105',
    status: 'Available',
    cpuAllocated: '20 vCPU',
    ramAllocated: '64 GB RAM',
    activeUsers: 12,
    maxUsers: 40,
    diskAllocated: '1.2 TB SSD',
    faculty: 'Fakultas Teknik - Teknik Elektro & Industri',
    lastUpdated: '12 menit yang lalu',
    port: 3389
  },
  {
    id: 'vlab-06',
    labCode: 'VLAB-DB-06',
    name: 'Virtual Lab Big Data & Database Systems',
    os: 'CentOS Stream 9 (PostgreSQL 16, ClickHouse, Hadoop)',
    osType: 'centos',
    ipAddress: '10.10.5.106',
    status: 'Offline',
    cpuAllocated: '16 vCPU',
    ramAllocated: '32 GB RAM',
    activeUsers: 0,
    maxUsers: 40,
    diskAllocated: '1.5 TB HDD Pool',
    faculty: 'Fakultas Teknik - Teknik Informatika',
    lastUpdated: '1 jam yang lalu',
    port: 5432
  }
];

export const initialIncidents: ServerIncident[] = [
  {
    id: 'INC-2026-104',
    title: 'High Memory Spike on SIAKAD DB Pool (91.4% Used)',
    server: 'utm-siakad-prod.trunojoyo.ac.id',
    severity: 'High',
    status: 'Active',
    timestamp: '2026-11-14 18:40',
    duration: '1h 08m',
    description: 'PostgreSQL connection pool maxed out during student semester registration peak window. Auto-vacuuming background worker triggered.'
  },
  {
    id: 'INC-2026-103',
    title: 'Core Switch Fiber Link Uplink 2 Degradation',
    server: 'utm-core-srv01.trunojoyo.ac.id',
    severity: 'Medium',
    status: 'Investigating',
    timestamp: '2026-11-14 17:15',
    duration: '2h 33m',
    description: 'SFP+ transceiver optical RX power dropped to -19.4 dBm. Redundant trunk link active, no packet loss observed on user side.'
  },
  {
    id: 'INC-2026-102',
    title: 'Disk Space Alert on /var/log/journal (>85%)',
    server: 'utm-moodle-lms.trunojoyo.ac.id',
    severity: 'Medium',
    status: 'Active',
    timestamp: '2026-11-14 15:10',
    duration: '4h 38m',
    description: 'Log rotation daemon was stuck on compressed audit files. Manual journalctl vacuum executed, scheduled cron pending check.'
  },
  {
    id: 'INC-2026-101',
    title: 'BGP Route Flapping from Astinet Provider Gateway',
    server: 'utm-core-srv01.trunojoyo.ac.id',
    severity: 'Critical',
    status: 'Resolved',
    timestamp: '2026-11-13 22:14',
    duration: '14m',
    description: 'Upstream Telkom ISP border gateway experienced route oscillation. Automatic failover to Indosat backup link executed in 4.2 seconds.',
    resolvedAt: '2026-11-13 22:28'
  },
  {
    id: 'INC-2026-100',
    title: 'NTP Time Drift Exceeded 250ms on Hypervisor Cluster',
    server: 'utm-vlab-hypervisor01.trunojoyo.ac.id',
    severity: 'Low',
    status: 'Resolved',
    timestamp: '2026-11-13 09:30',
    duration: '8m',
    description: 'Chrony synchronized with stratum-1 id.pool.ntp.org. Clock slew corrected smoothly.',
    resolvedAt: '2026-11-13 09:38'
  }
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'LOG-8849',
    timestamp: '2026-11-14 19:46:12',
    eventType: 'AUTH_LOGIN',
    description: 'Administrator "admin.ti@trunojoyo.ac.id" berhasil login via 2FA WebAuthn',
    severity: 'INFO',
    userComponent: 'AuthService / SSO UTM',
    ipAddress: '10.10.15.42'
  },
  {
    id: 'LOG-8848',
    timestamp: '2026-11-14 19:42:05',
    eventType: 'SERVICE_RESTART',
    description: 'Nginx reverse proxy reloaded configuration cleanly after SSL cert renewal',
    severity: 'INFO',
    userComponent: 'systemd / nginx.service',
    ipAddress: '10.10.1.1'
  },
  {
    id: 'LOG-8847',
    timestamp: '2026-11-14 19:35:18',
    eventType: 'RESOURCE_ALERT',
    description: 'Memory usage crossed 88% threshold on utm-siakad-prod container node',
    severity: 'WARNING',
    userComponent: 'Prometheus Node Exporter',
    ipAddress: '10.10.1.20'
  },
  {
    id: 'LOG-8846',
    timestamp: '2026-11-14 19:20:44',
    eventType: 'CONTAINER_SPAWN',
    description: 'Virtual Lab instance VLAB-RPL-01 spawned container student-210411100045-node',
    severity: 'INFO',
    userComponent: 'Docker Swarm Agent',
    ipAddress: '10.10.5.101'
  },
  {
    id: 'LOG-8845',
    timestamp: '2026-11-14 18:58:30',
    eventType: 'SECURITY_FIREWALL',
    description: 'Fail2ban banned IP 185.220.101.45 (15 failed SSH attempts on port 2222)',
    severity: 'WARNING',
    userComponent: 'Fail2ban / nftables',
    ipAddress: '185.220.101.45'
  },
  {
    id: 'LOG-8844',
    timestamp: '2026-11-14 18:12:09',
    eventType: 'BACKUP_COMPLETED',
    description: 'Automated ZFS snapshot backup for PostgreSQL SIAKAD pool (84.2 GB)',
    severity: 'INFO',
    userComponent: 'ZFS Backup Daemon',
    ipAddress: '10.10.8.50'
  },
  {
    id: 'LOG-8843',
    timestamp: '2026-11-14 17:15:33',
    eventType: 'HARDWARE_LINK',
    description: 'Fiber channel SFP+ optical power low warning on interface TenGigE0/1/2',
    severity: 'ERROR',
    userComponent: 'SNMP Trap Agent',
    ipAddress: '10.10.1.1'
  },
  {
    id: 'LOG-8842',
    timestamp: '2026-11-14 16:45:00',
    eventType: 'DNS_HEALTH',
    description: 'Authoritative DNS zone trunojoyo.ac.id sync verified with secondary NS',
    severity: 'INFO',
    userComponent: 'BIND9 DNS Master',
    ipAddress: '10.10.1.5'
  },
  {
    id: 'LOG-8841',
    timestamp: '2026-11-14 15:30:19',
    eventType: 'KERNEL_WARNING',
    description: 'TCP Out of Memory (OOM) killer invoked on ephemeral worker process #44129',
    severity: 'CRITICAL',
    userComponent: 'Linux Kernel 6.8.0',
    ipAddress: '10.10.2.15'
  },
  {
    id: 'LOG-8840',
    timestamp: '2026-11-14 14:10:02',
    eventType: 'CONFIG_CHANGE',
    description: 'Bandwidth QoS policy updated: Cap streaming video traffic to 25% peak',
    severity: 'INFO',
    userComponent: 'Mikrotik CCR RouterOS',
    ipAddress: '10.10.0.1'
  }
];

export const initialProcesses: SystemProcess[] = [
  { pid: 1421, user: 'postgres', cpuPercent: 18.4, memPercent: 24.2, time: '142:15', command: 'postgres: siakad_prod db_worker [active]' },
  { pid: 892, user: 'nginx', cpuPercent: 6.8, memPercent: 4.1, time: '48:10', command: 'nginx: worker process (SSL termination)' },
  { pid: 3110, user: 'docker', cpuPercent: 12.1, memPercent: 16.5, time: '89:40', command: 'dockerd --config-file=/etc/docker/daemon.json' },
  { pid: 489, user: 'root', cpuPercent: 3.2, memPercent: 2.8, time: '12:04', command: 'prometheus-node-exporter --collector.systemd' },
  { pid: 2190, user: 'redis', cpuPercent: 2.5, memPercent: 5.4, time: '34:22', command: 'redis-server 127.0.0.1:6379 (session cache)' },
  { pid: 4012, user: 'root', cpuPercent: 1.8, memPercent: 1.2, time: '08:44', command: 'sshd: admin.ti@pts/0 [session]' },
  { pid: 1104, user: 'systemd-resolve', cpuPercent: 0.9, memPercent: 0.8, time: '18:19', command: '/lib/systemd/systemd-resolved' },
  { pid: 721, user: 'chrony', cpuPercent: 0.1, memPercent: 0.3, time: '02:11', command: '/usr/sbin/chronyd -F 1' },
];
