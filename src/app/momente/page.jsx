'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Section from '@/components/layout/Section';
import Button from '@/components/global/Button';
import { getAllMoments } from '@/utils/api';
import { useOfferDrawer } from '@/components/global/OfferDrawerContext';

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

export default function MomentePage() {
	const [moments, setMoments] = useState([]);
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
	const [now, setNow] = useState(Date.now());
	const [hasMounted, setHasMounted] = useState(false);
	const { openDrawer } = useOfferDrawer();

	useEffect(() => {
		setHasMounted(true);
		const interval = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const fetchMoments = async () => {
			setIsLoading(true);
			setMoments([]);

			try {
				const response = await getAllMoments(1);
				setMoments(response.data || []);
				setPagination(response.pagination || {});
			} catch (error) {
				console.error('Error fetching moments:', error);
				setMoments([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMoments();
	}, []);

	const handleLoadMore = async () => {
		if (isLoadingMore || !pagination.hasNextPage) return;

		setIsLoadingMore(true);
		try {
			const nextPage = pagination.currentPage + 1;
			const response = await getAllMoments(nextPage);

			setMoments((prev) => [...prev, ...(response.data || [])]);
			setPagination(response.pagination || {});
		} catch (error) {
			console.error('Error loading more moments:', error);
		} finally {
			setIsLoadingMore(false);
		}
	};

	const sortedMoments = [...moments].sort((a, b) => {
		const aExpired = getExpiry(a) < now;
		const bExpired = getExpiry(b) < now;

		if (aExpired !== bExpired) return aExpired - bExpired;

		return getExpiry(a) - getExpiry(b);
	});

	const renderMomentCard = (moment) => {
		const expired = getExpiry(moment) < now;
		const countdown = getCountdown(moment.endTime);
		const start = new Date(moment.startTime);
		const end = new Date(moment.endTime);
		const validStart = !isNaN(start.getTime());
		const validEnd = !isNaN(end.getTime());

		return (
			<div
				key={moment.id}
				className={`block w-full focus:outline-none cursor-pointer ${
					expired ? 'opacity-60' : 'hover:bg-gray-50 transition'
				} rounded-lg border border-black bg-white shadow-lg`}
				tabIndex={0}
				onClick={() => openDrawer(moment, 'moment')}
			>
				<div className="flex flex-col sm:flex-row items-stretch p-4 gap-4 relative">
					{/* Image */}
					<div className="relative w-full sm:w-auto">
						<img
							src={moment.business?.availableLocations?.[0]?.featuredImage || moment.business?.image}
							alt={moment.business?.name}
							className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg flex-shrink-0"
						/>
						{/* Countdown tag */}
						{hasMounted && (
							<span
								className={`absolute top-2 left-2 z-2 inline-block px-3 py-1 rounded-full text-sm font-bold border ${
									expired
										? 'bg-gray-200 text-gray-500 border-gray-300'
										: 'bg-pink-500 text-white border-pink-500'
								} ${getExpiry(moment) - now < 2 * 60 * 60 * 1000 && !expired ? 'animate-pulse' : ''}`}
								style={{ minWidth: 80, textAlign: 'center' }}
							>
								{countdown}
							</span>
						)}
					</div>

					{/* Details */}
					<div className="flex-1 min-w-0 flex flex-col justify-between">
						<div className="flex-1">
							<h3 className="text-xl font-semibold mb-2">{moment.title}</h3>
							<p className="text-gray-700 mb-3 line-clamp-3">{moment.description}</p>

							<div className="space-y-1">
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
						</div>

						{/* CTA */}
						<div className="mt-4">
							{!expired && (
								<Button variant="tertiary" className="w-full sm:w-auto">
									Profită de moment
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<PageHeader
				title="Momente speciale"
				className="text-center"
				subtitle="Profită de oferte limitate în timp, valabile doar azi la partenerii noștri!"
			/>
			<Section>
				{/* Moments grid */}
				{isLoading && moments.length === 0 ? (
					<div className="space-y-6 mb-8">
						{Array.from({ length: 3 }).map((_, index) => (
							<div key={index} className="animate-pulse">
								<div className="bg-white p-4 rounded-lg border border-black">
									<div className="flex flex-col sm:flex-row gap-4">
										<div className="bg-gray-200 w-full sm:w-32 h-48 sm:h-32 rounded-lg"></div>
										<div className="flex-1 space-y-2">
											<div className="h-6 bg-gray-200 rounded"></div>
											<div className="h-4 bg-gray-200 rounded"></div>
											<div className="h-4 bg-gray-200 rounded"></div>
											<div className="h-4 bg-gray-200 rounded w-1/2"></div>
											<div className="h-8 bg-gray-200 rounded w-24"></div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<>
						<div className="space-y-6 mb-8">
							{sortedMoments.map(renderMomentCard)}

							{/* Show skeletons for loading more */}
							{isLoadingMore &&
								Array.from({ length: 2 }).map((_, index) => (
									<div key={`skeleton-${index}`} className="animate-pulse">
										<div className="bg-white p-4 rounded-lg border border-black">
											<div className="flex flex-col sm:flex-row gap-4">
												<div className="bg-gray-200 w-full sm:w-32 h-48 sm:h-32 rounded-lg"></div>
												<div className="flex-1 space-y-2">
													<div className="h-6 bg-gray-200 rounded"></div>
													<div className="h-4 bg-gray-200 rounded"></div>
													<div className="h-4 bg-gray-200 rounded"></div>
													<div className="h-4 bg-gray-200 rounded w-1/2"></div>
													<div className="h-8 bg-gray-200 rounded w-24"></div>
												</div>
											</div>
										</div>
									</div>
								))}
						</div>

						{/* Load more button */}
						{pagination?.hasNextPage && (
							<div className="text-center">
								<Button variant="tertiary" onClick={handleLoadMore} disabled={isLoadingMore}>
									{isLoadingMore ? 'Se încarcă...' : 'Încarcă mai multe'}
								</Button>
							</div>
						)}

						{/* Empty state */}
						{moments.length === 0 && !isLoading && (
							<div className="text-center py-12">
								<p className="text-gray-600">Nu există momente active momentan.</p>
							</div>
						)}
					</>
				)}
			</Section>
		</>
	);
}
