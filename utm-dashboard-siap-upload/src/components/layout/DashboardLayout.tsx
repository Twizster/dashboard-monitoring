import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { DashboardOverviewPage } from '../dashboard/DashboardOverviewPage';
import { ComplaintsPage } from '../complaints/ComplaintsPage';
import { VirtualLabPage } from '../virtuallab/VirtualLabPage';
import { ServerMonitoringPage } from '../monitoring/ServerMonitoringPage';
import { ActivityLogsPage } from '../activitylogs/ActivityLogsPage';
import { SettingsPage } from '../settings/SettingsPage';

export const DashboardLayout: React.FC = () => {
  const { activeTab } = useDashboard();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverviewPage />;
      case 'complaints':
        return <ComplaintsPage />;
      case 'virtuallab':
        return <VirtualLabPage />;
      case 'monitoring':
        return <ServerMonitoringPage />;
      case 'activitylogs':
        return <ActivityLogsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardOverviewPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F8FAFC] flex font-sans">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ease-out ${
          sidebarCollapsed ? 'lg:pl-[68px]' : 'lg:pl-[245px]'
        }`}
      >
        <Navbar onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />

        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 max-w-[1550px] w-full mx-auto">
          {renderActiveContent()}
        </main>

        <footer className="px-5 py-3 border-t border-[#1E293F]/60 text-center text-[11px] text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © 2026 Universitas Trunojoyo Madura • UPT TIK Network Operations Center
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Sistem Operasional Normal
            </span>
            <span>v2.4.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
