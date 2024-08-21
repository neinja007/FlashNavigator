import Modal from './Modal';
import { getShortcutCount } from '@/utils/getShortcutCount';
import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { Copy, X } from 'lucide-react';

type ExportDataModalProps = {
	data: string;
	setData: (data: string) => void;
};

const ExportDataModal = ({ data, setData }: ExportDataModalProps) => {
	const shortcutCount = getShortcutCount(getShortcutsObject());

	return (
		<Modal action={() => setData('')}>
			<textarea
				readOnly
				value={data}
				className='h-96 w-full rounded-t-lg bg-transparent p-2'
				style={{ wordBreak: 'break-all' }}
			/>
			<div className='-mt-1 flex'>
				<button
					className='flex w-1/2 justify-center gap-x-1 rounded-bl-lg bg-blue-500 px-2 py-1 active:bg-blue-600'
					onClick={() => navigator.clipboard.writeText(data)}
				>
					<Copy /> Copy {shortcutCount} shortcuts
				</button>
				<button
					className='flex w-1/2 justify-center gap-x-1 rounded-br-lg bg-red-500 px-2 py-1 active:bg-red-600'
					onClick={() => setData('')}
				>
					<X /> Cancel
				</button>
			</div>
		</Modal>
	);
};

export default ExportDataModal;
