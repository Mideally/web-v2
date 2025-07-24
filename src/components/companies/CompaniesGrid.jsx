'use client';

import CompanyCard from './CompanyCard';
import CompanyCardSkeleton from './CompanyCardSkeleton';
import Button from '@/components/global/Button';
import Link from 'next/link';

export default function CompaniesGrid({
	companies = [],
	pagination,
	onLoadMore,
	isLoading = false,
	showViewAll = false,
	viewAllUrl = '/toti-partenerii',
}) {
	const handleLoadMore = () => {
		if (onLoadMore) {
			onLoadMore();
		}
	};

	// Filter out companies with missing required data
	const validCompanies = companies.filter((company) => {
		return (
			company && company.featuredImage && company.companyDetails && company.companyDetails.name && company.slug
		);
	});

	// Show skeletons when loading and no companies
	if (isLoading && validCompanies.length === 0) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				{Array.from({ length: 3 }).map((_, index) => (
					<CompanyCardSkeleton key={index} />
				))}
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				{validCompanies.map((company) => (
					<CompanyCard key={company.id || company.slug} company={company} />
				))}

				{/* Show skeletons for loading more */}
				{isLoading &&
					validCompanies.length > 0 &&
					Array.from({ length: 3 }).map((_, index) => <CompanyCardSkeleton key={`skeleton-${index}`} />)}
			</div>

			{/* Show "Vezi toate" button when showViewAll is true and there are companies */}
			{showViewAll && validCompanies.length > 0 && (
				<div className="mb-8 text-center">
					<Link href={viewAllUrl}>
						<Button variant="tertiary">Vezi toate</Button>
					</Link>
				</div>
			)}

			{/* Show "Încarcă mai multe" button when there are more pages and not showing view all */}
			{pagination?.hasNextPage && !showViewAll && (
				<div className="mb-8 text-center">
					<Button variant="tertiary" onClick={handleLoadMore} disabled={isLoading}>
						{isLoading ? 'Se încarcă...' : 'Încarcă mai multe'}
					</Button>
				</div>
			)}

			{validCompanies.length === 0 && !isLoading && (
				<div className="text-center py-12">
					<p className="text-gray-600">Nu am găsit parteneri în această categorie.</p>
				</div>
			)}
		</>
	);
}
