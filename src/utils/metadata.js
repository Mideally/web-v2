/**
 * Metadata utils for Next.js
 *
 * This module provides utilities for generating metadata for Next.js pages
 * through the Metadata API.
 *
 * Usage example:
 * ```
 * // In your page.js file
 * import { generateMetadata } from '@/utils/metadata';
 *
 * export const metadata = generateMetadata({
 *   title: 'Page Title',
 *   description: 'Page description'
 * });
 * ```
 */

// Default site information
export const defaultMetadata = {
	siteName: 'Mideally - Conectăm clienții cu business-urile',
	description:
		'Mideally va deveni platforma de referință pentru business-urile mici și mijlocii din România. Îți oferim soluții pentru loializare, ofertare și marketing online.',
	url: 'https://mideally.com',
	ogImage: '/assets/og-v1.png',
};

/**
 * Generate metadata for Next.js pages
 *
 * @param {Object} options - Metadata options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description (optional)
 * @param {string} options.url - Page URL (optional)
 * @param {string} options.ogImage - Open Graph image path (optional)
 * @returns {Object} Next.js metadata object
 */
export function generateMetadata({
	title,
	description = defaultMetadata.description,
	url = defaultMetadata.url,
	ogImage = defaultMetadata.ogImage,
}) {
	const fullTitle = `${title} | ${defaultMetadata.siteName}`;
	const absoluteImageUrl = ogImage.startsWith('http') ? ogImage : `${url}${ogImage}`;

	return {
		title: fullTitle,
		description,

		// Basic metadata
		metadataBase: new URL(url),

		// Open Graph / Facebook
		openGraph: {
			type: 'website',
			title: fullTitle,
			description,
			images: [
				{
					url: absoluteImageUrl,
					width: 1200,
					height: 630,
					alt: `${title} | ${defaultMetadata.siteName}`,
				},
			],
			url,
		},

		// Twitter
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description,
			images: [absoluteImageUrl],
		},

		// Additional metadata
		alternates: {
			canonical: url,
		},
	};
}

/**
 * Generate dynamic metadata for dynamic routes
 *
 * @param {Function} fetchData - Async function to fetch data based on params
 * @returns {Function} Next.js generateMetadata function for dynamic routes
 */
export function createDynamicMetadata(fetchData) {
	return async function ({ params, searchParams }) {
		// Fetch data for this specific route
		const data = await fetchData(params, searchParams);

		// Return metadata based on the fetched data
		return generateMetadata({
			title: data.title,
			description: data.description,
			url: `${defaultMetadata.url}/${params.slug || ''}`,
			ogImage: data.image || defaultMetadata.ogImage,
		});
	};
}
