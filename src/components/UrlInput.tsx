import { ShortcutType } from '@/app/page';

type UrlInputProps = {
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
};

const UrlInput = ({ setShortcut, shortcut }: UrlInputProps) => {
	return (
		<input
			className={
				'w-full px-2 py-1 border border-black rounded-lg bg-transparent disabled:bg-red-950 disabled:placeholder:text-white disabled:border-red-900'
			}
			placeholder='URL'
			value={shortcut.href}
			onChange={(e) => {
				setShortcut({
					...shortcut,
					href: e.target.value
				});
			}}
			disabled={shortcut.group}
		/>
	);
};

export default UrlInput;
