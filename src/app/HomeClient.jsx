'use client';

import { useState, useEffect } from 'react';
import VideoHero from '@/components/homepage/VideoHero';
import MainNavigation from '@/components/navigation/MainNavigation';
import Section from '@/components/layout/Section';
import MomentOffer from '@/components/offers/MomentOffer';
import DropOffer from '@/components/offers/DropOffer';
import HomepageImpulsesPromo from '@/components/homepage/HomepageImpulsesPromo';
import HomepageBusinessPromo from '@/components/homepage/HomepageBusinessPromo';
import CompaniesGrid from '@/components/companies/CompaniesGrid';
import { getAllCompanies, getExpiringSoonMoments, getEndingSoonDrops } from '@/utils/api';
import Spinner from '@/components/global/Spinner';

export default function HomeClient() {
	const [companiesData, setCompaniesData] = useState(null);
	const [momentsData, setMomentsData] = useState([]);
	const [dropsData, setDropsData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [companies, moments, drops] = await Promise.all([
					getAllCompanies(1, 6),
					getExpiringSoonMoments(),
					getEndingSoonDrops(),
				]);

				setCompaniesData(companies);
				setMomentsData(moments.data || []);
				setDropsData(drops.data || []);
			} catch (error) {
				console.error('Error fetching homepage data:', error);
				setCompaniesData({ data: [], pagination: {} });
				setMomentsData([]);
				setDropsData([]);
			} finally {
				setLoading(false);
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
			<MainNavigation />
			<VideoHero />
			<Section className="py-24">
				<MomentOffer moments={momentsData} />
			</Section>
			<Section className="pb-24">
				<DropOffer drops={dropsData} />
			</Section>
			<Section>
				<HomepageImpulsesPromo />
			</Section>
			<Section className="py-24 md:py-48">
				<HomepageBusinessPromo />
			</Section>
			<Section>
				<h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-black">
					Ce companii sunt deja în Mideally?
				</h2>
				<CompaniesGrid
					companies={companiesData?.data || []}
					pagination={companiesData?.pagination || {}}
					showViewAll={true}
					viewAllUrl="/toti-partenerii"
				/>
			</Section>
		</>
	);
}
