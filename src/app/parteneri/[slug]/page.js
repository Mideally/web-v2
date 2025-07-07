'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import mockCompanyData from '@/data/mock/mock-company.json';
import PageHero from '@/components/business-page/PageHero';
import DealsComponent from '@/components/business-page/DealsComponent';
import LocationNavigation from '@/components/business-page/LocationNavigation';
import LocationInfo from '@/components/business-page/LocationInfo';

export default function BusinessPage() {
	const { slug } = useParams();
	const [company, setCompany] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedLocation, setSelectedLocation] = useState('all');

	useEffect(() => {
		// Simulate API call - in real app this would fetch from API
		if (slug === 'cafeneaua-urbana') {
			setCompany(mockCompanyData);
		}
		setLoading(false);
	}, [slug]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
			</div>
		);
	}

	if (!company) {
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
		<div className="min-h-screen bg-gray-50">
			<PageHero company={company} />

			{/* Location Navigation - only show if multiple locations */}
			{hasMultipleLocations && (
				<LocationNavigation
					locations={company.locations}
					selectedLocation={selectedLocation}
					onLocationChange={setSelectedLocation}
				/>
			)}

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Offers section - now connected to page location state */}
				<DealsComponent 
					deals={company.deals} 
					locations={company.locations} 
					selectedLocation={hasMultipleLocations ? selectedLocation : company.locations[0]?.id}
				/>

				{/* Combined Location Info section */}
				<div className="mt-12">
					<LocationInfo 
						company={company} 
						selectedLocation={hasMultipleLocations ? selectedLocation : company.locations[0]?.id} 
						onLocationChange={setSelectedLocation}
					/>
				</div>
			</div>
		</div>
	);
}
