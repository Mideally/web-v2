'use client';

import { useState, useMemo } from 'react';
import MomentOfferCard from './MomentOfferCard';
import DropOfferCard from './DropOfferCard';

const typeOptions = [
	{ id: 'moment', label: 'Momente' },
	{ id: 'drop', label: 'Drop-uri' },
];

export default function DealsComponent({ deals, locations, selectedLocation }) {
	const [selectedType, setSelectedType] = useState('moment');

	const filteredMoments = useMemo(
		() =>
			(deals.moments || []).filter(
				(m) => selectedLocation === 'all' || m.availableLocations.includes(selectedLocation)
			),
		[deals, selectedLocation]
	);

	const filteredDrops = useMemo(
		() =>
			(deals.drops || []).filter(
				(d) => selectedLocation === 'all' || d.availableLocations.includes(selectedLocation)
			),
		[deals, selectedLocation]
	);

	return (
		<div className="mb-12">
			<div className="flex flex-wrap gap-4 mb-6">
				{/* Type filter */}
				<div className="flex gap-2">
					{typeOptions.map((type) => (
						<button
							key={type.id}
							className={`px-6 py-2 rounded-full border text-sm font-medium transition cursor-pointer ${
								selectedType === type.id
									? 'bg-pink-500 text-white border-pink-500'
									: 'bg-white text-black border-gray-300 hover:bg-gray-100'
							}`}
							onClick={() => setSelectedType(type.id)}
						>
							{type.label}
						</button>
					))}
				</div>
			</div>

			{/* Offers */}
			{selectedType === 'moment' ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{filteredMoments.length === 0 && (
						<p className="text-gray-500">Niciun moment activ pentru această locație.</p>
					)}
					{filteredMoments.map((moment) => (
						<MomentOfferCard key={moment.id} moment={moment} />
					))}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{filteredDrops.length === 0 && (
						<p className="text-gray-500">Niciun drop activ pentru această locație.</p>
					)}
					{filteredDrops.map((drop) => (
						<DropOfferCard key={drop.id} drop={drop} />
					))}
				</div>
			)}
		</div>
	);
}
