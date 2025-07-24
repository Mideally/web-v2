'use client';

import React, { useEffect, useState } from 'react';
import Button from '../global/Button';
import { useOfferDrawer } from '../global/OfferDrawerContext';

const getExpiry = (moment) => {
	const d = new Date(moment.endTime);

	return isNaN(d.getTime()) ? 0 : d.getTime();
};

function getCountdown(endTime) {
	const end = new Date(endTime);

	if (isNaN(end.getTime())) return 'Expirat';

	const now = Date.now();
	const diff = end.getTime() - now;

	if (diff <= 0) return 'Expirat';

	const h = Math.floor(diff / 1000 / 60 / 60);
	const m = Math.floor((diff / 1000 / 60) % 60);
	const s = Math.floor((diff / 1000) % 60);

	return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
}

const MomentOffer = ({ moments = [] }) => {
	const [now, setNow] = useState(Date.now());
	const [hasMounted, setHasMounted] = useState(false);
	const { openDrawer } = useOfferDrawer();

	useEffect(() => {
		setHasMounted(true);

		const interval = setInterval(() => setNow(Date.now()), 1000);

		return () => clearInterval(interval);
	}, []);

	const sortedMoments = [...moments].sort((a, b) => {
		const now = Date.now();
		const aExpired = getExpiry(a) < now;
		const bExpired = getExpiry(b) < now;

		if (aExpired !== bExpired) return aExpired - bExpired;

		return getExpiry(a) - getExpiry(b);
	});

	if (sortedMoments.length === 0) {
		return (
			<>
				<h2 className="text-2xl font-bold mb-1">Momente speciale</h2>
				<p className="text-gray-600 mb-4">
					Profită de oferte limitate în timp, valabile doar azi la partenerii noștri!
				</p>
				<section className="yellow-shadow bg-white p-6">
					<p className="text-gray-500 text-center">Nu există momente active momentan.</p>
				</section>
				<div className="flex justify-center mt-8">
					<Button variant="white" href="/momente">
						Vezi toate momentele
					</Button>
				</div>
			</>
		);
	}

	return (
		<>
			<h2 className="text-2xl font-bold mb-1">Momente speciale</h2>
			<p className="text-gray-600 mb-4">
				Profită de oferte limitate în timp, valabile doar azi la partenerii noștri!
			</p>
			<section className="yellow-shadow bg-white">
				{sortedMoments.map((moment, idx) => {
					const expired = getExpiry(moment) < now;
					const countdown = getCountdown(moment.endTime);
					const start = new Date(moment.startTime);
					const end = new Date(moment.endTime);
					const validStart = !isNaN(start.getTime());
					const validEnd = !isNaN(end.getTime());

					return (
						<div key={moment.id}>
							<div
								className={`block w-full focus:outline-none cursor-pointer ${
									expired ? 'opacity-60 pointer-events-auto' : 'hover:bg-gray-50 transition'
								} rounded-lg`}
								tabIndex={0}
								onClick={(e) => {
									e.preventDefault();
									openDrawer(moment, 'moment');
								}}
							>
								<div className="flex flex-col sm:flex-row items-stretch p-3 gap-3 relative">
									{/* Image (mobile: full width, desktop: left) */}
									<div className="relative w-full sm:w-auto">
										<img
											src={
												moment.business?.availableLocations?.[0]?.featuredImage ||
												moment.business?.image
											}
											alt={moment.business?.name}
											className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg flex-shrink-0"
										/>
										{/* Overlay on mobile only */}
										<span
											className="absolute inset-0 bg-black/50 rounded-lg sm:hidden"
											aria-hidden="true"
										></span>
										{/* Countdown tag on mobile (absolute over image) */}
										{hasMounted && (
											<span
												className={`absolute top-2 left-2 sm:hidden z-2 inline-block px-4 py-1.5 rounded-full text-sm font-bold border ${
													expired
														? 'bg-gray-200 text-gray-500 border-gray-300'
														: 'bg-pink-500 text-white border-pink-500'
												} ${
													getExpiry(moment) - now < 2 * 60 * 60 * 1000 && !expired
														? 'animate-pulse'
														: ''
												}`}
												style={{ minWidth: 90, textAlign: 'center' }}
											>
												{countdown}
											</span>
										)}
									</div>
									{/* Details + CTA + Countdown (desktop: countdown above CTA, right-aligned) */}
									<div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:pl-2">
										{/* Info left */}
										<div className="flex-1 min-w-0">
											<h3 className="text-lg font-semibold truncate">{moment.title}</h3>
											<p className="text-gray-700 line-clamp-2">{moment.description}</p>
											<p className="text-sm text-gray-500">
												{validStart
													? start.toLocaleTimeString([], {
															hour: '2-digit',
															minute: '2-digit',
													  })
													: '--:--'}
												-
												{validEnd
													? end.toLocaleTimeString([], {
															hour: '2-digit',
															minute: '2-digit',
													  })
													: '--:--'}
											</p>
											<p className="text-sm text-gray-600">
												{moment.business?.name}{' '}
												<span className="text-gray-400">
													({moment.business?.availableLocations?.[0]?.name})
												</span>
											</p>
										</div>
										{/* Countdown + CTA right */}
										<div className="flex flex-col items-end mt-2 sm:mt-0 sm:ml-4">
											{/* Countdown tag on desktop (right, above CTA) */}
											{hasMounted && (
												<span
													className={`hidden sm:inline-block mb-2 px-4 py-1.5 rounded-full text-sm font-bold border ${
														expired
															? 'bg-gray-200 text-gray-500 border-gray-300'
															: 'bg-pink-500 text-white border-black'
													} ${
														getExpiry(moment) - now < 2 * 60 * 60 * 1000 && !expired
															? 'animate-pulse'
															: ''
													}`}
													style={{ minWidth: 90, textAlign: 'center' }}
												>
													Timp rămas: {countdown}
												</span>
											)}
											{!expired && (
												<button
													type="button"
													className="underline text-black text-base cursor-pointer hover:text-pink-900 transition select-none mt-2 sm:mt-3"
												>
													Profită de moment
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
							{idx !== sortedMoments.length - 1 && <div className="border-b border-gray-200" />}
						</div>
					);
				})}
			</section>
			<div className="flex justify-center mt-8">
				<Button variant="white" href="/momente">
					Vezi toate momentele
				</Button>
			</div>
		</>
	);
};

export default MomentOffer;
