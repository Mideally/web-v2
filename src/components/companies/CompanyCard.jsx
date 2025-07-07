import Link from 'next/link';

export default function CompanyCard({ company }) {
	const activeVouchersCount = company.vouchers?.active?.length || 0;

	return (
		<Link
			href=""
			className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative border border-1 border-black yellow-shadow"
		>
			{/* Voucher notification bubble */}
			{activeVouchersCount > 0 && (
				<div className="absolute top-2 right-2 z-10">
					<div
						className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full 
								   flex items-center justify-center min-w-[1.5rem] h-6
								   group/tooltip relative"
					>
						<span>{activeVouchersCount}</span>
						{/* Tooltip - now positioned below */}
						<div className="absolute top-full right-0 mt-2 hidden group-hover/tooltip:block">
							<div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
								Discounturi active
								{/* Arrow - now positioned at top-right */}
								<div className="absolute -top-1 right-3 transform -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="aspect-video relative overflow-hidden">
				<img
					src={company.branding.featuredImage}
					alt={company.companyDetails.name}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/0"></div>
				<div className="absolute bottom-0 left-0 right-0 p-4">
					<div className="flex items-center space-x-3">
						<img
							src={company.branding.logo}
							alt={`${company.companyDetails.name} logo`}
							className="w-12 h-12 rounded-full border-2 border-white"
						/>
						<div className="text-white">
							<h3 className="font-semibold">{company.companyDetails.name}</h3>
							<p className="text-sm opacity-90">{company.location.city}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="p-4">
				<p className="text-gray-600 line-clamp-2">{company.companyDetails.description}</p>
			</div>
		</Link>
	);
}
