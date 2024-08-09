'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

type ShortcutProps = {
	setShortcutId: () => void;
	name: string | undefined;
	group: boolean | undefined;
	href: string | undefined;
	img: string | undefined;
};

function isValidURL(string: string) {
	try {
		const url = new URL(string);
		return true;
	} catch (_) {
		return false;
	}
}

const Shortcut = ({ name, group, href, img, setShortcutId }: ShortcutProps) => {
	const pathname = usePathname();

	const router = useRouter();

	return (
		<div
			className='mb-12 rounded-lg aspect-square cursor-pointer hover:bg-gray-700 pb-2'
			onContextMenu={(e) => {
				e.preventDefault();
				setShortcutId();
			}}
			onClick={
				name
					? group
						? () => router.push(pathname + name.replace(' ', '_'))
						: () => {
								window.location.href = href ? (/^https?:\/\//i.test(href) ? href : 'http://' + href) : '';
							}
					: setShortcutId
			}
		>
			<div className='relative mx-auto w-full h-full overflow-hidden rounded-t-lg mb-3'>
				{/* {group && (
					<Image
						src={
							'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpnghq.com%2Fwp-content%2Fuploads%2Fyellow-folder-png-download-free-png-images-62375-300x300.png&f=1&nofb=1&ipt=60e1f50954c62db66369e3f186e6e6776e0f6479034af8eeaddf06ec2bd94028&ipo=images'
						}
						className='grayscale'
						alt='folder'
						fill
						sizes='200px'
					/>
				)} */}
				{img && img.startsWith('https://external-content.duckduckgo.com') && isValidURL(img) ? (
					<Image alt='The Icon has Failed to Load' className='m-auto max-w-32 max-h-32' src={img} fill sizes='100px' />
				) : (
					<span className='text-9xl select-none'>?</span>
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
