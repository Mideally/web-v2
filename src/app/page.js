import { generateMetadata } from '@/utils';
import HomeClient from './HomeClient';

export const metadata = generateMetadata({
	title: 'Acasă',
	description: 'Mideally - Conectăm clienții cu business-urile',
	url: 'https://mideally.com',
});

export default function Home() {
	return <HomeClient />;
}
