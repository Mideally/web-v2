'use client';

import { useState } from 'react';

export default function LocationsTabs({ locations, products }) {
	const [activeLoc, setActiveLoc] = useState(locations[0]?.id || '');

	const currentLoc = locations.find((loc) => loc.id === activeLoc);

	return (
		<div>
			<div className="flex gap-2 mb-4 flex-wrap">
				{locations.map((loc) => (
					<button
						key={loc.id}
						className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
							activeLoc === loc.id
								? 'bg-pink-500 text-white border-pink-500'
								: 'bg-white text-black border-gray-300 hover:bg-gray-100'
						}`}
						onClick={() => setActiveLoc(loc.id)}
					>
						{loc.name}
					</button>
				))}
			</div>
			{currentLoc && (
				<div className="bg-white rounded-lg shadow p-6">
					<h4 className="font-bold text-lg mb-2">Detalii locație</h4>
					<p className="mb-1">
						<span className="font-medium">Adresă:</span> {currentLoc.address.fullAddress}
					</p>
					{currentLoc.address.coordinates && (
						<p className="mb-1">
							<span className="font-medium">Coordonate:</span> {currentLoc.address.coordinates.latitude},{' '}
							{currentLoc.address.coordinates.longitude}
						</p>
					)}
					{currentLoc.schedule && (
						<div className="mb-2">
							<span className="font-medium">Program:</span>
							<ul className="ml-4 list-disc">
								{currentLoc.schedule.map((s) => (
									<li key={s.day}>
										{s.day}: {s.open} - {s.close}
									</li>
								))}
							</ul>
						</div>
					)}
					{currentLoc.contact && (
						<p className="mb-1">
							<span className="font-medium">Contact:</span> {currentLoc.contact}
						</p>
					)}
					<h4 className="font-bold text-lg mt-4 mb-2">Produse</h4>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{products.map((prod) => (
							<div key={prod.id} className="border rounded-lg p-3 flex flex-col items-center">
								<img
									src={prod.image}
									alt={prod.title}
									className="w-24 h-24 object-cover rounded mb-2"
								/>
								<div className="font-semibold">{prod.title}</div>
								<div className="text-gray-500 text-sm">{prod.description}</div>
								<div className="font-bold text-pink-600 mt-1">{prod.price} RON</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
