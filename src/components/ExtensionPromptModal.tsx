import { useStorageState } from '@/hooks/useStorageState';
import Link from 'next/link';
import Modal from './Modal';
import { DataContext } from '@/context/DataContext';
import { useContext, useEffect } from 'react';

const ExtensionPromptModal = () => {
	const [extensionPrompt, setExtensionPrompt] = useStorageState('extensionPrompt', 'true', 'false');
	const { settings, updateSettings } = useContext(DataContext);

	useEffect(() => {
		const searchEngine =
			['duckduckgo', 'bing', 'google', 'other'].find((engine) => navigator.userAgent.toLowerCase().includes(engine)) ||
			'other';

		updateSettings('searchEngine', searchEngine);
	}, [updateSettings]);

	return (
		extensionPrompt === 'false' && (
			<Modal padding>
				<div className='mb-4 text-center text-2xl'>Welcome to FlashNavigator!</div>
				<div className='w-full'>
					<label htmlFor='search_engine'>Please specify your (preferred) search engine: </label>
					<select
						id='search_engine'
						value={settings.searchEngine}
						onChange={(e) => updateSettings('searchEngine', e.target.value)}
						className='ml-2 rounded-md border bg-black px-2'
					>
						<option value='duckduckgo'>DuckDuckGo</option>
						<option value='bing'>Bing</option>
						<option value='google'>Google</option>
						<option value='other'>Other</option>
					</select>
					<p className='mt-3'>
						This will allow us to redirect you to the search engine of your choice when you search with the
						FlashNavigator search bar.
					</p>
				</div>
				<hr className='my-7 border-gray-600' />
				<p>
					Please install an extension <b>to redirect new tabs to FlashNavigator</b>:{' '}
				</p>
				<br />
				<div className='ml-5 text-blue-400 underline'>
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
				<div className='my-5 space-y-4'>
					<p>
						<b>Step 1</b>: use this URL as the new tab URL: <br />
						<b className='select-all text-yellow-300 underline'>flash-navigator.vercel.app</b>{' '}
						<button
							className='text-blue-500 hover:underline'
							onClick={() => navigator.clipboard.writeText('https://flash-navigator.vercel.app')}
						>
							[copy link]
						</button>
					</p>
					<p>
						<b>Step 2</b>: If present, activate a setting that sets the focus on the new web page instead of the address
						bar.
					</p>
					<p>
						<b>Step 3</b>: Some browsers (like Firefox) require you to also set the home page to{' '}
						<b className='select-all text-yellow-300 underline'>flash-navigator.vercel.app</b>.
					</p>
				</div>
				<button
					className='w-full rounded-lg bg-blue-500 px-2 py-1 active:bg-blue-600'
					onClick={() => {
						setExtensionPrompt('true');
					}}
				>
					{'Close this window'}
				</button>
			</Modal>
		)
	);
};

export default ExtensionPromptModal;
