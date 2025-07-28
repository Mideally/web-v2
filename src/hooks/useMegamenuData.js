import { useState, useEffect } from 'react';
import { getMegamenuData } from '@/utils/api';

export const useMegamenuData = () => {
	const [megamenuData, setMegamenuData] = useState(null);
	const [isLoadingMegamenu, setIsLoadingMegamenu] = useState(true);

	useEffect(() => {
		const fetchMegamenuData = async () => {
			try {
				const result = await getMegamenuData();
				setMegamenuData(result.data);
			} catch (error) {
				console.error('Failed to fetch megamenu data:', error);
				// Fallback to empty data structure
				setMegamenuData({
					cities: { items: {} },
					categories: { items: {} },
				});
			} finally {
				setIsLoadingMegamenu(false);
			}
		};

		fetchMegamenuData();
	}, []);

	return { megamenuData, isLoadingMegamenu };
};
