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
	const [syncSettingsModal, setSyncSettingsModal] = useState(false);

	return (
		<>
			<div className='block space-x-3 sm:text-right'>
				{showDataControls === 'true' && (
					<>
						<button
							className='text-yellow-400 hover:underline'
							onClick={() => setDataToExport(JSON.stringify(getShortcutsObject(true)))}
						>
							Export Shortcuts
						</button>
						<button className='text-white hover:underline' onClick={() => setImportDataModal(true)}>
							Import Shortcuts
						</button>
						<button className='text-blue-500 hover:underline' onClick={() => setSyncSettingsModal(true)}>
							Sync Shortcuts
						</button>
						<button className='text-neutral-400 hover:underline' onClick={() => setSettings(true)}>
							Settings
						</button>
					</>
				)}
				<button
					className='text-purple-500 hover:underline'
					onClick={() => setShowDataControls(showDataControls === 'false' ? 'true' : 'false')}
				>
					{showDataControls === 'true' ? 'Collapse' : 'Expand'} Menu
				</button>
				<SignedIn>
					<div className='inline text-red-500 *:hover:underline'>
						<SignOutButton>Sign out</SignOutButton>
					</div>
				</SignedIn>
				<SignedOut>
					<Link href={'/sign-in'} className='inline text-green-500 hover:underline'>
						Sign in
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
