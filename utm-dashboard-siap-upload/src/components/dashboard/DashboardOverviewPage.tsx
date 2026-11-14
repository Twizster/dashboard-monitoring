import React from 'react';
import { RefreshCw, Clock } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCards } from './StatCards';
import { NetworkTrafficChart } from './NetworkTrafficChart';
import { ServerResourceMonitoring } from './ServerResourceMonitoring';
import { PingMonitoring } from './PingMonitoring';
import { IncidentOverview } from './IncidentOverview';
import { Button } from '../common/Button';

export const DashboardOverviewPage: React.FC = () => {
  const { lastUpdated, refreshNow } = useDashboard();

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E293F]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
              Server Overview
            </h1>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono font-medium">
              Data Center Rektorat
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor infrastruktur server kampus, performa jaringan, dan fasilitas akademik secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-[#0E1422] px-2.5 py-1.5 rounded-lg border border-[#1E293F]">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Update:</span>
            <span className="text-slate-200 font-semibold">{lastUpdated} WIB</span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw className="w-3 h-3" />}
            onClick={refreshNow}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* 4 Grouped Executive Vitals Cards */}
      <StatCards />

      {/* Large Network Traffic Panel */}
      <NetworkTrafficChart />

      {/* Resource Allocation & Ping Monitoring Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ServerResourceMonitoring />
        <PingMonitoring />
      </div>

      {/* Incidents Table Panel */}
      <IncidentOverview />
    </div>
  );
};
