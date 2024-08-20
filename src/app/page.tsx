'use client';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Breadcrums from '@/components/Breadcrums';
import ManageData from '@/components/ManageData';
import SearchBar from '@/components/SearchBar';
import ExtensionPromptModal from '@/components/ExtensionPromptModal';
import ShortcutQueryResults from '@/components/ShortcutQueryResults';
import ShortcutEditor from '@/components/ShortcutEditor';
import Shortcut from '@/components/Shortcut';
import { refreshStorage } from '@/utils/refreshStorage';
import { DataContext } from '@/context/DataContext';

export type ShortcutType = {
	name: string;
	group: boolean;
	href: string;
	img: string;
	path: string[];
};

export default function Root() {
	const [searchBarQuery, setSearchBarQuery] = useState('');

	const { shortcuts } = useContext(DataContext);

	const [activeShortcutId, setActiveShortcutId] = useState<number | null>(null);
	const [activeShortcut, setActiveShortcut] = useState<ShortcutType | null>();
	const [groups, setGroups] = useState<string[]>([]);

	const groupPrefix = groups.length > 0 ? groups.map((slug) => slug.replaceAll(' ', '_')).join('-') + '-' : '';

	useEffect(refreshStorage, []);

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

	return (
		<div className='container my-auto block text-white'>
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
						<div className='justify-between pb-5 sm:flex'>
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
