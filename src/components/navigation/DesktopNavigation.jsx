import NavigationButton from './NavigationButton';
import IconButton from './IconButton';

const DesktopNavigation = ({ isWhiteTheme, activeSubmenu, toggleSubmenu, toggleSearch, toggleBurger }) => {
	return (
		<div className="hidden md:flex items-center space-x-8">
			<NavigationButton
				onClick={() => toggleSubmenu('descopera')}
				isActive={activeSubmenu === 'descopera'}
				isWhiteTheme={isWhiteTheme}
			>
				Descoperă
			</NavigationButton>

			<NavigationButton
				onClick={() => toggleSubmenu('orasul')}
				isActive={activeSubmenu === 'orasul'}
				isWhiteTheme={isWhiteTheme}
			>
				Orașul
			</NavigationButton>

			{/* Separator */}
			<div className={`h-6 w-px ${isWhiteTheme ? 'bg-gray-300' : 'bg-white/30'}`}></div>

			{/* Search Icon */}
			<IconButton onClick={toggleSearch} isWhiteTheme={isWhiteTheme}>
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

			{/* Burger Menu Icon */}
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

export default DesktopNavigation;
