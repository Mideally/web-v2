'use client';

import Script from 'next/script';

/**
 * HeadScripts component for client-side scripts
 *
 * This component handles client-side scripts that need to be added to the head,
 * such as analytics, chat widgets, etc.
 *
 * Use this component in the root layout for app-wide scripts.
 */
export default function HeadScripts() {
	return (
		<>
			{/* Google Analytics */}
			<Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-6RG8B7LJW0" />

			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-6RG8B7LJW0');
				`}
			</Script>

			{/* Add other third-party scripts here */}
			{/* Example: Facebook Pixel, Hotjar, etc. */}
		</>
	);
}
