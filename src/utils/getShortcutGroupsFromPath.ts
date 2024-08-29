import { getShortcutsObject } from './getShortcutsObject';
import { stripLastItem } from './stripLastItem';

export const getShortcutGroupsFromPath = (path: string) => {
	const shortcuts = getShortcutsObject(true, true);

	const groups = Object.keys(shortcuts).reduce((acc: string[], key) => {
		if (stripLastItem(stripLastItem(key, '-'), '-') === path) {
			const group = key.split('-').pop() === 'group' && shortcuts[key] === 'true';
			if (group) {
				const name = shortcuts[stripLastItem(key, '-') + '-name'];

				if (!name) {
					throw new Error('name is not defined');
				}

				acc.push(shortcuts[stripLastItem(key, '-') + '-name']);
			}
		}

		return acc;
	}, []);

	return groups;
};
