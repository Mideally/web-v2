'use client';

import { useState, useEffect } from 'react';
import Section from '@/components/layout/Section';
import CompaniesGrid from '@/components/companies/CompaniesGrid';
import SectionHeader from '@/components/layout/SectionHeader';
import { getCompaniesByType } from '@/utils/api';

export default function RestaurantePage() {
	const [companies, setCompanies] = useState([]);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 0,
		totalItems: 0,
		itemsPerPage: 6,
		hasNextPage: false,
		hasPrevPage: false,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	useEffect(() => {
		const fetchCompanies = async () => {
			setIsLoading(true);
			try {
				const response = await getCompaniesByType('restaurant', 1);

				setCompanies(response.data || []);
				setPagination(response.pagination || {});
			} catch (error) {
				console.error('Error fetching companies:', error);
				setCompanies([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCompanies();
	}, []);

	const handleLoadMore = async () => {
		if (isLoadingMore || !pagination.hasNextPage) return;

		setIsLoadingMore(true);

		try {
			const nextPage = pagination.currentPage + 1;
			const response = await getCompaniesByType('restaurant', nextPage);

			setCompanies((prev) => [...prev, ...(response.data || [])]);
			setPagination(response.pagination || {});
		} catch (error) {
			console.error('Error loading more companies:', error);
		} finally {
			setIsLoadingMore(false);
		}
	};

	return (
		<Section className="pt-24 pb-8">
			<SectionHeader
				title="Restaurante"
				subtitle="Alege dintr-o varietate de restaurante cu meniuri diverse, atmosferă plăcută și servicii excelente. Fie că preferi fine dining sau preparate tradiționale, găsești aici opțiunea potrivită."
			/>
			<CompaniesGrid
				companies={companies}
				pagination={pagination}
				onLoadMore={handleLoadMore}
				isLoading={isLoading || isLoadingMore}
			/>
		</Section>
	);
}
