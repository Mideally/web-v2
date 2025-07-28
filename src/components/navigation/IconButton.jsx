const IconButton = ({ onClick, children, isWhiteTheme, className = '' }) => {
	return (
		<button
			onClick={onClick}
			className={`p-2 rounded-full transition-colors cursor-pointer ${className} ${
				isWhiteTheme ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
			}`}
		>
			{children}
		</button>
	);
};

export default IconButton;
