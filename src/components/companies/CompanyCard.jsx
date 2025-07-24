import Link from 'next/link';
import StarRating from '@/components/business-page/StarRating';

export default function CompanyCard({ company }) {
	// Count active deals (moments and drops)
	const activeDealsCount = (company.deals?.moments?.length || 0) + (company.deals?.drops?.length || 0);

	// Calculate review stats from all locations
	const reviewStats = (() => {
		const allReviews = [];

		company.locations?.forEach((location) => {
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
	})();

	return (
		<Link
			href={`/parteneri/${company.slug}`}
			className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative border border-1 border-black yellow-shadow"
		>
			{/* Deals notification bubble */}
			{activeDealsCount > 0 && (
				<div className="absolute top-2 right-2 z-2">
					<div
						className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full 
								   flex items-center justify-center min-w-[1.5rem] h-6
								   group/tooltip relative"
					>
						<span>{activeDealsCount}</span>
						{/* Tooltip - now positioned below */}
						<div className="absolute top-full right-0 mt-2 hidden group-hover/tooltip:block">
							<div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
								Oferte active
								{/* Arrow - now positioned at top-right */}
								<div className="absolute -top-1 right-3 transform -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="aspect-video relative overflow-hidden">
				<img
					src={company.featuredImage}
					alt={company.companyDetails?.name || 'Company'}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/0"></div>
				<div className="absolute bottom-0 left-0 right-0 p-4">
					<div className="flex items-center space-x-3">
						{company.logo && (
							<img
								src={company.logo}
								alt={`${company.companyDetails?.name || 'Company'} logo`}
								className="w-12 h-12 rounded-full border-2 border-white object-cover"
							/>
						)}
						<div className="text-white">
							<h3 className="font-semibold">{company.companyDetails?.name || 'Company'}</h3>
							{reviewStats.totalReviews > 0 ? (
								<div className="flex items-center gap-1">
									<StarRating rating={parseFloat(reviewStats.averageRating)} size="w-3 h-3" />
									<span className="text-sm opacity-90">
										{reviewStats.totalReviews === 1
											? 'O recenzie'
											: `${reviewStats.totalReviews} recenzii`}
									</span>
								</div>
							) : (
								<p className="text-sm opacity-90">Fără recenzii</p>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="p-4">
				<p className="text-gray-600 line-clamp-2">{company.companyDetails?.description || ''}</p>
			</div>
		</Link>
	);
}
