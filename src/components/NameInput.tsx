import { ShortcutType } from '@/app/page';

type NameInputProps = {
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
};

const NameInput = ({ setShortcut, shortcut }: NameInputProps) => {
	return (
		<input
			autoFocus
			className={
				'w-full rounded-lg border bg-transparent px-2 py-1 ' +
				(shortcut.name.length >= 50 ? 'border-red-500' : 'border-black')
			}
			placeholder='Name'
			value={shortcut.name}
			onChange={(e) => {
				setShortcut({ ...shortcut, name: e.target.value.replaceAll('_', '').replaceAll('-', '').slice(0, 50) });
			}}
		/>
	);
};

export default NameInput;
