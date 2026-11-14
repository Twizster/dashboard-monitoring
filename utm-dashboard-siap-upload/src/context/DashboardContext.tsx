import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  ServerInfo, 
  FacilityComplaint, 
  VirtualLab, 
  ServerIncident, 
  ActivityLog, 
  PingData,
  NetworkTrafficPoint,
  ComplaintStatus,
  LabStatus
} from '../types';
import { 
  initialServers, 
  initialGooglePing, 
  initialCloudflarePing, 
  initialTrafficData, 
  initialComplaints, 
  initialVirtualLabs, 
  initialIncidents, 
  initialActivityLogs 
} from '../data/mockData';

export type DashboardTab = 
  | 'dashboard' 
  | 'complaints' 
  | 'virtuallab' 
  | 'monitoring' 
  | 'activitylogs' 
  | 'settings';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
}

interface DashboardContextType {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  
  // Servers
  servers: ServerInfo[];
  selectedServer: ServerInfo;
  setSelectedServerId: (id: string) => void;
  
  // Live Metrics
  cpuUsage: number;
  ramUsage: number;
  ramTotalGb: number;
  ramUsedGb: number;
  ramAvailableGb: number;
  downloadSpeed: number;
  uploadSpeed: number;
  trafficHistory: NetworkTrafficPoint[];
  googlePing: PingData;
  cloudflarePing: PingData;
  
  // Incidents
  incidents: ServerIncident[];
  resolveIncident: (id: string) => void;
  
  // Complaints
  complaints: FacilityComplaint[];
  addComplaint: (complaint: Omit<FacilityComplaint, 'id' | 'date'>) => void;
  updateComplaintStatus: (id: string, status: ComplaintStatus, notes?: string) => void;
  deleteComplaint: (id: string) => void;
  
  // Virtual Labs
  virtualLabs: VirtualLab[];
  addVirtualLab: (lab: Omit<VirtualLab, 'id' | 'lastUpdated'>) => void;
  updateVirtualLab: (id: string, updated: Partial<VirtualLab>) => void;
  deleteVirtualLab: (id: string) => void;
  changeLabStatus: (id: string, newStatus: LabStatus) => void;
  
  // Activity Logs
  activityLogs: ActivityLog[];
  addActivityLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  
  // Simulation Controls
  isLiveSimulation: boolean;
  setIsLiveSimulation: React.Dispatch<React.SetStateAction<boolean>>;
  lastUpdated: string;
  refreshNow: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [servers, setServers] = useState<ServerInfo[]>(initialServers);
  const [selectedServerId, setSelectedServerId] = useState<string>('srv-01');
  
  // Live metric values
  const [cpuUsage, setCpuUsage] = useState<number>(44.6);
  const [ramUsage, setRamUsage] = useState<number>(67.2);
  const [downloadSpeed, setDownloadSpeed] = useState<number>(842.5);
  const [uploadSpeed, setUploadSpeed] = useState<number>(468.2);
  const [trafficHistory, setTrafficHistory] = useState<NetworkTrafficPoint[]>(initialTrafficData);
  const [googlePing, setGooglePing] = useState<PingData>(initialGooglePing);
  const [cloudflarePing, setCloudflarePing] = useState<PingData>(initialCloudflarePing);
  
