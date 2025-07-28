const NavigationButton = ({ onClick, children, isActive, isWhiteTheme, className = '' }) => {
	return (
		<button
			onClick={onClick}
			className={`text-lg font-medium transition-colors relative cursor-pointer ${className} ${
				isWhiteTheme ? 'text-gray-800 hover:text-pink-600' : 'text-white hover:text-white/80'
			}`}
		>
			{children}
			{isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600"></span>}
		</button>
	);
};

export default NavigationButton;
