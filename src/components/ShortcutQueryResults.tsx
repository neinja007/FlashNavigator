import { ShortcutType } from '@/app/page';
import Shortcut from '@/components/Shortcut';
import { Dispatch, SetStateAction } from 'react';

type ShortcutQueryResultsProps = {
	searchResults: ShortcutType[];
	setGroups: Dispatch<SetStateAction<string[]>>;
	searchResultsIndex: number;
};

const ShortcutQueryResults = ({ searchResults, setGroups, searchResultsIndex }: ShortcutQueryResultsProps) => {
	return searchResults.length > 0 ? (
		searchResults.map((shortcut, i) => (
			<Shortcut
				queryResult
				key={shortcut.name + i}
				shortcut={shortcut}
				setGroups={setGroups}
				active={searchResultsIndex === i}
			/>
		))
	) : (
		<span className='text-gray-500'>None of your shortcuts match the search term</span>
	);
};

export default ShortcutQueryResults;
