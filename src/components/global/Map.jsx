'use client';

import { useEffect, useRef, useState } from 'react';

// Global variable to track if script is already loaded
let isScriptLoaded = false;
let scriptLoadPromise = null;

export default function Map({ latitude, longitude, title }) {
	const mapRef = useRef(null);
	const [mapInitialized, setMapInitialized] = useState(false);

	useEffect(() => {
		// Create a promise to load the script if not already loaded
		if (!scriptLoadPromise) {
			scriptLoadPromise = new Promise((resolve, reject) => {
				if (isScriptLoaded) {
					resolve();
					return;
				}

				// Check if script already exists
				const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
				if (existingScript) {
					isScriptLoaded = true;
					resolve();
					return;
				}

				const script = document.createElement('script');
				script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
				script.async = true;
				script.defer = true;
				script.onload = () => {
					isScriptLoaded = true;
					resolve();
				};
				script.onerror = reject;
				document.head.appendChild(script);
			});
		}

		// Wait for script to load then initialize map
		scriptLoadPromise
			.then(() => {
				if (mapRef.current && !mapInitialized) {
					initMap();
					setMapInitialized(true);
				}
			})
			.catch((error) => {
				console.error('Failed to load Google Maps:', error);
			});

		return () => {
			// Cleanup map instance if needed
			if (mapRef.current && mapInitialized) {
				// Google Maps doesn't provide a direct cleanup method
				// The map will be garbage collected when the component unmounts
			}
		};
	}, [latitude, longitude, mapInitialized]);

	const initMap = () => {
		if (!mapRef.current || !window.google) return;

		const center = {
			lat: parseFloat(latitude),
			lng: parseFloat(longitude),
		};

		const map = new window.google.maps.Map(mapRef.current, {
			center,
			zoom: 15,
			styles: [
				{
					featureType: 'poi',
					elementType: 'labels',
					stylers: [{ visibility: 'off' }],
				},
			],
			disableDefaultUI: true,
			zoomControl: true,
		});

		// Add marker
		new window.google.maps.Marker({
			position: center,
			map,
			title: title || 'Location',
		});
	};

	return <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: '300px' }} />;
}
