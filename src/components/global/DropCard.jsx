'use client';

import React from 'react';
import Button from './Button';
import { useOfferDrawer } from './OfferDrawerContext';

const DropCard = ({ drop, className = '', showProgress = true, showButton = true }) => {
	const { openDrawer } = useOfferDrawer();

	// Calculate drop statistics
	const claimed = typeof drop.claimed === 'number' ? drop.claimed : 0;
	const available = typeof drop.available === 'number' ? drop.available : 0;
	const remaining = Math.max(available - claimed, 0);
	const expired = remaining === 0;
	const progress = available > 0 ? (remaining / available) * 100 : 0;

	const handleClick = () => {
		if (!expired) {
			openDrawer(drop, 'drop');
		}
	};

	return (
		<div
			className={`flex flex-col block text-left rounded-xl shadow-lg transition bg-white border border-black overflow-hidden focus:outline-none border-1 w-full ${
				expired ? 'opacity-60 pointer-events-none' : ''
			} duration-200 ease-in-out ${className}`}
			style={{ cursor: expired ? 'not-allowed' : 'pointer' }}
			onClick={handleClick}
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					handleClick();
				}
			}}
		>
			<img
				src={drop.business?.availableLocations?.[0]?.featuredImage}
				alt={drop.business?.name}
				className="w-full h-40 object-cover"
			/>
			<div className="p-4 flex flex-col gap-2 flex-1">
				<h3 className="text-lg font-semibold truncate">{drop.title}</h3>
				<p className="text-gray-700 line-clamp-2">{drop.description}</p>
				<p className="text-sm text-gray-500">
					Drop by {drop.business?.name} - {drop.business?.availableLocations?.[0]?.name}
				</p>

				{showProgress && (
					<div className="pt-2 mt-auto">
						{expired ? (
							<span className="block text-xs text-gray-500 font-semibold mb-1">Niciun drop rămas</span>
						) : (
							<span className="block text-xs text-gray-700 font-semibold mb-1">
								{remaining} din {available} rămase
							</span>
						)}
						<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
							<div
								className={`h-full rounded-full transition-all duration-300 ${
									expired ? 'bg-gray-400' : 'bg-pink-500'
								}`}
								style={{ width: `${progress}%` }}
							></div>
						</div>
					</div>
				)}

				{showButton && (
					<Button variant="tertiary" className="mt-4 w-full" disabled={expired}>
						Vezi drop
					</Button>
				)}
			</div>
		</div>
	);
};

export default DropCard;
