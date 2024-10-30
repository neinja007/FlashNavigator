'use client';
import { ShortcutType } from '@/app/page';
import { deleteShortcutStorage } from '@/utils/deleteShortcutStorage';
import { getNestedShortcuts } from '@/utils/getNestedShortcuts';
import { getShortcutCount } from '@/utils/getShortcutCount';
import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { updateShortcutGroupChildNames } from '@/utils/updateShortcutGroupChildNames';
import { useState, createContext, useEffect, useCallback } from 'react';

type DataContextType = {
	shortcuts: ShortcutsType;
	updateShortcuts: (key: string, shortcut: ShortcutType | null) => void;
	settings: SettingsType;
	updateSettings: (key: keyof SettingsType, value: any) => void;
	refreshSettings: () => void;
	refreshShortcuts: () => void;
	overwriteShortcuts: (shortcuts: { [key: string]: string } | string) => void;
};

type ShortcutsType = { [key: string]: ShortcutType };

type SettingsType = {
	hideShortcutIcons: boolean;
	hideEmptyShortcuts: boolean;
	shortcutTypeColor: boolean;
	searchEngine: 'google' | 'duckduckgo' | 'bing' | 'other';
};

type DataContextProviderProps = {
	children: React.ReactNode;
};

export const DataContext = createContext<DataContextType>({} as DataContextType);

export function DataContextProvider({ children }: DataContextProviderProps) {
	const [shortcuts, setShortcuts] = useState<ShortcutsType>({});
	const [settings, setSettings] = useState<SettingsType>({
		hideShortcutIcons: false,
		hideEmptyShortcuts: false,
		shortcutTypeColor: false,
		searchEngine: 'duckduckgo'
	});

	useEffect(() => {
		refreshShortcuts();
		refreshSettings();
	}, []);

	const refreshShortcuts = () => {
		setShortcuts(getNestedShortcuts());
	};

	const refreshSettings = () => {
		setSettings({
			hideShortcutIcons: localStorage.getItem('settings-hideShortcutIcons') === 'true',
			hideEmptyShortcuts: localStorage.getItem('settings-hideEmptyShortcuts') === 'true',
			shortcutTypeColor: localStorage.getItem('settings-shortcutTypeColor') === 'true',
			searchEngine: (localStorage.getItem('settings-searchEngine') as 'google' | 'duckduckgo' | 'bing') || 'duckduckgo'
		});
	};

	const updateSettings = useCallback((key: keyof SettingsType, value: any) => {
		localStorage.setItem('settings-' + key, value.toString());
		refreshSettings();
	}, []);

	const overwriteShortcuts = useCallback((shortcuts: { [key: string]: string } | string) => {
		try {
			let newData: { [key: string]: string } = {};
			if (typeof shortcuts === 'string') {
				newData = JSON.parse(shortcuts);
			} else {
				newData = shortcuts;
			}
			deleteShortcutStorage();
			Object.keys(newData).forEach((key) => {
				localStorage.setItem(key.startsWith('shortcut-') ? key : 'shortcut-' + key, newData[key]);
			});
		} catch {
			alert('Invalid JSON data');
		}
		refreshShortcuts();
	}, []);

	useEffect(() => {
		fetch('/download', { cache: 'no-store' })
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				const localEntries = Object.entries(getShortcutsObject(true));
				const blobData = data.data;
				const serverEntries = JSON.parse(blobData);

				const inSync =
					localEntries.every(([key, value]) => serverEntries[key] === value) &&
					localEntries.length === Object.keys(serverEntries).length;

				if (!inSync) {
					confirm(
						'The server has ' +
							getShortcutCount(blobData) +
							' shortcuts, you have ' +
							getShortcutCount(getShortcutsObject(true)) +
							'. Would you like to override your state with the server state?'
					) && overwriteShortcuts(blobData);
				}
			});
	}, [overwriteShortcuts]);

	const updateShortcuts = useCallback(
		(key: string, shortcut: ShortcutType | null) => {
			if (!shortcut) {
				localStorage.removeItem(`shortcut-${key}-name`);
				localStorage.removeItem(`shortcut-${key}-group`);
				localStorage.removeItem(`shortcut-${key}-href`);
				localStorage.removeItem(`shortcut-${key}-img`);
			} else {
				const oldName = localStorage.getItem(`shortcut-${key}-name`);
				localStorage.setItem(`shortcut-${key}-name`, shortcut.name);
				localStorage.setItem(`shortcut-${key}-group`, shortcut.group.toString());
				localStorage.setItem(`shortcut-${key}-href`, shortcut.href);
				localStorage.setItem(`shortcut-${key}-img`, shortcut.img);
				if (shortcut.group && oldName && shortcut.name) {
					overwriteShortcuts(
						updateShortcutGroupChildNames(oldName.replaceAll(' ', '_'), shortcut.name.replaceAll(' ', '_'), key)
					);
				}
			}
			overwriteShortcuts(getShortcutsObject());
		},
		[overwriteShortcuts]
	);

	return (
		<DataContext.Provider
			value={{
				shortcuts,
				updateSettings,
				updateShortcuts,
				overwriteShortcuts,
				refreshSettings,
				refreshShortcuts,
				settings
			}}
		>
			{children}
		</DataContext.Provider>
	);
}
