import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { useState } from 'react';
import ExportDataModal from './ExportDataModal';
import ImportDataModal from './ImportDataModal';
import SettingsModal from './SettingsModal';

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

	return (
		<>
			<div className='space-x-3'>
				<button className='text-neutral-400 hover:underline' onClick={() => setSettings(true)}>
					Settings
				</button>
				<button
					className='text-yellow-400 hover:underline'
					onClick={() => setDataToExport(JSON.stringify(getShortcutsObject(true)))}
				>
					Export Shortcuts
				</button>
				<button className='text-white hover:underline' onClick={() => setImportDataModal(true)}>
					Import Shortcuts
				</button>
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
