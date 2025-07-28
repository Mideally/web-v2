import { generateMetadata } from '@/utils';
import CareersContent from './CareersContent';

export const metadata = generateMetadata({
	title: 'Cariere',
	description: 'Alătură-te echipei Mideally și ajută-ne să construim viitorul business-urilor locale.',
	url: 'https://mideally.com/cariere',
});

export default function CareersPage() {
	return <CareersContent />;
}
