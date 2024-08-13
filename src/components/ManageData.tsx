import { getShortcutsObject } from '@/app/utils/getShortcutsObject';
import { refreshStorage } from '@/app/utils/refreshStorage';
import { Dispatch, SetStateAction } from 'react';

type ManageDataProps = {
	setLocalStorageSize: Dispatch<SetStateAction<number>>;
	setData: Dispatch<SetStateAction<string>>;
	localStorageSize: number;
	setImportDataModal: Dispatch<SetStateAction<boolean>>;
};

const ManageData = ({ setData, setLocalStorageSize, localStorageSize, setImportDataModal }: ManageDataProps) => {
	return (
		<div className='space-x-3'>
			<button className='text-yellow-400 hover:underline' onClick={() => setData(JSON.stringify(getShortcutsObject()))}>
				Export Data
			</button>
			<button className='text-white hover:underline' onClick={() => setImportDataModal(true)}>
				Import Data
			</button>
			<button
				className='text-red-500 hover:underline'
				onClick={() => {
					refreshStorage();
					setLocalStorageSize(localStorage.length);
				}}
			>
				Refresh Storage (Size: {localStorageSize || 0})
			</button>
		</div>
	);
};

export default ManageData;
