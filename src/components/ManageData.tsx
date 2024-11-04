import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { useContext, useEffect, useState } from 'react';
import ExportDataModal from './ExportDataModal';
import ImportDataModal from './ImportDataModal';
import SettingsModal from './SettingsModal';
import { SignedIn, SignedOut, SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { FileDown, FileUp, LogIn, LogOut, RefreshCcw, Settings } from 'lucide-react';
import SyncShortcutsModal from './SyncShortcutsModal';
import { DataContext } from '@/context/DataContext';

const ManageData = () => {
	const [dataToExport, setDataToExport] = useState('');
	const [importDataModal, setImportDataModal] = useState(false);
	const [settings, setSettings] = useState(false);
	const [syncShortcutsModal, setSyncShortcutsModal] = useState(false);
	const [outOfSync, setOutOfSync] = useState(false);
	const { shortcuts } = useContext(DataContext);

	const user = useUser();

	useEffect(() => {
		fetch('/download', { cache: 'no-store' })
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				const localEntries = Object.entries(getShortcutsObject(true));
				const blobData = data.data;
				const serverEntries = JSON.parse(blobData);

				const inSync =
					localEntries.every(([key, value]) => serverEntries[key] === value) &&
					localEntries.length === Object.keys(serverEntries).length;

				setOutOfSync(!inSync);
			});
	}, [shortcuts]);

	return (
		<>
			<div className='flex flex-col items-baseline space-x-3 md:flex-row'>
				<button
					className='flex items-center gap-x-1 text-yellow-400 transition-all hover:text-xl'
					onClick={() => setDataToExport(JSON.stringify(getShortcutsObject(true)))}
				>
					<FileUp /> Export
				</button>
				<button
					className='flex items-center gap-x-1 text-white transition-all hover:text-xl'
					onClick={() => setImportDataModal(true)}
				>
					<FileDown /> Import
				</button>
				<button
					className='flex items-center gap-x-1 text-neutral-400 transition-all hover:text-xl'
					onClick={() => setSettings(true)}
				>
					<Settings /> Settings
				</button>
				{outOfSync ? (
					<button
						className='flex animate-pulse items-center gap-x-1 text-red-500 transition-all hover:text-xl'
						onClick={() => setSyncShortcutsModal(true)}
					>
						<RefreshCcw /> out of sync!
					</button>
				) : (
					<button
						className='flex items-center gap-x-1 text-blue-500 transition-all hover:text-xl'
						onClick={() => setSyncShortcutsModal(true)}
					>
						<RefreshCcw /> Sync
					</button>
				)}
				<SignedIn>
					<button className='text-green-500 transition-all hover:text-xl'>
						<SignOutButton>
							<div className='flex items-center gap-x-1'>
								<LogOut /> {user.user?.primaryEmailAddress?.emailAddress}
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
