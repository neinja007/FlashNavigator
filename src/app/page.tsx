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
import { useStorageState } from './hooks/useStorageState';
import Shortcut from '@/components/Shortcut';
import { getNestedShortcuts } from '@/utils/getNestedShortcuts';

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

	const [extensionPropmt, setExtensionPrompt] = useStorageState('extensionPrompt', 'true', 'false');

	const [dataToExport, setDataToExport] = useState('');
	const [importDataModal, setImportDataModal] = useState(false);
	const [dataToImport, setDataToImport] = useState('');

	const [localStorageSize, setLocalStorageSize] = useState<number>(0);
	useEffect(() => {
		setLocalStorageSize(localStorage.length);
	}, []);

	const [searchBarQuery, setSearchBarQuery] = useState('');

	const groupPrefix = groups.length > 0 ? groups.map((slug) => slug.replaceAll(' ', '_')).join('-') + '-' : '';

	useEffect(() => {
		setShortcuts(getNestedShortcuts());
		setLocalStorageSize(localStorage.length);
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
							<ManageData
								localStorageSize={localStorageSize}
								setData={setDataToExport}
								setImportDataModal={setImportDataModal}
								setLocalStorageSize={setLocalStorageSize}
							/>
						</div>
					)}
					<div className='grid grid-cols-4 xl:grid-cols-8 gap-5 rounded-lg px-3 py-3 text-xs sm:text-base'>
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
			{extensionPropmt === 'false' && <ExtensionPromptModal setExtensionPrompt={setExtensionPrompt} />}
			{dataToExport && <ExportDataModal data={dataToExport} setData={setDataToExport} />}
			{importDataModal && (
				<ImportDataModal
					setLocalStorageSize={setLocalStorageSize}
					importData={dataToImport}
					setImportData={setDataToImport}
					setImportDataModal={setImportDataModal}
				/>
			)}
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
