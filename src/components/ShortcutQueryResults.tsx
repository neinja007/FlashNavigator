import { ShortcutType } from '@/app/page';
import Shortcut from '@/components/Shortcut';
import { Dispatch, SetStateAction } from 'react';

type ShortcutQueryResultsProps = {
	shortcuts: { [key: string]: ShortcutType };
	searchBarQuery: string;
	resetSearchBarQuery: () => void;
	setGroups: Dispatch<SetStateAction<string[]>>;
	setShortcutId: (id: number) => void;
};

const calculateScore = (shortcut: ShortcutType, searchBarQuery: string) => {
	const startsWithScore = shortcut.name.toLowerCase().startsWith(searchBarQuery.toLowerCase()) ? 1 : 0;
	const nameScore = shortcut.name.toLowerCase().includes(searchBarQuery.toLowerCase()) ? 1 : 0;
	const hrefScore = shortcut.href.toLowerCase().includes(searchBarQuery.toLowerCase()) ? 1 : 0;
	return -(startsWithScore + nameScore + hrefScore);
};

const ShortcutQueryResults = ({
	shortcuts,
	searchBarQuery,
	setGroups,
	setShortcutId,
	resetSearchBarQuery
}: ShortcutQueryResultsProps) => {
	return Object.values(shortcuts)
		.filter(
			(shortcut) =>
				shortcut.href.toLowerCase().includes(searchBarQuery.toLowerCase()) ||
				shortcut.name.toLowerCase().includes(searchBarQuery.toLowerCase())
		)
		.sort((a, b) => calculateScore(a, searchBarQuery) - calculateScore(b, searchBarQuery))
		.map((shortcut, i) => (
			<Shortcut
				queryResult
				resetSearchBarQuery={resetSearchBarQuery}
				key={i}
				shortcut={shortcut}
				setShortcutId={() => setShortcutId(i)}
				setGroups={setGroups}
			/>
		));
};

export default ShortcutQueryResults;
