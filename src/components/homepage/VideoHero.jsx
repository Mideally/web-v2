'use client';

import { useRef, useEffect } from 'react';
import Button from '@/components/global/Button';

const VideoHero = () => {
	const leftVideoRef = useRef(null);
	const centerVideoRef = useRef(null);
	const rightVideoRef = useRef(null);

	useEffect(() => {
		const videos = [leftVideoRef, centerVideoRef, rightVideoRef];
		videos.forEach((videoRef) => {
			if (videoRef.current) {
				videoRef.current.play().catch((error) => {
					console.error('Error trying to play the video:', error);
				});
			}
		});
	}, []);

	return (
		<div className="relative w-full overflow-hidden p-2.5">
			<div className="relative min-h-[80vh] flex items-center">
				{/* Video Grid */}
				<div className="absolute inset-0 grid md:grid-cols-3 grid-cols-1 gap-2.5">
					{/* Left Video */}
					<div className="relative h-full overflow-hidden rounded-xl">
						<video
							ref={leftVideoRef}
							className="w-full h-full object-cover rounded-xl"
							autoPlay
							muted
							loop
							playsInline
							poster="/assets/images/homepage-hero/video-1-frame.png"
						>
							<source src="/assets/videos/hero-video-left.mp4" type="video/mp4" />
						</video>
						<div className="absolute inset-0 bg-black/65 md:bg-black/40 rounded-xl"></div>
					</div>

					{/* Center Video */}
					<div className="relative h-full overflow-hidden rounded-xl hidden md:block">
						<video
							ref={centerVideoRef}
							className="w-full h-full object-cover rounded-xl"
							autoPlay
							muted
							loop
							playsInline
							poster="/assets/images/homepage-hero/video-2-frame.png"
						>
							<source src="/assets/videos/hero-video-center.mp4" type="video/mp4" />
						</video>
						<div className="absolute inset-0 bg-black/40 rounded-xl"></div>
					</div>

					{/* Right Video */}
					<div className="relative h-full overflow-hidden rounded-xl hidden md:block">
						<video
							ref={rightVideoRef}
							className="w-full h-full object-cover rounded-xl"
							autoPlay
							muted
							loop
							playsInline
							poster="/assets/images/homepage-hero/video-3-frame.png"
						>
							<source src="/assets/videos/hero-video-right.mp4" type="video/mp4" />
						</video>
						<div className="absolute inset-0 bg-black/40 rounded-xl"></div>
					</div>
				</div>

				{/* Content Overlay */}
				<div className="relative z-2 container mx-auto px-4 text-center pt-32 pb-12 md:pb-32">
					<div className="yellow-shadow max-w-3xl mx-auto bg-white mb-10">
						<div className="p-8 md:p-10">
							<h1 className="text-3xl md:text-7xl font-bold md:font-extrabold mb-6 text-black">
								Orașul tău, momentele tale
							</h1>
							<p className="text-lg md:text-2xl text-black/80">
								Redefinim reducerile prin experiențe personalizate. Impulsuri, momente și drops care te
								surprind zilnic.
							</p>
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-4 justify-center items-center">
						<Button variant="primary" href="/noutati">
							Vezi ce e nou
						</Button>
						<Button variant="secondary" href="/business">
							Înregistrează-ți business-ul
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoHero;
