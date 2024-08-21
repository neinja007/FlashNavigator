import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { useState } from 'react';
import ExportDataModal from './ExportDataModal';
import ImportDataModal from './ImportDataModal';
import SettingsModal from './SettingsModal';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import SyncSettingsModal from './SyncSettingsModal';
import { useStorageState } from '@/hooks/useStorageState';
import { FileDown, FileUp, LogIn, LogOut, Menu, RefreshCcw, Settings } from 'lucide-react';

const ManageData = () => {
	const [dataToExport, setDataToExport] = useState('');
	const [importDataModal, setImportDataModal] = useState(false);
	const [settings, setSettings] = useState(false);
	const [showDataControls, setShowDataControls] = useStorageState('manage-data', 'false');
	const [syncSettingsModal, setSyncSettingsModal] = useState(false);

	return (
		<>
			<div className='flex items-baseline space-x-3 sm:text-right'>
				{showDataControls === 'true' && (
					<>
						<button
							className='flex items-center gap-x-1 text-yellow-400 transition-all hover:text-xl'
							onClick={() => setDataToExport(JSON.stringify(getShortcutsObject(true)))}
						>
							<FileUp /> Export Shortcuts
						</button>
						<button
							className='flex items-center gap-x-1 text-white transition-all hover:text-xl'
							onClick={() => setImportDataModal(true)}
						>
							<FileDown /> Import Shortcuts
						</button>
						<button
							className='flex items-center gap-x-1 text-blue-500 transition-all hover:text-xl'
							onClick={() => setSyncSettingsModal(true)}
						>
							<RefreshCcw /> Sync Shortcuts
						</button>
						<button
							className='flex items-center gap-x-1 text-neutral-400 transition-all hover:text-xl'
							onClick={() => setSettings(true)}
						>
							<Settings /> Settings
						</button>
					</>
				)}
				<button
					className='flex items-center gap-x-1 text-purple-500 transition-all hover:text-xl'
					onClick={() => setShowDataControls(showDataControls === 'false' ? 'true' : 'false')}
				>
					<Menu /> {showDataControls === 'true' ? 'Collapse' : 'Expand'} Menu
				</button>
				<SignedIn>
					<button className='text-red-500 transition-all hover:text-xl'>
						<SignOutButton>
							<div className='flex items-center gap-x-1'>
								<LogOut /> Sign out
							</div>
						</SignOutButton>
					</button>
				</SignedIn>
				<SignedOut>
					<Link href={'/sign-in'} className='flex items-center gap-x-1 text-green-500 transition-all hover:text-xl'>
						<LogIn /> Sign in
					</Link>
				</SignedOut>
			</div>
			{syncSettingsModal && <SyncSettingsModal setSyncSettingsModal={setSyncSettingsModal} />}
			{dataToExport && <ExportDataModal data={dataToExport} setData={setDataToExport} />}
			{importDataModal && <ImportDataModal setImportDataModal={setImportDataModal} />}
			{settings && <SettingsModal setSettingsModal={setSettings} />}
		</>
	);
};

export default ManageData;
