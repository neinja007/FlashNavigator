import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { useState } from 'react';
import ExportDataModal from './ExportDataModal';
import ImportDataModal from './ImportDataModal';
import SettingsModal from './SettingsModal';
import { SignedIn, SignedOut, SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { FileDown, FileUp, LogIn, LogOut, Menu, RefreshCcw, Settings } from 'lucide-react';
import SyncShortcutsModal from './SyncShortcutsModal';

const ManageData = () => {
	const [dataToExport, setDataToExport] = useState('');
	const [importDataModal, setImportDataModal] = useState(false);
	const [settings, setSettings] = useState(false);
	const [showDataControls, setShowDataControls] = useState(false);
	const [syncShortcutsModal, setSyncShortcutsModal] = useState(false);

	const user = useUser();

	return (
		<>
			<div className='flex flex-col items-baseline space-x-3 md:flex-row'>
				{showDataControls && (
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
							onClick={() => setSyncShortcutsModal(true)}
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
					onClick={() => setShowDataControls(!showDataControls)}
				>
					<Menu /> {showDataControls ? 'Collapse' : 'Expand'} Menu
				</button>
				<SignedIn>
					<button className='text-red-500 transition-all hover:text-xl'>
						<SignOutButton>
							<div className='flex items-center gap-x-1'>
								<LogOut /> Sign out (as {user.user?.primaryEmailAddress?.emailAddress})
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
			{syncShortcutsModal && <SyncShortcutsModal setSyncShortcutsModal={setSyncShortcutsModal} />}
			{dataToExport && <ExportDataModal data={dataToExport} setData={setDataToExport} />}
			{importDataModal && <ImportDataModal setImportDataModal={setImportDataModal} />}
			{settings && <SettingsModal setSettingsModal={setSettings} />}
		</>
	);
};

export default ManageData;
