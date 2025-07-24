'use client';

import Button from '@/components/global/Button';
import StarRating from './StarRating';
import { useState, useMemo } from 'react';

export default function PageHero({ company, selectedLocation, onLocationChange }) {
	const [isFollowing, setIsFollowing] = useState(false);

	const hasMultipleLocations = company.locations && company.locations.length > 1;
	const address = company.locations?.[0]?.address;

	// Calculate review stats from all locations
	const reviewStats = useMemo(() => {
		const allReviews = [];

		company.locations.forEach((location) => {
			if (location.reviews && Array.isArray(location.reviews)) {
				location.reviews.forEach((review) => {
					allReviews.push(review);
				});
			}
		});

		const totalReviews = allReviews.length;
		const averageRating =
			totalReviews > 0
				? (allReviews.reduce((sum, review) => sum + (review.rating || 0), 0) / totalReviews).toFixed(1)
				: 0;

		return { totalReviews, averageRating };
	}, [company.locations]);

	return (
		<div className="p-2.5">
			<div className="relative rounded-t-lg overflow-hidden border-1 border-black">
				<img
					src={company.featuredImage}
					alt={company.companyDetails?.name}
					className="w-full h-84 object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/20" />
				<div className="absolute left-0 bottom-0 w-full flex flex-col md:flex-row items-center md:items-end justify-between px-2.5 md:px-8 py-2.5 md:py-6">
					<div className="flex items-center gap-4">
						<img
							src={company.logo}
							alt={company.companyDetails?.name}
							className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
						/>
						<div>
							<h1 className="text-3xl font-bold text-white">{company.companyDetails?.name}</h1>
							{reviewStats.totalReviews > 0 && (
								<div className="flex items-center gap-1">
									<StarRating rating={parseFloat(reviewStats.averageRating)} size="w-4 h-4" />
									<span className="text-white text-sm">
										{reviewStats.totalReviews === 1
											? 'O recenzie'
											: `${reviewStats.totalReviews} recenzii`}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-end gap-2 mt-0 bg-white p-2.5 rounded-b-lg border-1 border-black company-header-tabs">
				<div className="flex items-center justify-between w-full">
					{/* Location Navigation Tabs or Single Location Name */}
					{hasMultipleLocations ? (
						<div className="flex gap-2 flex-wrap">
							<button
								onClick={() => onLocationChange('all')}
								className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-semibold cursor-pointer ${
									selectedLocation === 'all'
										? 'bg-pink-500 text-white border-pink-500'
										: 'bg-white text-gray-700 border-gray-300 hover:border-pink-300 hover:bg-pink-50'
								}`}
							>
								Toate
							</button>
							{company.locations.map((location) => (
								<button
									key={location.id}
									onClick={() => onLocationChange(location.id)}
									className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-semibold cursor-pointer ${
										selectedLocation === location.id
											? 'bg-pink-500 text-white border-pink-500'
											: 'bg-white text-gray-700 border-gray-300 hover:border-pink-300 hover:bg-pink-50'
									}`}
								>
									{location.name}
								</button>
							))}
						</div>
					) : (
						<div className="text-lg font-semibold text-gray-800">{company.locations[0].name}</div>
					)}

					{/* Follow Button - only show on desktop */}
					<div className="flex items-center gap-2 hidden md:flex">
						<span className="text-black font-semibold">{company.followers} fani</span>
						<Button
							variant={isFollowing ? 'secondary' : 'primary'}
							size="small"
							onClick={() => setIsFollowing((f) => !f)}
						>
							{isFollowing ? 'Statut: Fan' : 'Devino fan'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
