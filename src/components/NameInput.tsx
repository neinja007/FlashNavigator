import { ShortcutType } from '@/app/page';

type NameInputProps = {
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
};

const NameInput = ({ setShortcut, shortcut }: NameInputProps) => {
	return (
		<input
			autoFocus
			className='w-full rounded-lg border border-black bg-transparent px-2 py-1'
			placeholder='Name'
			value={shortcut.name}
			onChange={(e) => {
				setShortcut({ ...shortcut, name: e.target.value.replaceAll('_', ' ') });
			}}
		/>
	);
};

export default NameInput;
