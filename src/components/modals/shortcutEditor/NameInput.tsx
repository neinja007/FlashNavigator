import { Shortcut } from '@/app/[[...slug]]/page';

type NameInputProps = {
	shortcut: Shortcut;
	setShortcut: (shortcut: Shortcut) => void;
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
