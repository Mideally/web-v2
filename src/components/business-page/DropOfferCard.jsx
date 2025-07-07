'use client';

import Button from '@/components/global/Button';

export default function DropOfferCard({ drop }) {
	const claimed = typeof drop.claimed === 'number' ? drop.claimed : 0;
	const available = typeof drop.available === 'number' ? drop.available : 0;
	const remaining = Math.max(available - claimed, 0);
	const expired = remaining === 0;
	const progress = available > 0 ? (remaining / available) * 100 : 0;

	return (
		<div className={`rounded-lg border shadow bg-white p-4 flex flex-col gap-2 ${expired ? 'opacity-60' : ''}`}>
			<h3 className="font-semibold text-lg">{drop.title}</h3>
			<p className="text-gray-700">{drop.description}</p>
			<p className="text-sm text-gray-500">
				{remaining} din {available} rămase
			</p>
			<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
				<div
					className={`h-full rounded-full transition-all duration-300 ${
						expired ? 'bg-gray-400' : 'bg-pink-500'
					}`}
					style={{ width: `${progress}%` }}
				></div>
			</div>
			<Button variant="tertiary" className="mt-2 w-full" disabled={expired}>
				Vezi drop
			</Button>
		</div>
	);
}
