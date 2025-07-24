'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CompaniesGrid from '@/components/companies/CompaniesGrid';
import { getCompaniesByCity, getCompaniesByCounty } from '@/utils/api';
import Spinner from '@/components/global/Spinner';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/layout/SectionHeader';
import Toggle from '@/components/global/Toggle';

export default function CityPartnersPage() {
	const { city } = useParams();
	const [companies, setCompanies] = useState([]);
	const [pagination, setPagination] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [gridLoading, setGridLoading] = useState(false); // Add this new state
	const [showCounty, setShowCounty] = useState(false);
	const [currentCity, setCurrentCity] = useState('');
	const [currentCounty, setCurrentCounty] = useState('');

	useEffect(() => {
		const fetchCompanies = async () => {
			setLoading(true);

			try {
				const decodedCity = decodeURIComponent(city);

				const result = await getCompaniesByCity(decodedCity);

				setCompanies(result.data);
				setPagination(result.pagination);

				// Extract county and city from first company's location for toggle functionality
				if (result.data.length > 0 && result.data[0].locations?.length > 0) {
					const firstLocation = result.data[0].locations[0];

					if (firstLocation.address?.county) {
						setCurrentCounty(firstLocation.address.county);
					}

					// Use the properly formatted city name from the API response
					if (firstLocation.address?.city) {
						setCurrentCity(firstLocation.address.city);
					} else {
						// Fallback to decoded URL parameter if no city in response
						setCurrentCity(decodedCity);
					}
				} else {
					// Fallback to decoded URL parameter if no companies found
					setCurrentCity(decodedCity);
				}
			} catch (error) {
				console.error('Error fetching companies by city:', error);

				setCompanies([]);
				setPagination(null);
			} finally {
				setLoading(false);
			}
		};

		fetchCompanies();
	}, [city]);

	const handleLoadMore = async () => {
		if (!pagination?.hasNextPage || loadingMore) return;

		setLoadingMore(true);
		try {
			const nextPage = pagination.currentPage + 1;
			const result = showCounty
				? await getCompaniesByCounty(currentCounty, nextPage)
				: await getCompaniesByCity(currentCity, nextPage);

			setCompanies((prev) => [...prev, ...result.data]);
			setPagination(result.pagination);
		} catch (error) {
			console.error('Error loading more companies:', error);
		} finally {
			setLoadingMore(false);
		}
	};

	const handleToggleView = async () => {
		setGridLoading(true); // Use gridLoading instead of loading
		setCompanies([]);
		setPagination(null);

		try {
			if (!showCounty) {
				// Switch to county view
				const result = await getCompaniesByCounty(currentCounty);

				setCompanies(result.data);
				setPagination(result.pagination);
			} else {
				// Switch back to city view
				const result = await getCompaniesByCity(currentCity);

				setCompanies(result.data);
				setPagination(result.pagination);
			}
			setShowCounty(!showCounty);
		} catch (error) {
			console.error('Error toggling view:', error);
		} finally {
			setGridLoading(false); // Use gridLoading instead of loading
		}
	};

	const formatLocationName = (name) => {
		// Preserve diacritical marks by only capitalizing the first letter
		// without converting the rest to lowercase
		return name.charAt(0).toUpperCase() + name.slice(1);
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	const displayName = currentCity; // Always use the city name, not the county

	return (
		<Section className="pt-24">
			<SectionHeader
				title={`Parteneri în ${formatLocationName(displayName)}`}
				subtitle={`${pagination?.totalItems || 0} parteneri găsiți`}
			/>

			{/* Toggle component */}
			{currentCounty && (
				<div className="mb-8 flex justify-end">
					<Toggle
						leftOption={formatLocationName(currentCity)}
						rightOption="Tot județul"
						isLeftActive={!showCounty}
						onToggle={handleToggleView}
						disabled={gridLoading}
					/>
				</div>
			)}

			<CompaniesGrid
				companies={companies}
				pagination={pagination}
				onLoadMore={handleLoadMore}
				isLoading={loadingMore || gridLoading}
			/>
		</Section>
	);
}
