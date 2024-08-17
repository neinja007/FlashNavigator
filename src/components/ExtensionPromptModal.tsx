import { useStorageState } from '@/hooks/useStorageState';
import Link from 'next/link';
import ModalBackgroundFrame from './ModalBackgroundFrame';

const ExtensionPromptModal = () => {
	const [extensionPropmt, setExtensionPrompt] = useStorageState('extensionPrompt', 'true', 'false');

	return (
		extensionPropmt === 'false' && (
			<>
				<ModalBackgroundFrame />
				<div className='fixed bg-gray-700 shadow-lg rounded-xl inset-0 mx-auto my-auto p-5 w-[700px] h-fit text-xl'>
					<p>
						Please install an extension <b>to redirect new tabs to this page</b>:{' '}
					</p>
					<br />
					<div className='text-blue-400 underline ml-3 space-y-3'>
						<Link
							href={'https://addons.mozilla.org/en-GB/firefox/addon/new-tab-override'}
							target='_blank'
							className='block mb-3'
						>
							Extension For Firefox
						</Link>
						<Link
							href={'https://chromewebstore.google.com/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna'}
							target='_blank'
							className='block mb-3'
						>
							Extension For Google
						</Link>
					</div>
					<br />
					<p>
						<b>Step 1</b>: use this URL as the new tab URL: <br />
						<b className='text-blue-400 underline'>flash-navigator.vercel.app</b>{' '}
						<button onClick={() => navigator.clipboard.writeText('https://flash-navigator.vercel.app')}>
							[copy link]
						</button>
					</p>
					<br />
					<p>
						<b>Step 2</b>: If possible, activate the &quot;Set focus on the web page instead of the address bar&quot;
						option in the extension settings.
					</p>
					<br />
					<button
						className='px-2 bg-blue-500 active:bg-blue-600 rounded-lg w-full py-1'
						onClick={() => {
							setExtensionPrompt('true');
						}}
					>
						{'Done'}
					</button>
				</div>
			</>
		)
	);
};

export default ExtensionPromptModal;
