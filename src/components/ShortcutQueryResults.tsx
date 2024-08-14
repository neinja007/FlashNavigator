import { ShortcutType } from '@/app/page';
import Shortcut from '@/components/Shortcut';
import { Dispatch, SetStateAction } from 'react';

type ShortcutQueryResultsProps = {
	shortcuts: { [key: string]: ShortcutType };
	searchBarQuery: string;
	setGroups: Dispatch<SetStateAction<string[]>>;
	setShortcutId: (id: number) => void;
};

const ShortcutQueryResults = ({ shortcuts, searchBarQuery, setGroups, setShortcutId }: ShortcutQueryResultsProps) => {
	return Object.values(shortcuts).map(
		(shortcut, i) =>
			(shortcut.name.toLowerCase().includes(searchBarQuery.toLowerCase()) ||
				(shortcut.href && shortcut.href.toLowerCase().includes(searchBarQuery.toLowerCase()))) && (
				<Shortcut
					key={i}
					name={shortcut.name.replaceAll('_', ' ')}
					group={shortcut.group}
					img={shortcut.img}
					href={shortcut.href}
					setShortcutId={() => setShortcutId(i)}
					setGroups={setGroups}
				/>
			)
	);
};

export default ShortcutQueryResults;
