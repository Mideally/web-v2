import { generateMetadata } from '@/utils';
import { PageHeader, Section } from '@/components/layout';

// Generate metadata for this page
export const metadata = generateMetadata({
	title: 'Înregistrare Business',
	description: 'Înregistrează-ți businessul în platforma Mideally și conectează-te cu clienții tăi.',
	url: 'https://mideally.com/inregistrare-business',
});

export default function BusinessRegistrationPage() {
	return (
		<Section>
			<div className="py-12">
				<PageHeader
					title="Înregistrare Business"
					subtitle="Înregistrează-ți businessul în platforma Mideally și conectează-te cu clienții tăi."
					className="text-center mt-8 lg:mt-16 mb-8"
				/>

				<div className="max-w-3xl mx-auto">
					<p className="text-center text-gray-600 mb-8">Formular de înregistrare în curs de implementare.</p>

					{/* Registration form will be implemented here */}
				</div>
			</div>
		</Section>
	);
}
