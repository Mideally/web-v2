import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaHeart, FaStar, FaCrown, FaCheck } from 'react-icons/fa';
import Button from './Button';
import TierProgressBar from './TierProgressBar';

const tiersData = [
	{
		id: 'fan',
		name: 'Fan',
		icon: FaHeart,
		range: '0 - 99 PL',
		maxPoints: 99,
		perks: [
			'Pachet de bun venit cu 3 Impulsuri',
			'Refresh lunar cu 4 Impulsuri',
			'Acces la oferte de tip "Momente"',
			'Poți primi Impulsuri de la prieteni',
		],
	},
	{
		id: 'sustinator',
		name: 'Susținător',
		icon: FaStar,
		range: '100 - 499 PL',
		maxPoints: 499,
		perks: [
			'Bonus de 10 Impulsuri la atingerea nivelului',
			'Refresh lunar cu 12 Impulsuri',
			'Poți trimite și primi Impulsuri',
			'Acces exclusiv la oferte "Drop"',
			'Poți câștiga Impulsuri prin recenzii',
		],
	},
	{
		id: 'legenda',
		name: 'Legendă',
		icon: FaCrown,
		range: '500+ PL',
		maxPoints: 999,
		perks: [
			'Bonus de 25 Impulsuri la atingerea nivelului',
			'Refresh lunar de elită cu 28 Impulsuri',
			'Impulsurile nefolosite se reportează',
			'Poți oferi Impulsuri cadou lunar',
			'Rate de schimb preferențiale',
		],
	},
];

const detailsText = (
	<>
		<h3 className="text-xl font-bold mb-4">Devino Mai Mult Decât un Fan: Câștigă Statut și Recompense</h3>
		<p className="mb-3">
			Pe Mideally, loialitatea ta față de afacerile locale preferate este recunoscută și recompensată. Am
			redefinit ce înseamnă să fii fan, transformând fiecare interacțiune într-o oportunitate de a avansa în
			statut, de a debloca beneficii exclusive și de a deveni un pilon al comunității.
		</p>
		<p className="mb-4">
			Uită de simplii "followeri". Aici, devii parte dintr-un ecosistem dinamic în care loialitatea ta are valoare
			reală.
		</p>
		<h4 className="text-lg font-semibold mb-3">Sistemul de Niveluri: O Călătorie a Loialității</h4>
		<p className="mb-4">
			Statutul tău de fan la fiecare business evoluează în funcție de implicarea ta. Progresul se bazează pe
			Puncte de Loialitate (PL) pe care le acumulezi prin acțiuni concrete care susțin afacerea locală.
		</p>
		<ul className="space-y-4 mb-6">
			<li>
				<b className="decoration-black underline">Nivelul 1: Fan</b> (0 - 99 PL)
				<ul className="ml-6 mt-2 space-y-1">
					<li>
						<b>Pachet de Bun Venit:</b> Primești 3 Impulsuri pentru a începe aventura.
					</li>
					<li>
						<b>Refresh Lunar:</b> Contul tău este alimentat cu 4 Impulsuri la începutul fiecărei luni.
					</li>
					<li>
						<b>Acces la Oferte:</b> Poți folosi Impulsurile pentru a activa ofertele de tip Moment.
					</li>
					<li>
						<b>Primești Cadouri:</b> Poți primi Impulsuri de la prieteni cu un statut superior.
					</li>
				</ul>
			</li>
			<li>
				<b className="decoration-black underline">Nivelul 2: Susținător</b> (100 - 499 PL)
				<ul className="ml-6 mt-2 space-y-1">
					<li>
						<b>Bonus de Nivel:</b> Primești un bonus unic de 10 Impulsuri la atingerea acestui statut.
					</li>
					<li>
						<b>Refresh Lunar Superior:</b> Primești 12 Impulsuri la începutul fiecărei luni.
					</li>
					<li>
						<b>Deblochezi Tranzacționarea:</b> Poți trimite și primi Impulsuri, devenind un jucător cheie în
						economia platformei.
					</li>
					<li>
						<b>Acces Exclusiv la "Drop-uri":</b> Doar Susținătorii și Legendele au acces la cele mai rare și
						valoroase oferte.
					</li>
				</ul>
			</li>
			<li>
				<b className="decoration-black underline">Nivelul 3: Legendă</b> (500+ PL)
				<ul className="ml-6 mt-2 space-y-1">
					<li>
						<b>Bonus de Statut:</b> Primești un bonus unic de 25 Impulsuri.
					</li>
					<li>
						<b>Refresh Lunar de Elită:</b> Primești 28 Impulsuri la începutul fiecărei luni.
					</li>
					<li>
						<b>"Banca Personală":</b> Impulsurile nefolosite la finalul lunii se reportează pentru luna
						următoare.
					</li>
					<li>
						<b>Puterea de a Oferi:</b> Poți oferi cadou un număr limitat de Impulsuri, direct din statutul
						tău, fără a-ți consuma soldul.
					</li>
					<li>
						<b>Recunoaștere Supremă:</b> Numele tău poate fi afișat în secțiunea de onoare a micropaginii
						business-ului.
					</li>
				</ul>
			</li>
		</ul>
		<h4 className="text-lg font-semibold mb-3">Cum Câștigi Puncte de Loialitate (PL)?</h4>
		<ul className="space-y-2 mb-4">
			<li className="md:flex items-center">
				<FaCheck className="md:block hidden text-pink-500 opacity-50 mr-2" />
				Activează o ofertă (Moment, Impuls, Drop): <b>+10 PL</b>
			</li>
			<li className="md:flex items-center">
				<FaCheck className="md:block hidden text-pink-500 opacity-50 mr-2" />
				Scrie o recenzie utilă și aprobată: <b>+15 PL</b>
			</li>
			<li className="md:flex items-center">
				<FaCheck className="md:block hidden text-pink-500 opacity-50 mr-2" />
				Fă check-in la locație (validat prin GPS): <b>+5 PL</b>
			</li>
			<li className="md:flex items-center">
				<FaCheck className="md:block hidden text-pink-500 opacity-50 mr-2" />
				Invită un prieten care devine fan al aceluiași business: <b>+25 PL</b>
			</li>
		</ul>
		<p>Ești pregătit să începi călătoria? Alege-ți afacerea locală preferată și devino mai mult decât un fan!</p>
	</>
);

