import { getShortcutsObject } from './getShortcutsObject';

export const updateShortcutGroupChildNames = (oldName: string, newName: string, pathToGroup: string) => {
	const shortcuts = getShortcutsObject(false, true);

	const pathPrefix = pathToGroup
		.split('-')
		.slice(0, pathToGroup.split('-').length - 1)
		.join('-');

	const oldNameChildPath = pathPrefix ? pathPrefix + '-' + oldName : oldName;
	const newNameChildPath = pathPrefix ? pathPrefix + '-' + newName : newName;

	const newShortcuts = Object.entries(shortcuts).reduce((acc: { [key: string]: string }, [key, value]) => {
		const shortenedKey = key.startsWith('shortcut-') ? key.replace('shortcut-', '') : key;

		if (shortenedKey.startsWith(oldNameChildPath)) {
			acc[key.replace(oldNameChildPath, newNameChildPath)] = value;
		} else {
			acc[key] = value;
		}
		return acc;
	}, {});

	return newShortcuts;
};
