import { generateMetadata } from '@/utils';
import PrivacyPolicyContent from './PrivacyPolicyContent';

export const metadata = generateMetadata({
	title: 'Politica de Confidențialitate',
	description:
		'Informații despre modul în care Mideally colectează, utilizează și protejează datele tale personale conform GDPR.',
	url: 'https://mideally.com/politica-de-confidentialitate',
});

export default function PrivacyPolicyPage() {
	return <PrivacyPolicyContent />;
}
