import { ShortcutType } from '@/app/page';
import Shortcut from '@/components/Shortcut';
import { orderShortcutsByRelevance } from '@/utils/calculateShortcutRelevanceScore';
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
	return orderShortcutsByRelevance(Object.values(shortcuts), searchBarQuery).map((shortcut, i) => (
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
