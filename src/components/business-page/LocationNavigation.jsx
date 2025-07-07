'use client';

import { useState } from 'react';

export default function LocationNavigation({ locations, selectedLocation, onLocationChange }) {
	const [isOpen, setIsOpen] = useState(false);

	const currentLocation = locations.find((loc) => loc.id === selectedLocation);

	return (
		<>
			{/* Desktop - Fixed vertical navigation */}
			<div className="hidden lg:block fixed top-1/2 right-4 transform -translate-y-1/2 z-50">
				<div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
					<div className="space-y-2">
						{/* All locations option */}
						<button
							onClick={() => onLocationChange('all')}
							className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-sm font-semibold group relative ${
								selectedLocation === 'all'
									? 'bg-pink-500 text-white border-pink-500 cursor-default'
									: 'bg-white text-gray-700 border-gray-300 hover:border-pink-300 hover:bg-pink-50 cursor-pointer'
							}`}
							title="Toate locațiile"
						>
							ALL
							{/* Tooltip */}
							<div
								className={`absolute right-full mr-2 top-1/2 transform -translate-y-1/2 hidden group-hover:block`}
							>
								<div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
									Toate locațiile
								</div>
							</div>
						</button>

						{/* Individual locations */}
						{locations.map((location) => (
							<button
								key={location.id}
								onClick={() => onLocationChange(location.id)}
								className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-sm font-semibold group relative ${
									selectedLocation === location.id
										? 'bg-pink-500 text-white border-pink-500 cursor-default'
										: 'bg-white text-gray-700 border-gray-300 hover:border-pink-300 hover:bg-pink-50 cursor-pointer'
								}`}
								title={location.name}
							>
								{location.shortName}
								{/* Tooltip */}
								<div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 hidden group-hover:block">
									<div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
										{location.name}
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Tablet - Fixed vertical navigation with full names */}
			<div className="hidden md:block lg:hidden fixed top-1/2 right-4 transform -translate-y-1/2 z-50">
				<div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
					<div className="space-y-2">
						{/* All locations option */}
						<button
							onClick={() => onLocationChange('all')}
							className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-semibold whitespace-nowrap cursor-pointer ${
								selectedLocation === 'all'
									? 'bg-pink-500 text-white border-pink-500'
									: 'bg-white text-gray-700 border-gray-300 hover:border-pink-300 hover:bg-pink-50'
							}`}
						>
							Toate locațiile
						</button>

						{/* Individual locations */}
						{locations.map((location) => (
							<button
								key={location.id}
								onClick={() => onLocationChange(location.id)}
								className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-semibold whitespace-nowrap cursor-pointer ${
									selectedLocation === location.id
										? 'bg-pink-500 text-white border-pink-500'
										: 'bg-white text-gray-700 border-gray-300 hover:border-pink-300 hover:bg-pink-50'
								}`}
							>
								{location.name}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Mobile - Bottom centered dropdown */}
			<div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
				<div className="relative">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-2 text-sm font-semibold flex items-center gap-2 cursor-pointer"
					>
						<span>{currentLocation ? currentLocation.name : 'Toate locațiile'}</span>
						<svg
							className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{isOpen && (
						<div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px]">
							{/* All locations option */}
							<button
								onClick={() => {
									onLocationChange('all');
									setIsOpen(false);
								}}
								className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer ${
									selectedLocation === 'all' ? 'bg-pink-50 text-pink-600 font-semibold' : ''
								}`}
							>
								Toate locațiile
							</button>

							{/* Individual locations */}
							{locations.map((location) => (
								<button
									key={location.id}
									onClick={() => {
										onLocationChange(location.id);
										setIsOpen(false);
									}}
									className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer ${
										selectedLocation === location.id ? 'bg-pink-50 text-pink-600 font-semibold' : ''
									}`}
								>
									{location.name}
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
