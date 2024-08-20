import { useState } from 'react';
import { getNestedShortcuts } from '@/utils/getNestedShortcuts';
import Modal from './Modal';
import { getShortcutCount } from '@/utils/getShortcutCount';
import { writeToLocalStorage } from '@/utils/writeToLocalStorage';

type ImportDataModalProps = {
	setImportDataModal: (importDataModal: boolean) => void;
};

const ImportDataModal = ({ setImportDataModal }: ImportDataModalProps) => {
	const [dataToImport, setDataToImport] = useState('');

	const shortcutCount = getShortcutCount(dataToImport);

	const currentShortcutCount = Object.keys(getNestedShortcuts()).length;

	return (
		<Modal action={() => setImportDataModal(false)}>
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
						writeToLocalStorage(dataToImport);
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
		</Modal>
	);
};

export default ImportDataModal;
