'use client';
import { useContext, useEffect, useState } from 'react';
import Breadcrums from '@/components/Breadcrums';
import ManageData from '@/components/ManageData';
import SearchBar from '@/components/SearchBar';
import ExtensionPromptModal from '@/components/ExtensionPromptModal';
import ShortcutQueryResults from '@/components/ShortcutQueryResults';
import ShortcutEditor from '@/components/ShortcutEditor';
import Shortcut from '@/components/Shortcut';
import { DataContext } from '@/context/DataContext';
import { orderShortcutsByRelevance } from '@/utils/calculateShortcutRelevanceScore';
import { useRouter } from 'next/navigation';
import { addHTTPProtocolToUrl } from '@/utils/addHTTPProtocolToUrl';

export type ShortcutType = {
	name: string;
	group: boolean;
	href: string;
	img: string;
	path: string[];
};

export default function Root() {
	const router = useRouter();

	const [searchBarQuery, setSearchBarQuery] = useState('');

	const { shortcuts, settings } = useContext(DataContext);

	const [activeShortcutId, setActiveShortcutId] = useState<number | null>(null);
	const [activeShortcut, setActiveShortcut] = useState<ShortcutType | null>();
	const [groups, setGroups] = useState<string[]>([]);

	const groupPrefix = groups.length > 0 ? groups.map((slug) => slug.replaceAll(' ', '_')).join('-') + '-' : '';

	const [searchResults, setSearchResults] = useState<ShortcutType[] | []>([]);
	const [searchResultsIndex, setSearchResultsIndex] = useState<number>(0);

	useEffect(() => {
		if (searchBarQuery) {
			setSearchResults(orderShortcutsByRelevance(Object.values(shortcuts), searchBarQuery));
			setSearchResultsIndex(0);
		} else {
			setSearchResults([]);
			setSearchResultsIndex(0);
		}
	}, [searchBarQuery, shortcuts]);

	const openResult: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
		e.preventDefault();
		const primaryResult = searchResults[searchResultsIndex];
		if (primaryResult) {
			if (primaryResult.href) {
				router.push(/^https?:\/\//i.test(primaryResult.href) ? primaryResult.href : 'http://' + primaryResult.href);
			} else {
				if (primaryResult.group) {
					setSearchBarQuery('');
					setGroups([...primaryResult.path, primaryResult.name]);
				}
			}
		} else {
			if (searchBarQuery.includes('http') || (searchBarQuery.includes('.') && !searchBarQuery.includes(' '))) {
				router.push(addHTTPProtocolToUrl(searchBarQuery));
			} else {
				router.push(`https://duckduckgo.com/?t=ffab&q=${searchBarQuery}&atb=v376-1&ia=web`);
			}
		}
	};

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
				<button
					onClick={() => setSearchBarQuery('')}
					className='text-4xl font-bold italic transition-all hover:text-5xl hover:text-sky-500'
				>
					⚡<span className='text-yellow-300'>Flash</span>
					<span>Navigator</span>
				</button>
				<br />
				<SearchBar
					searchBarQuery={searchBarQuery}
					setSearchBarQuery={setSearchBarQuery}
					onSubmit={openResult}
					nextResult={() => setSearchResultsIndex((prev) => (prev + 1) % searchResults.length)}
				/>
				<div className='mt-8'>
					{!searchBarQuery && (
						<div className='flex min-h-16 items-center justify-center pb-5 text-center sm:justify-between'>
							<Breadcrums groups={groups} setGroups={setGroups} />
							<ManageData />
						</div>
					)}
					<div className='group/shortcuts flex flex-wrap justify-center gap-3 rounded-lg text-xs sm:text-base'>
						{searchBarQuery && shortcuts ? (
							<ShortcutQueryResults
								searchResults={searchResults}
								setGroups={setGroups}
								searchResultsIndex={searchResultsIndex}
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
						<span className='text-gray-300 group-has-[div]/shortcuts:hidden'>
							{searchBarQuery
								? `Search for "${searchBarQuery}" with ${settings.searchEngine}`
								: 'This folder does not contain any shortcuts.'}
						</span>
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
