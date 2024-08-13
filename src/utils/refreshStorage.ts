import { getShortcutsObject } from '@/utils/getShortcutsObject';

export const refreshStorage = () => {
	const shortcutsObject = getShortcutsObject();
	const storageObject = JSON.parse(JSON.stringify(localStorage));
	const otherData: { [key: string]: string } = {};
	Object.keys(JSON.parse(JSON.stringify(localStorage))).forEach((cur) => {
		if (!cur.includes('shortcut-')) {
			otherData[cur] = storageObject[cur];
		}
	});
	localStorage.clear();
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
	Object.keys(otherData).forEach((cur) => {
		localStorage.setItem(cur, storageObject[cur]);
	});
};
