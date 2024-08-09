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
			<body className={montserrat.className + ' pt-16 flex justify-center'}>
				<div className='w-[1240px]'>{children}</div>
			</body>
		</html>
	);
}
