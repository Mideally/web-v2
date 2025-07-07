import { generateMetadata } from '@/utils';
import { PageHeader, Section, SectionHeader } from '@/components/layout';

// Generate metadata for this page
export const metadata = generateMetadata({
	title: 'Noutăți',
	description: 'Apariții publice, evenimente și alte informații despre Mideally.',
	url: 'https://mideally.com/noutati',
});

export default function NewsPage() {
	return (
		<Section>
			<PageHeader
				title="Noutăți"
				subtitle="Apariții publice, evenimente și alte informații despre Mideally."
				className="text-center mt-8 lg:mt-16"
			/>

			<div className="max-w-4xl mx-auto mt-12">
				<SectionHeader
					title="Roadmap Funcționalități"
					subtitle="Descoperă planul nostru de dezvoltare și funcționalitățile care vor fi lansate în curând pe platforma Mideally."
					className="mb-12"
				/>

				{/* Roadmap content to be implemented here */}
				<p className="text-center text-gray-600 mb-8">Roadmap în curs de implementare.</p>
			</div>
		</Section>
	);
}
