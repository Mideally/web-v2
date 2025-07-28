import { useEffect, useRef } from 'react';

const NavigationOverlays = ({
	shouldRenderMenu,
	shouldRenderSearch,
	isMenuClosing,
	isSearchClosing,
	handleMenuClose,
	handleSearchClose,
}) => {
	const navRef = useRef(null);

	// Close menus when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (navRef.current && !navRef.current.contains(event.target)) {
				handleMenuClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [handleMenuClose]);

	return (
		<>
			{/* Megamenu Overlay */}
			{shouldRenderMenu && (
				<div
					className={`fixed inset-0 bg-black/50 z-5 transition-opacity duration-300 ${
						isMenuClosing ? 'opacity-0' : 'opacity-100 animate-fadeIn'
					}`}
					onClick={handleMenuClose}
				/>
			)}

			{/* Search Overlay Background */}
			{shouldRenderSearch && (
				<div
					className={`fixed inset-0 bg-black/50 z-5 transition-opacity duration-300 ${
						isSearchClosing ? 'opacity-0' : 'opacity-100 animate-fadeIn'
					}`}
					onClick={handleSearchClose}
				/>
			)}
		</>
	);
};

export default NavigationOverlays;
