import { addHTTPProtocolToUrl } from './addHTTPProtocolToUrl';

export const convertUrlToExternalImageUrl = (url: string): string => {
	const baseUrl = 'https://external-content.duckduckgo.com/iu/?u=';
	return baseUrl + addHTTPProtocolToUrl(url);
};
