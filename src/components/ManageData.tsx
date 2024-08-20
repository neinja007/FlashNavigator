import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { useState } from 'react';
import ExportDataModal from './ExportDataModal';
import ImportDataModal from './ImportDataModal';
import SettingsModal from './SettingsModal';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import SyncSettingsModal from './SyncSettingsModal';
import { useStorageState } from '@/hooks/useStorageState';

const ManageData = () => {
  const [dataToExport, setDataToExport] = useState('');
  const [importDataModal, setImportDataModal] = useState(false);
  const [settings, setSettings] = useState(false);
  const [showDataControls, setShowDataControls] = useStorageState('manage-data', 'false');

      {settings && <SettingsModal setSettingsModal={setSettings} />}
};

export default ManageData;
