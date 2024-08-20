import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { useState } from 'react';
import ExportDataModal from './ExportDataModal';
import ImportDataModal from './ImportDataModal';
import SettingsModal from './SettingsModal';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

type ManageDataProps = {
	hideEmptyShortcuts: string;
	hideShortcutIcons: string;
	imageQuality: string;
	shortcutTypeColor: string;
	setHideEmptyShortcuts: (hideEmptyShortcuts: string) => void;
	setHideShortcutIcons: (hideShortcutIcons: string) => void;
	setImageQuality: (imageQuality: string) => void;
	setShortcutTypeColor: (shortcutTypeColor: string) => void;
};

const ManageData = ({
	hideEmptyShortcuts,
	hideShortcutIcons,
	imageQuality,
	shortcutTypeColor,
	setHideEmptyShortcuts,
	setHideShortcutIcons,
	setImageQuality,
	setShortcutTypeColor
}: ManageDataProps) => {
	const [dataToExport, setDataToExport] = useState('');
	const [importDataModal, setImportDataModal] = useState(false);
	const [settings, setSettings] = useState(false);
	const [showDataControls, setShowDataControls] = useState(false);

	return (
		<>
			<div className='block space-x-3 text-right'>
				{showDataControls && (
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
						<button className='text-blue-500 hover:underline' onClick={() => setImportDataModal(true)}>
							Sync Settings
						</button>
					</>
				)}
				<button className='text-purple-500 hover:underline' onClick={() => setShowDataControls((prev) => !prev)}>
					Manage Data
				</button>
				<button className='text-neutral-400 hover:underline' onClick={() => setSettings(true)}>
					Settings
				</button>
				<SignedIn>
					<div className='text-red-500 *:hover:underline inline'>
						<SignOutButton>Sign out</SignOutButton>
					</div>
				</SignedIn>
				<SignedOut>
					<Link href={'/sign-in'} className='text-green-500 hover:underline inline'>
						Sign in
					</Link>
				</SignedOut>
			</div>
			{dataToExport && <ExportDataModal data={dataToExport} setData={setDataToExport} />}
			{importDataModal && <ImportDataModal setImportDataModal={setImportDataModal} />}
			{settings && (
				<SettingsModal
					setSettings={setSettings}
					hideEmptyShortcuts={hideEmptyShortcuts}
					hideShortcutIcons={hideShortcutIcons}
					imageQuality={imageQuality}
					setHideEmptyShortcuts={setHideEmptyShortcuts}
					setHideShortcutIcons={setHideShortcutIcons}
					setImageQuality={setImageQuality}
					setShortcutTypeColor={setShortcutTypeColor}
					shortcutTypeColor={shortcutTypeColor}
				/>
			)}
		</>
	);
};

export default ManageData;
