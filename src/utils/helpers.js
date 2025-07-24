/**
 * Extracts images from company and location galleries for use in the Gallery component.
 * @param {Object} companyData - The company data object
 * @returns {{ companyImages: Array, locationImages: Array<{ locationName: string, images: Array }> }}
 */
export function extractGalleryImages(companyData) {
	const companyImages = (companyData?.gallery || []).map((img) => ({
		src: typeof img === 'string' ? img : img.url || img.src || '',
		alt: companyData.name || '',
		locationName: undefined,
	}));

	const locationImages = (companyData?.locations || []).map((loc) => ({
		locationName: loc.name || '',
		images: (loc.gallery || []).map((img) => ({
			src: typeof img === 'string' ? img : img.url || img.src || '',
			alt: loc.name || '',
			locationName: loc.name || '',
		})),
	}));

	return { companyImages, locationImages };
}
