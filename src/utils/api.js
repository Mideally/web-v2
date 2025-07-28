// src/utils/api.js

/**
 * API utility functions for fetching data from the local server.
 * Uses NEXT_API_URL from environment variables.
 */

const API_URL = process.env.NEXT_PUBLIC_API_HOST;

if (!API_URL) {
	throw new Error('NEXT_API_URL is not defined in environment variables');
}

/**
 * Fetches all companies from the API with pagination.
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated companies data
 */
export async function getAllCompanies(page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/companies?page=${page}&limit=${limit}`);

	if (!res.ok) throw new Error('Failed to fetch companies');

	return res.json();
}

/**
 * Fetches a single company by slug from the API.
 * @param {string} slug - The company slug
 * @returns {Promise<Object>} Company data
 */
export async function getCompanyData(slug) {
	const res = await fetch(`${API_URL}/companies/${slug}`);

	if (!res.ok) {
		if (res.status === 404) {
			throw new Error('Company not found');
		}

		throw new Error('Failed to fetch company data');
	}

	return res.json();
}

/**
 * Fetches all moments from the API with pagination.
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated moments data
 */
export async function getAllMoments(page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/moments?page=${page}&limit=${limit}`);

	if (!res.ok) throw new Error('Failed to fetch moments');

	return res.json();
}

/**
 * Fetches all drops from the API with pagination.
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated drops data
 */
export async function getAllDrops(page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/drops?page=${page}&limit=${limit}`);

	if (!res.ok) throw new Error('Failed to fetch drops');

	return res.json();
}

/**
 * Fetches companies by business type with pagination.
 * @param {string} type - The business type to filter by
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated companies data
 */
export async function getCompaniesByType(type, page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/companies/type/${type}?page=${page}&limit=${limit}`);

	if (!res.ok) {
		if (res.status === 404) {
			return {
				data: [],
				pagination: {
					currentPage: page,
					totalPages: 0,
					totalItems: 0,
					itemsPerPage: limit,
					hasNextPage: false,
					hasPrevPage: false,
				},
			};
		}
		throw new Error('Failed to fetch companies by type');
	}

	return res.json();
}

/**
 * Fetches moments by company with pagination.
 * @param {string} companySlug - The company slug
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated moments data
 */
export async function getMomentsByCompany(companySlug, page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/moments/company/${companySlug}?page=${page}&limit=${limit}`);

	if (!res.ok) {
		if (res.status === 404) {
			return {
				data: [],
				pagination: {
					currentPage: page,
					totalPages: 0,
					totalItems: 0,
					itemsPerPage: limit,
					hasNextPage: false,
					hasPrevPage: false,
				},
			};
		}
		throw new Error('Failed to fetch moments by company');
	}

	return res.json();
}

/**
 * Fetches drops by company with pagination.
 * @param {string} companySlug - The company slug
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated drops data
 */
export async function getDropsByCompany(companySlug, page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/drops/company/${companySlug}?page=${page}&limit=${limit}`);

	if (!res.ok) {
		if (res.status === 404) {
			return {
				data: [],
				pagination: {
					currentPage: page,
					totalPages: 0,
					totalItems: 0,
					itemsPerPage: limit,
					hasNextPage: false,
					hasPrevPage: false,
				},
			};
		}
		throw new Error('Failed to fetch drops by company');
	}

	return res.json();
}

/**
 * Fetches impulses with pagination.
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated impulses data
 */
export async function getAllImpulses(page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/impulses?page=${page}&limit=${limit}`);

	if (!res.ok) throw new Error('Failed to fetch impulses');

	return res.json();
}

/**
 * Fetches impulses by company with pagination.
 * @param {string} companySlug - The company slug
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated impulses data
 */
export async function getImpulsesByCompany(companySlug, page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/impulses/company/${companySlug}?page=${page}&limit=${limit}`);

	if (!res.ok) {
		if (res.status === 404) {
			return {
				data: [],
				pagination: {
					currentPage: page,
					totalPages: 0,
					totalItems: 0,
					itemsPerPage: limit,
					hasNextPage: false,
					hasPrevPage: false,
				},
			};
		}
		throw new Error('Failed to fetch impulses by company');
	}

	return res.json();
}

/**
 * Fetches companies by city with pagination.
 * @param {string} city - The city name to filter by
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated companies data
 */
