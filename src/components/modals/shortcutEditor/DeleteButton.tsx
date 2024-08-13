type DeleteButtonProps = {
	groupPrefix: string;
	shortcutId: number | null;
	setShortcutId: (id: number | null) => void;
};

const DeleteButton = ({ groupPrefix, setShortcutId, shortcutId }: DeleteButtonProps) => {
	return (
		<button
			type='button'
			className='text-red-500 underline'
			onClick={() => {
				localStorage.removeItem(`shortcut-${groupPrefix}${shortcutId}-name`);
				localStorage.removeItem(`shortcut-${groupPrefix}${shortcutId}-group`);
				localStorage.removeItem(`shortcut-${groupPrefix}${shortcutId}-href`);
				localStorage.removeItem(`shortcut-${groupPrefix}${shortcutId}-img`);
				setShortcutId(null);
			}}
		>
			Delete
		</button>
	);
};

export default DeleteButton;
