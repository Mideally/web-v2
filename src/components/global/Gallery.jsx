import React, { useState, useRef, useEffect, useMemo } from 'react';
import { IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5';

/**
 * Gallery component for displaying a slider of thumbnails and a fullscreen carousel.
 * @param {Object} props
 * @param {{ companyImages: Array, locationImages: Array<{ locationName: string, images: Array }> }} props.imagesData - Images grouped by company and locations
 * @param {string} [props.className] - Additional classes for the gallery wrapper
 */
const Gallery = ({ imagesData = { companyImages: [], locationImages: [] }, className = '' }) => {
	// Combine all images, tagging location images with locationName
	const allImages = useMemo(() => {
		const company = (imagesData.companyImages || []).map((img) => ({ ...img, locationName: undefined }));
		const locations = (imagesData.locationImages || []).flatMap((loc) =>
			(loc.images || []).map((img) => ({ ...img, locationName: loc.locationName || img.locationName }))
		);
		return [...company, ...locations];
	}, [imagesData]);

	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [current, setCurrent] = useState(0);
	const [isImageTransitioning, setIsImageTransitioning] = useState(false);
	const modalRef = useRef(null);
	const imageWrapperRef = useRef(null);

	// Open modal at selected index
	const openModal = (idx) => {
		setCurrent(idx);
		setIsClosing(false);
		setIsOpen(true);
	};

	// Close modal with animation
	const closeModal = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
		}, 300); // Match the fadeOut animation duration
	};

	// Handle image change with seamless animation
	const changeImage = (newIndex) => {
		if (isImageTransitioning) return;

		setIsImageTransitioning(true);

		// Fade out current image
		setTimeout(() => {
			setCurrent(newIndex);
			// Fade in new image
			setTimeout(() => {
				setIsImageTransitioning(false);
			}, 50); // Small delay to ensure DOM update
		}, 200); // Fade out duration
	};

	// Handle modal backdrop click
	const handleModalClick = (e) => {
		if (e.target === modalRef.current) {
			closeModal();
		}
	};

	// Touch/swipe handling for mobile
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);

	const handleTouchStart = (e) => {
		setTouchStart(e.targetTouches[0].clientX);
	};

	const handleTouchMove = (e) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (!touchStart || !touchEnd) return;

		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > 50;
		const isRightSwipe = distance < -50;

		if (isLeftSwipe) {
			changeImage((current + 1) % allImages.length);
		}

		if (isRightSwipe) {
			changeImage((current - 1 + allImages.length) % allImages.length);
		}

		setTouchStart(null);
		setTouchEnd(null);
	};

	// Keyboard navigation and focus trap
	useEffect(() => {
		if (!isOpen) return;

		const handleKey = (e) => {
			if (e.key === 'ArrowRight') changeImage((current + 1) % allImages.length);
			if (e.key === 'ArrowLeft') changeImage((current - 1 + allImages.length) % allImages.length);
			if (e.key === 'Escape') closeModal();
		};

		document.addEventListener('keydown', handleKey);
		// Focus trap
		if (modalRef.current) modalRef.current.focus();

		return () => document.removeEventListener('keydown', handleKey);
	}, [isOpen, current, allImages.length, isImageTransitioning]);

	if (!allImages.length) return null;

	return (
		<div className={`gallery ${className}`}>
			{/* Thumbnails grid */}
			<div className="gallery__thumbnails grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-6 p-2.5 md:p-6">
				{allImages.map((img, idx) => (
					<button
						key={img.src + idx}
						className={`gallery__thumb border-1 rounded overflow-hidden focus:outline-none cursor-pointer hover:shadow-lg hover:shadow-black/40 transition-shadow duration-300 ${
							current === idx && isOpen ? '' : 'border-black'
						}`}
						onClick={() => openModal(idx)}
						aria-label={`Open image ${idx + 1}`}
						tabIndex={0}
						style={{ minWidth: 64, minHeight: 64 }}
					>
						<img
							src={img.src}
							alt={img.alt || ''}
							className="object-cover w-full h-full"
							draggable={false}
						/>
					</button>
				))}
			</div>

			{/* Fullscreen modal carousel */}
			{isOpen && (
				<div
					className={`gallery__modal fixed inset-0 z-12 flex items-center justify-center bg-black transition-opacity duration-300 ease-in-out ${
						isClosing ? 'opacity-0' : 'opacity-100'
					}`}
					tabIndex={-1}
					ref={modalRef}
					aria-modal="true"
					role="dialog"
					onClick={handleModalClick}
					style={{
						animation: !isClosing ? 'fadeIn 0.3s ease-in-out' : 'none',
					}}
				>
					<button
						className="absolute top-4 right-4 text-white focus:outline-none cursor-pointer z-10 hover:opacity-80 transition-opacity"
						onClick={closeModal}
						aria-label="Close gallery"
						tabIndex={0}
					>
						<IoClose size={32} />
					</button>

					{/* Carousel controls */}
					<button
						className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white focus:outline-none cursor-pointer z-10 bg-black/50 rounded-full w-12 h-12 md:w-10 md:h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
						onClick={() => changeImage((current - 1 + allImages.length) % allImages.length)}
						aria-label="Previous image"
						tabIndex={0}
						disabled={isImageTransitioning}
					>
						<IoChevronBack size={24} />
					</button>
					<button
						className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white focus:outline-none cursor-pointer z-10 bg-black/50 rounded-full w-12 h-12 md:w-10 md:h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
						onClick={() => changeImage((current + 1) % allImages.length)}
						aria-label="Next image"
						tabIndex={0}
						disabled={isImageTransitioning}
					>
						<IoChevronForward size={24} />
					</button>

					{/* Image and location tag */}
					<div
						className="gallery__image-wrapper relative flex flex-col items-center"
						ref={imageWrapperRef}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
					>
						<img
							src={allImages[current].src}
							alt={allImages[current].alt || ''}
							className="max-h-[80vh] max-w-[90vw] rounded shadow-lg transition-opacity duration-200 ease-in-out"
							draggable={false}
							style={{
								opacity: isImageTransitioning ? 0 : 1,
							}}
						/>

						{/* Location tag */}
						{allImages[current].locationName && (
							<span
								className="gallery__location-tag absolute top-4 left-4 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded shadow transition-opacity duration-200 ease-in-out"
								style={{
									opacity: isImageTransitioning ? 0 : 1,
								}}
							>
								{allImages[current].locationName}
							</span>
						)}
					</div>
				</div>
			)}

			{/* CSS animations */}
			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
			`}</style>
		</div>
	);
};

export default Gallery;
