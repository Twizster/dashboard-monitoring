export type ServerStatus = 'online' | 'warning' | 'offline';

export interface ServerInfo {
  id: string;
  name: string;
  ip: string;
  environment: 'Production' | 'Staging' | 'Development';
  location: string;
  status: ServerStatus;
  uptime: string;
  os: string;
  kernel: string;
  cpuModel: string;
  cpuCores: number;
  totalRamGb: number;
}

export type ComplaintStatus = 'Menunggu' | 'Diproses' | 'Selesai' | 'Ditolak';

export type ComplaintCategory = 
  | 'Jaringan & Internet' 
  | 'Komputer & Hardware' 
  | 'AC & Kelistrikan' 
  | 'Proyektor & Audio' 
  | 'Fasilitas Ruang' 
  | 'Lainnya';

export interface FacilityComplaint {
  id: string;
  reporterName: string;
  nim: string;
  category: ComplaintCategory;
  location: string;
  title: string;
  description: string;
  imageUrl?: string;
  date: string;
  status: ComplaintStatus;
  priority: 'Rendah' | 'Sedang' | 'Tinggi' | 'Kritis';
  assignedTo?: string;
  notes?: string;
}

export type LabStatus = 'Available' | 'In Use' | 'Maintenance' | 'Offline';

export interface VirtualLab {
  id: string;
  labCode: string;
  name: string;
  os: string;
  osType: 'ubuntu' | 'windows' | 'centos' | 'debian';
  ipAddress: string;
  status: LabStatus;
  cpuAllocated: string;
  ramAllocated: string;
  activeUsers: number;
  maxUsers: number;
  diskAllocated: string;
  faculty: string;
  lastUpdated: string;
  port: number;
}

export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentStatus = 'Active' | 'Investigating' | 'Resolved';

export interface ServerIncident {
  id: string;
  title: string;
  server: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  timestamp: string;
  duration: string;
  description: string;
  resolvedAt?: string;
}

export type LogSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export interface ActivityLog {
  id: string;
  timestamp: string;
  eventType: string;
  description: string;
  severity: LogSeverity;
  userComponent: string;
  ipAddress?: string;
}

export interface PingData {
  target: string;
  ip: string;
  latency: number;
  packetLoss: number;
  status: 'optimal' | 'warning' | 'critical';
  lastChecked: string;
  history: { time: string; latency: number }[];
}

export interface NetworkTrafficPoint {
  time: string;
  download: number; // in Mbps
  upload: number; // in Mbps
}

export interface ResourceMetricPoint {
  time: string;
  cpu: number;
  ram: number;
  disk: number;
}

export interface SystemProcess {
  pid: number;
  user: string;
  cpuPercent: number;
  memPercent: number;
  time: string;
  command: string;
}
