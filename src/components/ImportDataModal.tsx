import ModalBackgroundFrame from './ModalBackgroundFrame';
import { deleteShortcutStorage } from '@/utils/deleteShortcutStorage';

type ImportDataModalProps = {
	importData: string;
	setImportDataModal: (importDataModal: boolean) => void;
	setImportData: (importData: string) => void;
};

const ImportDataModal = ({ importData, setImportData, setImportDataModal }: ImportDataModalProps) => {
	return (
		<>
			<ModalBackgroundFrame action={() => setImportDataModal(false)} />
			<div className='fixed bg-gray-700 shadow-lg rounded-xl inset-0 mx-auto my-auto w-[700px] h-fit'>
				<textarea
					value={importData}
					onChange={(e) => setImportData(e.target.value)}
					className='rounded-t-lg w-full h-96 bg-gray-800 p-2'
					style={{ wordBreak: 'break-all' }}
				/>
				<button
					className='px-2 bg-blue-500 active:bg-blue-600 rounded-b-lg w-full py-1'
					onClick={() => {
						try {
							const data = JSON.parse(importData);
							deleteShortcutStorage();
							Object.keys(data).forEach((key) => {
								localStorage.setItem(key.startsWith('shortcut-') ? key : 'shortcut-' + key, data[key]);
							});
							window.location.reload();
						} catch {
							alert('Invalid JSON data');
						}
					}}
				>
					Import Data <span className='text-red-400 font-medium'>(will overwrite existing data)</span>
				</button>
			</div>
		</>
	);
};

export default ImportDataModal;
