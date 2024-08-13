import { Shortcut } from '../[[...slug]]/page';

export const getShortcutsObject = (storage: Storage): { [key: string]: string } => {
	const newGroups: string[] = [];
	const shortcutsObject = JSON.parse(JSON.stringify(localStorage));
	const shortcuts: { [key: string]: string } = {};

	for (let i = 1; i < 17; i++) {
		const prefix = `shortcut-${i}`;
		if (!shortcutsObject[`${prefix}-name`]) continue;
		if (shortcutsObject[`${prefix}-group`] === 'true') {
			newGroups.push(shortcutsObject[`${prefix}-name`].replace(' ', '_'));
		}
		for (let type of ['img', 'group', 'href', 'name']) {
			if (!shortcutsObject[`${prefix}-${type}`]) continue;
			shortcuts[`${prefix}-${type}`] = shortcutsObject[`${prefix}-${type}`];
		}
	}

	let stopLoop = 100;

	while (newGroups.length > 0 && stopLoop > 0) {
		for (let i = 1; i < 17; i++) {
			const prefix = `shortcut-${newGroups[0] + '-'}${i}`;
			console.log(prefix, shortcutsObject[`${prefix}-name`]);
			if (!shortcutsObject[`${prefix}-name`]) continue;
			if (shortcutsObject[`${prefix}-group`] === 'true') {
				newGroups.push(newGroups[0] + '-' + shortcutsObject[`${prefix}-name`].replace(' ', '_'));
				console.log('newGroups', newGroups);
			}
			for (let type of ['img', 'group', 'href', 'name']) {
				if (!shortcutsObject[`${prefix}-${type}`]) continue;
				shortcuts[`${prefix}-${type}`] = shortcutsObject[`${prefix}-${type}`];
			}
		}
		newGroups.splice(newGroups.indexOf(newGroups[0]), 1);
		stopLoop--;
	}

	return shortcuts;
};

export const getNestedShortcuts = (storage: Storage): { [key: string]: Shortcut } => {
	const shortcutsObject = getShortcutsObject(storage);
	console.log(shortcutsObject);
	const nestedShortcuts: { [key: string]: Shortcut } = {};
	Object.keys(shortcutsObject).forEach(
		(cur) => {
			const index = cur
				.split('-')
				.slice(0, cur.split('-').length - 1)
				.join('-');

			nestedShortcuts[index] = {
				name: shortcutsObject[index + '-name'].replace('_', ' '),
				group: shortcutsObject[index + '-group'] === 'true',
				href: shortcutsObject[index + '-href'],
				img: shortcutsObject[index + '-img']
			};
		},
		{} as { [key: string]: Shortcut }
	);
	return nestedShortcuts;
};

export function refreshStorage(storage: Storage) {
	const shortcutsObject = getShortcutsObject(storage);
	const storageObject = JSON.parse(JSON.stringify(localStorage));
	const otherData: { [key: string]: string } = {};
	Object.keys(JSON.parse(JSON.stringify(localStorage))).forEach((cur) => {
		if (!cur.includes('shortcut-')) {
			otherData[cur] = storageObject[cur];
		}
	});
	storage.clear();
	Object.keys(shortcutsObject).forEach((cur) => {
		const index = cur
			.split('-')
			.slice(0, cur.split('-').length - 1)
			.join('-');
		storage.setItem(`${index}-name`, shortcutsObject[index + '-name'].replace('_', ' ') || '');
		storage.setItem(`${index}-group`, shortcutsObject[index + '-group'] || 'false');
		storage.setItem(`${index}-href`, shortcutsObject[index + '-href'] || '');
		storage.setItem(`${index}-img`, shortcutsObject[index + '-img'] || '');
	});
	Object.keys(otherData).forEach((cur) => {
		storage.setItem(cur, storageObject[cur]);
	});
}
