'use client';

import Button from '@/components/global/Button';
import StarRating from './StarRating';
import { useState, useMemo } from 'react';

export default function PageHero({ company }) {
	const [isFollowing, setIsFollowing] = useState(false);

	const hasMultipleLocations = company.locations.length > 1;
	const address = company.locations[0].address;

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
		<div className="relative bg-gray-100">
			<img src={company.featuredImage} alt={company.name} className="w-full h-64 object-cover" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
			<div className="absolute left-0 bottom-0 w-full flex flex-col md:flex-row items-center md:items-end justify-between px-8 py-6">
				<div className="flex items-center gap-4">
					<img
						src={company.logo}
						alt={company.name}
						className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
					/>
					<div>
						<h1 className="text-3xl font-bold text-white">{company.name}</h1>
						{!hasMultipleLocations && <div className="text-white text-sm">{location.name}</div>}
						{hasMultipleLocations && (
							<div className="text-white text-sm">
								{company.locations.map((location) => location.name).join(', ')}
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
					<div className="flex items-center gap-2">
						<span className="text-white font-semibold">{company.followers} urmăritori</span>
						<Button
							variant={isFollowing ? 'secondary' : 'primary'}
							size="small"
							onClick={() => setIsFollowing((f) => !f)}
						>
							{isFollowing ? 'Urmărești' : 'Urmărește'}
						</Button>
					</div>
					{reviewStats.totalReviews > 0 && (
						<div className="flex items-center gap-1">
							<StarRating rating={parseFloat(reviewStats.averageRating)} size="w-4 h-4" />
							<span className="text-white text-sm">
								{reviewStats.totalReviews === 1 ? 'O recenzie' : `${reviewStats.totalReviews} recenzii`}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
