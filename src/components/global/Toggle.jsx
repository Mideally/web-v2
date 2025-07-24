'use client';

export default function Toggle({ leftOption, rightOption, isLeftActive, onToggle, disabled = false, className = '' }) {
	return (
		<div className={`flex items-center gap-3 ${className}`}>
			<span className="text-sm font-medium text-gray-700">Locatii din:</span>

			<div className="relative bg-gray-200 rounded-lg p-1 flex items-center">
				<button
					onClick={onToggle}
					disabled={disabled}
					className={`
						relative z-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
						${isLeftActive ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}
						${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
					`}
				>
					{leftOption}
				</button>

				<button
					onClick={onToggle}
					disabled={disabled}
					className={`
						relative z-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
						${!isLeftActive ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}
						${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
					`}
				>
					{rightOption}
				</button>
			</div>
		</div>
	);
}
