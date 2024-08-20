import Link from 'next/link';
import Modal from './Modal';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { getShortcutCount } from '@/utils/getShortcutCount';
import { useContext, useEffect, useState } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { DataContext } from '@/context/DataContext';

type SyncSettingsModalProps = {
	setSyncSettingsModal: (syncSettingsModal: boolean) => void;
};

const SyncSettingsModal = ({ setSyncSettingsModal }: SyncSettingsModalProps) => {
	const shortcuts = getShortcutsObject(true);
	const [uploadState, setUploadState] = useState<'error' | 'success' | 'loading' | 'pending'>('pending');
	const [uploadedShortcuts, setUploadedShortcuts] = useState<string>('');
	const [downloadState, setDownloadState] = useState<'error' | 'success' | 'loading'>('loading');

	const { overwriteShortcuts } = useContext(DataContext);

	useEffect(() => {
		if (uploadState !== 'loading') {
			setDownloadState('loading');
			fetch('/download', { cache: 'no-store' })
				.then((res) => {
					if (res.ok) {
						return res.json();
					} else {
						setDownloadState('error');
					}
				})
				.then((data) => {
					console.log(data);
					setUploadedShortcuts(data.data);
					setDownloadState('success');
				})
				.catch(() => setDownloadState('error'));
		}
	}, [uploadState]);

	const upload = () => {
		setUploadState('loading');
		fetch('/upload', { method: 'PUT', body: JSON.stringify({ data: getShortcutsObject(true) }) }).then((res) => {
			setUploadState(res.ok ? 'success' : 'error');
		});
	};

	const localEntries = Object.entries(getShortcutsObject(true));
	const serverEntries = downloadState === 'success' && JSON.parse(uploadedShortcuts);

	for (let [key, value] of localEntries) {
		downloadState === 'success' && value !== serverEntries[key] && console.log(value, serverEntries[key]);
	}

	const inSync = localEntries.every(([key, value]) => serverEntries[key] === value);

	return (
		<Modal action={() => setSyncSettingsModal(false)} padding>
			<SignedOut>
				<b>
					You have to sign in to use this feature.{' '}
					<Link href={'/sign-in'} className='text-blue-400 hover:underline'>
						Sign in here
					</Link>
					, or{' '}
					<Link href={'/sign-in'} className='text-blue-400 hover:underline'>
						create an account
					</Link>
					.
				</b>
			</SignedOut>
			<SignedIn>
				<p className='text-center text-xl font-bold'>Sync Shortcuts</p>
				<div className='mt-3 grid h-16 grid-cols-3'>
					<div className='flex h-full flex-col justify-center border-r text-center'>
						<span>
							<b>Server</b> ({downloadState === 'success' ? getShortcutCount(uploadedShortcuts) : '??'} shortcuts)
						</span>
						{downloadState === 'loading' && <p className='animate-pulse text-yellow-600'>Loading server data...</p>}
						{downloadState === 'error' && <p className='text-red-400'>Failed to load server data.</p>}
						{downloadState === 'success' && <p className='text-green-400'>Server data loaded.</p>}
					</div>
					<div className='flex flex-col justify-between px-3'>
						<button
							className='flex w-full justify-between gap-x-2 rounded bg-blue-500 px-2 disabled:opacity-50'
							disabled={uploadState === 'loading'}
							onClick={upload}
						>
							<ChevronsLeft />
							Upload
							<ChevronsLeft />
						</button>
						<button
							className='flex w-full justify-between gap-x-2 rounded bg-blue-500 px-2 disabled:opacity-50'
							disabled={uploadState === 'loading' || !uploadedShortcuts || downloadState === 'loading'}
							onClick={() => overwriteShortcuts(uploadedShortcuts)}
						>
							<ChevronsRight />
							Download
							<ChevronsRight />
						</button>
					</div>
					<div className='flex h-full flex-col justify-center border-l text-center'>
						<span>
							<b>You</b> ({getShortcutCount(shortcuts)} shortcuts)
						</span>
						{uploadState === 'loading' && <p className='animate-pulse text-yellow-600'>Uploading...</p>}
						{uploadState === 'error' && <p className='text-red-400'>Upload failed.</p>}
						{uploadState === 'success' && <p className='text-green-400'>Upload successful.</p>}
					</div>
				</div>
				<div className='mt-3 text-center'>
					{downloadState === 'success' ? (
						inSync ? (
							<b className='text-green-500'>Server and client (you) are in sync.</b>
						) : (
							<b className='text-orange-500'>Server and client (you) are not in sync.</b>
						)
					) : null}
				</div>
			</SignedIn>
		</Modal>
	);
};

export default SyncSettingsModal;
