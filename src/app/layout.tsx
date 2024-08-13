import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

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
			<body className={montserrat.className + ' flex justify-center'}>
				<div className='max-w-[1240px] w-full flex justify-center pt-16 min-h-screen'>{children}</div>
			</body>
		</html>
	);
}
