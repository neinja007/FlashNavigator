import { useStorageState } from '@/hooks/useStorageState';
import Link from 'next/link';
import Modal from './Modal';

const ExtensionPromptModal = () => {
	const [extensionPropmt, setExtensionPrompt] = useStorageState('extensionPrompt', 'true', 'false');

	return (
		extensionPropmt === 'false' && (
			<Modal>
				<p>
					Please install an extension <b>to redirect new tabs to this page</b>:{' '}
				</p>
				<br />
				<div className='ml-3 space-y-3 text-blue-400 underline'>
					<Link
						href={'https://addons.mozilla.org/en-GB/firefox/addon/new-tab-override'}
						target='_blank'
						className='mb-3 block'
					>
						Extension For Firefox
					</Link>
					<Link
						href={'https://chromewebstore.google.com/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna'}
						target='_blank'
						className='mb-3 block'
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
					className='w-full rounded-lg bg-blue-500 px-2 py-1 active:bg-blue-600'
					onClick={() => {
						setExtensionPrompt('true');
					}}
				>
					{'Done'}
				</button>
			</Modal>
		)
	);
};

export default ExtensionPromptModal;
