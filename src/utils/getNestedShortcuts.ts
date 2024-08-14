import { ShortcutType } from '../app/page';
import { getShortcutsObject } from './getShortcutsObject';

export const getNestedShortcuts = (): { [key: string]: ShortcutType } => {
	const shortcutsObject = getShortcutsObject();
	const nestedShortcuts: { [key: string]: ShortcutType } = {};
	Object.keys(shortcutsObject).forEach(
		(cur) => {
			const index = cur
				.split('-')
				.slice(0, cur.split('-').length - 1)
				.join('-');

			nestedShortcuts[index] = {
				name: shortcutsObject[index + '-name'].replaceAll('_', ' ') || '',
				group: shortcutsObject[index + '-group'] === 'true',
				href: shortcutsObject[index + '-href'] || '',
				img: shortcutsObject[index + '-img'] || '',
				path: index.split('-').slice(1, index.split('-').length - 1)
			};
		},
		{} as { [key: string]: ShortcutType }
	);
	return nestedShortcuts;
};
