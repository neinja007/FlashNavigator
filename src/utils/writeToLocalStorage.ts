import { deleteShortcutStorage } from './deleteShortcutStorage';
import { refreshStorage } from './refreshStorage';

export const writeToLocalStorage = (data: string | { [key: string]: string }) => {
	try {
		let newData: { [key: string]: string } = {};
		if (typeof data === 'string') {
			newData = JSON.parse(data);
		} else {
			newData = data;
		}
		deleteShortcutStorage();
		Object.keys(newData).forEach((key) => {
			localStorage.setItem(key.startsWith('shortcut-') ? key : 'shortcut-' + key, newData[key]);
		});
		refreshStorage();
		window.location.reload();
	} catch {
		alert('Invalid JSON data');
	}
};
