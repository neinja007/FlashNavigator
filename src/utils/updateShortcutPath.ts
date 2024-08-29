import { getShortcutsObject } from './getShortcutsObject';
import { stripLastItem } from './stripLastItem';

export const updateShortcutPath = (oldPath: string, newPath: string, customData?: { [key: string]: string }) => {
	const shortcuts = customData ? customData : getShortcutsObject(false, true);

	console.log('path', oldPath, newPath);

	const newShortcuts = Object.entries(shortcuts).reduce((acc: { [key: string]: string }, [key, value]) => {
		const shortenedKey = key.startsWith('shortcut-') ? key.replace('shortcut-', '') : key;

		if (shortenedKey.startsWith(oldPath)) {
			acc[key.replace(oldPath, newPath)] = value;
		} else {
			acc[key] = value;
		}
		return acc;
	}, {});

	let newGroupAdjustedShortcuts = newShortcuts;

	if (localStorage.getItem('shortcut-' + oldPath + '-group') === 'true') {
		const name = localStorage.getItem('shortcut-' + oldPath + '-name')?.replace(' ', '_');

		const oldPathWithoutId = stripLastItem(oldPath, '-');

		const newPathWithoutId = stripLastItem(newPath, '-');

		newGroupAdjustedShortcuts = updateShortcutPath(
			oldPathWithoutId ? oldPathWithoutId + '-' + name : name || '',
			newPathWithoutId ? newPathWithoutId + '-' + name : name || '',
			newShortcuts
		);
	}

	return newGroupAdjustedShortcuts;
};