function Modal({ open, onClose, children }) {
	if (!open) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
			tabIndex={-1}
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
				tabIndex={0}
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
			>
				<button
					className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer"
					onClick={onClose}
					aria-label="Închide"
				>
					&times;
				</button>
				<div className="pr-8">{children}</div>
			</div>
		</div>
	);
}

export default function LoyaltyTiers({ currentUserTier, currentUserPoints, isLoggedIn = false }) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div>
			<div className="flex justify-between items-center mb-8">
				<h2 className="text-2xl font-bold">Niveluri de Loialitate</h2>
				<Button variant="secondary" size="small" onClick={() => setModalOpen(true)}>
					Detalii
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{tiersData.map((tier, idx) => {
					const IconComponent = tier.icon;

					return (
						<div
							key={tier.id}
							className="flex-1 bg-gray-50 rounded-lg p-6 transition-opacity duration-200 border border-black"
						>
							<div className="flex flex-col items-center mb-4">
								<IconComponent className="text-4xl mb-2 text-pink-500" />
								<span className="font-bold text-lg">{tier.name}</span>
								<span className="text-gray-600">{tier.range}</span>
							</div>
							<ul className="text-center space-y-1">
								{tier.perks.map((perk) => (
									<li
										className="text-sm mt-2.5 flex-wrap flex items-center justify-center"
										key={perk}
									>
										<FaCheck className="text-pink-500 opacity-50 mr-2" />
										{perk}
									</li>
								))}
							</ul>
						</div>
					);
				})}
			</div>

			<TierProgressBar
				currentUserTier={currentUserTier}
				currentUserPoints={currentUserPoints}
				isLoggedIn={isLoggedIn}
			/>

			<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
				{detailsText}
			</Modal>
		</div>
	);
}

LoyaltyTiers.propTypes = {
	currentUserTier: PropTypes.oneOf(['fan', 'sustinator', 'legenda']),
	currentUserPoints: PropTypes.number,
	isLoggedIn: PropTypes.bool,
};

LoyaltyTiers.defaultProps = {
	currentUserTier: 'fan',
	currentUserPoints: 0,
	isLoggedIn: false,
};
