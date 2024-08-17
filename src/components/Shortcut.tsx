import { ShortcutType } from '@/app/page';
import { addHTTPProtocolToUrl } from '@/utils/addHTTPProtocolToUrl';
import { convertUrlToExternalImageUrl } from '@/utils/convertUrlToExternalImageUrl';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type ShortcutProps = {
	setShortcutId: () => void;
	shortcut: ShortcutType;
	setGroups: Dispatch<SetStateAction<string[]>>;
	queryResult?: boolean;
	resetSearchBarQuery?: () => void;
};

const Shortcut = ({ setShortcutId, setGroups, queryResult, shortcut, resetSearchBarQuery }: ShortcutProps) => {
	return (
		<div
			className='mb-12 rounded-lg h-fit sm:aspect-square cursor-pointer pb-2 hover:bg-gray-700'
			onContextMenu={(e) => {
				if (queryResult) return;
				e.preventDefault();
				setShortcutId();
			}}
			onClick={() => {
				if (shortcut.name) {
					if (shortcut.group) {
						if (queryResult) {
							if (!resetSearchBarQuery) throw new Error('resetSearchBarQuery is not defined');
							resetSearchBarQuery();
						}
						setGroups([...shortcut.path, shortcut.name]);
					} else if (shortcut.href) {
						window.location.href = addHTTPProtocolToUrl(shortcut.href);
					} else {
						!queryResult && setShortcutId();
					}
				} else {
					!queryResult && setShortcutId();
				}
			}}
		>
			<div className='relative mx-auto w-full h-16 sm:h-full overflow-hidden rounded-t-lg mb-3'>
				{shortcut.img ? (
					<Image
						alt='The Icon has Failed to Load'
						className='m-auto max-w-16 max-h-16 h-16 sm:h-auto sm:max-w-32 sm:max-h-32'
						src={convertUrlToExternalImageUrl(shortcut.img)}
						fill
						sizes='100px'
					/>
				) : (
					<span className='text-6xl sm:text-9xl select-none'>?</span>
				)}
			</div>
			<div className='h-12'>
				{shortcut.name ? (
					<b className={'line-clamp-2 ' + (shortcut.group ? 'text-yellow-400' : 'text-blue-400')}>
						{shortcut.group ? '📁' : '🔗'} {shortcut.name}
					</b>
				) : (
					<span className='text-blue-300 underline cursor-pointer'>Edit Shortcut</span>
				)}
			</div>
		</div>
	);
};

export default Shortcut;
