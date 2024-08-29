export const dynamicJoin = (items: string[] | string, char: string) => {
	if (typeof items === 'object') {
		return items
			.reduce((acc: string[], cur) => {
				cur.trim() && acc.push(cur);
				return acc;
			}, [])
			.join(char);
	} else {
		return items;
	}
};
