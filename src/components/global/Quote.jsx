import React from 'react';

export default function Quote({ text, author, role, image }) {
	return (
		<figure className="max-w-screen-md mx-auto mt-12 mb-12 bg-white rounded-lg p-12 lg:p-16 shadow-lg border border-gray-200">
			<div className="relative">
				{/* Large quote mark */}
				<svg
					className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100"
					fill="currentColor"
					viewBox="0 0 32 32"
					aria-hidden="true"
				>
					<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
				</svg>

				<blockquote className="relative">
					<p className="text-xl font-medium text-gray-900 leading-relaxed pl-8">{text}</p>
				</blockquote>

				<figcaption className="mt-6 pl-8 flex items-center space-x-4">
					<div className="flex-shrink-0">
						<img src={image} alt={author} className="h-12 w-12 rounded-full" />
					</div>
					<div className="flex-1 flex flex-col">
						<span className="text-base font-semibold text-gray-900">{author}</span>
						<span className="text-sm text-gray-600">{role}</span>
					</div>
				</figcaption>
			</div>
		</figure>
	);
}
