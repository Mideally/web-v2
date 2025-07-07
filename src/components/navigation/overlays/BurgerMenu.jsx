'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Submenu from './Submenu';
import menuData from '@/data/burgermenu.json';
import Button from '@/components/global/Button';

const BurgerMenu = ({ isOpen, onClose }) => {
	const [activeSubmenu, setActiveSubmenu] = useState(null);
	const [submenuClosing, setSubmenuClosing] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [visible, setVisible] = useState(false);
	const menuRef = useRef(null);
	const overlayRef = useRef(null);

	// Handle open/close animations
	useEffect(() => {
		if (isOpen && !visible) {
			setVisible(true);
			setIsClosing(false);
		} else if (!isOpen && visible) {
			setIsClosing(true);
			const timer = setTimeout(() => {
				setVisible(false);
				setIsClosing(false);
			}, 500); // Match animation duration
			return () => clearTimeout(timer);
		}
	}, [isOpen, visible]);

	// Handle escape key
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				if (activeSubmenu && !submenuClosing) {
					handleSubmenuClose();
				} else {
					handleClose();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [activeSubmenu, submenuClosing]);

	// Handle outside click
	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	// Handle submenu close with animation
	const handleSubmenuClose = () => {
		setSubmenuClosing(true);

		setTimeout(() => {
			setActiveSubmenu(null);
			setSubmenuClosing(false);
		}, 500); // Match animation duration
	};

	// Toggle submenu
	const toggleSubmenu = (submenuName) => {
		if (activeSubmenu === submenuName) {
			handleSubmenuClose();
		} else {
			setActiveSubmenu(submenuName);
		}
	};

	// Custom close handler
	const handleClose = () => {
		setIsClosing(true);

		const timer = setTimeout(() => {
			onClose();
		}, 500);
		return () => clearTimeout(timer);
	};

	// If not visible at all, don't render
	if (!visible && !isOpen) return null;

	// Map the submenu name to the proper type for the Submenu
	const getSubmenuType = (name) => {
		if (name === 'info') return 'info';
		if (name === menuData.navLinks[0].title.toLowerCase()) return 'orasul';
		if (name === menuData.navLinks[1].title.toLowerCase()) return 'descopera';

		return null;
	};

	// Reorder navLinks for mobile view - put Descopera first
	const mobileOrderedNavLinks = [...menuData.navLinks];
	// Swap positions if Descoperă is at index 1
	if (mobileOrderedNavLinks.length > 1 && mobileOrderedNavLinks[1].title.toLowerCase() === 'descoperă') {
		[mobileOrderedNavLinks[0], mobileOrderedNavLinks[1]] = [mobileOrderedNavLinks[1], mobileOrderedNavLinks[0]];
	}

	return (
		<div
			ref={overlayRef}
			className="fixed inset-0 z-50 bg-black/50 flex justify-end"
			onClick={handleOverlayClick}
			style={{
				opacity: isClosing ? 0 : 1,
				transition: 'opacity 0.5s ease-out',
			}}
		>
			<div className="relative h-full w-full max-w-[320px] md:max-w-[400px]">
				{/* Submenu - renders based on which one is active */}
				{(activeSubmenu || submenuClosing) && (
					<Submenu
						isOpen={!!activeSubmenu && !submenuClosing}
						onClose={handleSubmenuClose}
						mainMenuClose={handleClose}
						isMenuClosing={isClosing}
						submenuType={getSubmenuType(activeSubmenu)}
					/>
				)}

				{/* Main Burger Menu */}
				<div
					ref={menuRef}
					className="absolute top-0 right-0 bg-white h-[calc(100%-20px)] w-full max-w-sm overflow-auto m-2.5 rounded-xl shadow-xl"
					style={{
						animation: isClosing
							? 'slideOutToRight 0.5s ease-out forwards'
							: 'slideInFromRight 0.5s ease-out forwards',
					}}
				>
					<div className="p-5 flex justify-end">
						<button
							onClick={handleClose}
							className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-7 w-7"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<nav className="px-5 pb-5 w-full">
						{/* Main Navigation Links */}
						<ul className="space-y-6 w-full">
							{/* Navigation Links - reordered on mobile */}
							{mobileOrderedNavLinks.map((link, index) => (
								<li key={index} className="md:hidden w-full">
									{link.type === 'submenu' ? (
										<button
											onClick={() => toggleSubmenu(link.title.toLowerCase())}
											className="flex items-center justify-between text-xl font-medium text-gray-800 hover:text-pink-600 transition-colors cursor-pointer w-full"
										>
											{link.title}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className={`h-5 w-5 transition-transform rotate-180`}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l-7 7 7 7"
												/>
											</svg>
										</button>
									) : (
										<Link
											href={link.url}
											className="text-xl font-medium text-gray-800 hover:text-pink-600 transition-colors"
											onClick={handleClose}
										>
											{link.title}
										</Link>
									)}
								</li>
							))}
						</ul>

						{/* Divider - only for mobile */}
						<div className="border-t border-gray-200 my-6 md:hidden"></div>

						{/* Main Links */}
						<ul className="space-y-5 w-full">
							{menuData.mainLinks.map((link, index) => (
								<li key={index} className="w-full">
									<Link
										href={link.url}
										className={`md:text-xl text-lg font-medium w-full block ${
											link.highlight
												? 'text-pink-600 hover:text-pink-700'
												: 'text-gray-800 hover:text-pink-600'
										} transition-colors`}
										onClick={handleClose}
									>
										{link.title}
									</Link>
								</li>
							))}
							<li>
								<button
									onClick={() => toggleSubmenu('info')}
									className="flex items-center justify-between md:text-xl text-lg font-medium text-gray-800 hover:text-pink-600 transition-colors cursor-pointer w-full"
								>
									{menuData.infoSubmenu.title}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className={`h-5 w-5 transition-transform rotate-180`}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l-7 7 7 7"
										/>
									</svg>
								</button>
							</li>
							<li className="pt-6">
								<Button
									href={menuData.ctaButton.url}
									variant="primary"
									onClick={handleClose}
									className="w-full text-center flex justify-center items-center"
								>
									{menuData.ctaButton.title}
								</Button>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<style jsx>{`
				@keyframes slideInFromRight {
					0% {
						transform: translateX(100%);
					}
					100% {
						transform: translateX(0);
					}
				}

				@keyframes slideOutToRight {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(100%);
					}
				}
			`}</style>
		</div>
	);
};

export default BurgerMenu;
