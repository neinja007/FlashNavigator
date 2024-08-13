import { addHTTPProtocolToUrl } from '@/utils/addHTTPProtocolToUrl';
import { convertUrlToExternalImageUrl } from '@/utils/convertUrlToExternalImageUrl';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type ShortcutProps = {
	setShortcutId: () => void;
	name: string | undefined;
	group: boolean | undefined;
	href: string | undefined;
	img: string | undefined;
	setGroups: Dispatch<SetStateAction<string[]>>;
};

const Shortcut = ({ name, group, href, img, setShortcutId, setGroups }: ShortcutProps) => {
	return (
		<div
			className='mb-12 rounded-lg h-fit sm:aspect-square cursor-pointer hover:bg-gray-700 pb-2'
			onContextMenu={(e) => {
				e.preventDefault();
				setShortcutId();
			}}
			onClick={
				name && (href || group)
					? group
						? () => setGroups((prev) => [...prev, name.replace(' ', '_')])
						: href
							? () => {
									window.location.href = addHTTPProtocolToUrl(href);
								}
							: setShortcutId
					: setShortcutId
			}
		>
			<div className='relative mx-auto w-full h-16 sm:h-full overflow-hidden rounded-t-lg mb-3'>
				{img ? (
					<Image
						alt='The Icon has Failed to Load'
						className='m-auto max-w-16 max-h-16 h-16 sm:h-auto sm:max-w-32 sm:max-h-32'
						src={convertUrlToExternalImageUrl(img)}
						fill
						sizes='100px'
					/>
				) : (
					<span className='text-6xl sm:text-9xl select-none'>?</span>
				)}
			</div>
			{name ? (
				<b className='line-clamp-2'>
					{group ? '📁' : '🔗'} {name}
				</b>
			) : (
				<span className='text-blue-300 underline cursor-pointer'>Edit Shortcut</span>
			)}
		</div>
	);
};

export default Shortcut;
