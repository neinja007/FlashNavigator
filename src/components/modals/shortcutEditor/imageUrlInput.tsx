import { ShortcutType } from '@/app/[[...slug]]/page';
import Link from 'next/link';

type ImageUrlInputProps = {
	shortcut: ShortcutType;
	setShortcut: (shortcut: ShortcutType) => void;
};

const ImageUrlInput = ({ setShortcut, shortcut }: ImageUrlInputProps) => {
	return (
		<div className='space-y-2'>
			<input
				className={'w-full px-2 py-1 border border-black rounded-lg bg-transparent'}
				placeholder='Image URL'
				value={shortcut.img}
				onChange={(e) => {
					setShortcut({
						...shortcut,
						img: e.target.value
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
				>
					search duckduckgo for &quot;{shortcut.name}&quot; images
				</Link>
				.
			</div>
		</div>
	);
};

export default ImageUrlInput;
