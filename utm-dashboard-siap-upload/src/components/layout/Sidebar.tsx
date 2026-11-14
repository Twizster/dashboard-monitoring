import React from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  FlaskConical, 
  Activity, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Server,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useDashboard, type DashboardTab } from '../../context/DashboardContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavItem {
  id: DashboardTab;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'blue' | 'yellow' | 'red';
}

interface NavCategory {
  category: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { activeTab, setActiveTab, complaints, incidents } = useDashboard();

  const pendingComplaints = complaints.filter(c => c.status === 'Menunggu').length;
  const activeIncidents = incidents.filter(i => i.status === 'Active').length;

  const navCategories: NavCategory[] = [
    {
      category: 'OVERVIEW',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: <LayoutDashboard className="w-4 h-4 shrink-0" />,
        },
      ],
    },
    {
      category: 'MANAGEMENT',
      items: [
        {
          id: 'complaints',
          label: 'Pengaduan Fasilitas',
          icon: <AlertTriangle className="w-4 h-4 shrink-0" />,
          badge: pendingComplaints > 0 ? pendingComplaints : undefined,
          badgeVariant: 'yellow',
        },
        {
          id: 'virtuallab',
          label: 'Virtual Lab',
          icon: <FlaskConical className="w-4 h-4 shrink-0" />,
          badge: '6 Lab',
          badgeVariant: 'blue',
        },
      ],
    },
    {
      category: 'SYSTEM',
      items: [
        {
          id: 'monitoring',
          label: 'Monitoring Server',
          icon: <Activity className="w-4 h-4 shrink-0" />,
          badge: activeIncidents > 0 ? `${activeIncidents}` : undefined,
          badgeVariant: 'red',
        },
        {
          id: 'activitylogs',
          label: 'Log Aktivitas',
          icon: <FileText className="w-4 h-4 shrink-0" />,
        },
        {
          id: 'settings',
          label: 'Pengaturan',
          icon: <Settings className="w-4 h-4 shrink-0" />,
        },
      ],
    },
  ];

  const handleSelectTab = (tab: DashboardTab) => {
    setActiveTab(tab);
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-[#090D16] border-r border-[#1E293F] flex flex-col transition-all duration-200 ease-out select-none ${
          collapsed ? 'w-[68px]' : 'w-[245px]'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-14 flex items-center px-4 border-b border-[#1E293F]/80 justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-md bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Server className="w-4 h-4" />
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-semibold text-xs tracking-tight text-slate-100">UTM MONITOR</span>
                  <span className="text-[9px] text-slate-400 font-mono bg-[#162032] px-1 py-0.2 rounded border border-[#1E293F]">
                    NOC
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 truncate mt-1">
                  Universitas Trunojoyo Madura
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menus */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-5">
          {navCategories.map(cat => (
            <div key={cat.category} className="space-y-0.5">
              {!collapsed ? (
                <div className="px-2.5 text-[10px] font-medium tracking-wider text-slate-500 uppercase font-mono mb-1.5">
                  {cat.category}
                </div>
              ) : (
                <div className="w-full border-t border-[#1E293F]/50 my-2" />
              )}

              {cat.items.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/25'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#121826]'
                    } ${collapsed ? 'justify-center' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={isActive ? 'text-blue-400' : 'text-slate-500'}>
                        {item.icon}
                      </span>
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          item.badgeVariant === 'yellow'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                            : item.badgeVariant === 'red'
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/25'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer info & collapse toggle */}
        <div className="p-2.5 border-t border-[#1E293F]/80 space-y-1">
          {!collapsed && (
            <div className="px-2.5 py-2 rounded-lg bg-[#0E1422] border border-[#1E293F]/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Status Jaringan</span>
              </span>
              <span className="text-emerald-400 font-mono text-[10px]">Normal</span>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center py-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#121826] rounded-lg border border-transparent hover:border-[#1E293F] transition-colors cursor-pointer text-xs gap-1.5"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="text-[11px]">Ciutkan Menu</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
