'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MainNavigation from '@/components/navigation/MainNavigation';
import Section from '@/components/layout/Section';
import CompaniesGrid from '@/components/companies/CompaniesGrid';
import PageHeader from '@/components/layout/PageHeader';
import { getAllCompanies, getCompaniesByType } from '@/utils/api';

// Extract unique business types from data
const businessTypes = ['cafenea', 'magazin', 'restaurant', 'patiserie', 'servicii'];

const businessTypeLabels = {
	cafenea: 'Cafenele',
	magazin: 'Magazine',
	restaurant: 'Restaurante',
	patiserie: 'Patiserii',
	servicii: 'Servicii',
};

const businessTypeUrls = {
	cafenea: '/cafenele',
	magazin: '/magazine',
	restaurant: '/restaurante',
	patiserie: '/patiserii',
	servicii: '/servicii',
};

export default function ToatePage() {
	const [selectedType, setSelectedType] = useState('');
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
			setCompanies([]); // Clear previous data immediately
			
			try {
				const response = selectedType ? await getCompaniesByType(selectedType, 1) : await getAllCompanies(1);

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
	}, [selectedType]);

	const handleLoadMore = async () => {
		if (isLoadingMore || !pagination.hasNextPage) return;

		setIsLoadingMore(true);
		try {
			const nextPage = pagination.currentPage + 1;
			const response = selectedType
				? await getCompaniesByType(selectedType, nextPage)
				: await getAllCompanies(nextPage);

			setCompanies((prev) => [...prev, ...(response.data || [])]);
			setPagination(response.pagination || {});
		} catch (error) {
			console.error('Error loading more companies:', error);
		} finally {
			setIsLoadingMore(false);
		}
	};

	return (
		<>
			<PageHeader title="Toate business-urile" />
			<Section>
				{/* Business type filter - styled as tabs */}
				<div className="flex flex-wrap gap-2 mb-8">
					<button
						className={`px-5 py-2 rounded-full border font-semibold transition-colors text-base min-w-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
							!selectedType
								? 'bg-black text-white border-black shadow-md'
								: 'bg-white text-black border-black hover:bg-gray-100 cursor-pointer'
						}`}
						onClick={() => setSelectedType('')}
						type="button"
					>
						Toate
					</button>
					{businessTypes.map((type) => (
						<button
							key={type}
							className={`px-5 py-2 rounded-full border font-semibold transition-colors text-base min-w-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
								selectedType === type
									? 'bg-black text-white border-black shadow-md'
									: 'bg-white text-black border-black hover:bg-gray-100 cursor-pointer'
							}`}
							onClick={() => setSelectedType(type)}
							type="button"
						>
							{businessTypeLabels[type] || type}
						</button>
					))}
				</div>

				<CompaniesGrid
					companies={companies}
					pagination={pagination}
					onLoadMore={handleLoadMore}
					isLoading={isLoading || isLoadingMore}
				/>
			</Section>

			{/* Business type link list at the bottom */}
			<Section>
				<div className="flex flex-wrap gap-4 justify-center border-t pt-8 mt-8">
					{businessTypes.map((type) => (
						<Link
							key={type}
							href={businessTypeUrls[type]}
							className="underline text-lg text-black hover:text-indigo-600 transition-colors"
						>
							{businessTypeLabels[type] || type}
						</Link>
					))}
				</div>
			</Section>
		</>
	);
}
