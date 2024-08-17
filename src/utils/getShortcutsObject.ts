export const getShortcutsObject = (stripShortcutPrefix?: boolean): { [key: string]: string } => {
	const newGroups: string[] = [];
	const shortcutsObject = JSON.parse(JSON.stringify(localStorage));
	const shortcuts: { [key: string]: string } = {};

	for (let i = 1; i < 17; i++) {
		const prefix = `shortcut-${i}`;
		if (!shortcutsObject[`${prefix}-name`]) continue;
		if (shortcutsObject[`${prefix}-group`] === 'true') {
			newGroups.push(shortcutsObject[`${prefix}-name`].replaceAll(' ', '_'));
		}
		for (let type of ['img', 'group', 'href', 'name']) {
			if (!shortcutsObject[`${prefix}-${type}`]) continue;
			shortcuts[stripShortcutPrefix ? `${i}-${type}` : `${prefix}-${type}`] = shortcutsObject[`${prefix}-${type}`];
		}
	}

	while (newGroups.length > 0) {
		for (let i = 1; i < 17; i++) {
			const prefix = `shortcut-${newGroups[0] + '-'}${i}`;
			console.log(prefix, shortcutsObject[`${prefix}-name`]);
			if (!shortcutsObject[`${prefix}-name`]) continue;
			if (shortcutsObject[`${prefix}-group`] === 'true') {
				newGroups.push(newGroups[0] + '-' + shortcutsObject[`${prefix}-name`].replaceAll(' ', '_'));
				console.log('newGroups', newGroups);
			}
			for (let type of ['img', 'group', 'href', 'name']) {
				if (!shortcutsObject[`${prefix}-${type}`]) continue;
				shortcuts[stripShortcutPrefix ? `${i}-${type}` : `${prefix}-${type}`] = shortcutsObject[`${prefix}-${type}`];
			}
		}
		newGroups.splice(newGroups.indexOf(newGroups[0]), 1);
	}

	return shortcuts;
};
