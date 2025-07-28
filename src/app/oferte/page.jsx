'use client';

import { useState, useEffect } from 'react';
import { generateMetadata } from '@/utils';
import Section from '@/components/layout/Section';
import PageHeader from '@/components/layout/PageHeader';
import ImageTextBanner from '@/components/global/ImageTextBanner';
import MomentOfferCard from '@/components/business-page/MomentOfferCard';
import DropOfferCard from '@/components/business-page/DropOfferCard';
import Spinner from '@/components/global/Spinner';
import Button from '@/components/global/Button';
import { getAllMoments, getAllDrops } from '@/utils/api';

export default function OfertePage() {
	const [moments, setMoments] = useState([]);
	const [drops, setDrops] = useState([]);
	const [loading, setLoading] = useState(true);
	const [momentsLoading, setMomentsLoading] = useState(true);
	const [dropsLoading, setDropsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch moments and drops in parallel
				const [momentsResponse, dropsResponse] = await Promise.all([
					getAllMoments(1, 10),
					getAllDrops(1, 7), // Limit drops to 7
				]);

				setMoments(momentsResponse.data || []);
				setDrops(dropsResponse.data || []);
			} catch (error) {
				console.error('Error fetching offers:', error);
				setMoments([]);
				setDrops([]);
			} finally {
				setLoading(false);
				setMomentsLoading(false);
				setDropsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	return (
		<>
			<PageHeader
				title="Oferte"
				subtitle="Descoperă cele mai noi momente și drop-uri disponibile în platforma Mideally"
				className="text-center"
			/>

			<Section className="pt-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Momente Section */}
					<div className="space-y-6">
						<ImageTextBanner
							imageSrc="/assets/images/abstract-background-2.jpg"
							altText="Momente"
							description="Momente"
							version="2.0"
						/>

						{momentsLoading ? (
							<div className="flex justify-center py-8">
								<Spinner />
							</div>
						) : moments.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-gray-500">Nu există momente active momentan.</p>
							</div>
						) : (
							<div className="space-y-4">
								{moments.map((moment) => (
									<MomentOfferCard key={moment.id} moment={moment} />
								))}
								<div className="pt-4 flex justify-center">
									<Button variant="secondary" href="/momente">
										Vezi toate momentele
									</Button>
								</div>
							</div>
						)}
					</div>

					{/* Drop-uri Section */}
					<div className="space-y-6">
						<ImageTextBanner
							imageSrc="/assets/images/abstract-background-2.jpg"
							altText="Drop-uri"
							description="Drop-uri"
							version="2.0"
						/>

						{dropsLoading ? (
							<div className="flex justify-center py-8">
								<Spinner />
							</div>
						) : drops.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-gray-500">Nu există drop-uri active momentan.</p>
							</div>
						) : (
							<div className="space-y-4">
								{drops.map((drop) => (
									<DropOfferCard key={drop.id} drop={drop} />
								))}
								<div className="pt-4 flex justify-center">
									<Button variant="secondary" href="/drops">
										Vezi toate drop-urile
									</Button>
								</div>
							</div>
						)}
					</div>
				</div>
			</Section>
		</>
	);
}
