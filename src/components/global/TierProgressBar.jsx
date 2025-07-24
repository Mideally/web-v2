import PropTypes from 'prop-types';
import { FaHeart, FaStar, FaCrown } from 'react-icons/fa';

const tierIcons = {
	fan: FaHeart,
	sustinator: FaStar,
	legenda: FaCrown,
};

export default function TierProgressBar({ currentUserTier, currentUserPoints, isLoggedIn = false }) {
	// Define tier ranges properly
	const tiersData = [
		{ id: 'fan', name: 'Fan', minPoints: 0, maxPoints: 100 },
		{ id: 'sustinator', name: 'Susținător', minPoints: 100, maxPoints: 500 },
		{ id: 'legenda', name: 'Legendă', minPoints: 500, maxPoints: Infinity },
	];

	// Find which tier the user is in based on points
	let activeTierIdx = 0;
	for (let i = 0; i < tiersData.length; i++) {
		if (currentUserPoints >= tiersData[i].minPoints && currentUserPoints < tiersData[i].maxPoints) {
			activeTierIdx = i;
			break;
		}
	}
	// If user is at or above the max tier, set to max tier
	if (currentUserPoints >= tiersData[tiersData.length - 1].minPoints) {
		activeTierIdx = tiersData.length - 1;
	}

	// Calculate progress towards next level
	let progressPercent = 0;
	let pointsToNext = 0;
	let nextTierName = '';

	if (isLoggedIn) {
		const currentTier = tiersData[activeTierIdx];

		if (activeTierIdx < tiersData.length - 1) {
			// User is not at max tier
			const nextTier = tiersData[activeTierIdx + 1];
			const pointsInCurrentTier = currentUserPoints - currentTier.minPoints;
			const pointsNeededForNext = nextTier.minPoints - currentTier.minPoints;

			pointsToNext = nextTier.minPoints - currentUserPoints;
			nextTierName = nextTier.name;
			progressPercent = Math.min((pointsInCurrentTier / pointsNeededForNext) * 100, 100);
		} else {
			// User is at max tier
			progressPercent = 100;
			pointsToNext = 0;
			nextTierName = 'Nivel maxim atins!';
		}
	}

	const CurrentIconComponent = tierIcons[tiersData[activeTierIdx].id];

	return (
		<div className="mt-8">
			{isLoggedIn ? (
				<div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
					<div className="flex items-center gap-4">
						{/* Current level icon */}
						<div className="bg-purple-100 rounded-lg p-3">
							<CurrentIconComponent className="text-2xl text-purple-600" />
						</div>

						{/* Progress section */}
						<div className="flex-1">
							{/* Current points and remaining points on same line */}
							<div className="flex justify-between items-center mb-2">
								<div className="text-sm font-medium text-gray-700">{currentUserPoints} PL</div>
								{pointsToNext > 0 ? (
									<div className="text-sm font-medium text-gray-700">
										<span className="text-xs text-gray-500">Puncte până la {nextTierName}: </span>
										<span className="font-bold">{pointsToNext}</span>
									</div>
								) : (
									<div className="text-sm font-bold text-purple-600">{nextTierName}</div>
								)}
							</div>

							{/* Progress bar */}
							<div className="w-full bg-gray-200 rounded-full h-3">
								<div
									className="bg-purple-500 h-full rounded-full transition-all duration-300"
									style={{ width: `${progressPercent}%` }}
								/>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="text-sm font-medium text-gray-500">Autentifică-te pentru a vedea progresul</div>
			)}
		</div>
	);
}

TierProgressBar.propTypes = {
	currentUserTier: PropTypes.oneOf(['fan', 'sustinator', 'legenda']),
	currentUserPoints: PropTypes.number,
	isLoggedIn: PropTypes.bool,
};

TierProgressBar.defaultProps = {
	currentUserTier: 'fan',
	currentUserPoints: 0,
	isLoggedIn: false,
};
