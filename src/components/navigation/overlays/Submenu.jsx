'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import menuData from '@/data/burgermenu.json';

const Submenu = ({ isOpen, onClose, mainMenuClose, isMenuClosing, submenuType }) => {
	const [isClosing, setIsClosing] = useState(false);
	const [visible, setVisible] = useState(false);
	const menuRef = useRef(null);
	let title = '';
	let items = [];

	// Find submenu data based on type
	if (submenuType === 'info') {
		// For info submenu
		title = menuData.infoSubmenu.title;
		items = menuData.infoSubmenu.items;
	} else if (submenuType) {
		// For navigation links (orasul, descopera, etc.)
		const navLink = menuData.navLinks.find(
			(link) =>
				link.title.toLowerCase() === submenuType ||
				(submenuType === 'orasul' && link.title.toLowerCase() === 'orașul') ||
				(submenuType === 'descopera' && link.title.toLowerCase() === 'descoperă')
		);

		if (navLink) {
			title = navLink.title;
			items = navLink.items;
		}
	}

	// Don't render if we don't have a valid submenu type or if items are empty
	if (!title || !items.length) {
		return null;
	}

	// Handle open/close animations
	useEffect(() => {
		if (isOpen) {
			setVisible(true);
			setIsClosing(false);
		} else if (visible) {
			setIsClosing(true);
			const timer = setTimeout(() => {
				setVisible(false);
				setIsClosing(false);
			}, 500); // Match animation duration
			return () => clearTimeout(timer);
		}
	}, [isOpen, visible]);

	// Force close when parent menu is closing
	useEffect(() => {
		if (isMenuClosing) {
			setIsClosing(true);
			const timer = setTimeout(() => {
				setVisible(false);
				setIsClosing(false);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [isMenuClosing]);

	// Only hide when not visible AND not in closing state
	if (!visible && !isClosing) return null;

	return (
		<div className="submenu-container absolute top-0 right-0 z-10">
			<div
				ref={menuRef}
				className={`bg-white h-[calc(100vh-20px)] w-full max-w-sm overflow-auto m-2.5 rounded-xl shadow-xl ${
					isClosing || isMenuClosing ? 'exit' : 'enter'
				}`}
			>
				<div className="p-5 flex justify-between items-center border-b border-gray-100">
					<h2 className="text-lg md:text-2xl font-semibold text-gray-800">{title}</h2>
					<button
						onClick={onClose}
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
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
					</button>
				</div>

				<nav className="p-5">
					<ul className="space-y-7">
						{items.map((item, index) => (
							<li key={index}>
								<Link
									href={item.url}
									className="block text-m md:text-xl text-gray-800 hover:text-pink-600 transition-colors"
									onClick={mainMenuClose}
								>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>

			<style jsx>{`
				.submenu-container {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
				}

				.enter {
					animation: slideIn 0.5s forwards;
				}

				.exit {
					animation: slideOut 0.5s forwards;
				}

				@keyframes slideIn {
					from {
						transform: translateX(100%);
					}
					to {
						transform: translateX(0);
					}
				}

				@keyframes slideOut {
					from {
						transform: translateX(0);
					}
					to {
						transform: translateX(100%);
					}
				}
			`}</style>
		</div>
	);
};

export default Submenu;
