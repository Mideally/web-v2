import { generateMetadata } from '@/utils';
import TermsAndConditionsContent from './TermsAndConditionsContent';

export const metadata = generateMetadata({
	title: 'Termeni și Condiții',
	description: 'Termenii și condițiile de utilizare a platformei Mideally pentru clienți și business-uri partenere.',
	url: 'https://mideally.com/termeni-si-conditii',
});

export default function TermsAndConditionsPage() {
	return <TermsAndConditionsContent />;
}
