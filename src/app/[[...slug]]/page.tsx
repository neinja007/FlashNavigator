'use client';

import Shortcut from '@/components/shortcut';
import Link from 'next/link';
import { Fragment, useEffect, useId, useState } from 'react';

type Shortcut = {
	name: string;
	group: boolean;
	href: string;
	img: string;
};

export default function Home({ params }: { params: { slug?: string[] } }) {
	const [shortcutId, setShortcutId] = useState<number | null>(null);
	const [shortcut, setShortcut] = useState<Shortcut | null>();
	const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

	const [data, setData] = useState('');
	const [importDataModal, setImportDataModal] = useState(false);
	const [importData, setImportData] = useState('');

	const groupUrl =
		params.slug && params.slug.length > 0 ? params.slug.map((slug) => slug.replace(' ', '_')).join('-') + '-' : '';

	useEffect(() => {
		const shortcuts = [];
		for (let i = 1; i <= 14; i++) {
			shortcuts.push({
				name: localStorage.getItem(`shortcut-${groupUrl}${i}-name`) || '',
				group: localStorage.getItem(`shortcut-${groupUrl}${i}-group`) === 'true',
				href: localStorage.getItem(`shortcut-${groupUrl}${i}-href`) || '',
				img: localStorage.getItem(`shortcut-${groupUrl}${i}-img`) || ''
			});
		}
		setShortcuts(shortcuts);
	}, [groupUrl, shortcutId]);

	useEffect(() => {
		setShortcut(
			typeof shortcutId === 'number'
				? {
						name: localStorage.getItem(`shortcut-${groupUrl}${shortcutId + 1}-name`) || '',
						group: localStorage.getItem(`shortcut-${groupUrl}${shortcutId + 1}-group`) === 'true',
						img: localStorage.getItem(`shortcut-${groupUrl}${shortcutId + 1}-img`) || '',
						href: localStorage.getItem(`shortcut-${groupUrl}${shortcutId + 1}-href`) || ''
					}
				: null
		);
	}, [groupUrl, shortcutId]);

	useEffect(() => {
		if (shortcut && typeof shortcutId === 'number') {
			localStorage.setItem(`shortcut-${groupUrl}${shortcutId + 1}-name`, shortcut.name);
			localStorage.setItem(`shortcut-${groupUrl}${shortcutId + 1}-group`, shortcut.group.toString());
			localStorage.setItem(`shortcut-${groupUrl}${shortcutId + 1}-href`, shortcut.href);
			localStorage.setItem(`shortcut-${groupUrl}${shortcutId + 1}-img`, shortcut.img);
		}
	}, [groupUrl, shortcut, shortcutId]);

	const id = useId();

	return (
		<div className='hidden xl:block text-white'>
			<div className='text-center'>
				<Link href={'/'} className='text-4xl font-bold italic'>
					⚡<span className='text-yellow-300'>Flash</span>
					<span>Navigator</span>
				</Link>
				<div className='mt-8'>
					<div className='flex justify-between pb-5'>
						<div>
							{['', ...[...(params.slug || [])]].map(
								(group, i) =>
									typeof group === 'string' && (
										<Fragment key={i}>
											<Link href={'/'} className='px-2 py-1 mx-2 rounded-lg bg-blue-800 text-white'>
												{group === '' ? 'Home' : group.replace('_', ' ')}
											</Link>
											{params.slug && params.slug.length !== i && '>'}
										</Fragment>
									)
							)}
						</div>
						<div className='space-x-3'>
							<button
								className='text-yellow-400 hover:underline'
								onClick={() =>
									setData(
										JSON.stringify(
											Object.keys(JSON.parse(JSON.stringify(localStorage))).reduce(
												(acc: { [key: string]: string }, cur) => {
													if (cur.startsWith('shortcut-')) acc[cur] = JSON.parse(JSON.stringify(localStorage))[cur];
													return acc;
												},
												{}
											)
										)
									)
								}
							>
								Export Data to JSON
							</button>
							<button className='text-white hover:underline' onClick={() => setImportDataModal(true)}>
								Import Data from JSON
							</button>
						</div>
					</div>
					<div className='grid grid-cols-7 gap-5 rounded-lg px-3 py-3'>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
							<Shortcut
								key={i}
								name={shortcuts?.[i]?.name}
								group={shortcuts?.[i]?.group}
								img={shortcuts?.[i]?.img}
								href={shortcuts?.[i]?.href}
								setShortcutId={() => setShortcutId(i)}
							/>
						))}
					</div>
				</div>
			</div>
			{data && (
				<>
					<div className='fixed inset-0 w-full h-full bg-black opacity-25' onClick={() => setData('')} />
					<div className='fixed bg-gray-700 shadow-lg rounded-xl inset-0 mx-auto my-auto w-[700px] h-fit'>
						<textarea readOnly value={data} className='rounded-t-lg w-full h-full bg-gray-800 p-2' />
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
							className='rounded-t-lg w-full h-full bg-gray-800 p-2'
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
										localStorage.removeItem(`shortcut-${groupUrl}${shortcutId + 1}-name`);
										localStorage.removeItem(`shortcut-${groupUrl}${shortcutId + 1}-group`);
										localStorage.removeItem(`shortcut-${groupUrl}${shortcutId + 1}-href`);
										localStorage.removeItem(`shortcut-${groupUrl}${shortcutId + 1}-img`);
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
