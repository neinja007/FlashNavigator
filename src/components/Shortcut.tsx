import { ShortcutType } from '@/app/page';
import { DataContext } from '@/context/DataContext';
import { addHTTPProtocolToUrl } from '@/utils/addHTTPProtocolToUrl';
import { convertUrlToExternalImageUrl } from '@/utils/convertUrlToExternalImageUrl';
import clsx from 'clsx';
import Image from 'next/image';
import { Dispatch, SetStateAction, useContext } from 'react';

type ShortcutProps = {
	setShortcutId?: () => void;
	shortcut: ShortcutType;
	setGroups: Dispatch<SetStateAction<string[]>>;
	queryResult?: boolean;
	resetSearchBarQuery?: () => void;
	active?: boolean;
};

const Shortcut = ({ setShortcutId, setGroups, queryResult, shortcut, resetSearchBarQuery, active }: ShortcutProps) => {
	const { settings } = useContext(DataContext);

	return (
		(!settings.hideEmptyShortcuts || shortcut.name || shortcut.href || shortcut.img) && (
			<div
				className={clsx(
					'group h-fit w-[calc(33.33%-12px)] cursor-pointer rounded-lg border pb-2 shadow-md transition-colors hover:border-blue-400 hover:shadow-blue-400 sm:w-[calc(25%-12px)] md:w-[calc(16.66%-12px)] xl:w-[calc(12.5%-12px)]',
					active ? 'border-blue-300 shadow-blue-400' : 'border-gray-700 shadow-gray-700',
					settings.shortcutTypeColor && shortcut.name
						? shortcut.group
							? 'bg-green-950'
							: 'bg-blue-950'
						: 'bg-neutral-950'
				)}
				onContextMenu={(e) => {
					if (queryResult) return;
					e.preventDefault();
					setShortcutId && setShortcutId();
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
							!queryResult && setShortcutId && setShortcutId();
						}
					} else {
						!queryResult && setShortcutId && setShortcutId();
					}
				}}
			>
				<div className='relative mx-auto aspect-square w-full overflow-hidden rounded-t-lg'>
					{shortcut.img ? (
						<Image
							alt='The Icon has Failed to Load'
							className='m-auto h-full max-h-20 w-full max-w-20 transition-all group-hover:saturate-200 sm:max-h-24 sm:max-w-24 lg:max-h-28 lg:max-w-28'
							src={convertUrlToExternalImageUrl(shortcut.img)}
							fill
							sizes={(settings.imageQuality * 3).toString() + 'px'}
							quality={settings.imageQuality}
						/>
					) : (
						<span className='select-none text-6xl sm:text-9xl'>+</span>
					)}
				</div>
				<div className={'flex h-12 flex-col justify-center overflow-visible transition-all group-hover:-translate-y-2'}>
					{shortcut.name ? (
						<b className={'mx-2 line-clamp-2'}>
							{!settings.hideShortcutIcons && (shortcut.group ? '📁' : '🔗')} {shortcut.name}
						</b>
					) : (
						<span className='cursor-pointer text-blue-300 underline'>Edit Shortcut</span>
					)}
				</div>
			</div>
		)
	);
};

export default Shortcut;
