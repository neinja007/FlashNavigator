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
import { updateShortcutPath } from '@/utils/updateShortcutPath';
import { dynamicJoin } from '@/utils/dynamicJoin';
import { stripLastItem } from '@/utils/stripLastItem';
import clsx from 'clsx';

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
		dynamicJoin([...shortcut.path, shortcutId.toString()], '/').replace('_', ' ')
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
					dynamicJoin([path, shortcutId.toString()], '-'),
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

		const allSegmentsValid = shortcutPath.split('/').every((segment) => segment.length > 0);

		setShortcutPathValid(doesntExist && newPathEndsWithValidId && allSegmentsValid);
	}, [shortcut.path, shortcutId, shortcutPath]);

	const onPathChange = (value: string, index: number, path?: string) => {
		const newPath = dynamicJoin([(path || shortcutPath).split('/').slice(0, index).join('/'), value], '/');

		const lastSegment = parseInt(newPath.split('/').at(-1) || '0');
		const newPathEndsWithValidId = lastSegment > 0 && lastSegment < 17;

		const prefix = dynamicJoin(['shortcut-' + [newPath.split('/')].join('-').replace(' ', '_'), '1'], '-');

		const occupied = localStorage.getItem(prefix + '-name');

		const group = occupied ? (localStorage.getItem(prefix + '-group') === 'true' ? occupied : false) : false;

		if (group && !occupied) {
			throw new Error('occupied is not defined');
		} else if (group && occupied) {
			onPathChange(occupied, index + 1, newPath);
			return;
		}

		setShortcutPath(dynamicJoin(newPathEndsWithValidId ? newPath : [newPath, '1'], '/').replace('_', ' '));
	};

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
				<div className='space-x-4'>
					<span>Location: {shortcutPath} </span>
					{shortcutPath.split('/').map((segment, i) => (
						<select
							onChange={(e) => onPathChange(e.target.value, i)}
							key={i}
							value={segment}
							className={clsx('rounded-lg border px-2 py-1', shortcutPathValid ? 'bg-black' : 'bg-red-500')}
						>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((segment) => {
								const prefix =
									'shortcut-' +
									dynamicJoin(
										[stripLastItem(shortcutPath, '/').split('/').slice(0, i).join('-'), segment.toString()],
										'-'
									).replace(' ', '_');

								const occupied = localStorage.getItem(prefix + '-name');

								const group = occupied
									? localStorage.getItem(prefix + '-group') === 'true'
										? occupied
										: false
									: false;

								const value = segment.toString() === shortcutId.toString() ? shortcutId.toString() : group || segment;

								return (
									<option
										key={segment.toString()}
										value={value.toString()}
										disabled={!!occupied && !group}
										className={clsx(!!occupied && !group && 'bg-red-900')}
									>
										{value}
									</option>
								);
							})}
						</select>
					))}
				</div>
				<NameInput setShortcut={setShortcut} shortcut={shortcut} />
				<UrlInput setShortcut={setShortcut} shortcut={shortcut} />
				<ImageUrlInput setShortcut={setShortcut} shortcut={shortcut} />
				<GroupCheckbox setShortcut={setShortcut} shortcut={shortcut} />
			</form>
		</Modal>
	);
};

export default ShortcutEditor;
