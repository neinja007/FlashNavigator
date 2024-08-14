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

const ShortcutQueryResults = ({
	shortcuts,
	searchBarQuery,
	setGroups,
	setShortcutId,
	resetSearchBarQuery
}: ShortcutQueryResultsProps) => {
	return Object.values(shortcuts).map(
		(shortcut, i) =>
			(shortcut.name.toLowerCase().includes(searchBarQuery.toLowerCase()) ||
				(shortcut.href && shortcut.href.toLowerCase().includes(searchBarQuery.toLowerCase()))) && (
				<Shortcut
					queryResult
					resetSearchBarQuery={resetSearchBarQuery}
					key={i}
					shortcut={shortcut}
					setShortcutId={() => setShortcutId(i)}
					setGroups={setGroups}
				/>
			)
	);
};

export default ShortcutQueryResults;