export async function getCompaniesByCity(city, page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/companies/city/${encodeURIComponent(city)}?page=${page}&limit=${limit}`);

	if (!res.ok) {
		if (res.status === 404) {
			return {
				data: [],
				pagination: {
					currentPage: page,
					totalPages: 0,
					totalItems: 0,
					itemsPerPage: limit,
					hasNextPage: false,
					hasPrevPage: false,
				},
			};
		}
		throw new Error('Failed to fetch companies by city');
	}

	return res.json();
}

/**
 * Fetches companies by county with pagination.
 * @param {string} county - The county name to filter by
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated companies data
 */
export async function getCompaniesByCounty(county, page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/companies/county/${encodeURIComponent(county)}?page=${page}&limit=${limit}`);

	if (!res.ok) {
		if (res.status === 404) {
			return {
				data: [],
				pagination: {
					currentPage: page,
					totalPages: 0,
					totalItems: 0,
					itemsPerPage: limit,
					hasNextPage: false,
					hasPrevPage: false,
				},
			};
		}
		throw new Error('Failed to fetch companies by county');
	}

	return res.json();
}

/**
 * Fetches megamenu data with localStorage caching (24h).
 * @returns {Promise<Object>} Megamenu data structure
 */
export async function getMegamenuData() {
	// TEMPORARILY DISABLED CACHING FOR DEBUGGING
	// const CACHE_KEY = 'megamenu_data';
	// const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

	// Check if we're in browser environment
	if (typeof window === 'undefined') {
		// Server-side: fetch directly without caching
		const res = await fetch(`${API_URL}/companies/megamenu`);

		if (!res.ok) throw new Error('Failed to fetch megamenu data');

		const result = await res.json();

		return transformMegamenuData(result.data);
	}

	// TEMPORARILY DISABLED CACHING - always fetch fresh data
	// const cached = localStorage.getItem(CACHE_KEY);
	// if (cached) {
	// 	const { data, timestamp } = JSON.parse(cached);
	// 	const now = Date.now();
	// 	if (now - timestamp < CACHE_DURATION) {
	// 		return { data };
	// 	}
	// }

	// Always fetch fresh data
	try {
		const res = await fetch(`${API_URL}/companies/megamenu`);
		if (!res.ok) throw new Error('Failed to fetch megamenu data');

		const result = await res.json();

		const transformedData = transformMegamenuData(result.data);

		// TEMPORARILY DISABLED CACHING
		// localStorage.setItem(
		// 	CACHE_KEY,
		// 	JSON.stringify({
		// 		data: transformedData,
		// 		timestamp: Date.now(),
		// 	})
		// );

		return { data: transformedData };
	} catch (error) {
		// TEMPORARILY DISABLED CACHING FALLBACK
		// if (cached) {
		// 	const { data } = JSON.parse(cached);
		// 	return { data };
		// }
		throw error;
	}
}

/**
 * Transforms API response to match expected megamenu structure
 * @param {Object} apiData - Raw API response data
 * @returns {Object} Transformed data with proper structure
 */
function transformMegamenuData(apiData) {
	// DEBUG: Log the raw API data to see what we're working with
	// console.log('Raw megamenu API data:', apiData);

	// Import cities data from static JSON for now
	// You can replace this with API call later
	const citiesData = {
		defaultActive: 'bucuresti',
		items: {
			bucuresti: {
				title: 'Descoperă Bucureștiul',
				description: 'Explorează cele mai interesante locații din București și ofertele exclusive pentru tine.',
				image: '/assets/images/cities/bucuresti.jpg',
				url: '/parteneri/oras/bucuresti',
				label: 'București',
			},
			cluj: {
				title: 'Descoperă Clujul',
				description: 'Explorează cele mai interesante locații din Cluj și ofertele exclusive pentru tine.',
				image: '/assets/images/cities/cluj.jpg',
				url: '/parteneri/oras/cluj',
				label: 'Cluj',
			},
			iasi: {
				title: 'Descoperă Iașiul',
				description: 'Explorează cele mai interesante locații din Iași și ofertele exclusive pentru tine.',
				image: '/assets/images/cities/iasi.jpg',
				url: '/parteneri/oras/iasi',
				label: 'Iași',
			},
			timisoara: {
				title: 'Descoperă Timișoara',
				description: 'Explorează cele mai interesante locații din Timișoara și ofertele exclusive pentru tine.',
				image: '/assets/images/cities/timisoara.webp',
				url: '/parteneri/oras/timisoara',
				label: 'Timișoara',
			},
			brasov: {
				title: 'Descoperă Brașovul',
				description: 'Explorează cele mai interesante locații din Brașov și ofertele exclusive pentru tine.',
				image: '/assets/images/cities/brasov.webp',
				url: '/parteneri/oras/brasov',
				label: 'Brașov',
			},
			sibiu: {
				title: 'Descoperă Sibiul',
				description: 'Explorează cele mai interesante locații din Sibiu și ofertele exclusive pentru tine.',
				image: '/assets/images/cities/sibiu.jpg',
				url: '/parteneri/oras/sibiu',
				label: 'Sibiu',
			},
		},
		allItemsLink: {
			label: 'Vezi Toate',
			url: '/toate-orasele',
		},
	};

	// Transform categories data to match expected structure
	// Process each category and ensure proper URL generation for businesses
	const transformedCategories = {};

	Object.entries(apiData).forEach(([categoryKey, categoryData]) => {
		// console.log(`Processing category: ${categoryKey}`, categoryData);

		// Transform the items array to ensure proper URLs
		const transformedItems =
			categoryData.items?.map((item) => {
				// DEBUG: Log each item to see its structure
				// console.log(`Processing item in ${categoryKey}:`, item);

				// Ensure proper URL generation for business items

				const transformedItem = {
					...item,
					url: `/parteneri${item.url}`,
					// Ensure we have required fields
					id: item.id || item.slug || Math.random().toString(36).substr(2, 9),
					title: item.title || item.companyDetails?.name || 'Business',
					image: item.image || item.companyDetails?.logo || '/assets/images/placeholder-business.jpg',
				};

				// console.log(`Transformed item:`, transformedItem);
				return transformedItem;
			}) || [];

		transformedCategories[categoryKey] = {
			...categoryData,
			items: transformedItems,
			// Ensure category has proper URL
			url: categoryData.url || `/${categoryKey}`,
			label: categoryData.label || categoryData.title || categoryKey,
		};
	});

	const categoriesData = {
		defaultActive: 'cafenele',
		items: transformedCategories,
		allItemsLink: {
			label: 'Vezi Toate',
			url: '/toti-partenerii',
		},
	};

	const finalResult = {
		cities: citiesData,
		categories: categoriesData,
	};

	// console.log('Final transformed megamenu data:', finalResult);
	return finalResult;
}

