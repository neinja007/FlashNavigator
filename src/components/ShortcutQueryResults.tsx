import { ShortcutType } from '@/app/page';
import Shortcut from '@/components/Shortcut';
import { Dispatch, SetStateAction } from 'react';

type ShortcutQueryResultsProps = {
	searchResults: ShortcutType[];
	setGroups: Dispatch<SetStateAction<string[]>>;
	searchResultsIndex: number;
};

const ShortcutQueryResults = ({ searchResults, setGroups, searchResultsIndex }: ShortcutQueryResultsProps) => {
	return searchResults.map((shortcut, i) => (
		<Shortcut queryResult key={i} shortcut={shortcut} setGroups={setGroups} active={searchResultsIndex === i} />
	));
};

export default ShortcutQueryResults;
