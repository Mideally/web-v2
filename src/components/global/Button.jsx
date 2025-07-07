import Link from 'next/link';
import Spinner from './Spinner';

const variants = {
	primary: 'bg-pink-600 hover:bg-pink-700 text-white border-black',
	secondary: 'bg-indigo-500 hover:bg-indigo-600 text-white border-black',
	tertiary: 'bg-[#DBFF79] hover:bg-[#C5E66D] text-black border-black',
	white: 'bg-white hover:bg-pink-600 text-black hover:text-white border-black',
	black: 'bg-black hover:bg-white text-white hover:text-black border-black',
	transparent: 'bg-transparent hover:bg-white text-white hover:text-black border-white',
};

export default function Button({
	children,
	onClick,
	disabled,
	variant = 'primary',
	size,
	className = '',
	loading,
	href,
}) {
	const buttonClasses = `inline-flex items-center px-8 border font-medium rounded-md transition-all duration-200 ease-in-out shadow-sm w-fit text-center justify-center ${
		variants[variant]
	} ${size === 'small' ? 'px-4 py-0 min-h-[42px] text-sm' : 'py-3 text-base'} ${
		disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
	} ${className}`;

	const spinnerColors = {
		primary: 'pink',
		secondary: 'indigo',
		tertiary: 'black',
		white: 'black',
		black: 'white',
		transparent: 'white',
	};

	const content = (
		<>
			{loading && <Spinner buttonColour={spinnerColors[variant]} className="mr-2" />}
			{children}
		</>
	);

	// If href is provided, render as a Link
	if (href) {
		// If it's an external link (starts with http or //)
		if (href.startsWith('http') || href.startsWith('//')) {
			return (
				<a href={href} className={buttonClasses} onClick={onClick} target="_blank" rel="noopener noreferrer">
					{content}
				</a>
			);
		}

		// Internal link using Next.js Link
		return (
			<Link href={href} className={buttonClasses} onClick={onClick}>
				{content}
			</Link>
		);
	}

	// If children contains a Link, extract its props and render a Link
	if (children && typeof children === 'object' && children.type === Link) {
		const { href, ...linkProps } = children.props;

		return (
			<Link href={href} {...linkProps} className={buttonClasses}>
				{loading && <Spinner buttonColour={spinnerColors[variant]} className="mr-2" />}
				{children.props.children}
			</Link>
		);
	}

	// If children is an anchor tag, extract its props and apply the button styling
	if (children && typeof children === 'object' && children.type === 'a') {
		const { href, target, rel, ...anchorProps } = children.props;

		return (
			<a
				href={href}
				target={target || '_blank'}
				rel={rel || 'noopener noreferrer'}
				{...anchorProps}
				className={buttonClasses}
				onClick={onClick}
			>
				{loading && <Spinner buttonColour={spinnerColors[variant]} className="mr-2" />}
				{children.props.children}
			</a>
		);
	}

	// Otherwise render as a regular button
	return (
		<button className={buttonClasses} onClick={onClick} disabled={disabled}>
			{content}
		</button>
	);
}
