'use client';

import { useState, useEffect } from 'react';
import Section from '@/components/layout/Section';
import CompaniesGrid from '@/components/companies/CompaniesGrid';
import { getCompaniesByType } from '@/utils/api';
import PageHeader from '@/components/layout/PageHeader';

export default function ServiciiPage() {
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
				const response = await getCompaniesByType('servicii', 1);

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
			const response = await getCompaniesByType('servicii', nextPage);

			setCompanies((prev) => [...prev, ...(response.data || [])]);
			setPagination(response.pagination || {});
		} catch (error) {
			console.error('Error loading more companies:', error);
		} finally {
			setIsLoadingMore(false);
		}
	};

	return (
		<Section>
			<PageHeader
				title="Servicii"
				subtitle="Colaborează cu profesioniști locali pentru servicii rapide și de calitate. Indiferent de domeniu, aici găsești partenerii potriviți pentru proiectele tale."
				className="text-center"
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
