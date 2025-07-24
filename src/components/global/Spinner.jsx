import React from 'react';

/**
 * Loader spinner component for global use.
 * @param {Object} props
 * @param {string} [props.size] - Tailwind size class (e.g. 'h-12 w-12')
 * @param {string} [props.color] - Tailwind color class (e.g. 'border-pink-500')
 * @param {string} [props.className] - Additional classes
 */
const Spinner = ({ size = 'h-16 w-16', color = 'border-pink-500', className = '' }) => (
	<div className={`flex items-center justify-center min-h-[inherit]`}>
		<div
			className={`animate-spin rounded-full border-4 border-b-transparent ${size} ${color} ${className}`}
			role="status"
			aria-label="Loading..."
		/>
	</div>
);

export default Spinner;
