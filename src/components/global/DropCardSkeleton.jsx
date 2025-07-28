export default function DropCardSkeleton({ className = '' }) {
	return (
		<div
			className={`flex flex-col block text-left rounded-xl shadow-lg bg-white border border-black overflow-hidden w-full ${className}`}
		>
			<div className="w-full h-40 bg-gray-200 animate-pulse"></div>
			<div className="p-4 flex flex-col gap-2 flex-1">
				<div className="h-6 bg-gray-200 rounded animate-pulse"></div>
				<div className="space-y-2">
					<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
					<div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
				</div>
				<div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>

				<div className="pt-2 mt-auto">
					<div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse mb-1"></div>
					<div className="w-full h-2 bg-gray-200 rounded-full animate-pulse"></div>
				</div>

				<div className="mt-4 h-10 bg-gray-200 rounded animate-pulse"></div>
			</div>
		</div>
	);
}
