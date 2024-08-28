import { getShortcutsObject } from './getShortcutsObject';

export const updateShortcutPath = (oldPath: string, newPath: string) => {
	const shortcuts = getShortcutsObject(false, true);

	const newShortcuts = Object.entries(shortcuts).reduce((acc: { [key: string]: string }, [key, value]) => {
		const shortenedKey = key.startsWith('shortcut-') ? key.replace('shortcut-', '') : key;

		if (shortenedKey.startsWith(oldPath)) {
			acc[key.replace(oldPath, newPath)] = value;
		} else {
			acc[key] = value;
		}
		return acc;
	}, {});

	return newShortcuts;
};
