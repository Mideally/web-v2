'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageHero from '@/components/business-page/PageHero';
import DealsComponent from '@/components/business-page/DealsComponent';
import LocationInfo from '@/components/business-page/LocationInfo';
import { getCompanyData, getMomentsByBusinessId, getDropsByBusinessId } from '@/utils/api';
import Spinner from '@/components/global/Spinner';
import Gallery from '@/components/global/Gallery';
import { extractGalleryImages } from '@/utils';
import Section from '@/components/layout/Section';
import LoyaltyTiers from '@/components/global/LoyaltyTiers';

const currentUser = {
	tier: 'fan',
	loyaltyPoints: 0,
	isLoggedIn: true,
};

export default function BusinessPage() {
	const { slug } = useParams();
	const [company, setCompany] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedLocation, setSelectedLocation] = useState('all');
	const [imagesData, setImagesData] = useState({ companyImages: [], locationImages: [] });
	const [dealsData, setDealsData] = useState({ moments: [], drops: [] });

	useEffect(() => {
		const fetchCompany = async () => {
			try {
				const companyData = await getCompanyData(slug);

				const { companyImages, locationImages } = extractGalleryImages(companyData);

				setCompany(companyData);
				setImagesData({ companyImages, locationImages });
			} catch (error) {
				console.error('Error fetching company data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCompany();
	}, [slug]);

	useEffect(() => {
		const fetchDealsData = async () => {
			if (!company) return;

			try {
				// Fetch moments and drops for the company
				const [momentsResponse, dropsResponse] = await Promise.all([
					getMomentsByBusinessId(company.id, 1, 10),
					getDropsByBusinessId(company.id, 1, 10),
				]);

				setDealsData({
					moments: momentsResponse.data || [],
					drops: dropsResponse.data || [],
				});
			} catch (error) {
				console.error('Error fetching deals data:', error);
				// Set empty arrays if fetch fails
				setDealsData({ moments: [], drops: [] });
			}
		};

		fetchDealsData();
	}, [company]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (!company && !loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">Business-ul nu a fost găsit</h1>
					<p className="text-gray-600">Business-ul pe care îl cauți nu există sau a fost șters.</p>
				</div>
			</div>
		);
	}

	const hasMultipleLocations = company.locations.length > 1;

	return (
		<>
			<PageHero company={company} selectedLocation={selectedLocation} onLocationChange={setSelectedLocation} />
			<Section className="pt-4 md:pt-12">
				{/* Offers section - now with dynamic data */}
				<DealsComponent
					moments={dealsData.moments}
					drops={dealsData.drops}
					locations={company.locations}
					selectedLocation={hasMultipleLocations ? selectedLocation : company.locations[0]?.id}
				/>

				{/* Combined Location Info section */}
				<div className="my-14 yellow-shadow bg-white">
					<LocationInfo
						company={company}
						selectedLocation={hasMultipleLocations ? selectedLocation : company.locations[0]?.id}
						onLocationChange={setSelectedLocation}
					/>
				</div>

				<div className="yellow-shadow bg-white">
					<h3 className="text-2xl font-bold pl-6 pt-6">Galerie</h3>
					<Gallery imagesData={imagesData} />
				</div>

				{/* <div className="yellow-shadow bg-white mt-8 md:mt-14 p-6">
					<LoyaltyTiers
						currentUserTier={currentUser.tier}
						currentUserPoints={currentUser.loyaltyPoints}
						isLoggedIn={currentUser.isLoggedIn}
					/>
				</div> */}
			</Section>
		</>
	);
}
