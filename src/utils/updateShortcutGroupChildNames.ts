import { getShortcutsObject } from './getShortcutsObject';

export const updateShortcutGroupChildNames = (oldName: string, newName: string, pathToGroup: string) => {
	const shortcuts = getShortcutsObject(false, true);
	const oldNameChildPath = (
		pathToGroup.split('-').slice(0, pathToGroup.split('-').length - 1) +
		'-' +
		oldName
	).replaceAll(' ', '_');
	const newNameChildPath = (
		pathToGroup.split('-').slice(0, pathToGroup.split('-').length - 1) +
		'-' +
		newName
	).replaceAll(' ', '_');

	const newShortcuts = Object.entries(shortcuts).reduce((acc: { [key: string]: string }, [key, value]) => {
		acc[key.replace(oldNameChildPath, newNameChildPath)] = value;
		return acc;
	}, {});

	return newShortcuts;
};
