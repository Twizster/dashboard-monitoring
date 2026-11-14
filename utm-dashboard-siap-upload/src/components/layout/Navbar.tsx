import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Bell, 
  ChevronDown, 
  Pause, 
  RefreshCw, 
  LogOut, 
  User, 
  ShieldCheck, 
  Clock,
  Trash2,
  HardDrive
} from 'lucide-react';
import { useDashboard, type DashboardTab } from '../../context/DashboardContext';
import { Badge } from '../common/Badge';

interface NavbarProps {
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu }) => {
  const { 
    activeTab, 
    setActiveTab,
    selectedServer, 
    servers, 
    setSelectedServerId,
    isLiveSimulation,
    setIsLiveSimulation,
    refreshNow,
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    clearNotifications
  } = useDashboard();

  const [showServerMenu, setShowServerMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const serverRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (serverRef.current && !serverRef.current.contains(e.target as Node)) {
        setShowServerMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifMenu(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const tabTitles: Record<DashboardTab, { section: string; title: string }> = {
    dashboard: { section: 'Ringkasan', title: 'Server Overview' },
    complaints: { section: 'Fasilitas', title: 'Pengaduan Sarpras' },
    virtuallab: { section: 'Akademik', title: 'Virtual Laboratory' },
    monitoring: { section: 'Infrastruktur', title: 'Monitoring Server' },
    activitylogs: { section: 'Keamanan', title: 'Log Aktivitas' },
    settings: { section: 'Sistem', title: 'Pengaturan' },
  };

  const currentBreadcrumb = tabTitles[activeTab];

  return (
    <>
      <header className="sticky top-0 z-30 h-14 bg-[#090D16]/95 backdrop-blur-md border-b border-[#1E293F] px-4 sm:px-6 flex items-center justify-between transition-colors">
        {/* Left: Mobile Toggle & Clean Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#141C2E] rounded-md lg:hidden cursor-pointer"
            aria-label="Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 hidden sm:inline font-mono">UTM</span>
            <span className="text-slate-600 hidden sm:inline">/</span>
            <span className="text-slate-400 hidden md:inline">{currentBreadcrumb.section}</span>
            <span className="text-slate-600 hidden md:inline">/</span>
            <span className="text-slate-100 font-medium">{currentBreadcrumb.title}</span>
          </div>
        </div>

        {/* Right: Active Node, Live Status, Notifs, Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Active Server Picker */}
          <div className="relative" ref={serverRef}>
            <button
              onClick={() => setShowServerMenu(!showServerMenu)}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-[#0E1422] hover:bg-[#141C2E] border border-[#1E293F] rounded-lg transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono font-medium text-slate-200 max-w-[120px] sm:max-w-[150px] truncate">
                  {selectedServer.name.split('.')[0]}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {showServerMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-[#0E1422] border border-[#1E293F] rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1.5 border-b border-[#1E293F]/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>PILIH SERVER NODE</span>
                  <span>{servers.length} Node</span>
                </div>
                <div className="py-1 space-y-0.5 max-h-64 overflow-y-auto">
                  {servers.map(srv => {
                    const isCurrent = srv.id === selectedServer.id;
                    return (
                      <button
                        key={srv.id}
                        onClick={() => {
                          setSelectedServerId(srv.id);
                          setShowServerMenu(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-blue-600/15 border border-blue-500/30 text-blue-400'
                            : 'hover:bg-[#141C2E] text-slate-300'
                        }`}
                      >
                        <div className="truncate">
                          <div className="font-mono font-medium truncate">{srv.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{srv.ip} • {srv.environment}</div>
                        </div>
                        <Badge variant={srv.status === 'online' ? 'success' : 'warning'} size="sm">
                          {srv.status}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Live Simulator Status Switch */}
          <div className="flex items-center bg-[#0E1422] border border-[#1E293F] rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setIsLiveSimulation(!isLiveSimulation)}
              title={isLiveSimulation ? 'Jeda simulasi live streaming' : 'Mulai simulasi live streaming'}
              className={`flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[10px] font-semibold transition-colors cursor-pointer ${
                isLiveSimulation
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isLiveSimulation ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>{isLiveSimulation ? 'LIVE' : 'PAUSED'}</span>
            </button>

            <button
              onClick={refreshNow}
              title="Refresh metrik"
              className="p-1 text-slate-400 hover:text-slate-200 hover:bg-[#141C2E] rounded transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-[#141C2E] rounded-lg transition-colors cursor-pointer"
              aria-label="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0E1422] border border-[#1E293F] rounded-xl shadow-xl overflow-hidden z-50">
                <div className="px-3.5 py-2.5 border-b border-[#1E293F] flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Notifikasi</span>
                  <div className="flex items-center gap-2 text-[11px]">
                    {unreadNotifs > 0 && (
                      <button onClick={markAllNotificationsRead} className="text-blue-400 hover:underline cursor-pointer">
                        Tandai dibaca
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button onClick={clearNotifications} className="text-slate-400 hover:text-rose-400 cursor-pointer">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-[#1E293F]/50">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-500">Tidak ada notifikasi</div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-3 text-left transition-colors cursor-pointer text-xs ${
                          !n.read ? 'bg-blue-950/20 hover:bg-blue-950/30' : 'hover:bg-[#141C2E]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between text-slate-300 font-medium">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 pl-1.5 hover:bg-[#141C2E] rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[11px] font-bold text-blue-400">
                BS
              </div>
              <span className="text-xs font-medium text-slate-200 hidden sm:inline">Budi Santoso</span>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0E1422] border border-[#1E293F] rounded-xl shadow-xl p-1.5 z-50 text-xs">
                <div className="px-3 py-2 border-b border-[#1E293F]/80">
                  <p className="font-semibold text-slate-100">Ir. Budi Santoso, M.Kom</p>
                  <p className="text-[10px] text-slate-400 font-mono">UPT TIK UTM</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => { setActiveTab('settings'); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-[#141C2E] rounded-lg transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Profil Admin</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('settings'); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-[#141C2E] rounded-lg transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Keamanan & 2FA</span>
                  </button>
                </div>
                <div className="pt-1 border-t border-[#1E293F]/80">
                  <button
                    onClick={() => { setShowUserMenu(false); setShowLogoutConfirm(true); }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar (Logout)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative bg-[#0E1422] border border-[#1E293F] rounded-xl p-5 max-w-sm w-full shadow-2xl z-10">
            <h3 className="text-sm font-semibold text-slate-100">Konfirmasi Keluar</h3>
            <p className="text-xs text-slate-400 mt-1.5">
              Apakah Anda ingin mengakhiri sesi dashboard monitoring UTM?
            </p>
            <div className="mt-4 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3 py-1.5 text-slate-300 hover:text-white border border-[#1E293F] hover:bg-[#141C2E] rounded-lg cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => { setShowLogoutConfirm(false); }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg cursor-pointer font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
