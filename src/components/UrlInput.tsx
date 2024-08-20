import { ShortcutType } from '@/app/page';

type UrlInputProps = {
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
};

const UrlInput = ({ setShortcut, shortcut }: UrlInputProps) => {
	return (
		<input
			className={
				'w-full rounded-lg border border-black bg-transparent px-2 py-1 disabled:border-red-900 disabled:bg-red-950 disabled:placeholder:text-white'
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
