'use client';

import React, { useEffect, useState } from 'react';
import DropCard from '../../components/global/DropCard';
import DropCardSkeleton from '../../components/global/DropCardSkeleton';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/global/Button';
import { getAllDrops } from '../../utils/api';

const DropsPage = () => {
	const [drops, setDrops] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const fetchDrops = async (page = 1, append = false) => {
		try {
			if (page === 1) {
				setLoading(true);
			} else {
				setLoadingMore(true);
			}

			const data = await getAllDrops(page, 8);
			const newDrops = data.data || [];

			if (append) {
				setDrops((prev) => [...prev, ...newDrops]);
			} else {
				setDrops(newDrops);
			}

			setHasMore(data.pagination?.hasNextPage || false);
			setCurrentPage(page);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
			setLoadingMore(false);
		}
	};

	useEffect(() => {
		fetchDrops(1);
	}, []);

	const handleLoadMore = () => {
		if (!loadingMore && hasMore) {
			fetchDrops(currentPage + 1, true);
		}
	};

	const renderContent = () => {
		if (loading) {
			return (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{[...Array(8)].map((_, i) => (
						<DropCardSkeleton key={i} />
					))}
				</div>
			);
		}

		if (error) {
			return (
				<div className="text-center">
					<p className="text-red-600">Eroare la încărcarea drop-urilor: {error}</p>
					<Button variant="secondary" className="mt-4" onClick={() => fetchDrops(1)}>
						Încearcă din nou
					</Button>
				</div>
			);
		}

		if (drops.length === 0) {
			return (
				<div className="text-center">
					<p className="text-gray-600">Nu există drop-uri disponibile momentan.</p>
				</div>
			);
		}

		return (
			<>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{drops.map((drop) => (
						<DropCard key={drop.id} drop={drop} />
					))}
					{loadingMore && [...Array(8)].map((_, i) => <DropCardSkeleton key={`skeleton-${i}`} />)}
				</div>
				{hasMore && (
					<div className="text-center mt-8">
						<Button variant="secondary" onClick={handleLoadMore} disabled={loadingMore}>
							{loadingMore ? 'Se încarcă...' : 'Încarcă mai multe'}
						</Button>
					</div>
				)}
			</>
		);
	};

	return (
		<>
			<PageHeader
				title="Toate Drop-urile"
				subtitle="Descoperă ofertele exclusive disponibile acum"
				className="text-center"
			/>
			<div className="container mx-auto px-4 pb-8">{renderContent()}</div>
		</>
	);
};

export default DropsPage;
