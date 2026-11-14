import React from 'react';
import { Cpu, MemoryStick, Thermometer } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Card } from '../common/Card';
import { ResourceGauge } from '../common/ResourceGauge';

export const ServerResourceMonitoring: React.FC = () => {
  const { 
    cpuUsage, 
    ramUsage, 
    ramTotalGb, 
    ramUsedGb, 
    ramAvailableGb,
    selectedServer 
  } = useDashboard();

  return (
    <Card
      title="Alokasi Resource Komputasi"
      subtitle={`Penggunaan prosesor & memori pada ${selectedServer.name}`}
      icon={<Cpu className="w-4 h-4 text-slate-400" />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* CPU Box */}
        <div className="p-4 bg-[#111726]/60 border border-[#1E293F] rounded-xl flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between pb-2.5 border-b border-[#1E293F]/60">
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-400" /> Beban CPU
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {selectedServer.cpuCores} Core
            </span>
          </div>

          <div className="my-3">
            <ResourceGauge
              percentage={cpuUsage}
              label="CPU Total"
              sublabel={`${selectedServer.cpuModel.split(' ')[0]} ${selectedServer.cpuModel.split(' ')[1]}`}
              size={160}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-2 pt-2.5 border-t border-[#1E293F]/60 text-[11px] font-mono">
            <div className="bg-[#0E1422] p-2 rounded-lg border border-[#1E293F]/50 text-center">
              <span className="text-slate-500 text-[10px] block">Load 5m</span>
              <span className="text-slate-200 font-semibold">1.38</span>
            </div>
            <div className="bg-[#0E1422] p-2 rounded-lg border border-[#1E293F]/50 text-center">
              <span className="text-slate-500 text-[10px] block">Suhu Thermal</span>
              <span className="text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <Thermometer className="w-3 h-3" /> 48.5°C
              </span>
            </div>
          </div>
        </div>

        {/* RAM Box */}
        <div className="p-4 bg-[#111726]/60 border border-[#1E293F] rounded-xl flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between pb-2.5 border-b border-[#1E293F]/60">
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <MemoryStick className="w-3.5 h-3.5 text-cyan-400" /> Alokasi RAM
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              DDR5 ECC
            </span>
          </div>

          <div className="my-3">
            <ResourceGauge
              percentage={ramUsage}
              label="Memory Used"
              sublabel={`${ramUsedGb} GB / ${ramTotalGb} GB`}
              color="#06B6D4"
              size={160}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-2 pt-2.5 border-t border-[#1E293F]/60 text-[11px] font-mono">
            <div className="bg-[#0E1422] p-2 rounded-lg border border-[#1E293F]/50 text-center">
              <span className="text-slate-500 text-[10px] block">Tersedia</span>
              <span className="text-emerald-400 font-semibold">{ramAvailableGb} GB</span>
            </div>
            <div className="bg-[#0E1422] p-2 rounded-lg border border-[#1E293F]/50 text-center">
              <span className="text-slate-500 text-[10px] block">Buffer / Cache</span>
              <span className="text-cyan-400 font-semibold">24.6 GB</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
