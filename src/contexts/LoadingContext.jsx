'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const pathname = usePathname();
	const previousPathname = useRef(pathname);
	const progressIntervalRef = useRef(null);

	// Add debugging for setIsLoading calls
	const setLoadingWithDebug = (value) => {
		console.log('setIsLoading called with:', value, 'from:', new Error().stack);
		setIsLoading(value);
	};

	useEffect(() => {
		const handleLinkClick = (event) => {
			// Disabled loading for now
			return;

			const link = event.target.closest('a');
			if (
				link &&
				link.href &&
				link.href.startsWith(window.location.origin) &&
				!link.target &&
				!link.hasAttribute('download')
			) {
				// Check if the link points to a different page
				const linkUrl = new URL(link.href);

				// Normalize both pathnames to ensure consistent comparison
				const linkPathname = linkUrl.pathname.replace(/\/$/, ''); // Remove trailing slash
				const currentPathname = pathname.replace(/\/$/, ''); // Remove trailing slash

				// Handle homepage case - both "/" and "" should be considered the same
				const normalizedLinkPath = linkPathname === '' ? '/' : linkPathname;
				const normalizedCurrentPath = currentPathname === '' ? '/' : currentPathname;

				console.log('Link clicked:', {
					linkHref: link.href,
					linkUrlPathname: linkUrl.pathname,
					linkPathname,
					currentPathname,
					originalPathname: pathname,
					normalizedLinkPath,
					normalizedCurrentPath,
					areDifferent: normalizedLinkPath !== normalizedCurrentPath,
				});

				if (normalizedLinkPath !== normalizedCurrentPath) {
					console.log('Setting loading to true');
					setLoadingWithDebug(true);
					setProgress(0);
				} else {
					console.log('Same page, not loading');
				}
			}
		};

		document.addEventListener('click', handleLinkClick);

		// Start progress simulation
		if (isLoading && !progressIntervalRef.current) {
			progressIntervalRef.current = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 85) {
						return prev;
					}
					return prev + Math.random() * 2;
				});
			}, 150);
		}

		// Check if pathname changed (page loaded)
		if (previousPathname.current !== pathname) {
			previousPathname.current = pathname;

			if (isLoading) {
				// Clear progress interval
				if (progressIntervalRef.current) {
					clearInterval(progressIntervalRef.current);
					progressIntervalRef.current = null;
				}

				// Complete the progress
				setProgress(100);

				// Hide after completion
				const timer = setTimeout(() => {
					setIsLoading(false);
					setProgress(0);
				}, 300);

				return () => clearTimeout(timer);
			}
		}

		return () => {
			if (progressIntervalRef.current) {
				clearInterval(progressIntervalRef.current);
				progressIntervalRef.current = null;
			}
			document.removeEventListener('click', handleLinkClick);
		};
	}, [pathname, isLoading]);

	return <LoadingContext.Provider value={{ isLoading, progress, setIsLoading }}>{children}</LoadingContext.Provider>;
};

export const useLoading = () => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error('useLoading must be used within a LoadingProvider');
	}
	return context;
};
