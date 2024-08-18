import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { useState } from 'react';
import ExportDataModal from './ExportDataModal';
import ImportDataModal from './ImportDataModal';
import SettingsModal from './SettingsModal';

const ManageData = () => {
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
					Export Data
				</button>
				<button className='text-white hover:underline' onClick={() => setImportDataModal(true)}>
					Import Data
				</button>
			</div>
			{dataToExport && <ExportDataModal data={dataToExport} setData={setDataToExport} />}
			{importDataModal && <ImportDataModal setImportDataModal={setImportDataModal} />}
			{settings && <SettingsModal setSettings={setSettings} />}
		</>
	);
};

export default ManageData;
