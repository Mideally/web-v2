import { generateMetadata } from '@/utils';

export const metadata = generateMetadata({
	title: 'FAQ - Întrebări frecvente',
	description: 'Găsește răspunsuri la întrebările frecvente despre Mideally - pentru clienți și business-uri.',
	url: 'https://mideally.com/faq',
});

export default function FAQLayout({ children }) {
	return children;
}
