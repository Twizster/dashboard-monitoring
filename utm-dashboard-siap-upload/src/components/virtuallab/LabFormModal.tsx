import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { type VirtualLab, type LabStatus } from '../../types';
import { Modal } from '../common/Modal';
import { Input, Select } from '../common/FormControls';
import { Button } from '../common/Button';

interface LabFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editLab?: VirtualLab | null;
}

export const LabFormModal: React.FC<LabFormModalProps> = ({ isOpen, onClose, editLab }) => {
  const { addVirtualLab, updateVirtualLab } = useDashboard();

  const [name, setName] = useState('');
  const [labCode, setLabCode] = useState('');
  const [os, setOs] = useState('');
  const [osType, setOsType] = useState<'ubuntu' | 'windows' | 'centos' | 'debian'>('ubuntu');
  const [ipAddress, setIpAddress] = useState('');
  const [status, setStatus] = useState<LabStatus>('Available');
  const [cpuAllocated, setCpuAllocated] = useState('16 vCPU');
  const [ramAllocated, setRamAllocated] = useState('32 GB RAM');
  const [diskAllocated, setDiskAllocated] = useState('500 GB NVMe');
  const [maxUsers, setMaxUsers] = useState(40);
  const [faculty, setFaculty] = useState('Fakultas Teknik - Teknik Informatika');
  const [port, setPort] = useState(8443);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editLab) {
      setName(editLab.name);
      setLabCode(editLab.labCode);
      setOs(editLab.os);
      setOsType(editLab.osType);
      setIpAddress(editLab.ipAddress);
      setStatus(editLab.status);
      setCpuAllocated(editLab.cpuAllocated);
      setRamAllocated(editLab.ramAllocated);
      setDiskAllocated(editLab.diskAllocated);
      setMaxUsers(editLab.maxUsers);
      setFaculty(editLab.faculty);
      setPort(editLab.port);
    } else {
      setName('');
      setLabCode(`VLAB-${Math.floor(100 + Math.random() * 900)}`);
      setOs('Ubuntu 24.04 LTS (Docker, Node 22, VSCode)');
      setOsType('ubuntu');
      setIpAddress('10.10.5.120');
      setStatus('Available');
      setCpuAllocated('16 vCPU');
      setRamAllocated('32 GB RAM');
      setDiskAllocated('500 GB NVMe');
      setMaxUsers(40);
      setFaculty('Fakultas Teknik - Teknik Informatika');
      setPort(8443);
    }
    setErrors({});
  }, [editLab, isOpen]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Nama laboratorium harus diisi';
    if (!labCode.trim()) errs.labCode = 'Kode Lab harus diisi';
    if (!ipAddress.trim()) errs.ipAddress = 'IP Address harus diisi';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editLab) {
      updateVirtualLab(editLab.id, {
        name,
        labCode,
        os,
        osType,
        ipAddress,
        status,
        cpuAllocated,
        ramAllocated,
        diskAllocated,
        maxUsers: Number(maxUsers),
        faculty,
        port: Number(port),
      });
    } else {
      addVirtualLab({
        name,
        labCode,
        os,
        osType,
        ipAddress,
        status,
        cpuAllocated,
        ramAllocated,
        diskAllocated,
        activeUsers: 0,
        maxUsers: Number(maxUsers),
        faculty,
        port: Number(port),
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editLab ? `Edit Konfigurasi ${editLab.labCode}` : 'Tambah Virtual Laboratory'}
      description="Konfigurasi mesin virtual praktikum dan hak akses program studi UTM."
      maxWidth="lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Batal
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} type="button">
            {editLab ? 'Simpan Perubahan' : 'Deploy Virtual Lab'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Kode Laboratorium *"
            placeholder="Contoh: VLAB-RPL-01"
            value={labCode}
            onChange={e => setLabCode(e.target.value)}
            error={errors.labCode}
          />
          <Input
            label="Nama Laboratorium *"
            placeholder="Contoh: Virtual Lab Pemrograman Web"
            value={name}
            onChange={e => setName(e.target.value)}
            error={errors.name}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Tipe Sistem Operasi"
            options={[
              { label: 'Ubuntu Linux (Default Server)', value: 'ubuntu' },
              { label: 'Debian GNU/Linux', value: 'debian' },
              { label: 'Windows Server 2022', value: 'windows' },
              { label: 'CentOS Stream 9 / RHEL', value: 'centos' },
            ]}
            value={osType}
            onChange={e => setOsType(e.target.value as any)}
          />
          <Input
            label="Distro & Software Stack"
            placeholder="Ubuntu 24.04 LTS (Node, Docker)"
            value={os}
            onChange={e => setOs(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="IP Address Static *"
            placeholder="10.10.5.120"
            value={ipAddress}
            onChange={e => setIpAddress(e.target.value)}
            error={errors.ipAddress}
          />
          <Input
            label="Port Akses (Web / RDP / SSH)"
            type="number"
            value={port}
            onChange={e => setPort(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <Input
            label="Alokasi CPU"
            value={cpuAllocated}
            onChange={e => setCpuAllocated(e.target.value)}
          />
          <Input
            label="Alokasi RAM"
            value={ramAllocated}
            onChange={e => setRamAllocated(e.target.value)}
          />
          <Input
            label="Kapasitas Mahasiswa"
            type="number"
            value={maxUsers}
            onChange={e => setMaxUsers(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Program Studi / Fakultas"
            value={faculty}
            onChange={e => setFaculty(e.target.value)}
          />
          <Select
            label="Status Operasional"
            options={[
              { label: 'Available (Siap Digunakan)', value: 'Available' },
              { label: 'In Use (Sedang Praktikum)', value: 'In Use' },
              { label: 'Maintenance (Perawatan)', value: 'Maintenance' },
              { label: 'Offline (Dimatikan)', value: 'Offline' },
            ]}
            value={status}
            onChange={e => setStatus(e.target.value as LabStatus)}
          />
        </div>
      </form>
    </Modal>
  );
};
