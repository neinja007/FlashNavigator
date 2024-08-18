import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { Dispatch, SetStateAction } from 'react';

type ManageDataProps = {
	setData: Dispatch<SetStateAction<string>>;
	setImportDataModal: Dispatch<SetStateAction<boolean>>;
};

const ManageData = ({ setData, setImportDataModal }: ManageDataProps) => {
	return (
		<div className='space-x-3'>
				<button className='text-neutral-400 hover:underline' onClick={() => setSettings(true)}>
					Settings
				</button>
			<button
				className='text-yellow-400 hover:underline'
				onClick={() => setData(JSON.stringify(getShortcutsObject(true)))}
			>
				Export Data
			</button>
			<button className='text-white hover:underline' onClick={() => setImportDataModal(true)}>
				Import Data
			</button>
		</div>
	);
};

export default ManageData;
