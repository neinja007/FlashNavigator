import ModalBackgroundFrame from './ModalBackgroundFrame';
import SubmitButton from '@/components/SubmitButton';
import DeleteButton from '@/components/DeleteButton';
import NameInput from '@/components/NameInput';
import UrlInput from '@/components/UrlInput';
import GroupCheckbox from '@/components/GroupCheckbox';
import ImageUrlInput from './ImageUrlInput';
import { ShortcutType } from '@/app/page';
import { getNestedShortcuts } from '@/utils/getNestedShortcuts';

type ShortcutEditorProps = {
	setShortcutId: (id: number | null) => void;
	groupPrefix: string;
	shortcutId: number;
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
	setShortcuts: (shortcuts: { [key: string]: ShortcutType }) => void;
	setLocalStorageSize: (size: number) => void;
};

const ShortcutEditor = ({
	setShortcutId,
	groupPrefix,
	shortcutId,
	shortcut,
	setShortcut,
	setLocalStorageSize,
	setShortcuts
}: ShortcutEditorProps) => {
	const onSubmit = () => {
		setShortcuts(getNestedShortcuts());
		setLocalStorageSize(localStorage.length);
		setShortcutId(null);
	};

	return (
		<>
			<ModalBackgroundFrame action={onSubmit} />
			<div className='fixed bg-gray-700 shadow-lg rounded-xl inset-0 mx-auto my-auto w-[700px] h-fit px-5 py-4'>
				<form className='space-y-5' onSubmit={onSubmit}>
					<div className='float-end space-x-3'>
						<SubmitButton />
						<DeleteButton groupPrefix={groupPrefix} setShortcutId={setShortcutId} shortcutId={shortcutId} />
					</div>
					<b>Edit Shortcut {shortcutId}</b>
					<NameInput setShortcut={setShortcut} shortcut={shortcut} />
					<UrlInput setShortcut={setShortcut} shortcut={shortcut} />
					<ImageUrlInput setShortcut={setShortcut} shortcut={shortcut} />
					<GroupCheckbox setShortcut={setShortcut} shortcut={shortcut} />
				</form>
			</div>
		</>
	);
};

export default ShortcutEditor;
