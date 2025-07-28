import { Geist, Geist_Mono } from 'next/font/google';
import { Nunito_Sans } from 'next/font/google';
import HeadScripts from '@/components/global/HeadScripts';
import MainNavigation from '@/components/navigation/MainNavigation';
import './globals.css';
import Footer from '@/components/layout/Footer';
import { OfferDrawerProvider } from '@/components/global/OfferDrawerContext';
import OfferDrawer from '@/components/global/OfferDrawer';
import { LoadingProvider } from '@/contexts/LoadingContext';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const nunitoSans = Nunito_Sans({
	variable: '--font-nunito-sans',
	subsets: ['latin'],
	display: 'swap',
});

// Default site metadata
export const metadata = {
	title: {
		template: '%s | Mideally',
		default: 'Mideally - Conectăm clienții cu business-urile',
	},
	description:
		'Mideally va deveni platforma de referință pentru business-urile mici și mijlocii din România. Îți oferim soluții pentru loializare, ofertare și marketing online.',
	metadataBase: new URL('https://mideally.com'),
	openGraph: {
		type: 'website',
		locale: 'ro_RO',
		siteName: 'Mideally',
	},
	twitter: {
		card: 'summary_large_image',
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="ro">
			<head>
				<HeadScripts />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${nunitoSans.variable} antialiased font-sans`}
			>
				<OfferDrawerProvider>
					<LoadingProvider>
						<MainNavigation />
						{children}
						<Footer />
						<OfferDrawer />
					</LoadingProvider>
				</OfferDrawerProvider>
			</body>
		</html>
	);
}
