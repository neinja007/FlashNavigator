import SubmitButton from '@/components/SubmitButton';
import DeleteButton from '@/components/DeleteButton';
import NameInput from '@/components/NameInput';
import UrlInput from '@/components/UrlInput';
import GroupCheckbox from '@/components/GroupCheckbox';
import ImageUrlInput from './ImageUrlInput';
import { ShortcutType } from '@/app/page';
import Modal from './Modal';
import { DataContext } from '@/context/DataContext';
import { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { updateShortcutPath } from '@/utils/updateShortcutPath';

type ShortcutEditorProps = {
	setShortcutId: (id: number | null) => void;
	groupPrefix: string;
	shortcutId: number;
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
};

const ShortcutEditor = ({ setShortcutId, groupPrefix, shortcutId, shortcut, setShortcut }: ShortcutEditorProps) => {
	const { updateShortcuts, overwriteShortcuts } = useContext(DataContext);

	const [shortcutPathValid, setShortcutPathValid] = useState(false);
	const [shortcutPath, setShortcutPath] = useState<string>(
		(shortcut.path.join('/') ? shortcut.path.join('/') + '/' + shortcutId : shortcutId.toString()).replace('_', ' ')
	);

	const prefix = groupPrefix + shortcutId;

	const onSubmit = () => {
		updateShortcuts(prefix, shortcut);
		setShortcutId(null);
	};

	const onMove = () => {
		if (shortcutPathValid) {
			const path = shortcut.path.join('-');
			overwriteShortcuts(
				updateShortcutPath(
					path ? path + '-' + shortcutId : shortcutId.toString(),
					shortcutPath.split('/').join('-').replace(' ', '_')
				)
			);
			setShortcutId(null);
		}
	};

	useEffect(() => {
		const transformedPath = shortcutPath.split('/').join('-');
		const localStorageKey = 'shortcut-' + transformedPath + '-name';

		const doesntExist = !localStorage.getItem(localStorageKey);

		const pathId = parseInt(transformedPath.split('-').at(-1) || '0');
		const newPathEndsWithValidId = pathId > 0 && pathId < 17;

		setShortcutPathValid(doesntExist && newPathEndsWithValidId);
	}, [shortcut.path, shortcutId, shortcutPath]);

	return (
		<Modal action={onSubmit} padding>
			<form className='space-y-5' onSubmit={onSubmit}>
				<div className='float-end space-x-3'>
					<button type='button' className='text-yellow-400 underline' onClick={onMove}>
						Move Shortcut
					</button>
					<SubmitButton />
					<DeleteButton prefix={prefix} closeModal={() => setShortcutId(null)} />
				</div>
				<b>Edit Shortcut {shortcutId}</b>
				<input
					type='text'
					placeholder='Path'
					className={clsx(
						'w-full rounded-lg border bg-transparent px-2 py-1',
						!shortcutPathValid ? 'border-red-500' : 'border-black'
					)}
					value={shortcutPath}
					onChange={(e) => setShortcutPath(e.target.value.replace('_', ' '))}
				/>
				<NameInput setShortcut={setShortcut} shortcut={shortcut} />
				<UrlInput setShortcut={setShortcut} shortcut={shortcut} />
				<ImageUrlInput setShortcut={setShortcut} shortcut={shortcut} />
				<GroupCheckbox setShortcut={setShortcut} shortcut={shortcut} />
			</form>
		</Modal>
	);
};

export default ShortcutEditor;
