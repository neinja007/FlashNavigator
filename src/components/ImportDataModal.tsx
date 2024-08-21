import { useContext, useState } from 'react';
import { getNestedShortcuts } from '@/utils/getNestedShortcuts';
import Modal from './Modal';
import { getShortcutCount } from '@/utils/getShortcutCount';
import { DataContext } from '@/context/DataContext';
import { ImportIcon, X } from 'lucide-react';

type ImportDataModalProps = {
	setImportDataModal: (importDataModal: boolean) => void;
};

const ImportDataModal = ({ setImportDataModal }: ImportDataModalProps) => {
	const [dataToImport, setDataToImport] = useState('');

	const { overwriteShortcuts } = useContext(DataContext);

	const shortcutCount = getShortcutCount(dataToImport);
	const currentShortcutCount = Object.keys(getNestedShortcuts()).length;

	return (
		<Modal action={() => setImportDataModal(false)}>
			<textarea
				value={dataToImport}
				onChange={(e) => setDataToImport(e.target.value)}
				className='h-96 w-full rounded-t-lg bg-transparent p-2'
				style={{ wordBreak: 'break-all' }}
			/>
			<div className='-mt-1 flex'>
				<button
					className='flex w-1/2 justify-center gap-x-1 rounded-bl-lg bg-blue-500 px-2 py-1 active:bg-blue-600'
					onClick={() => {
						overwriteShortcuts(dataToImport);
						setImportDataModal(false);
					}}
				>
					<ImportIcon /> Import {shortcutCount} shortcuts (current: {currentShortcutCount})
				</button>
				<button
					className='flex w-1/2 justify-center gap-x-1 rounded-br-lg bg-red-500 px-2 py-1 active:bg-red-600'
					onClick={() => setImportDataModal(false)}
				>
					<X /> Cancel
				</button>
			</div>
		</Modal>
	);
};

export default ImportDataModal;
