export const getShortcutCount = (data: string | Object): number => {
	try {
		typeof data === 'string' && (data = JSON.parse(data));
		return Object.keys(data).reduce((acc: string[], cur: string) => {
			const shortcut = cur.slice(0, cur.lastIndexOf('-'));
			return shortcut && acc.find((item) => item === shortcut) ? acc : [...acc, shortcut];
		}, []).length;
	} catch {
		return 0;
	}
};
