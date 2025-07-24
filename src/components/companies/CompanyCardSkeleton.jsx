export default function CompanyCardSkeleton() {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden border border-1 border-gray-200 animate-pulse">
			{/* Image skeleton */}
			<div className="h-68 relative overflow-hidden bg-gray-600">
				{/* Gradient overlay skeleton */}
				<div className="absolute inset-0 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100"></div>

				{/* Bottom content skeleton */}
				<div className="absolute bottom-0 left-0 right-0 p-4">
					<div className="flex items-center space-x-3">
						{/* Logo skeleton */}
						<div className="w-12 h-12 rounded-full border-2 border-white bg-gray-300"></div>

						{/* Text skeleton */}
						<div className="flex-1">
							<div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
							<div className="h-3 bg-gray-300 rounded w-1/2"></div>
						</div>
					</div>
				</div>
			</div>

			{/* Description skeleton */}
			<div className="px-4 py-6">
				<div className="space-y-2">
					<div className="h-3 bg-gray-200 rounded w-full"></div>
					<div className="h-3 bg-gray-200 rounded w-4/5"></div>
				</div>
			</div>
		</div>
	);
}
