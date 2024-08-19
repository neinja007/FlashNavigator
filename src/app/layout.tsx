import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'FlashNavigator',
	description: 'Flash your Links quicker than the speed of light allows.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<link rel='manifest' href='/manifest.json' />
			</head>
			<body className={montserrat.className + ' flex justify-center'}>
				<div className='max-w-[1240px] w-full flex justify-center pt-16 min-h-screen'>{children}</div>
				<Analytics />
			</body>
		</html>
	);
}
