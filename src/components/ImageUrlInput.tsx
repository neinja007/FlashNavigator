import { ShortcutType } from '@/app/page';
import Link from 'next/link';

type ImageUrlInputProps = {
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
};

const ImageUrlInput = ({ setShortcut, shortcut }: ImageUrlInputProps) => {
	return (
		<div className='space-y-2'>
			<input
				className={
					'w-full rounded-lg border bg-transparent px-2 py-1 ' +
					(shortcut.img.length >= 500 ? 'border-red-500' : 'border-black')
				}
				placeholder='Image URL'
				value={shortcut.img}
				onChange={(e) => {
					setShortcut({
						...shortcut,
						img: e.target.value.slice(0, 500)
					});
				}}
			/>
			<div>
				You can{' '}
				{!shortcut.group && (
					<>
						<button
							className='text-blue-400 hover:underline'
							onClick={() =>
								setShortcut({
									...shortcut,
									img: `${
										shortcut.href.startsWith('http') ? shortcut.href.split('/')[2] : shortcut.href.split('/')[0]
									}/favicon.ico`
								})
							}
						>
							use the site&apos;s favicon
						</button>{' '}
						or{' '}
					</>
				)}
				<Link
					className='text-blue-400 hover:underline'
					href={`https://duckduckgo.com/?q="${shortcut.name || 'search for something!'}"&iar=images&iax=images&ia=images&iaf=type%3Atransparent%2Csize%3ASmall`}
					target='_blank'
				>
					search duckduckgo for &quot;{shortcut.name}&quot; images
				</Link>
				.
			</div>
		</div>
	);
};

export default ImageUrlInput;
