'use client';

import { useState, useEffect } from 'react';
import { useOfferDrawer } from '@/components/global/OfferDrawerContext';

function getCountdown(endTime) {
	const end = new Date(endTime);
	if (isNaN(end.getTime())) return 'Expirat';

	const now = Date.now();
	const diff = end.getTime() - now;
	if (diff <= 0) return 'Expirat';

	const h = Math.floor(diff / 1000 / 60 / 60);
	const m = Math.floor((diff / 1000 / 60) % 60);
	const s = Math.floor((diff / 1000) % 60);

	return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
}

export default function MomentOfferCard({ moment }) {
	const [now, setNow] = useState(Date.now());
	const { openDrawer } = useOfferDrawer();

	useEffect(() => {
		const interval = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(interval);
	}, []);

	const expired = new Date(moment.endTime).getTime() < now;
	const countdown = getCountdown(moment.endTime);

	return (
		<div
			className={`rounded-lg border shadow bg-white p-4 flex flex-col gap-2 ${
				expired ? 'opacity-60' : ''
			} cursor-pointer`}
			tabIndex={0}
			onClick={() => openDrawer(moment, 'moment')}
		>
			<div className="flex items-center justify-between">
				<h3 className="font-semibold text-lg">{moment.title}</h3>
				<span
					className={`px-3 py-1 rounded-full text-xs font-bold border ${
						expired ? 'bg-gray-200 text-gray-500 border-gray-300' : 'bg-pink-500 text-white border-pink-500'
					}`}
				>
					{countdown}
				</span>
			</div>
			<p className="text-gray-700">{moment.description}</p>
			<p className="text-sm text-gray-500">
				{new Date(moment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
				{new Date(moment.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
			</p>
		</div>
	);
}