/**
 * Fetches a single moment by ID from the API.
 * @param {string} id - The moment ID
 * @returns {Promise<Object>} Moment data
 */
export async function getMomentById(id) {
	const res = await fetch(`${API_URL}/moments/${id}`);

	if (!res.ok) {
		if (res.status === 404) {
			throw new Error('Moment not found');
		}
		throw new Error('Failed to fetch moment data');
	}

	return res.json();
}

/**
 * Fetches a single drop by ID from the API.
 * @param {string} id - The drop ID
 * @returns {Promise<Object>} Drop data
 */
export async function getDropById(id) {
	const res = await fetch(`${API_URL}/drops/${id}`);

	if (!res.ok) {
		if (res.status === 404) {
			throw new Error('Drop not found');
		}
		throw new Error('Failed to fetch drop data');
	}

	return res.json();
}

/**
 * Fetches moments by business ID with pagination.
 * @param {string} businessId - The business ID
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated moments data
 */
export async function getMomentsByBusinessId(businessId, page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/moments/business/${businessId}?page=${page}&limit=${limit}`);

	if (!res.ok) {
		if (res.status === 404) {
			return {
				data: [],
				pagination: {
					currentPage: page,
					totalPages: 0,
					totalItems: 0,
					itemsPerPage: limit,
					hasNextPage: false,
					hasPrevPage: false,
				},
			};
		}
		throw new Error('Failed to fetch moments by business');
	}

	return res.json();
}

/**
 * Fetches drops by business ID with pagination.
 * @param {string} businessId - The business ID
 * @param {number} page - The page number (default: 1)
 * @param {number} limit - Number of items per page (default: 6)
 * @returns {Promise<Object>} Paginated drops data
 */
export async function getDropsByBusinessId(businessId, page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/drops/business/${businessId}?page=${page}&limit=${limit}`);

	if (!res.ok) {
		if (res.status === 404) {
			return {
				data: [],
				pagination: {
					currentPage: page,
					totalPages: 0,
					totalItems: 0,
					itemsPerPage: limit,
					hasNextPage: false,
					hasPrevPage: false,
				},
			};
		}
		throw new Error('Failed to fetch drops by business');
	}

	return res.json();
}

/**
 * Fetches moments that are expiring soon (active moments sorted by closest to expiry).
 * @returns {Promise<Object>} Moments data with expiring soon items
 */
export async function getExpiringSoonMoments() {
	const res = await fetch(`${API_URL}/moments/expiring-soon`);

	if (!res.ok) throw new Error('Failed to fetch expiring soon moments');

	return res.json();
}

/**
 * Fetches drops that are ending soon (available drops sorted by least remaining).
 * @returns {Promise<Object>} Drops data with ending soon items
 */
export async function getEndingSoonDrops() {
	const res = await fetch(`${API_URL}/drops/ending-soon`);

	if (!res.ok) throw new Error('Failed to fetch ending soon drops');

	return res.json();
}

// Add more endpoints as needed for other data types
