import { refreshStorage } from '@/utils/refreshStorage';
import ModalBackgroundFrame from './ModalBackgroundFrame';
import { deleteShortcutStorage } from '@/utils/deleteShortcutStorage';
import { useState } from 'react';
import { getNestedShortcuts } from '@/utils/getNestedShortcuts';

type ImportDataModalProps = {
	setImportDataModal: (importDataModal: boolean) => void;
};

const ImportDataModal = ({ setImportDataModal }: ImportDataModalProps) => {
	const [dataToImport, setDataToImport] = useState('');

	let shortcutCount;

	try {
		shortcutCount = Object.keys(JSON.parse(dataToImport)).reduce((acc: string[], cur: string) => {
			const shortcut = cur.slice(0, cur.lastIndexOf('-'));
			return shortcut && acc.find((item) => item === shortcut) ? acc : [...acc, shortcut];
		}, []).length;
	} catch {
		shortcutCount = 0;
	}

	const currentShortcutCount = Object.keys(getNestedShortcuts()).length;

	return (
		<>
			<ModalBackgroundFrame action={() => setImportDataModal(false)} />
			<div className='fixed z-50 bg-gray-700 shadow-lg rounded-xl inset-0 mx-auto my-auto w-[700px] h-fit'>
				<textarea
					value={dataToImport}
					onChange={(e) => setDataToImport(e.target.value)}
					className='rounded-t-lg w-full h-96 bg-gray-800 p-2'
					style={{ wordBreak: 'break-all' }}
				/>
				<div className='flex -mt-1'>
					<button
						className='px-2 bg-blue-500 active:bg-blue-600 rounded-bl-lg w-1/2 py-1'
						onClick={() => {
							try {
								const data = JSON.parse(dataToImport);
								deleteShortcutStorage();
								Object.keys(data).forEach((key) => {
									localStorage.setItem(key.startsWith('shortcut-') ? key : 'shortcut-' + key, data[key]);
								});
								refreshStorage();
								window.location.reload();
							} catch {
								alert('Invalid JSON data');
							}
						}}
					>
						Import {shortcutCount} shortcuts (current: {currentShortcutCount})
					</button>
					<button
						className='px-2 bg-red-500 active:bg-red-600 rounded-br-lg w-1/2 py-1'
						onClick={() => setImportDataModal(false)}
					>
						Cancel
					</button>
				</div>
			</div>
		</>
	);
};

export default ImportDataModal;
