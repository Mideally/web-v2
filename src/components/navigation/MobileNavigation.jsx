import IconButton from './IconButton';

const MobileNavigation = ({ isWhiteTheme, toggleSearch, toggleBurger }) => {
	return (
		<div className="md:hidden flex items-center">
			<IconButton onClick={toggleSearch} isWhiteTheme={isWhiteTheme} className="mr-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</IconButton>

			<IconButton onClick={toggleBurger} isWhiteTheme={isWhiteTheme}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</IconButton>
		</div>
	);
};

export default MobileNavigation;
