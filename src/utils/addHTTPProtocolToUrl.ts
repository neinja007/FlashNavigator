export const addHTTPProtocolToUrl = (url: string): string => {
	return url.startsWith('http') ? url : 'https://' + url;
};
