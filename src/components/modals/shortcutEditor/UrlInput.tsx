import { Shortcut } from '@/app/[[...slug]]/page';

type UrlInputProps = {
	shortcut: Shortcut;
	setShortcut: (shortcut: Shortcut) => void;
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
