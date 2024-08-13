import { ShortcutType } from '@/app/[[...slug]]/page';
import ModalBackgroundFrame from './ModalBackgroundFrame';
import SubmitButton from '@/components/SubmitButton';
import DeleteButton from '@/components/DeleteButton';
import NameInput from '@/components/NameInput';
import UrlInput from '@/components/UrlInput';
import GroupCheckbox from '@/components/GroupCheckbox';
import ImageUrlInput from './ImageUrlInput';

type ShortcutEditorProps = {
	setShortcutId: (id: number | null) => void;
	groupPrefix: string;
	shortcutId: number;
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
};

const ShortcutEditor = ({ setShortcutId, groupPrefix, shortcutId, shortcut, setShortcut }: ShortcutEditorProps) => {
	return (
		<>
			<ModalBackgroundFrame action={() => setShortcutId(null)} />
			<div className='fixed bg-gray-700 shadow-lg rounded-xl inset-0 mx-auto my-auto w-[700px] h-fit px-5 py-4'>
				<form className='space-y-5' onSubmit={() => setShortcutId(null)}>
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
