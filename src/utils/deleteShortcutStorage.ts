export const deleteShortcutStorage = () => {
	const storageObject = JSON.parse(JSON.stringify(localStorage));
	const otherData: { [key: string]: string } = {};
	Object.keys(JSON.parse(JSON.stringify(localStorage))).forEach((cur) => {
		if (!cur.includes('shortcut-')) {
			otherData[cur] = storageObject[cur];
		}
	});
	localStorage.clear();
	Object.keys(otherData).forEach((cur) => {
		localStorage.setItem(cur, storageObject[cur]);
	});
};
