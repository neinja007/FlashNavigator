export const getShortcutsObject = (
	stripShortcutPrefix?: boolean,
	filterUnusedData?: boolean
): { [key: string]: string } => {
	const newGroups: string[] = [];
	const rawShortcuts: { [key: string]: string } = JSON.parse(JSON.stringify(localStorage));
	const shortcuts: { [key: string]: string } = {};

	if (filterUnusedData) {
		return Object.entries(rawShortcuts).reduce((acc: { [key: string]: string }, [key, value]) => {
			if (key.startsWith('shortcut-')) {
				acc[stripShortcutPrefix ? key.replace('shortcut-', '') : key] = value;
			}
			return acc;
		}, {});
	}

	for (let i = 1; i < 17; i++) {
		const prefix = `shortcut-${i}`;
		const finalPrefix = stripShortcutPrefix ? i : prefix;
		if (!rawShortcuts[`${prefix}-name`]) continue;
		if (rawShortcuts[`${prefix}-group`] === 'true') {
			newGroups.push(rawShortcuts[`${prefix}-name`].replaceAll(' ', '_'));
		}
		for (let type of ['img', 'group', 'href', 'name']) {
			if (!rawShortcuts[`${prefix}-${type}`]) continue;
			const value =
				type === 'img'
					? rawShortcuts[`${prefix}-${type}`]
							.replaceAll('https://external-content.duckduckgo.com/iu/?u=', '')
							.replaceAll('https://', '')
							.replaceAll('http://', '')
							.replaceAll('https%3A%2F%2F', '')
							.replaceAll('http%3A%2F%2F', '')
					: rawShortcuts[`${prefix}-${type}`];
			shortcuts[`${finalPrefix}-${type}`] = value;
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
