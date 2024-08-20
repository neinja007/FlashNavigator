'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Breadcrums from '@/components/Breadcrums';
import ManageData from '@/components/ManageData';
import SearchBar from '@/components/SearchBar';
import ExtensionPromptModal from '@/components/ExtensionPromptModal';
import ShortcutQueryResults from '@/components/ShortcutQueryResults';
import ShortcutEditor from '@/components/ShortcutEditor';
import Shortcut from '@/components/Shortcut';
import { getNestedShortcuts } from '@/utils/getNestedShortcuts';
import { refreshStorage } from '@/utils/refreshStorage';
import { useStorageState } from '@/hooks/useStorageState';

export type ShortcutType = {
	name: string;
	group: boolean;
	href: string;
	img: string;
	path: string[];
};

export default function Root() {
	const [activeShortcutId, setActiveShortcutId] = useState<number | null>(null);
	const [activeShortcut, setActiveShortcut] = useState<ShortcutType | null>();
	const [shortcuts, setShortcuts] = useState<{ [key: string]: ShortcutType }>();
	const [groups, setGroups] = useState<string[]>([]);

	const [searchBarQuery, setSearchBarQuery] = useState('');

	const groupPrefix = groups.length > 0 ? groups.map((slug) => slug.replaceAll(' ', '_')).join('-') + '-' : '';

	useEffect(refreshStorage, []);

	useEffect(() => {
		setShortcuts(getNestedShortcuts());
	}, [groupPrefix, activeShortcutId]);

	useEffect(() => {
		setActiveShortcut(
			typeof activeShortcutId === 'number'
				? {
						name: (localStorage.getItem(`shortcut-${groupPrefix}${activeShortcutId}-name`) || '').replaceAll('_', ' '),
						group: localStorage.getItem(`shortcut-${groupPrefix}${activeShortcutId}-group`) === 'true',
						img: localStorage.getItem(`shortcut-${groupPrefix}${activeShortcutId}-img`) || '',
						href: localStorage.getItem(`shortcut-${groupPrefix}${activeShortcutId}-href`) || '',
						path: groupPrefix.slice(0, -1).split('-')
					}
				: null
		);
	}, [groupPrefix, activeShortcutId]);

	useEffect(() => {
		if (activeShortcut && typeof activeShortcutId === 'number') {
			localStorage.setItem(`shortcut-${groupPrefix}${activeShortcutId}-name`, activeShortcut.name);
			localStorage.setItem(`shortcut-${groupPrefix}${activeShortcutId}-group`, activeShortcut.group.toString());
			localStorage.setItem(`shortcut-${groupPrefix}${activeShortcutId}-href`, activeShortcut.href);
			localStorage.setItem(`shortcut-${groupPrefix}${activeShortcutId}-img`, activeShortcut.img);
		}
	}, [groupPrefix, activeShortcut, activeShortcutId]);

	const [hideShortcutIcons, setHideShortcutIcons] = useStorageState('settings-hide_shortcut_icons', 'false');
	const [hideEmptyShortcuts, setHideEmptyShortcuts] = useStorageState('settings-hide_empty_shortcuts', 'false');
	const [imageQuality, setImageQuality] = useStorageState('settings-image_quality', '75');
	const [shortcutTypeColor, setShortcutTypeColor] = useStorageState('settings-shortcut_type_color', 'true');

	return (
		<div className='block text-white container my-auto'>
			<div className='text-center'>
				<Link href={'/'} className='text-4xl font-bold italic'>
					⚡<span className='text-yellow-300'>Flash</span>
					<span>Navigator</span>
				</Link>
				<br />
				<SearchBar
					shortcuts={shortcuts}
					searchBarQuery={searchBarQuery}
					setSearchBarQuery={setSearchBarQuery}
					setGroups={setGroups}
				/>
				<div className='mt-8'>
					{!searchBarQuery && (
						<div className='sm:flex justify-between pb-5'>
							<Breadcrums groups={groups} setGroups={setGroups} />
							<ManageData />
						</div>
					)}
					<div className='flex flex-wrap justify-center rounded-lg text-xs sm:text-base'>
						{searchBarQuery && shortcuts ? (
							<ShortcutQueryResults
								resetSearchBarQuery={() => setSearchBarQuery('')}
								shortcuts={shortcuts}
								searchBarQuery={searchBarQuery}
								setGroups={setGroups}
								setShortcutId={setActiveShortcutId}
							/>
						) : (
							[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
								<Shortcut
									key={i}
									shortcut={
										(shortcuts && shortcuts[`shortcut-${groupPrefix}${i}`]) || {
											name: '',
											group: false,
											img: '',
											href: '',
											path: []
										}
									}
									setShortcutId={() => setActiveShortcutId(i)}
									setGroups={setGroups}
								/>
							))
						)}
					</div>
				</div>
			</div>
			<ExtensionPromptModal />
			{activeShortcut && typeof activeShortcutId === 'number' && (
				<ShortcutEditor
					groupPrefix={groupPrefix}
					shortcutId={activeShortcutId}
					shortcut={activeShortcut}
					setShortcut={setActiveShortcut}
					setShortcutId={setActiveShortcutId}
				/>
			)}
		</div>
	);
}
