'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import { useOfferDrawer } from './OfferDrawerContext';

const OfferDrawer = (props) => {
	const router = useRouter();

	// Allow both controlled and context usage
	const context = useOfferDrawer();
	const isControlled =
		props.isOpen !== undefined &&
		props.onClose !== undefined &&
		props.offer !== undefined &&
		props.type !== undefined;

	const isOpen = isControlled ? props.isOpen : context.isOpen;
	const onClose = isControlled ? props.onClose : context.closeDrawer;
	const offer = isControlled ? props.offer : context.offer;
	const type = isControlled ? props.type : context.type;

	const [visible, setVisible] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [showActivationNotice, setShowActivationNotice] = useState(false);
	const overlayRef = useRef(null);

	useEffect(() => {
		if (isOpen && !visible) {
			setVisible(true);
			setIsClosing(false);
			setShowActivationNotice(false);
		} else if (!isOpen && visible) {
			setIsClosing(true);

			const timer = setTimeout(() => {
				setVisible(false);
				setIsClosing(false);
			}, 400);
			return () => clearTimeout(timer);
		}
	}, [isOpen, visible]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose();
		};

		if (visible) window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [visible, onClose]);

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) onClose();
	};

	const handleActivateClick = () => {
		if (!showActivationNotice) {
			setShowActivationNotice(true);
		} else {
			// Confirm activation - redirect to activation page
			const activationData = {
				offerId: offer.id,
				type: type,
				offer: offer,
				timestamp: Date.now(),
			};

			// Store activation data in sessionStorage
			sessionStorage.setItem('activeOffer', JSON.stringify(activationData));

			// Close drawer and redirect
			onClose();
			router.push('/activare-oferta');
		}
	};

	if (!visible && !isOpen) return null;

	// Offer content helpers
	const renderTime = () => {
		if (type === 'moment' && offer) {
			const start = offer.startTime ? new Date(offer.startTime) : null;
			const end = offer.endTime ? new Date(offer.endTime) : null;
			const now = Date.now();
			let left = '';

			if (end && !isNaN(end.getTime())) {
				const diff = end.getTime() - now;

				if (diff > 0) {
					const h = Math.floor(diff / 1000 / 60 / 60);
					const m = Math.floor((diff / 1000 / 60) % 60);
					const s = Math.floor((diff / 1000) % 60);

					left = `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
				} else {
					left = 'Expirat';
				}
			}

			return (
				<div className="flex flex-col gap-1 text-sm text-gray-600">
					<span>
						{start ? start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'} -
						{end ? end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
					</span>
					<span className="font-semibold text-pink-600">Timp rămas: {left}</span>
				</div>
			);
		}
		return null;
	};

	const renderCounter = () => {
		if (type === 'drop' && offer) {
			const available = typeof offer.available === 'number' ? offer.available : 0;
			const claimed = typeof offer.claimed === 'number' ? offer.claimed : 0;
			const remaining = Math.max(available - claimed, 0);
			const progress = available > 0 ? (remaining / available) * 100 : 0;

			return (
				<div className="flex flex-col gap-1 mt-2">
					<span className="text-xs text-gray-700 font-semibold">
						{remaining} din {available} rămase
					</span>
					<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
						<div
							className={`h-full rounded-full transition-all duration-300 ${
								remaining === 0 ? 'bg-gray-400' : 'bg-pink-500'
							}`}
							style={{ width: `${progress}%` }}
						></div>
					</div>
				</div>
			);
		}
		return null;
	};

	const renderLocation = () => {
		if (offer?.business?.availableLocations?.length > 0) {
			const locations = offer.business.availableLocations;
			const isMultiple = locations.length > 1;

			return (
				<div className="mt-4 p-4 bg-gray-50 rounded-lg border border-black">
					<h3 className="text-sm font-semibold text-gray-900 mb-3">
						Unde poți activa {type === 'moment' ? 'momentul' : type === 'drop' ? 'drop-ul' : 'impulsul'}:
					</h3>
					<div className="space-y-3">
						{locations.map((location, index) => (
							<div key={location.id || index} className="flex items-center gap-3">
								{location.featuredImage && (
									<img
										src={location.featuredImage}
										alt={location.name}
										className="w-16 h-16 object-cover rounded-lg"
									/>
								)}
								<div className="flex-1">
									<h4 className="text-sm text-gray-600">{offer.business.name}</h4>
									<h4 className="font-semibold text-gray-900">{location.name}</h4>
									{location.address && <p className="text-sm text-gray-600">{location.address}</p>}
								</div>
							</div>
						))}
					</div>
					{isMultiple && (
						<p className="text-xs text-gray-500 mt-2">Disponibil în {locations.length} locații</p>
					)}
				</div>
			);
		}
		return null;
	};

	const getActivateLabel = () => {
		if (showActivationNotice) return 'Confirm';

		if (type === 'moment') return 'Activează momentul';
		if (type === 'drop') return 'Activează drop-ul';
		if (type === 'impuls') return 'Activează impulsul';

		return 'Activează';
	};

	return (
		<div
			ref={overlayRef}
			className="fixed inset-0 z-11 bg-black/50 flex justify-end"
			onClick={handleOverlayClick}
			style={{
				opacity: isClosing ? 0 : 1,
				transition: 'opacity 0.4s ease-out',
			}}
			aria-modal="true"
			role="dialog"
			tabIndex={-1}
		>
			<aside
				className="relative h-full w-full max-w-[350px] md:max-w-[400px] flex flex-col p-2.5"
				style={{
					animation: isClosing
						? 'slideOutToRight 0.4s ease-out forwards'
						: 'slideInFromRight 0.4s ease-out forwards',
				}}
			>
				<div className="flex flex-col h-full w-full bg-white rounded-lg overflow-hidden relative border border-black">
					<button
						onClick={onClose}
						className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer z-10"
						aria-label="Închide"
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
					<div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
						{offer?.image && (
							<img src={offer.image} alt={offer.title} className="w-full h-40 object-cover rounded-lg" />
						)}
						<h2 className="text-xl font-bold text-gray-900">{offer?.title}</h2>
						<p className="text-gray-700 text-base">{offer?.description}</p>
						{renderTime()}
						{renderCounter()}
						{renderLocation()}
					</div>

					{/* Activation notice */}
					{showActivationNotice && (
						<div
							className="px-4 py-3 bg-yellow-50 border-t border-yellow-200"
							style={{
								animation: 'slideUp 0.3s ease-out forwards',
							}}
						>
							<p className="text-sm text-yellow-800 font-medium">
								⚠️ Atenție, ai doar 5 minute să activezi{' '}
								{type === 'moment' ? 'momentul' : type === 'drop' ? 'drop-ul' : 'impulsul'}
							</p>
						</div>
					)}

					<div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 left-0 w-full">
						<Button variant="primary" className="w-full text-lg py-3" onClick={handleActivateClick}>
							{getActivateLabel()}
						</Button>
					</div>
				</div>
			</aside>
			<style jsx global>{`
				@keyframes slideInFromRight {
					from {
						transform: translateX(100%);
					}
					to {
						transform: translateX(0);
					}
				}
				@keyframes slideOutToRight {
					from {
						transform: translateX(0);
					}
					to {
						transform: translateX(100%);
					}
				}
				@keyframes slideUp {
					from {
						transform: translateY(100%);
						opacity: 0;
					}
					to {
						transform: translateY(0);
						opacity: 1;
					}
				}
			`}</style>
		</div>
	);
};

export default OfferDrawer;
