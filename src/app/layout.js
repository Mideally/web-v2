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
				<div className="fixed inset-0 -z-10 filter blur-xl overflow-hidden">
					<div
						className="absolute w-[200%] aspect-square top-[-40%] right-[-50%] md:w-[200%] md:top-[-120%] md:right-[-120%] bg-gradient-to-tr from-pink-100/70 via-purple-100/70 to-blue-100/70 animate-slow-spin"
						style={{
							clipPath: `polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 
							80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 
							45.2% 34.5%, 27.5% 56.7%, 10.1% 84.9%, 17.9% 100%, 37.6% 76.8%, 
							76.1% 97.7%, 74.1% 44.1%)`,
						}}
					/>
				</div>
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
