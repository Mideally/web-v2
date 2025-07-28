'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import NavigationLogo from './NavigationLogo';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import NavigationOverlays from './NavigationOverlays';
import MegamenuSubnav from './submenus/MegamenuSubnav';
import SearchOverlay from './overlays/SearchOverlay';
import BurgerMenu from './overlays/BurgerMenu';
import { useNavigationState } from '@/hooks/useNavigationState';
import { useMegamenuData } from '@/hooks/useMegamenuData';
import { useLoading } from '@/contexts/LoadingContext';

const MainNavigation = () => {
	const navRef = useRef(null);
	const pathname = usePathname();
	const isHomePage = pathname === '/';
	const { isLoading, progress } = useLoading();

	const {
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
	} = useNavigationState();

	const { megamenuData } = useMegamenuData();

	// Check if we need to display white theme
	const isWhiteTheme = isScrolled || activeSubmenu || isSearchOpen || !isHomePage;

	// Determine if menu should be rendered
	const shouldRenderMenu = activeSubmenu || isMenuClosing;
	const shouldRenderSearch = isSearchOpen || isSearchClosing;

	return (
		<>
			{/* Loading Progress Bar */}
			{isLoading && (
				<div className="fixed top-0 left-0 w-full h-[7px] bg-pink-200 z-[70] overflow-hidden">
					<div
						className="h-full bg-pink-500 transition-all duration-300 ease-out"
						style={{ width: `${progress}%` }}
					></div>
				</div>
			)}

			{/* Navigation Overlays */}
			<NavigationOverlays
				shouldRenderMenu={shouldRenderMenu}
				shouldRenderSearch={shouldRenderSearch}
				isMenuClosing={isMenuClosing}
				isSearchClosing={isSearchClosing}
				handleMenuClose={handleMenuClose}
				handleSearchClose={handleSearchClose}
			/>

			<header
				ref={navRef}
				className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
					isScrolled ? 'mt-2.5 mx-2.5' : 'mt-5 mx-5'
				} ${activeSubmenu ? 'rounded-t-xl' : 'rounded-xl'} ${isWhiteTheme ? 'bg-white' : 'bg-transparent'} ${
					isScrolled ? 'shadow-lg' : ''
				}`}
			>
				<div className="mx-auto px-4">
					<div className="flex items-center justify-between h-16 md:h-20">
						{/* Logo */}
						<NavigationLogo isWhiteTheme={isWhiteTheme} />

						{/* Desktop Navigation */}
						<DesktopNavigation
							isWhiteTheme={isWhiteTheme}
							activeSubmenu={activeSubmenu}
							toggleSubmenu={toggleSubmenu}
							toggleSearch={toggleSearch}
							toggleBurger={toggleBurger}
						/>

						{/* Mobile Navigation */}
						<MobileNavigation
							isWhiteTheme={isWhiteTheme}
							toggleSearch={toggleSearch}
							toggleBurger={toggleBurger}
						/>
					</div>
				</div>

				{/* Submenu containers */}
				{shouldRenderMenu && megamenuData && (
					<div
						className={`relative z-10 transition-all duration-300 ${
							isMenuClosing
								? 'opacity-0 translate-y-[-10px]'
								: 'opacity-100 translate-y-0 animate-menuFadeIn'
						}`}
					>
						{activeSubmenu === 'descopera' && (
							<MegamenuSubnav data={megamenuData.categories} type="categories" />
						)}
						{activeSubmenu === 'orasul' && <MegamenuSubnav data={megamenuData.cities} type="cities" />}
					</div>
				)}
			</header>

			{/* Search Overlay */}
			{shouldRenderSearch && (
				<div
					onClick={handleSearchClose}
					className={`fixed inset-0 z-[60] transition-all duration-300 ${
						isSearchClosing
							? 'opacity-0 translate-y-[-10px]'
							: 'opacity-100 translate-y-0 animate-menuFadeIn'
					}`}
				>
					<SearchOverlay isOpen={isSearchOpen} onClose={handleSearchClose} />
				</div>
			)}

			{/* Burger Menu */}
			{isBurgerOpen && <BurgerMenu isOpen={isBurgerOpen} onClose={() => toggleBurger()} />}

			<style jsx global>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				@keyframes menuFadeIn {
					from {
						opacity: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-fadeIn {
					animation: fadeIn 0.3s ease-in-out;
				}

				.animate-menuFadeIn {
					animation: menuFadeIn 0.3s ease-in-out;
				}
			`}</style>
		</>
	);
};

export default MainNavigation;
