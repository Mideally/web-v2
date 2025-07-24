'use client';

import React, { useEffect, useState } from 'react';
import Button from '../global/Button';
import { useOfferDrawer } from '../global/OfferDrawerContext';

const DropOffer = ({ drops = [] }) => {
	const [now, setNow] = useState(Date.now());
	const { openDrawer } = useOfferDrawer();

	useEffect(() => {
		const interval = setInterval(() => setNow(Date.now()), 1000);

		return () => clearInterval(interval);
	}, []);

	const sortedDrops = (drops || [])
		.map((drop) => {
			const claimed = typeof drop.claimed === 'number' ? drop.claimed : 0;
			const available = typeof drop.available === 'number' ? drop.available : 0;
			const remaining = Math.max(available - claimed, 0);

			return { ...drop, available, claimed, remaining };
		})
		.sort((a, b) => {
			if (a.remaining === 0 && b.remaining > 0) return 1;
			if (a.remaining > 0 && b.remaining === 0) return -1;

			return a.remaining - b.remaining;
		});

	return (
		<>
			<h2 className="text-2xl font-bold mb-1">Drop-uri exclusive</h2>
			<p className="text-gray-600 mb-6">Prinde ofertele cu stoc limitat, valabile doar pentru cei mai rapizi!</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{sortedDrops.map((drop) => {
					const expired = drop.remaining === 0;
					const progress = drop.available > 0 ? (drop.remaining / drop.available) * 100 : 0;

					return (
						<div
							key={drop.id}
							disabled={expired}
							className={`flex flex-col block text-left rounded-xl shadow-lg transition bg-white border border-black overflow-hidden focus:outline-none border-1 w-full ${
								expired ? 'opacity-60 pointer-events-none' : ''
							} duration-200 ease-in-out`}
							style={{ cursor: expired ? 'not-allowed' : 'pointer' }}
							onClick={() => !expired && openDrawer(drop, 'drop')}
							tabIndex={0}
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
								<div className="pt-2 mt-auto">
									{expired ? (
										<span className="block text-xs text-gray-500 font-semibold mb-1">
											Niciun drop rămas
										</span>
									) : (
										<span className="block text-xs text-gray-700 font-semibold mb-1">
											{drop.remaining} din {drop.available} rămase
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
								<Button variant="tertiary" className="mt-4 w-full" disabled={expired}>
									Vezi drop
								</Button>
							</div>
						</div>
					);
				})}
				{/* Empty card at the end with animated text, clickable */}
				<a
					href="/drops"
					className="flex flex-col justify-center items-center rounded-xl shadow-lg bg-white border border-black border-1 h-full min-h-[340px] cursor-pointer"
					tabIndex={0}
				>
					<div className="text-lg font-semibold text-gray-700 text-center uppercase flex flex-col items-center">
						<span className="flex flex-col items-center">
							Get all
							<span className="relative inline-block w-32 align-middle">
								<span className="sr-only">local</span>
								<span className="h-9 overflow-hidden block relative">
									<span className="flex flex-col animate-flip-words px-2">
										<span className="py-1">
											<span className="bg-pink-500 text-white px-2 py-0.5 rounded text-center border border-black">
												local
											</span>
										</span>
										<span className="py-1">
											<span className="bg-blue-400 text-white px-2 py-0.5 rounded text-center border border-black">
												original
											</span>
										</span>
										<span className="py-1">
											<span className="bg-[#dbff79] text-black px-2 py-0.5 rounded text-center border border-black">
												exclusive
											</span>
										</span>
									</span>
								</span>
							</span>
							drops
						</span>
					</div>
					<style jsx>{`
						@keyframes flip-words {
							0% {
								transform: translateY(0);
							}
							20% {
								transform: translateY(0);
							}
							33% {
								transform: translateY(-2.25rem);
							}
							53% {
								transform: translateY(-2.25rem);
							}
							66% {
								transform: translateY(-4.5rem);
							}
							86% {
								transform: translateY(-4.5rem);
							}
							100% {
								transform: translateY(0);
							}
						}
						.animate-flip-words {
							animation: flip-words 3.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
						}
					`}</style>
				</a>
			</div>
		</>
	);
};

export default DropOffer;
