'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SearchOverlay = ({ isOpen, onClose }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const searchInputRef = useRef(null);

	// Focus the search input when the overlay opens
	useEffect(() => {
		if (isOpen && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [isOpen]);

	// Handle key press events for the entire overlay
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	// Mock search function - would be replaced with actual search API
	const handleSearch = (query) => {
		setSearchQuery(query);

		if (query.length > 2) {
			// Mock results - would be replaced with API call
			setSearchResults([
				{ id: 1, title: 'Cafeneaua Veche', type: 'Cafenea', url: '/cafenea-veche' },
				{ id: 2, title: 'Restaurant La Mama', type: 'Restaurant', url: '/restaurant-la-mama' },
				{ id: 3, title: 'Patiseria Diana', type: 'Patiserie', url: '/patiseria-diana' },
			]);
		} else {
			setSearchResults([]);
		}
	};

	return (
		<div className="fixed top-[calc(4rem+30px)] md:top-[calc(5rem+30px)] left-0 right-0 mx-5 z-5">
			<div
				className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="container mx-auto p-6">
					<div className="relative">
						<div className="flex items-center border-b-2 border-gray-300 pb-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-gray-500"
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
							<input
								ref={searchInputRef}
								type="text"
								placeholder="Caută locații, evenimente..."
								value={searchQuery}
								onChange={(e) => handleSearch(e.target.value)}
								className="w-full ml-3 outline-none text-gray-700 text-m md:text-xl"
							/>
							<button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
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
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						{/* Search Results */}
						<div
							className={`mt-5 ${
								searchResults.length === 0 && searchQuery.length > 0 ? 'block' : 'hidden'
							}`}
						>
							<p className="text-gray-500 text-m md:text-lg">
								Niciun rezultat găsit pentru "{searchQuery}"
							</p>
						</div>

						{searchResults.length > 0 && (
							<div className="mt-5">
								<h3 className="text-base font-medium text-gray-500 mb-3">Rezultate</h3>
								<ul className="divide-y divide-gray-100">
									{searchResults.map((result) => (
										<li key={result.id} className="py-3">
											<Link
												href={result.url}
												onClick={onClose}
												className="flex items-center group"
											>
												<div>
													<h4 className="text-gray-800 group-hover:text-pink-600 transition-colors font-medium text-m md:text-lg">
														{result.title}
													</h4>
													<span className="text-base text-gray-500">{result.type}</span>
												</div>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 ml-auto text-gray-400 group-hover:text-pink-600"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</Link>
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Popular Searches (when no search is performed) */}
						{searchQuery.length === 0 && (
							<div className="mt-5">
								<h3 className="text-base font-medium text-gray-500 mb-3 text-m md:text-lg">
									Căutări populare
								</h3>
								<div className="flex flex-wrap gap-3">
									<button
										onClick={() => handleSearch('cafenele')}
										className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full text-gray-700 text-sm md:text-base cursor-pointer"
									>
										Cafenele
									</button>
									<button
										onClick={() => handleSearch('restaurante')}
										className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full text-gray-700 text-sm md:text-base cursor-pointer"
									>
										Restaurante
									</button>
									<button
										onClick={() => handleSearch('terase')}
										className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full text-gray-700 text-sm md:text-base cursor-pointer"
									>
										Terase
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchOverlay;
