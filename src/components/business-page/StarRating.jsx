const StarRating = ({ rating, size = 'w-4 h-4' }) => {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<div className="flex items-center gap-0.5">
			{/* Full stars */}
			{Array.from({ length: fullStars }, (_, i) => (
				<svg
					key={`full-${i}`}
					className={`${size} text-yellow-500 fill-current`}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			))}

			{/* Half star */}
			{hasHalfStar && (
				<div className="relative">
					<svg
						className={`${size} text-gray-300 fill-current`}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
					</svg>
					<svg
						className={`${size} text-yellow-500 fill-current absolute inset-0`}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						style={{ clipPath: 'inset(0 50% 0 0)' }}
					>
						<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
					</svg>
				</div>
			)}

			{/* Empty stars */}
			{Array.from({ length: emptyStars }, (_, i) => (
				<svg
					key={`empty-${i}`}
					className={`${size} text-gray-300 fill-current`}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			))}
		</div>
	);
};

export default StarRating;
