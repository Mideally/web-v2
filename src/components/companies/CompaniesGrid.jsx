'use client';

import { useState } from 'react';
import CompanyCard from './CompanyCard';
import Button from '@/components/global/Button';
import companies from '@/data/mock/companies.json';

export default function CompanyGrid() {
	const [visibleCompanies, setVisibleCompanies] = useState(12);

	const handleLoadMore = () => {
		setVisibleCompanies((prev) => prev + 12);
	};

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				{companies.slice(0, visibleCompanies).map((company) => (
					<CompanyCard key={company.id} company={company} />
				))}
			</div>

			{companies.length > visibleCompanies && (
				<div className="mb-8 text-center">
					<Button variant="tertiary" onClick={handleLoadMore}>
						Încarcă mai multe
					</Button>
				</div>
			)}

			{companies.length === 0 && (
				<div className="text-center py-12">
					<p className="text-gray-600">Nu am găsit parteneri în acest oraș.</p>
				</div>
			)}
		</>
	);
}
