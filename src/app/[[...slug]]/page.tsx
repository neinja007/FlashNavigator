'use client';

import Shortcut from '@/components/shortcut';
import Link from 'next/link';
import { Fragment, useEffect, useId, useState } from 'react';
import { getNestedShortcuts, getShortcutsObject, refreshStorage } from '../utils/utils';

export type Shortcut = {
	name: string;
	group: boolean;
	href: string;
	img: string;
};

export default function Home() {
	const [shortcutId, setShortcutId] = useState<number | null>(null);
	const [shortcut, setShortcut] = useState<Shortcut | null>();
	const [shortcuts, setShortcuts] = useState<{ [key: string]: Shortcut }>({});
	const [hide, setHide] = useState(false);
	const [groups, setGroups] = useState<string[]>([]);

	const [extensionPropmt, setExtensionPrompt] = useState(true);

	useEffect(() => {
		setExtensionPrompt(localStorage.getItem('extensionPrompt') === 'true');
	}, []);

	useEffect(() => {
		setHide(localStorage.getItem('hide') === 'true');
	}, [hide]);

	const [data, setData] = useState('');
	const [importDataModal, setImportDataModal] = useState(false);
	const [importData, setImportData] = useState('');
	const [localStorageSize, setLocalStorageSize] = useState<number>();

	useEffect(() => {
		setLocalStorageSize(localStorage.length);
	}, []);

	const [searchBar, setSearchBar] = useState('');

	const groupPrefix = groups.length > 0 ? groups.map((slug) => slug.replace(' ', '_')).join('-') + '-' : '';

	useEffect(() => {
		setShortcuts(getNestedShortcuts(localStorage));
	}, [groupPrefix, shortcutId]);

	useEffect(() => {
		setShortcut(
			typeof shortcutId === 'number'
				? {
						name: (localStorage.getItem(`shortcut-${groupPrefix}${shortcutId}-name`) || '').replace('_', ' '),
						group: localStorage.getItem(`shortcut-${groupPrefix}${shortcutId}-group`) === 'true',
						img: localStorage.getItem(`shortcut-${groupPrefix}${shortcutId}-img`) || '',
						href: localStorage.getItem(`shortcut-${groupPrefix}${shortcutId}-href`) || ''
					}
				: null
		);
	}, [groupPrefix, shortcutId]);

	useEffect(() => {
		if (shortcut && typeof shortcutId === 'number') {
			localStorage.setItem(`shortcut-${groupPrefix}${shortcutId}-name`, shortcut.name);
			localStorage.setItem(`shortcut-${groupPrefix}${shortcutId}-group`, shortcut.group.toString());
			localStorage.setItem(`shortcut-${groupPrefix}${shortcutId}-href`, shortcut.href);
			localStorage.setItem(`shortcut-${groupPrefix}${shortcutId}-img`, shortcut.img);
		}
	}, [groupPrefix, shortcut, shortcutId]);

	const id = useId();

	return (
		<div className='block text-white container'>
			<div className='text-center'>
				<Link href={'/'} className='text-4xl font-bold italic'>
					⚡<span className='text-yellow-300'>Flash</span>
					<span>Navigator</span>
				</Link>
				<br />
				<input
					type='text'
					className={'p-3 px-5 max-w-[500px] text-xl w-full border bg-transparent rounded-full mt-4'}
					autoFocus
					value={searchBar}
					onChange={(e) => setSearchBar(e.target.value)}
				/>
				<div className='mt-8'>
					<div className='sm:flex justify-between pb-5'>
						<div>
							{['', ...groups].map((group, i) => (
								<Fragment key={i}>
									<button
										onClick={() => setGroups((prev) => prev.slice(0, i))}
										className='px-2 py-1 mx-2 rounded-lg bg-blue-800 text-white'
									>
										{group || 'Home'}
									</button>
									{groups.length !== i && '>'}
								</Fragment>
							))}
						</div>
						<div className='space-x-3'>
							<button
								className='text-blue-500 underline'
								onClick={() => {
									localStorage.setItem('hide', hide ? 'false' : 'true');
									setHide(!hide);
								}}
							>
								{hide ? 'show' : 'hide'} empty slots
							</button>
							<button
								className='text-yellow-400 hover:underline'
								onClick={() => setData(JSON.stringify(getShortcutsObject(localStorage)))}
							>
								Export Data to JSON
							</button>
							<button className='text-white hover:underline' onClick={() => setImportDataModal(true)}>
								Import Data
							</button>
							<button className='text-red-500 hover:underline' onClick={() => refreshStorage(localStorage)}>
								Refresh Storage (Size: {localStorageSize || 0})
							</button>
						</div>
					</div>
					<div className='grid grid-cols-4 xl:grid-cols-8 gap-5 rounded-lg px-3 py-3 text-xs sm:text-base'>
						{searchBar
							? Object.values(shortcuts).map(
									(shortcut, i) =>
										shortcut.name.toLowerCase().includes(searchBar.toLowerCase()) &&
										(shortcut.href || shortcut.group) && (
											<Shortcut
												key={i}
												hideIfEmpty={hide}
												name={shortcut.name.replace('_', ' ')}
												group={shortcut.group}
												img={shortcut.img}
												href={shortcut.href}
												setShortcutId={() => setShortcutId(i)}
												setGroups={setGroups}
											/>
										)
								)
							: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
									<Shortcut
										key={i}
										hideIfEmpty={hide}
										name={shortcuts['shortcut-' + groupPrefix + i]?.name.replace('_', ' ')}
										group={shortcuts['shortcut-' + groupPrefix + i]?.group}
										img={shortcuts['shortcut-' + groupPrefix + i]?.img}
										href={shortcuts['shortcut-' + groupPrefix + i]?.href}
										setShortcutId={() => setShortcutId(i)}
										setGroups={setGroups}
									/>
								))}
					</div>
				</div>
			</div>
			{!extensionPropmt && (
				<>
					<div className='fixed inset-0 w-full h-full bg-black opacity-50' onClick={() => setData('')} />
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
							After installing, use this URL as the new tab URL: <br />
							<b className='text-blue-400 underline'>flash-navigator.vercel.app</b>{' '}
							<button onClick={() => navigator.clipboard.writeText('https://flash-navigator.vercel.app')}>
								[copy link]
							</button>
						</p>
						<br />
						<button
							className='px-2 bg-blue-500 active:bg-blue-600 rounded-lg w-full py-1'
							onClick={() => {
								localStorage.setItem('extensionPrompt', 'true');
								setExtensionPrompt(true);
							}}
						>
							{'Done'}
						</button>
					</div>
				</>
			)}
			{data && (
				<>
					<div className='fixed inset-0 w-full h-full bg-black opacity-25' onClick={() => setData('')} />
					<div className='fixed bg-gray-700 shadow-lg rounded-xl inset-0 mx-auto my-auto w-[700px] h-fit'>
						<textarea readOnly value={data} className='rounded-t-lg w-full h-96 bg-gray-800 p-2' />
						<button
							className='px-2 bg-blue-500 active:bg-blue-600 rounded-b-lg w-full py-1'
							onClick={() => navigator.clipboard.writeText(data)}
						>
							{'Copy Data'}
						</button>
					</div>
				</>
			)}
			{importDataModal && (
				<>
					<div className='fixed inset-0 w-full h-full bg-black opacity-25' onClick={() => setImportDataModal(false)} />
					<div className='fixed bg-gray-700 shadow-lg rounded-xl inset-0 mx-auto my-auto w-[700px] h-fit'>
						<textarea
							value={importData}
							onChange={(e) => setImportData(e.target.value)}
							className='rounded-t-lg w-full h-96 bg-gray-800 p-2'
						/>
						<button
							className='px-2 bg-blue-500 active:bg-blue-600 rounded-b-lg w-full py-1'
							onClick={() => {
								try {
									const data = JSON.parse(importData);
									Object.keys(data).forEach((key) => {
										localStorage.setItem(key, data[key]);
									});
									window.location.reload();
								} catch {
									alert('Invalid JSON data');
								}
							}}
						>
							{'Import Data (might overwrite existing data)'}
						</button>
					</div>
				</>
			)}
			{shortcut && typeof shortcutId === 'number' && (
				<>
					<div className='fixed inset-0 w-full h-full bg-black opacity-25' onClick={() => setShortcutId(null)} />
					<div className='fixed bg-gray-700 shadow-lg rounded-xl inset-0 mx-auto my-auto w-[700px] h-[325px] px-5 py-4'>
						<form className='space-y-5' onSubmit={() => setShortcutId(null)}>
							<div className='float-end space-x-3'>
								<button type='submit' className='text-blue-500 underline'>
									Submit
								</button>
								<button
									type='button'
									className='text-red-500 underline'
									onClick={() => {
										localStorage.removeItem(`shortcut-${groupPrefix}${shortcutId}-name`);
										localStorage.removeItem(`shortcut-${groupPrefix}${shortcutId}-group`);
										localStorage.removeItem(`shortcut-${groupPrefix}${shortcutId}-href`);
										localStorage.removeItem(`shortcut-${groupPrefix}${shortcutId}-img`);
										setShortcutId(null);
									}}
								>
									Delete
								</button>
							</div>
							<b>Edit Shortcut {shortcutId + 1}</b>
							<input
								autoFocus
								className='w-full px-2 py-1 border border-black rounded-lg bg-transparent'
								placeholder='Name'
								value={shortcut.name}
								onChange={(e) => {
									setShortcut({ ...shortcut, name: e.target.value });
								}}
							/>
							{
								<input
									className={
										'w-full px-2 py-1 border border-black rounded-lg bg-transparent disabled:bg-red-950 disabled:placeholder:text-white disabled:border-red-900'
									}
									placeholder='URL'
									value={shortcut.href}
									onChange={(e) => {
										setShortcut({
											...shortcut,
											href: e.target.value
										});
									}}
									disabled={shortcut.group}
								/>
							}
							<input
								className={
									'w-full px-2 py-1 border border-black rounded-lg bg-transparent outline ' +
									(shortcut.img.startsWith('https://external-content.duckduckgo.com')
										? 'outline-green-500'
										: 'outline-red-500')
								}
								placeholder='Image URL (https://external-content.duckduckgo.com/...)'
								value={shortcut.img}
								onChange={(e) => {
									setShortcut({
										...shortcut,
										img: e.target.value
									});
								}}
							/>
							<p>
								ATTENTION: Only use images from{' '}
								<Link
									className='text-blue-400 underline'
									href={`https://duckduckgo.com/?q="${shortcut.name || 'search for something!'}"&atb=v376-1&iar=images&iax=images&ia=images&iaf=type%3Atransparent%2Csize%3ASmall`}
									target='_blank'
								>
									duckduckgo
								</Link>
								. Images from other sources will not be displayed.{' '}
								{!shortcut.group && (
									<>
										Alternatively, you can{' '}
										<button
											className='text-blue-400 underline'
											onClick={() =>
												setShortcut({
													...shortcut,
													img: `https://external-content.duckduckgo.com/iu/?u=http://${
														shortcut.href.startsWith('http://') || shortcut.href.startsWith('https://')
															? shortcut.href.split('/')[2]
															: shortcut.href.split('/')[0]
													}/favicon.ico`
												})
											}
										>
											use the site&apos;s favicon by clicking here
										</button>
										.
									</>
								)}
							</p>
							<input
								id={id}
								type='checkbox'
								checked={shortcut.group}
								onChange={(e) => {
									setShortcut({
										...shortcut,
										group: e.target.checked
									});
								}}
							/>{' '}
							<label htmlFor={id}>Is this a Shortcut Group?</label>
						</form>
					</div>
				</>
			)}
		</div>
	);
}
