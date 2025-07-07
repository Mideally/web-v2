import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/global/Button';

const MegamenuSubnav = ({ data, type }) => {
	const [activeItem, setActiveItem] = useState(data.defaultActive);
	const [allImagesPreloaded, setAllImagesPreloaded] = useState(false);
	const [isContentVisible, setIsContentVisible] = useState(true);
	const [visibleContent, setVisibleContent] = useState(data.defaultActive);
	const contentRef = useRef(null);

	// Get items from data
	const items = data.items;
	const currentItem = items[activeItem] || items[data.defaultActive];
	const allItemsLink = data.allItemsLink;

	// Handle item change with animation
	useEffect(() => {
		if (activeItem !== visibleContent) {
			// Fade out current content
			setIsContentVisible(false);

			// Wait for fade out to complete, then update content and fade in
			const timer = setTimeout(() => {
				setVisibleContent(activeItem);
				setIsContentVisible(true);
			}, 200); // This should be slightly less than animation duration

			return () => clearTimeout(timer);
		}
	}, [activeItem, visibleContent]);

	// Preload all images on component mount
	useEffect(() => {
		// Skip if we're not in browser environment
		if (typeof window === 'undefined') return;

		if (type === 'categories' && !allImagesPreloaded) {
			// Create a counter to track loaded images
			let loadedCount = 0;
			const totalImages = Object.values(items).reduce((count, category) => count + category.items.length, 0);

			// Function to increment counter when an image loads
			const imageLoaded = () => {
				loadedCount++;
				if (loadedCount >= totalImages) {
					setAllImagesPreloaded(true);
				}
			};

			// Preload all category images
			Object.values(items).forEach((category) => {
				category.items.forEach((item) => {
					const img = new window.Image();
					img.onload = imageLoaded;
					img.src = item.image;
				});
			});
		}

		if (type === 'cities' && !allImagesPreloaded) {
			// Preload all city images
			let loadedCount = 0;
			const totalImages = Object.keys(items).length;

			const imageLoaded = () => {
				loadedCount++;
				if (loadedCount >= totalImages) {
					setAllImagesPreloaded(true);
				}
			};

			Object.values(items).forEach((item) => {
				const img = new window.Image();
				img.onload = imageLoaded;
				img.src = item.image;
			});
		}
	}, [items, type, allImagesPreloaded]);

	// Get the content to display (use visibleContent, not activeItem)
	const displayItem = items[visibleContent] || items[data.defaultActive];

	return (
		<div className="absolute left-0 w-full bg-white shadow-lg rounded-b-xl border-t border-gray-100 z-50">
			<div className="container mx-auto px-4 py-6 flex">
				{/* Left side - Navigation Menu */}
				<div className="w-1/4 pr-10 border-r border-gray-200">
					<ul className="space-y-5">
						{Object.keys(items).map((key) => (
							<li key={key}>
								<Link
									href={items[key].url}
									className={`text-lg transition-colors block py-1.5 font-medium ${
										activeItem === key ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
									}`}
									onMouseEnter={() => setActiveItem(key)}
								>
									{items[key].label}
								</Link>
							</li>
						))}
						<li>
							<Link
								href={allItemsLink.url}
								className="text-lg text-gray-700 hover:text-pink-600 transition-colors flex items-center py-1.5 font-medium"
							>
								{allItemsLink.label}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 ml-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M14 5l7 7m0 0l-7 7m7-7H3"
									/>
								</svg>
							</Link>
						</li>
					</ul>
				</div>

				{/* Right side - Content depending on type */}
				<div
					ref={contentRef}
					className={`w-3/4 pl-10 transition-opacity duration-300 ease-in-out ${
						isContentVisible ? 'opacity-100' : 'opacity-0'
					}`}
				>
					{type === 'cities' ? (
						// City Display (Large image with overlay text)
						<div
							className={`relative w-full h-96 rounded-lg overflow-hidden group border border-1 border-black ${
								isContentVisible ? 'animate-contentFade' : ''
							}`}
						>
							{/* Skeleton loader - only show before all images are preloaded */}
							{!allImagesPreloaded && <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />}

							{/* City image with hover zoom using Next.js Image */}
							<Image
								src={displayItem.image}
								alt={displayItem.title}
								fill
								priority
								sizes="(max-width: 768px) 100vw, 50vw"
								className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 z-0"
								style={{
									opacity: allImagesPreloaded ? 1 : 0,
								}}
							/>

							<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white z-20">
								<h3 className="text-3xl font-bold mb-3">{displayItem.title}</h3>
								<p className="text-white/95 mb-6 max-w-lg text-lg">{displayItem.description}</p>
								<Button href={displayItem.url} variant="white" className="w-fit">
									Explorează
								</Button>
							</div>
						</div>
					) : (
						// Category Display (Grid of items with title)
						<div className={isContentVisible ? 'animate-contentFade' : ''}>
							<h3 className="text-xl font-semibold text-gray-800 mb-6">{displayItem.title}</h3>
							<div className="grid grid-cols-2 gap-8">
								{displayItem.items.map((item) => (
									<div key={item.id}>
										{/* Simple overflow hidden pattern for zoom effect */}
										<div className="relative overflow-hidden rounded-lg mb-4 h-56 group border border-1 border-black">
											{/* Skeleton loader - only show before all images are preloaded */}
											{!allImagesPreloaded && (
												<div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
											)}

											{/* Category image with hover zoom using Next.js Image */}
											<Image
												src={item.image}
												alt={item.title}
												fill
												className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 z-0"
												style={{
													opacity: allImagesPreloaded ? 1 : 0,
												}}
											/>
										</div>
										<h4 className="text-xl font-medium text-gray-800 mb-3">{item.title}</h4>
										<div>
											<Button href={item.url} variant="black">
												Vezi detalii →
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MegamenuSubnav;
