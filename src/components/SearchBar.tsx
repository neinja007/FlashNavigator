import { ShortcutType } from '@/app/[[...slug]]/page';
import { useRouter } from 'next/navigation';

type SearchBarProps = {
	shortcuts: { [key: string]: ShortcutType };
	searchBarQuery: string;
	setSearchBarQuery: (query: string) => void;
};

const SearchBar = ({ shortcuts, searchBarQuery, setSearchBarQuery }: SearchBarProps) => {
	const router = useRouter();

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const primaryResult = Object.values(shortcuts).find(
					(shortcut) =>
						shortcut.name.toLowerCase().includes(searchBarQuery.toLowerCase()) ||
						(shortcut.href && shortcut.href.toLowerCase().includes(searchBarQuery.toLowerCase()))
				);
				if (primaryResult) {
					router.push(/^https?:\/\//i.test(primaryResult.href) ? primaryResult.href : 'http://' + primaryResult.href);
				} else {
					router.push(`https://duckduckgo.com/?t=ffab&q=${searchBarQuery}&atb=v376-1&ia=web`);
				}
			}}
		>
			<input
				type='text'
				className={'p-3 px-5 max-w-[500px] text-xl w-full border bg-transparent rounded-full mt-4'}
				autoFocus
				value={searchBarQuery}
				onChange={(e) => setSearchBarQuery(e.target.value)}
				onSubmit={() => setSearchBarQuery('')}
			/>
		</form>
	);
};

export default SearchBar;
