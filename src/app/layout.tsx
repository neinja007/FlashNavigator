import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import { DataContextProvider } from '@/context/DataContext';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'FlashNavigator',
	description: 'Flash to your Links quicker than the speed of light allows.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<DataContextProvider>
				<html lang='en'>
					<head>
						<link rel='manifest' href='/manifest.json' />
					</head>
					<body className={montserrat.className + ' flex justify-center'}>
						<div className='flex min-h-screen w-full max-w-[1240px] justify-center pt-16'>{children}</div>
						<Analytics />
					</body>
				</html>
			</DataContextProvider>
		</ClerkProvider>
	);
}
