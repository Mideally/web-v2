import './ImpulseAnimation.css';

export default function ImpulseAnimation() {
	return (
		<div className="relative flex items-center justify-center bg-transparent">
			<div className="blob absolute w-60 h-60"></div>

			<svg
				className="w-14 h-24 z-10 animate-pulseLightning"
				viewBox="0 0 24 24"
				fill="white"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M13 2L3 14H11L9 22L19 10H11L13 2Z" />
			</svg>
		</div>
	);
}
