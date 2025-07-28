import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useNavigationState = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeSubmenu, setActiveSubmenu] = useState(null);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isSearchClosing, setIsSearchClosing] = useState(false);
	const [isBurgerOpen, setIsBurgerOpen] = useState(false);
	const [isMenuClosing, setIsMenuClosing] = useState(false);
	const pathname = usePathname();

	// Close all menus on page change
	useEffect(() => {
		if (activeSubmenu) {
			handleMenuClose();
		}
		if (isSearchOpen) {
			handleSearchClose();
		}
		if (isBurgerOpen) {
			setIsBurgerOpen(false);
		}
	}, [pathname]);

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Handle menu close with animation
	const handleMenuClose = () => {
		if (!activeSubmenu || isMenuClosing) return;

		setIsMenuClosing(true);
		setTimeout(() => {
			setActiveSubmenu(null);
			setIsMenuClosing(false);
		}, 300);
	};

	// Handle search close with animation
	const handleSearchClose = () => {
		if (!isSearchOpen || isSearchClosing) return;

		setIsSearchClosing(true);
		setTimeout(() => {
			setIsSearchOpen(false);
			setIsSearchClosing(false);
		}, 300);
	};

	// Toggle submenu
	const toggleSubmenu = (menu) => {
		if (activeSubmenu === menu) {
			handleMenuClose();
		} else {
			setIsMenuClosing(false);
			setActiveSubmenu(menu);
		}

		if (isSearchOpen) handleSearchClose();
		if (isBurgerOpen) setIsBurgerOpen(false);
	};

	// Toggle search
	const toggleSearch = () => {
		if (isSearchOpen) {
			handleSearchClose();
		} else {
			setIsSearchClosing(false);
			setIsSearchOpen(true);
		}

		if (activeSubmenu) handleMenuClose();
		if (isBurgerOpen) setIsBurgerOpen(false);
	};

	// Toggle burger menu
	const toggleBurger = () => {
		setIsBurgerOpen(!isBurgerOpen);
		if (activeSubmenu) handleMenuClose();
		if (isSearchOpen) handleSearchClose();
	};

	return {
		isScrolled,
		activeSubmenu,
		isSearchOpen,
		isSearchClosing,
		isBurgerOpen,
		isMenuClosing,
		handleMenuClose,
		handleSearchClose,
		toggleSubmenu,
		toggleSearch,
		toggleBurger,
	};
};
