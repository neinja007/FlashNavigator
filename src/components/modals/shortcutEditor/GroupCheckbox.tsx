import { ShortcutType } from '@/app/[[...slug]]/page';
import { useId } from 'react';

type GroupCheckboxProps = {
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
};

const GroupCheckbox = ({ setShortcut, shortcut }: GroupCheckboxProps) => {
	const id = useId();

	return (
		<>
			<input
				id={id}
				type='checkbox'
				checked={shortcut.group}
				onChange={(e) => {
					setShortcut({
						...shortcut,
						group: e.target.checked
					});
				}}
			/>{' '}
			<label htmlFor={id}>Is this a Shortcut Group?</label>
		</>
	);
};

export default GroupCheckbox;
