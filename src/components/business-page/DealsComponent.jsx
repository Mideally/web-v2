'use client';

import { useMemo } from 'react';
import MomentOfferCard from './MomentOfferCard';
import DropOfferCard from './DropOfferCard';
import ImageTextBanner from '../global/ImageTextBanner';

export default function DealsComponent({ moments, drops, locations, selectedLocation }) {
	const filteredMoments = useMemo(
		() =>
			(moments || []).filter((m) => {
				if (selectedLocation === 'all') return true;

				// Check if moment has availableLocations array
				if (m.business?.availableLocations && Array.isArray(m.business.availableLocations)) {
					return m.business.availableLocations.some((location) => location.id === selectedLocation);
				}

				// If no location info, show for all locations
				return true;
			}),
		[moments, selectedLocation]
	);

	const filteredDrops = useMemo(
		() =>
			(drops || []).filter((d) => {
				if (selectedLocation === 'all') return true;

				// Check if drop has availableLocations array
				if (d.business?.availableLocations && Array.isArray(d.business.availableLocations)) {
					return d.business.availableLocations.some((location) => location.id === selectedLocation);
				}

				// If no location info, show for all locations
				return true;
			}),
		[drops, selectedLocation]
	);

	return (
		<div className="mb-12">
			{/* Momente Section */}
			<div className="mb-12">
				<ImageTextBanner
					imageSrc="/assets/images/abstract-background-2.jpg"
					altText="Momente"
					description="Momente"
					version="2.0"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
					{filteredMoments.length === 0 && (
						<p className="text-gray-500">Niciun moment activ pentru această locație.</p>
					)}
					{filteredMoments.map((moment) => (
						<MomentOfferCard key={moment.id} moment={moment} />
					))}
				</div>
			</div>

			{/* Drop-uri Section */}
			<div className="mb-12">
				<ImageTextBanner
					imageSrc="/assets/images/abstract-background-2.jpg"
					altText="Dropuri"
					description="Dropuri"
					version="2.0"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
					{filteredDrops.length === 0 && (
						<p className="text-gray-500">Niciun drop activ pentru această locație.</p>
					)}
					{filteredDrops.map((drop) => (
						<DropOfferCard key={drop.id} drop={drop} />
					))}
				</div>
			</div>
		</div>
	);
}
