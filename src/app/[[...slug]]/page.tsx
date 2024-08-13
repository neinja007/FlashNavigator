'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Breadcrums from '@/components/Breadcrums';
import ManageData from '@/components/ManageData';
import SearchBar from '@/components/SearchBar';
import ExtensionPromptModal from '@/components/ExtensionPromptModal';
import ExportDataModal from '@/components/ExportDataModal';
import ImportDataModal from '@/components/ImportDataModal';
import ShortcutQueryResults from '@/components/ShortcutQueryResults';
import ShortcutEditor from '@/components/ShortcutEditor';
import Shortcut from '@/components/Shortcut';
import { getNestedShortcuts } from '@/utils/getNestedShortcuts';

export type ShortcutType = {
	name: string;
	group: boolean;
	href: string;
	img: string;
};

export default function Root() {
	const [shortcutId, setShortcutId] = useState<number | null>(null);
	const [shortcut, setShortcut] = useState<ShortcutType | null>();
	const [shortcuts, setShortcuts] = useState<{ [key: string]: ShortcutType }>({});
	const [groups, setGroups] = useState<string[]>([]);

	const [extensionPropmt, setExtensionPrompt] = useState(true);

	useEffect(() => {
		setExtensionPrompt(localStorage.getItem('extensionPrompt') === 'true');
	}, []);

	const [data, setData] = useState('');
	const [importDataModal, setImportDataModal] = useState(false);
	const [importData, setImportData] = useState('');
	const [localStorageSize, setLocalStorageSize] = useState<number>(0);

	useEffect(() => {
		setLocalStorageSize(localStorage.length);
	}, []);

	const [searchBar, setSearchBar] = useState('');

	const groupPrefix = groups.length > 0 ? groups.map((slug) => slug.replaceAll(' ', '_')).join('-') + '-' : '';

	useEffect(() => {
		setShortcuts(getNestedShortcuts());
		setLocalStorageSize(localStorage.length);
	}, [groupPrefix, shortcutId]);

	useEffect(() => {
		setShortcut(
			typeof shortcutId === 'number'
				? {
						name: (localStorage.getItem(`shortcut-${groupPrefix}${shortcutId}-name`) || '').replaceAll('_', ' '),
						group: localStorage.getItem(`shortcut-${groupPrefix}${shortcutId}-group`) === 'true',
						img: localStorage.getItem(`shortcut-${groupPrefix}${shortcutId}-img`) || '',
						href: localStorage.getItem(`shortcut-${groupPrefix}${shortcutId}-href`) || ''
					}
				: null
		);
	}, [groupPrefix, shortcutId]);

	useEffect(() => {
		if (shortcut && typeof shortcutId === 'number') {
			localStorage.setItem(`shortcut-${groupPrefix}${shortcutId}-name`, shortcut.name);
			localStorage.setItem(`shortcut-${groupPrefix}${shortcutId}-group`, shortcut.group.toString());
			localStorage.setItem(`shortcut-${groupPrefix}${shortcutId}-href`, shortcut.href);
			localStorage.setItem(`shortcut-${groupPrefix}${shortcutId}-img`, shortcut.img);
		}
	}, [groupPrefix, shortcut, shortcutId]);

	return (
		<div className='block text-white container my-auto'>
			<div className='text-center'>
				<Link href={'/'} className='text-4xl font-bold italic'>
					⚡<span className='text-yellow-300'>Flash</span>
					<span>Navigator</span>
				</Link>
				<br />
				<SearchBar shortcuts={shortcuts} searchBarQuery={searchBar} setSearchBarQuery={setSearchBar} />
				<div className='mt-8'>
					{!searchBar && (
						<div className='sm:flex justify-between pb-5'>
							<Breadcrums groups={groups} setGroups={setGroups} />
							<ManageData
								localStorageSize={localStorageSize}
								setData={setData}
								setImportDataModal={setImportDataModal}
								setLocalStorageSize={setLocalStorageSize}
							/>
						</div>
					)}
					<div className='grid grid-cols-4 xl:grid-cols-8 gap-5 rounded-lg px-3 py-3 text-xs sm:text-base'>
						{searchBar ? (
							<ShortcutQueryResults
								shortcuts={shortcuts}
								searchBarQuery={searchBar}
								setGroups={setGroups}
								setShortcutId={setShortcutId}
							/>
						) : (
							[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
								<Shortcut
									key={i}
									name={shortcuts['shortcut-' + groupPrefix + i]?.name.replaceAll('_', ' ')}
									group={shortcuts['shortcut-' + groupPrefix + i]?.group}
									img={shortcuts['shortcut-' + groupPrefix + i]?.img}
									href={shortcuts['shortcut-' + groupPrefix + i]?.href}
									setShortcutId={() => setShortcutId(i)}
									setGroups={setGroups}
								/>
							))
						)}
					</div>
				</div>
			</div>
			{!extensionPropmt && <ExtensionPromptModal setExtensionPrompt={setExtensionPrompt} />}
			{data && <ExportDataModal data={data} setData={setData} />}
			{importDataModal && (
				<ImportDataModal
					importData={importData}
					setImportData={setImportData}
					setImportDataModal={setImportDataModal}
				/>
			)}
			{shortcut && typeof shortcutId === 'number' && (
				<ShortcutEditor
					groupPrefix={groupPrefix}
					shortcutId={shortcutId}
					shortcut={shortcut}
					setShortcut={setShortcut}
					setShortcutId={setShortcutId}
				/>
			)}
		</div>
	);
}
