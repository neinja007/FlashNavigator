import { ShortcutType } from '@/app/page';
import { addHTTPProtocolToUrl } from '@/utils/addHTTPProtocolToUrl';
import { orderShortcutsByRelevance } from '@/utils/calculateShortcutRelevanceScore';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type SearchBarProps = {
	shortcuts: { [key: string]: ShortcutType } | undefined;
	searchBarQuery: string;
	setSearchBarQuery: (query: string) => void;
	setGroups: Dispatch<SetStateAction<string[]>>;
};

const SearchBar = ({ shortcuts, searchBarQuery, setSearchBarQuery, setGroups }: SearchBarProps) => {
	const router = useRouter();

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const primaryResult = shortcuts && orderShortcutsByRelevance(Object.values(shortcuts), searchBarQuery)[0];
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
					if (searchBarQuery.includes('http') || searchBarQuery.includes('.')) {
						router.push(addHTTPProtocolToUrl(searchBarQuery));
					} else {
						router.push(`https://duckduckgo.com/?t=ffab&q=${searchBarQuery}&atb=v376-1&ia=web`);
					}
				}
			}}
		>
			<input
				type='text'
				placeholder='FlashSearch'
				className='p-3 px-5 max-w-[500px] text-xl w-full border bg-transparent rounded-full mt-4'
				autoFocus
				value={searchBarQuery}
				onChange={(e) => setSearchBarQuery(e.target.value)}
				onSubmit={() => setSearchBarQuery('')}
			/>
		</form>
	);
};

export default SearchBar;
