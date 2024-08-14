import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { deleteShortcutStorage } from './deleteShortcutStorage';

export const refreshStorage = () => {
	const shortcutsObject = getShortcutsObject();
	deleteShortcutStorage();
	Object.keys(shortcutsObject).forEach((cur) => {
		const index = cur
			.split('-')
			.slice(0, cur.split('-').length - 1)
			.join('-');
		localStorage.setItem(`${index}-name`, shortcutsObject[index + '-name'].replaceAll('_', ' ') || '');
		localStorage.setItem(`${index}-group`, shortcutsObject[index + '-group'] || 'false');
		localStorage.setItem(`${index}-href`, shortcutsObject[index + '-href'] || '');
		localStorage.setItem(`${index}-img`, shortcutsObject[index + '-img'] || '');
	});
};
