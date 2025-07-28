'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/global/Button';
import PageHeader from '@/components/layout/PageHeader';

export default function ActivationPage() {
	const router = useRouter();
	const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
	const [activationData, setActivationData] = useState(null);
	const [showCamera, setShowCamera] = useState(false);
	const [isExpired, setIsExpired] = useState(false);

	useEffect(() => {
		// Get activation data from sessionStorage
		const storedData = sessionStorage.getItem('activeOffer');
		if (!storedData) {
			router.push('/');
			return;
		}

		try {
			const data = JSON.parse(storedData);
			setActivationData(data);

			// Check for existing timer in sessionStorage
			const storedTimer = sessionStorage.getItem('activationTimer');
			const storedStartTime = sessionStorage.getItem('activationStartTime');

			if (storedTimer && storedStartTime) {
				const startTime = parseInt(storedStartTime);
				const elapsed = Math.floor((Date.now() - startTime) / 1000);
				const remaining = Math.max(300 - elapsed, 0);

				if (remaining <= 0) {
					setIsExpired(true);
					setTimeLeft(0);
				} else {
					setTimeLeft(remaining);
				}
			} else {
				// Initialize timer for the first time
				sessionStorage.setItem('activationStartTime', Date.now().toString());
				sessionStorage.setItem('activationTimer', '300');
			}
		} catch (error) {
			console.error('Error parsing activation data:', error);
			router.push('/');
		}
	}, [router]);

	useEffect(() => {
		if (timeLeft <= 0) {
			setIsExpired(true);
			// Don't redirect immediately, let user see the expiry message
			return;
		}

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				const newTime = prev - 1;
				// Update sessionStorage with current time
				sessionStorage.setItem('activationTimer', newTime.toString());
				return newTime;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft]);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	};

	const handleScanClick = () => {
		setShowCamera(true);
		// Here you would implement the camera/QR scanning functionality
		// For now, we'll just show a placeholder
	};

	const handleClose = () => {
		sessionStorage.removeItem('activeOffer');
		sessionStorage.removeItem('activationTimer');
		sessionStorage.removeItem('activationStartTime');
		router.push('/');
	};

	if (!activationData) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<p className="text-gray-600">Se încarcă...</p>
				</div>
			</div>
		);
	}

	const { offer, type } = activationData;
	const typeText = type === 'moment' ? 'momentul' : type === 'drop' ? 'drop-ul' : 'impulsul';
	const businessLocation = offer.business?.availableLocations?.[0]?.name || offer.business?.name || 'compania';

	if (isExpired) {
		return (
			<div className="container mx-auto px-4 pb-8">
				<PageHeader
					title="Toate Drop-urile"
					subtitle="Descoperă ofertele exclusive disponibile acum"
					className="text-center"
				/>
				{/* Header */}
				<div className="bg-white border-b border-gray-200 px-4 py-3">
					<div className="flex items-center justify-between">
						<button onClick={handleClose} className="text-gray-500 hover:text-gray-800 cursor-pointer">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						<h1 className="text-lg font-semibold text-gray-900">
							Activare {type === 'moment' ? 'moment' : type === 'drop' ? 'drop' : 'impuls'}
						</h1>
						<div className="w-6"></div>
					</div>
				</div>

				{/* Expiry Message */}
				<div className="bg-white px-4 py-8">
					<div className="text-center">
						<div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
							<svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h2 className="text-xl font-bold text-gray-900 mb-4">Timpul a expirat</h2>
						<p className="text-gray-700 mb-6 leading-relaxed">
							Timpul pentru a revendica {typeText} a expirat. Oferta a fost trimisă înapoi către{' '}
							<span className="font-semibold">{businessLocation}</span>. Dacă încă o vrei, va trebui să
							activezi din nou {typeText}.
						</p>
						<Button variant="primary" onClick={handleClose} className="">
							Înțeleg
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 pb-8">
			<PageHeader
				title="Toate Drop-urile"
				subtitle="Descoperă ofertele exclusive disponibile acum"
				className="text-center"
			/>
			{/* Header */}
			<div className="bg-white border-b border-gray-200 px-4 py-3">
				<div className="flex items-center justify-between">
					<button onClick={handleClose} className="text-gray-500 hover:text-gray-800 cursor-pointer">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<h1 className="text-lg font-semibold text-gray-900">
						Activare {type === 'moment' ? 'moment' : type === 'drop' ? 'drop' : 'impuls'}
					</h1>
					<div className="w-6"></div>
				</div>
			</div>

			{/* Timer */}
			<div className="bg-white border-b border-gray-200 px-4 py-4">
				<div className="text-center">
					<p className="text-sm text-gray-600 mb-1">Timp rămas</p>
					<div className={`text-3xl font-bold ${timeLeft <= 60 ? 'text-red-600' : 'text-gray-900'}`}>
						{formatTime(timeLeft)}
					</div>
					{timeLeft <= 60 && <p className="text-sm text-red-600 mt-1">Timpul expiră în curând!</p>}
				</div>
			</div>

			{/* Offer Details */}
			<div className="bg-white px-4 py-6">
				{offer.image && (
					<img src={offer.image} alt={offer.title} className="w-full h-48 object-cover rounded-lg mb-4" />
				)}
				<h2 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h2>
				<p className="text-gray-700 mb-4">{offer.description}</p>

				{/* Business info */}
				{offer.business && (
					<div className="bg-gray-50 rounded-lg p-4">
						<h3 className="font-semibold text-gray-900 mb-2">{offer.business.name}</h3>
						{offer.business.availableLocations?.map((location, index) => (
							<div key={location.id || index} className="text-sm text-gray-600">
								{location.name}
							</div>
						))}
					</div>
				)}
			</div>

			{/* QR Scan Section */}
			<div className="bg-white border-t border-gray-200 px-4 py-6">
				<div className="text-center">
					<div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center border border-black">
						<svg className="w-16 h-16 text-gray-400 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
							/>
						</svg>
					</div>
					<p className="text-gray-700 mb-4">Scanează codul QR pentru a valida {typeText} în locație</p>
					<div className="flex gap-3 justify-center">
						<Button variant="primary" className="" onClick={handleScanClick}>
							Scanează
						</Button>
						<Button variant="secondary" className="" onClick={handleClose}>
							Anulează
						</Button>
					</div>
				</div>
			</div>

			{/* Camera Modal */}
			{showCamera && (
				<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
						<h3 className="text-lg font-semibold mb-4">Scanner cameră</h3>
						<p className="text-gray-600 mb-4">Aici se va deschide camera pentru scanarea codului QR.</p>
						<div className="flex gap-3">
							<Button variant="secondary" onClick={() => setShowCamera(false)} className="flex-1">
								Anulează
							</Button>
							<Button
								variant="primary"
								className="flex-1"
								onClick={() => {
									setShowCamera(false);
									// Here you would implement the actual QR scanning
									alert('QR scanning functionality would be implemented here');
								}}
							>
								Scanează
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