  // Records
  const [complaints, setComplaints] = useState<FacilityComplaint[]>(initialComplaints);
  const [virtualLabs, setVirtualLabs] = useState<VirtualLab[]>(initialVirtualLabs);
  const [incidents, setIncidents] = useState<ServerIncident[]>(initialIncidents);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);
  
  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Memory Alert Tinggi',
      message: 'Penggunaan RAM database SIAKAD melampaui 88%',
      time: '10 menit yang lalu',
      type: 'warning',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Pengaduan Baru Diterima',
      message: 'Pengaduan WiFi Lab RPL Lantai 2 telah dibuat oleh mahasiswa',
      time: '35 menit yang lalu',
      type: 'info',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Backup Database Sukses',
      message: 'ZFS snapshot 84.2 GB selesai dicadangkan ke NAS Offsite',
      time: '1 jam yang lalu',
      type: 'success',
      read: true
    }
  ]);

  const [isLiveSimulation, setIsLiveSimulation] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString('id-ID'));

  const selectedServer = useMemo(() => {
    return servers.find(s => s.id === selectedServerId) || servers[0];
  }, [servers, selectedServerId]);

  const ramTotalGb = selectedServer.totalRamGb || 256;
  const ramUsedGb = Number(((ramUsage / 100) * ramTotalGb).toFixed(1));
  const ramAvailableGb = Number((ramTotalGb - ramUsedGb).toFixed(1));

  // Live simulation ticker
  useEffect(() => {
    if (!isLiveSimulation) return;

    const interval = setInterval(() => {
      // Fluctuate CPU slightly
      setCpuUsage(prev => {
        const delta = (Math.random() - 0.48) * 4;
        const next = Math.min(Math.max(prev + delta, 22), 89);
        return Number(next.toFixed(1));
      });

      // Fluctuate RAM slightly
      setRamUsage(prev => {
        const delta = (Math.random() - 0.49) * 1.5;
        const next = Math.min(Math.max(prev + delta, 55), 84);
        return Number(next.toFixed(1));
      });

      // Fluctuate Network
      const newDl = Number((750 + Math.random() * 200).toFixed(1));
      const newUl = Number((380 + Math.random() * 150).toFixed(1));
      setDownloadSpeed(newDl);
      setUploadSpeed(newUl);

      // Fluctuate Ping
      setGooglePing(prev => {
        const nextLatency = Number((12.5 + Math.random() * 4.5).toFixed(1));
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const newHistory = [...prev.history.slice(1), { time: timeStr, latency: nextLatency }];
        return {
          ...prev,
          latency: nextLatency,
          lastChecked: 'Baru saja',
          history: newHistory
        };
      });

      setCloudflarePing(prev => {
        const nextLatency = Number((10.2 + Math.random() * 3.8).toFixed(1));
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const newHistory = [...prev.history.slice(1), { time: timeStr, latency: nextLatency }];
        return {
          ...prev,
          latency: nextLatency,
          lastChecked: 'Baru saja',
          history: newHistory
        };
      });

      setLastUpdated(new Date().toLocaleTimeString('id-ID'));
    }, 3500);

    return () => clearInterval(interval);
  }, [isLiveSimulation]);

  const refreshNow = () => {
    setCpuUsage(Number((35 + Math.random() * 25).toFixed(1)));
    setRamUsage(Number((60 + Math.random() * 15).toFixed(1)));
    setDownloadSpeed(Number((800 + Math.random() * 150).toFixed(1)));
    setUploadSpeed(Number((420 + Math.random() * 100).toFixed(1)));
    setLastUpdated(new Date().toLocaleTimeString('id-ID'));
  };

  // Complaint Actions
  const addComplaint = (complaintData: Omit<FacilityComplaint, 'id' | 'date'>) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newId = `PGD-${now.getFullYear()}-${String(complaints.length + 82).padStart(3, '0')}`;
    
    const newComplaint: FacilityComplaint = {
      ...complaintData,
      id: newId,
      date: dateStr,
      status: 'Menunggu'
    };

    setComplaints(prev => [newComplaint, ...prev]);

    // Add activity log
    addActivityLog({
      eventType: 'COMPLAINT_CREATED',
      description: `Pengaduan baru diajukan: "${complaintData.title}" oleh ${complaintData.reporterName} (${complaintData.nim})`,
      severity: 'INFO',
      userComponent: 'FacilityPortal / Student',
      ipAddress: '10.10.14.88'
    });

    // Add notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Pengaduan Baru Masuk',
        message: `${complaintData.title} di ${complaintData.location}`,
        time: 'Baru saja',
        type: 'info',
        read: false
      },
      ...prev
    ]);
  };

  const updateComplaintStatus = (id: string, status: ComplaintStatus, notes?: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status,
          notes: notes !== undefined ? notes : c.notes
        };
      }
      return c;
    }));

    addActivityLog({
      eventType: 'COMPLAINT_UPDATED',
      description: `Status pengaduan [${id}] diubah menjadi "${status}"`,
      severity: status === 'Ditolak' ? 'WARNING' : 'INFO',
      userComponent: 'Sarpras / Staff Admin',
      ipAddress: '10.10.15.42'
    });
  };

  const deleteComplaint = (id: string) => {
    setComplaints(prev => prev.filter(c => c.id !== id));
    addActivityLog({
      eventType: 'COMPLAINT_DELETED',
      description: `Pengaduan [${id}] telah dihapus dari sistem`,
      severity: 'WARNING',
      userComponent: 'Sarpras / Staff Admin'
    });
  };

  // Virtual Lab Actions
  const addVirtualLab = (labData: Omit<VirtualLab, 'id' | 'lastUpdated'>) => {
    const newId = `vlab-${String(virtualLabs.length + 1).padStart(2, '0')}`;
    const newLab: VirtualLab = {
      ...labData,
      id: newId,
      lastUpdated: 'Baru saja'
    };
    setVirtualLabs(prev => [...prev, newLab]);

    addActivityLog({
      eventType: 'VLAB_PROVISIONED',
      description: `Virtual Lab baru dikonfigurasi: [${newLab.labCode}] ${newLab.name}`,
      severity: 'INFO',
      userComponent: 'Hypervisor Manager',
      ipAddress: newLab.ipAddress
    });
  };

  const updateVirtualLab = (id: string, updated: Partial<VirtualLab>) => {
    setVirtualLabs(prev => prev.map(lab => {
      if (lab.id === id) {
        return {
          ...lab,
          ...updated,
          lastUpdated: 'Baru saja'
        };
      }
      return lab;
    }));
  };

  const deleteVirtualLab = (id: string) => {
    const target = virtualLabs.find(l => l.id === id);
    setVirtualLabs(prev => prev.filter(l => l.id !== id));
    if (target) {
      addActivityLog({
        eventType: 'VLAB_DECOMMISSIONED',
        description: `Laboratorium Virtual [${target.labCode}] di-decommission dari cluster`,
        severity: 'WARNING',
        userComponent: 'Hypervisor Manager'
      });
    }
  };

  const changeLabStatus = (id: string, newStatus: LabStatus) => {
    setVirtualLabs(prev => prev.map(lab => {
      if (lab.id === id) {
        return {
          ...lab,
          status: newStatus,
          activeUsers: newStatus === 'Offline' || newStatus === 'Maintenance' ? 0 : lab.activeUsers,
          lastUpdated: 'Baru saja'
        };
      }
      return lab;
    }));

    addActivityLog({
      eventType: 'VLAB_STATUS_CHANGE',
      description: `Status Virtual Lab [${id}] diubah ke "${newStatus}"`,
      severity: newStatus === 'Offline' ? 'WARNING' : 'INFO',
      userComponent: 'Hypervisor Manager'
    });
  };

  // Incident Actions
  const resolveIncident = (id: string) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          status: 'Resolved',
          resolvedAt: timeStr
        };
      }
      return inc;
    }));

    addActivityLog({
      eventType: 'INCIDENT_RESOLVED',
      description: `Insiden server [${id}] telah ditandai terselesaikan oleh operator NOC`,
      severity: 'INFO',
      userComponent: 'IncidentResponse / NOC'
    });
  };

  // Activity Logs
  const addActivityLog = (logData: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const newLog: ActivityLog = {
      ...logData,
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: timeStr
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Notification management
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <DashboardContext.Provider value={{
      activeTab,
      setActiveTab,
      servers,
      selectedServer,
      setSelectedServerId,
      cpuUsage,
      ramUsage,
      ramTotalGb,
      ramUsedGb,
      ramAvailableGb,
      downloadSpeed,
      uploadSpeed,
      trafficHistory,
      googlePing,
      cloudflarePing,
      incidents,
      resolveIncident,
      complaints,
      addComplaint,
      updateComplaintStatus,
      deleteComplaint,
      virtualLabs,
      addVirtualLab,
      updateVirtualLab,
      deleteVirtualLab,
      changeLabStatus,
      activityLogs,
      addActivityLog,
      notifications,
      markNotificationAsRead,
      markAllNotificationsRead,
      clearNotifications,
      isLiveSimulation,
      setIsLiveSimulation,
      lastUpdated,
      refreshNow
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
