'use client';

import { useState, useMemo } from 'react';
import Reviews from './Reviews';
import Map from '@/components/global/Map';
import Button from '@/components/global/Button';

const tabOptions = [
	{ id: 'details', label: 'Detalii' },
	{ id: 'products', label: 'Produse' },
	{ id: 'reviews', label: 'Recenzii' },
];

export default function LocationInfo({ company, selectedLocation, onLocationChange }) {
	const [activeTab, setActiveTab] = useState('details');

	const currentLocation =
		selectedLocation === 'all' ? null : company.locations.find((loc) => loc.id === selectedLocation);

	// Filter products for selected location
	const filteredProducts = useMemo(() => {
		if (selectedLocation === 'all') {
			return [];
		}

		const currentLocation = company.locations.find((loc) => loc.id === selectedLocation);

		return currentLocation?.products || [];
	}, [company.locations, selectedLocation]);

	// Calculate active vouchers for each location (only non-expired deals)
	const getActiveVouchersCount = (locationId) => {
		const now = new Date();

		// Filter moments that are currently active
		const activeMoments = (company.deals?.moments || []).filter((moment) => {
			const startTime = new Date(moment.startTime);
			const endTime = new Date(moment.endTime);

			return moment.availableLocations.includes(locationId) && now >= startTime && now <= endTime;
		});

		// Filter drops that are currently active (have available items)
		const activeDrops = (company.deals?.drops || []).filter((drop) => {
			return drop.availableLocations.includes(locationId) && drop.available > drop.claimed;
		});

		return activeMoments.length + activeDrops.length;
	};

	// Handle get directions click
	const handleGetDirections = (location) => {
		const { latitude, longitude } = location.address.coordinates;
		const address = encodeURIComponent(location.address.fullAddress);
		const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=${address}`;

		window.open(url, '_blank');
	};

	return (
		<div className="bg-white rounded-lg shadow-lg border border-gray-200">
			{/* Tab navigation */}
			<div className="flex gap-2 p-4 border-b border-gray-200">
				{tabOptions.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`px-4 py-2 rounded-full border text-sm font-medium transition cursor-pointer ${
							activeTab === tab.id
								? 'bg-pink-500 text-white border-pink-500'
								: 'bg-white text-black border-gray-300 hover:bg-gray-100'
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Tab content */}
			<div className="p-6">
				{activeTab === 'details' && (
					<div className="space-y-6">
						{/* Company description */}
						{company.companyDetails?.description && (
							<div className="mb-6">
								<h3 className="font-semibold text-lg mb-3">Despre {company.companyDetails?.name}</h3>
								<p className="text-gray-700 leading-relaxed">{company.companyDetails?.description}</p>
							</div>
						)}

						{selectedLocation === 'all' ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{company.locations.map((location) => {
									const activeVouchersCount = getActiveVouchersCount(location.id);

									return (
										<div
											key={location.id}
											className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative border border-1 border-black cursor-pointer"
											onClick={() => onLocationChange(location.id)}
										>
											{/* Voucher notification bubble */}
											{activeVouchersCount > 0 && (
												<div className="absolute top-2 right-2 z-2">
													<div className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center min-w-[1.5rem] h-6 group/tooltip relative">
														<span>{activeVouchersCount}</span>
														{/* Tooltip */}
														<div className="absolute top-full right-0 mt-2 hidden group-hover/tooltip:block">
															<div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
																Discounturi active
																{/* Arrow */}
																<div className="absolute -top-1 right-3 transform -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
															</div>
														</div>
													</div>
												</div>
											)}

											<div className="aspect-video relative overflow-hidden">
												<img
													src={
														location.featuredImage || 'https://via.placeholder.com/400x225'
													}
													alt={location.name}
													className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/80"></div>
												<div className="absolute top-0 left-0 right-0 p-4">
													<h3 className="text-white font-semibold text-lg">
														{location.name}
													</h3>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div className="space-y-6">
								<div className="space-y-3">
									<div className="flex flex-col mb-6">
										<h3 className="font-semibold text-lg">Adresă</h3>
										<p className="text-gray-700 leading-relaxed">
											{currentLocation.address.fullAddress}
										</p>
									</div>
									{currentLocation.schedule && (
										<div className="flex flex-col mb-6">
											<h3 className="font-semibold text-lg">Program</h3>
											<ul className="ml-4 list-disc mt-1">
												{currentLocation.schedule.map((schedule) => (
													<li key={schedule.day}>
														{schedule.day}: {schedule.open} - {schedule.close}
													</li>
												))}
											</ul>
										</div>
									)}
									{currentLocation.contact && (
										<div className="flex flex-col mb-6">
											<h3 className="font-semibold text-lg">Contact</h3>
											<p className="text-gray-700 leading-relaxed">{currentLocation.contact}</p>
										</div>
									)}
								</div>

								{currentLocation.address.coordinates && (
									<div>
										<h3 className="font-semibold text-lg">Locație</h3>
										<div className="mt-2 h-100 rounded-lg overflow-hidden">
											<Map
												latitude={currentLocation.address.coordinates.latitude}
												longitude={currentLocation.address.coordinates.longitude}
												title={currentLocation.name}
											/>
										</div>
										<div className="mt-3">
											<Button
												onClick={() => handleGetDirections(currentLocation)}
												variant="tertiary"
												size="small"
											>
												Direcții
											</Button>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				)}

				{activeTab === 'products' && (
					<div>
						{selectedLocation === 'all' ? (
							<div className="text-center py-8">
								<p className="text-gray-500 text-lg">
									Alege o locație pentru a vedea produsele specifice
								</p>
							</div>
						) : filteredProducts.length === 0 ? (
							<p className="text-gray-500">Nu există produse pentru această locație.</p>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
								{filteredProducts.map((product) => (
									<div key={product.id} className="border rounded-lg p-3 flex flex-col items-center">
										<img
											src={product.image}
											alt={product.title}
											className="w-24 h-24 object-cover rounded mb-2"
										/>
										<div className="font-semibold text-center">{product.title}</div>
										<div className="text-gray-500 text-sm text-center">{product.description}</div>
										<div className="font-bold text-pink-600 mt-1">{product.price} RON</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{activeTab === 'reviews' && <Reviews company={company} selectedLocation={selectedLocation} />}
			</div>
		</div>
	);
}
