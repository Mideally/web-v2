'use client';

import { useState, useMemo } from 'react';
import StarRating from './StarRating';

export default function Reviews({ company, selectedLocation }) {
	const [selectedLocationFilter, setSelectedLocationFilter] = useState('all');

	// Use the passed selectedLocation if provided, otherwise use internal state
	const effectiveSelectedLocation = selectedLocation || selectedLocationFilter;

	// Collect all reviews from all locations
	const allReviews = useMemo(() => {
		const reviews = [];

		company.locations.forEach((location) => {
			if (location.reviews && Array.isArray(location.reviews)) {
				location.reviews.forEach((review) => {
					reviews.push({
						...review,
						locationName: location.name,
						locationId: location.id,
					});
				});
			}
		});

		return reviews;
	}, [company.locations]);

	// Filter reviews by selected location
	const filteredReviews = useMemo(() => {
		if (effectiveSelectedLocation === 'all') {
			return allReviews;
		}

		return allReviews.filter((review) => review.locationId === effectiveSelectedLocation);
	}, [allReviews, effectiveSelectedLocation]);

	// Get unique locations that have reviews
	const locationsWithReviews = useMemo(() => {
		const locationIds = [...new Set(allReviews.map((review) => review.locationId))];

		return company.locations.filter((location) => locationIds.includes(location.id));
	}, [allReviews, company.locations]);

	// Calculate stats for current selection
	const currentStats = useMemo(() => {
		const reviews = filteredReviews;
		const totalReviews = reviews.length;
		const averageRating =
			totalReviews > 0
				? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / totalReviews).toFixed(1)
				: 0;

		return { totalReviews, averageRating };
	}, [filteredReviews]);

	// Only show location filter if no selectedLocation was passed and there are multiple locations
	const showLocationFilter = !selectedLocation && locationsWithReviews.length > 1;

	return (
		<div>
			{showLocationFilter && (
				<div className="flex items-center justify-between mb-6">
					<h3 className="font-bold text-xl">Recenzii</h3>
					<div className="flex gap-2">
						<button
							className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
								selectedLocationFilter === 'all'
									? 'bg-pink-500 text-white border-pink-500'
									: 'bg-white text-black border-gray-300 hover:bg-gray-100'
							}`}
							onClick={() => setSelectedLocationFilter('all')}
						>
							Toate locațiile
						</button>
						{locationsWithReviews.map((location) => (
							<button
								key={location.id}
								className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
									selectedLocationFilter === location.id
										? 'bg-pink-500 text-white border-pink-500'
										: 'bg-white text-black border-gray-300 hover:bg-gray-100'
								}`}
								onClick={() => setSelectedLocationFilter(location.id)}
							>
								{location.name}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Summary stats moved to top */}
			{currentStats.totalReviews > 0 && (
				<div className="mb-6 pb-4 border-b border-gray-200">
					<div className="flex items-center gap-4 text-sm text-gray-600">
						<span>
							{currentStats.totalReviews === 1 ? 'O recenzie' : `${currentStats.totalReviews} recenzii`}
							{effectiveSelectedLocation !== 'all' && ' pentru această locație'}
						</span>
						<span className="flex items-center gap-1">
							Media: <StarRating rating={parseFloat(currentStats.averageRating)} />
							<span className="text-gray-600">({currentStats.averageRating})</span>
						</span>
					</div>
				</div>
			)}

			{filteredReviews.length === 0 ? (
				<p className="text-gray-500">
					Nicio recenzie încă{effectiveSelectedLocation !== 'all' && ' pentru această locație'}.
				</p>
			) : (
				<div className="space-y-4">
					{filteredReviews.map((review, idx) => (
						<div key={idx} className="border-b border-gray-200 pb-4 last:border-b-0">
							<div className="flex items-start justify-between mb-2">
								<div>
									<div className="font-semibold text-gray-900">{review.name || 'Anonim'}</div>
									{locationsWithReviews.length > 1 && (
										<div className="text-sm text-gray-500">{review.locationName}</div>
									)}
								</div>
								<div className="text-sm">
									<StarRating rating={review.rating || 0} size="w-4 h-4" />
								</div>
							</div>
							{review.comment && <div className="text-gray-700 mb-2">{review.comment}</div>}
							{review.date && (
								<div className="text-xs text-gray-400">
									{new Date(review.date).toLocaleDateString('ro-RO')}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
