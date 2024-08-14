import { ShortcutType } from '@/app/page';

type NameInputProps = {
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
};

const NameInput = ({ setShortcut, shortcut }: NameInputProps) => {
	return (
		<input
			autoFocus
			className='w-full px-2 py-1 border border-black rounded-lg bg-transparent'
			placeholder='Name'
			value={shortcut.name}
			onChange={(e) => {
				setShortcut({ ...shortcut, name: e.target.value.replaceAll('_', ' ') });
			}}
		/>
	);
};

export default NameInput;
