import SubmitButton from '@/components/SubmitButton';
import DeleteButton from '@/components/DeleteButton';
import NameInput from '@/components/NameInput';
import UrlInput from '@/components/UrlInput';
import GroupCheckbox from '@/components/GroupCheckbox';
import ImageUrlInput from './ImageUrlInput';
import { ShortcutType } from '@/app/page';
import Modal from './Modal';
import { DataContext } from '@/context/DataContext';
import { useContext } from 'react';

type ShortcutEditorProps = {
	setShortcutId: (id: number | null) => void;
	groupPrefix: string;
	shortcutId: number;
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
};

const ShortcutEditor = ({ setShortcutId, groupPrefix, shortcutId, shortcut, setShortcut }: ShortcutEditorProps) => {
	const { updateShortcuts } = useContext(DataContext);

	const prefix = groupPrefix + shortcutId;

	const onSubmit = () => {
		updateShortcuts(prefix, shortcut);
		setShortcutId(null);
	};

	return (
		<Modal action={onSubmit} padding>
			<form className='space-y-5' onSubmit={onSubmit}>
				<div className='float-end space-x-3'>
					<SubmitButton />
					<DeleteButton prefix={prefix} closeModal={() => setShortcutId(null)} />
				</div>
				<b>Edit Shortcut {shortcutId}</b>
				<NameInput setShortcut={setShortcut} shortcut={shortcut} />
				<UrlInput setShortcut={setShortcut} shortcut={shortcut} />
				<ImageUrlInput setShortcut={setShortcut} shortcut={shortcut} />
				<GroupCheckbox setShortcut={setShortcut} shortcut={shortcut} />
			</form>
		</Modal>
	);
};

export default ShortcutEditor;
