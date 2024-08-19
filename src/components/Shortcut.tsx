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
	hideShortcutIcons?: string;
	hideEmptyShortcuts?: string;
	shortcutTypeColor?: string;
	imageQuality?: string;
};

const Shortcut = ({
	setShortcutId,
	setGroups,
	queryResult,
	shortcut,
	resetSearchBarQuery,
	hideEmptyShortcuts,
	hideShortcutIcons,
	imageQuality,
	shortcutTypeColor
}: ShortcutProps) => {
	return (
		(hideEmptyShortcuts === 'false' || shortcut.name || shortcut.href || shortcut.img) && (
			<div
				className='mb-3 rounded-lg w-1/4 md:w-1/6 xl:w-1/8 h-fit aspect-square cursor-pointer pb-2 hover:bg-gray-700'
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
				<div className='relative mx-auto h-full w-full overflow-hidden rounded-t-lg'>
					{shortcut.img ? (
						<Image
							alt='The Icon has Failed to Load'
							className='m-auto w-full h-fit max-w-20 max-h-20 sm:max-w-24 sm:max-h-24 lg:max-w-32 lg:max-h-32'
							src={convertUrlToExternalImageUrl(shortcut.img)}
							fill
							sizes={((parseInt(imageQuality || '75') || 75) * 3).toString() + 'px'}
							quality={parseInt(imageQuality || '75') || 75}
						/>
					) : (
						<span className='text-6xl sm:text-9xl select-none'>?</span>
					)}
				</div>
				<div className='h-12'>
					{shortcut.name ? (
						<b
							className={
								'line-clamp-2 ' +
								(shortcutTypeColor === 'true' ? (shortcut.group ? 'text-yellow-400' : 'text-blue-400') : 'text-white')
							}
						>
							{hideShortcutIcons === 'false' && (shortcut.group ? '📁' : '🔗')} {shortcut.name}
						</b>
					) : (
						<span className='text-blue-300 underline cursor-pointer'>Edit Shortcut</span>
					)}
				</div>
			</div>
		)
	);
};

export default Shortcut;
