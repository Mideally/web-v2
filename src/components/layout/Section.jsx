export default function Section({ children, className, padded }) {
	return (
		<div className={`container mx-auto px-4 ${padded ? 'py-16' : ''} ${className ? className : ''}`}>
			{children}
		</div>
	);
}
