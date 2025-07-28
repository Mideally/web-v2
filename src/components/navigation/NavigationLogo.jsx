import Link from 'next/link';
import Image from 'next/image';

const NavigationLogo = ({ isWhiteTheme }) => {
	return (
		<Link href="/" className="flex-shrink-0">
			<Image
				src={isWhiteTheme ? '/assets/images/mideally-logo.png' : '/assets/images/mideally-logo-white.png'}
				alt="Mideally Logo"
				width={120}
				height={40}
			/>
		</Link>
	);
};

export default NavigationLogo;
