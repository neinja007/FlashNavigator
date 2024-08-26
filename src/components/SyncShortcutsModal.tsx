import Link from 'next/link';
import Modal from './Modal';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { getShortcutsObject } from '@/utils/getShortcutsObject';
import { getShortcutCount } from '@/utils/getShortcutCount';
import { useContext, useEffect, useState } from 'react';
import { ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, RefreshCw, TriangleAlertIcon } from 'lucide-react';
import { DataContext } from '@/context/DataContext';
import { ListBlobResultBlob } from '@vercel/blob';
import dayjs from 'dayjs';
import { useStorageState } from '@/hooks/useStorageState';

type SyncShortcutsModalProps = {
	setSyncShortcutsModal: (SyncShortcutsModal: boolean) => void;
};

const SyncShortcutsModal = ({ setSyncShortcutsModal }: SyncShortcutsModalProps) => {
	const shortcuts = getShortcutsObject(true);
	const [uploadState, setUploadState] = useState<'error' | 'success' | 'loading' | 'pending'>('pending');
	const [uploadedShortcuts, setUploadedShortcuts] = useState<string>('');
	const [downloadState, setDownloadState] = useState<'error' | 'success' | 'loading'>('loading');
	const [lastServerChange, setLastServerChange] = useState<Date>();

	const { overwriteShortcuts } = useContext(DataContext);

	useEffect(() => {
		download();
	}, []);

	const shortcutData = JSON.stringify({ data: getShortcutsObject(true) });

	const download = () => {
		setDownloadState('loading');
		fetch('/download', { cache: 'no-store' })
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					setDownloadState('error');
				}
			})
			.then((data: ListBlobResultBlob & { data: string }) => {
				setUploadedShortcuts(data.data);
				setLastServerChange(data.uploadedAt);
				setDownloadState('success');
			})
			.catch(() => setDownloadState('error'));
	};

	const upload = () => {
		setUploadState('loading');
		fetch('/upload', {
			method: 'PUT',
			body: shortcutData,
			cache: 'no-store'
		}).then((res) => {
			setUploadState(res.ok ? 'success' : 'error');
			download();
		});
	};

	const localEntries = Object.entries(getShortcutsObject(true));
	const serverEntries = downloadState === 'success' && JSON.parse(uploadedShortcuts);

	const inSync =
		localEntries.every(([key, value]) => serverEntries[key] === value) &&
		localEntries.length === Object.keys(serverEntries).length;

	const lastServerChangeDayjs = lastServerChange && dayjs(lastServerChange);

	const date = lastServerChange && dayjs(lastServerChange).format('DD/MM/YYYY');
	const time = lastServerChange && dayjs(lastServerChange).format('HH:MM');
	const lastServerChangeToday = lastServerChangeDayjs && lastServerChangeDayjs.isSame(dayjs(), 'day');

	const [hideNoticeInFuture, setHideNoticeInFuture] = useStorageState('hideNoticeInFuture', 'true', 'false');

	return (
		<Modal action={() => setSyncShortcutsModal(false)} padding>
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
				<p className='flex items-center justify-center gap-x-2 text-center text-xl font-bold'>
					<RefreshCw className={uploadState === 'loading' || downloadState === 'loading' ? 'animate-spin' : ''} /> Sync
					Shortcuts
				</p>
				<div className='mt-4 flex justify-center'>
					<div className='grid h-fit min-h-16 gap-3 rounded-xl border p-3 sm:w-full sm:grid-cols-3'>
						<div className='flex h-full flex-col justify-center border-b text-center sm:border-b-0 sm:border-r'>
							<span>
								<b>Server</b> ({downloadState === 'success' ? getShortcutCount(uploadedShortcuts) : '??'} shortcuts)
							</span>
							{downloadState === 'loading' && <p className='animate-pulse text-yellow-600'>Loading server data...</p>}
							{downloadState === 'error' && <p className='text-red-400'>Failed to load server data.</p>}
							{lastServerChange && downloadState === 'success' && (
								<p>
									Uploaded {lastServerChangeToday ? 'at' : 'on'} {lastServerChangeToday ? time : date}
								</p>
							)}
						</div>
						<div className='flex justify-between gap-3 sm:flex-col'>
							{!inSync && downloadState !== 'loading' ? (
								<>
									<button
										className='flex w-full justify-between gap-x-2 rounded bg-blue-700 px-2 disabled:opacity-50'
										disabled={uploadState === 'loading'}
										onClick={upload}
									>
										<ChevronsLeft className='hidden sm:inline' />
										<ChevronsUp className='sm:hidden' />
										Upload
										<ChevronsLeft className='hidden sm:inline' />
										<ChevronsUp className='sm:hidden' />
									</button>
									<button
										className='flex w-full justify-between gap-x-2 rounded bg-blue-700 px-2 disabled:opacity-50'
										disabled={uploadState === 'loading' || !uploadedShortcuts || downloadState !== 'success'}
										onClick={() => overwriteShortcuts(uploadedShortcuts)}
									>
										<ChevronsRight className='hidden sm:inline' />
										<ChevronsDown className='sm:hidden' />
										Download
										<ChevronsRight className='hidden sm:inline' />
										<ChevronsDown className='sm:hidden' />
									</button>
								</>
							) : (
								<button
									disabled={downloadState === 'loading' || uploadState === 'loading'}
									className='flex h-full w-full items-center justify-center gap-x-2 rounded bg-blue-700 px-2 disabled:opacity-50'
									onClick={download}
								>
									<RefreshCw
										className={uploadState === 'loading' || downloadState === 'loading' ? 'animate-spin' : ''}
									/>
									{uploadState === 'loading' || downloadState === 'loading' ? 'Fetching...' : 'Refresh'}
								</button>
							)}
						</div>
						<div className='flex h-full flex-col justify-center border-t p-2 text-center sm:border-l sm:border-t-0'>
							<span>
								<b>You</b> ({getShortcutCount(shortcuts)} shortcuts)
							</span>
							{uploadState === 'pending' && <p className='text-green-400'>Client data loaded.</p>}
							{uploadState === 'loading' && <p className='animate-pulse text-yellow-600'>Uploading...</p>}
							{uploadState === 'error' && (
								<p className='text-red-400'>
									Upload failed:{' '}
									{shortcutData.length > 50000
										? `Data too large (${shortcutData.length} > 50000)`
										: 'Unknown error, please report.'}
								</p>
							)}
							{uploadState === 'success' && <p className='text-green-400'>Upload successful.</p>}
						</div>
					</div>
				</div>
				<div className='mt-3 text-center'>
					{downloadState === 'success' && uploadState !== 'loading' ? (
						inSync ? (
							<b className='text-green-500'>Server and client (you) are in sync.</b>
						) : (
							<b className='text-orange-500'>
								Server and client (you) are not in sync.{' '}
								{hideNoticeInFuture === 'true' && (
									<button className='text-blue-500 hover:underline' onClick={() => setHideNoticeInFuture('false')}>
										Learn why
									</button>
								)}
							</b>
						)
					) : (
						<b className='animate-pulse text-gray-500'>Hold on tight...</b>
					)}
				</div>
				{lastServerChange && hideNoticeInFuture === 'false' && (
					<div className='mt-2 rounded-lg border border-yellow-700 bg-yellow-900 p-3'>
						<TriangleAlertIcon className='float-end' />
						<b>Attention</b>
						<p className='mt-2'>
							The latest server data was uploaded at <b>{time}</b> on <b>{date}</b>. <br /> If you have uploaded data
							since then, it may take a few minutes for the server to update. Thank you for your patience.
							<button
								className='float-end rounded-lg px-2 text-blue-500 backdrop-brightness-50 hover:underline'
								onClick={() => setHideNoticeInFuture('true')}
							>
								hide this notice in future
							</button>
						</p>
					</div>
				)}
			</SignedIn>
		</Modal>
	);
};

export default SyncShortcutsModal;
