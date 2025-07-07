import { generateMetadata } from '@/utils';
import VideoHero from '@/components/homepage/VideoHero';
import MainNavigation from '@/components/navigation/MainNavigation';
import feedData from '@/data/mock/homepage-discounts-feed.json';
import Section from '@/components/layout/Section';
import MomentOffer from '@/components/offers/MomentOffer';
import DropOffer from '@/components/offers/DropOffer';
import HomepageImpulsesPromo from '@/components/homepage/HomepageImpulsesPromo';
import HomepageBusinessPromo from '@/components/homepage/HomepageBusinessPromo';
import CompaniesGrid from '@/components/companies/CompaniesGrid';

// Generate metadata for this page
export const metadata = generateMetadata({
	title: 'Acasă',
	description: 'Mideally - Conectăm clienții cu business-urile',
	url: 'https://mideally.com',
});

export default function Home() {
	return (
		<>
			<MainNavigation />
			<VideoHero />
			<Section className="py-24">
				<MomentOffer moments={feedData.moments} />
			</Section>
			<Section className="pb-24">
				<DropOffer drops={feedData.drops} />
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
				<CompaniesGrid />
			</Section>
		</>
	);
}
