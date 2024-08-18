export const getShortcutsObject = (stripShortcutPrefix?: boolean): { [key: string]: string } => {
	const newGroups: string[] = [];
	const rawShortcuts = JSON.parse(JSON.stringify(localStorage));
	const shortcuts: { [key: string]: string } = {};

	for (let i = 1; i < 17; i++) {
		const prefix = `shortcut-${i}`;
		const finalPrefix = stripShortcutPrefix ? i : prefix;
		if (!rawShortcuts[`${prefix}-name`]) continue;
		if (rawShortcuts[`${prefix}-group`] === 'true') {
			newGroups.push(rawShortcuts[`${prefix}-name`].replaceAll(' ', '_'));
		}
		for (let type of ['img', 'group', 'href', 'name']) {
			if (!rawShortcuts[`${prefix}-${type}`]) continue;
			shortcuts[`${finalPrefix}-${type}`] = rawShortcuts[`${prefix}-${type}`];
		}
	}

	while (newGroups.length > 0) {
		for (let i = 1; i < 17; i++) {
			const prefix = `shortcut-${newGroups[0] + '-'}${i}`;
			const finalPrefix = stripShortcutPrefix ? `${newGroups[0] + '-'}${i}` : prefix;
			if (!rawShortcuts[`${prefix}-name`]) continue;
			if (rawShortcuts[`${prefix}-group`] === 'true') {
				newGroups.push(newGroups[0] + '-' + rawShortcuts[`${prefix}-name`].replaceAll(' ', '_'));
			}
			for (let type of ['img', 'group', 'href', 'name']) {
				if (!rawShortcuts[`${prefix}-${type}`]) continue;
				shortcuts[`${finalPrefix}-${type}`] = rawShortcuts[`${prefix}-${type}`];
			}
		}
		newGroups.splice(newGroups.indexOf(newGroups[0]), 1);
	}

	return shortcuts;
};
