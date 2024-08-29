export const stripLastItem = (items: string, char: string) => {
	return items
		.split(char)
		.slice(0, items.split(char).length - 1)
		.join(char);
};
