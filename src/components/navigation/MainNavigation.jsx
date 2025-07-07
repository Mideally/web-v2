'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MegamenuSubnav from './submenus/MegamenuSubnav';
import SearchOverlay from './overlays/SearchOverlay';
import BurgerMenu from './overlays/BurgerMenu';
import megamenuData from '@/data/megamenu.json';

const MainNavigation = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeSubmenu, setActiveSubmenu] = useState(null);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isSearchClosing, setIsSearchClosing] = useState(false);
	const [isBurgerOpen, setIsBurgerOpen] = useState(false);
	const [isMenuClosing, setIsMenuClosing] = useState(false);
	const navRef = useRef(null);
	const pathname = usePathname();
	const isHomePage = pathname === '/';

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close menus when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (navRef.current && !navRef.current.contains(event.target)) {
				handleMenuClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
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

	// Check if we need to display white theme
	const isWhiteTheme = isScrolled || activeSubmenu || isSearchOpen || !isHomePage;

	// Determine if menu should be rendered
	const shouldRenderMenu = activeSubmenu || isMenuClosing;
	const shouldRenderSearch = isSearchOpen || isSearchClosing;

	return (
		<>
			{/* Megamenu Overlay */}
			{shouldRenderMenu && (
				<div
					className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
						isMenuClosing ? 'opacity-0' : 'opacity-100 animate-fadeIn'
					}`}
					onClick={handleMenuClose}
				/>
			)}

			{/* Search Overlay Background */}
			{shouldRenderSearch && (
				<div
					className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
						isSearchClosing ? 'opacity-0' : 'opacity-100 animate-fadeIn'
					}`}
					onClick={handleSearchClose}
				/>
			)}

			<header
				ref={navRef}
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mx-5 ${
					isScrolled ? 'mt-2.5' : 'mt-5'
				} ${activeSubmenu ? 'rounded-t-xl' : 'rounded-xl'} ${isWhiteTheme ? 'bg-white' : 'bg-transparent'} ${
					isScrolled ? 'shadow-lg' : ''
				}`}
			>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16 md:h-20">
						{/* Logo */}
						<Link href="/" className="flex-shrink-0">
							<Image
								src={
									isWhiteTheme
										? '/assets/images/mideally-logo.png'
										: '/assets/images/mideally-logo-white.png'
								}
								alt="Mideally Logo"
								width={120}
								height={40}
							/>
						</Link>

						{/* Main Navigation Links */}
						<div className="hidden md:flex items-center space-x-8">
							<button
								onClick={() => toggleSubmenu('descopera')}
								className={`text-lg font-medium transition-colors relative cursor-pointer ${
									isWhiteTheme
										? 'text-gray-800 hover:text-pink-600'
										: 'text-white hover:text-white/80'
								}`}
							>
								Descoperă
								{activeSubmenu === 'descopera' && (
									<span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600"></span>
								)}
							</button>
							<button
								onClick={() => toggleSubmenu('orasul')}
								className={`text-lg font-medium transition-colors relative cursor-pointer ${
									isWhiteTheme
										? 'text-gray-800 hover:text-pink-600'
										: 'text-white hover:text-white/80'
								}`}
							>
								Orașul
								{activeSubmenu === 'orasul' && (
									<span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600"></span>
								)}
							</button>

							{/* Separator */}
							<div className={`h-6 w-px ${isWhiteTheme ? 'bg-gray-300' : 'bg-white/30'}`}></div>

							{/* Search Icon */}
							<button
								onClick={toggleSearch}
								className={`p-2 rounded-full transition-colors cursor-pointer ${
									isWhiteTheme ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
								}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</button>

							{/* Burger Menu Icon */}
							<button
								onClick={toggleBurger}
								className={`p-2 rounded-full transition-colors cursor-pointer ${
									isWhiteTheme ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
								}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>

						{/* Mobile Toggle */}
						<div className="md:hidden flex items-center">
							<button
								onClick={toggleSearch}
								className={`p-2 mr-2 rounded-full transition-colors cursor-pointer ${
									isWhiteTheme ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
								}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</button>
							<button
								onClick={toggleBurger}
								className={`p-2 rounded-full transition-colors cursor-pointer ${
									isWhiteTheme ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
								}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Submenu containers */}
				{shouldRenderMenu && (
					<div
						className={`relative z-50 transition-all duration-300 ${
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
			{isBurgerOpen && <BurgerMenu isOpen={isBurgerOpen} onClose={() => setIsBurgerOpen(false)} />}

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
