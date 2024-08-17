import { ShortcutType } from '@/app/page';

const calculateShortcutRelevanceScore = (shortcut: ShortcutType, searchBarQuery: string): number => {
	const startsWithScore = shortcut.name.toLowerCase().startsWith(searchBarQuery.toLowerCase()) ? 1 : 0;
	const nameScore = shortcut.name.toLowerCase().includes(searchBarQuery.toLowerCase()) ? 1 : 0;
	const hrefScore = shortcut.href.toLowerCase().includes(searchBarQuery.toLowerCase()) ? 1 : 0;
	return -(startsWithScore + nameScore + hrefScore);
};

export const orderShortcutsByRelevance = (shortcuts: ShortcutType[], searchBarQuery: string): ShortcutType[] => {
	return shortcuts
		.filter(
			(shortcut) =>
				shortcut.href.toLowerCase().includes(searchBarQuery.toLowerCase()) ||
				shortcut.name.toLowerCase().includes(searchBarQuery.toLowerCase())
		)
		.sort(
			(a, b) => calculateShortcutRelevanceScore(a, searchBarQuery) - calculateShortcutRelevanceScore(b, searchBarQuery)
		);
};
