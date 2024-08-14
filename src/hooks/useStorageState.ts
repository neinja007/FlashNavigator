import { useEffect, useState } from 'react';

export const useStorageState = (
	name: string,
	initialValue?: string,
	initialStorageValue?: string
): [string | undefined, (arg: string) => void] => {
	const [state, setState] = useState<string | undefined>(initialValue);

	useEffect(() => {
		const storedState = localStorage.getItem(name);
		if (storedState) {
			setState(storedState);
		} else {
			const value = initialStorageValue || initialValue || '';
			localStorage.setItem(name, value);
			setState(value);
		}
	}, [initialStorageValue, initialValue, name]);

	const updateState: (arg: string) => void = (newState) => {
		setState(newState);
		localStorage.setItem(name, newState);
	};

	return [state, updateState];
};