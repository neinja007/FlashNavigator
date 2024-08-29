import { getShortcutsObject } from './getShortcutsObject';
import { stripLastItem } from './stripLastItem';
import { dynamicJoin } from './dynamicJoin';

export const updateShortcutPath = (oldPath: string, newPath: string, customData?: { [key: string]: string }) => {
	const shortcuts = customData ? customData : getShortcutsObject(false, true);

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

		if (!name) {
			throw new Error('name is not defined');
		}

		newGroupAdjustedShortcuts = updateShortcutPath(
			dynamicJoin([oldPathWithoutId, name], '-'),
			dynamicJoin([newPathWithoutId, name], '-'),
			newShortcuts
		);
	}

	return newGroupAdjustedShortcuts;
};
