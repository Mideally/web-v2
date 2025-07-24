'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const usePageLoading = () => {
	const [isLoading, setIsLoading] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleStart = () => {
			setIsLoading(true);
		};

		const handleComplete = () => {
			setIsLoading(false);
		};

		// Handle link clicks for immediate feedback
		const handleLinkClick = (event) => {
			const link = event.target.closest('a');
			if (link && link.href && link.href.startsWith(window.location.origin) && !link.target && !link.hasAttribute('download')) {
				handleStart();
			}
		};

		// Handle programmatic navigation
		const handleNavigationStart = () => {
			handleStart();
		};

		// Add event listeners
		document.addEventListener('click', handleLinkClick);
		window.addEventListener('beforeunload', handleNavigationStart);

		// Complete loading after route change
		const timer = setTimeout(handleComplete, 800);

		return () => {
			clearTimeout(timer);
			document.removeEventListener('click', handleLinkClick);
			window.removeEventListener('beforeunload', handleNavigationStart);
		};
	}, [pathname]);

	return isLoading;
};
