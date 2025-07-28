import { generateMetadata } from '@/utils';

export const metadata = generateMetadata({
	title: 'Contact',
	description: 'Contactează echipa Mideally pentru întrebări, suport sau colaborări. Suntem aici să te ajutăm!',
	url: 'https://mideally.com/contact',
});

export default function ContactLayout({ children }) {
	return children;
}
