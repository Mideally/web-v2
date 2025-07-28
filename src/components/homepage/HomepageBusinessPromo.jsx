import Button from '@/components/global/Button';

export default function HomepageBusinessPromo() {
	return (
		<div className="flex flex-col md:flex-row-reverse gap-16 justify-center items-center">
			<div className="flex-1 max-w-3xl text-center md:text-left">
				<h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-black">
					Pentru afaceri locale: crește-ți vizibilitatea, fără bugete mari
				</h2>
				<p className="mb-4">
					Mideally îți oferă instrumentele unui marketing inteligent, simplu și eficient, fără să ai nevoie de
					agenții sau bugete uriașe.
				</p>
				<p className="mb-4">
					Platforma noastră este creată pentru afaceri locale care vor să atragă mai mulți clienți, să
					genereze trafic în timp real și să construiască relații loiale cu comunitatea din jur.
				</p>
				<Button variant="primary" href="/inregistrare">
					Înregistrează-ți business-ul
				</Button>
			</div>
			<div className="flex-1 border border-2 border-black rounded-lg p-4 max-w-md yellow-shadow bg-white">
				<h3 className="text-xl font-bold mb-4">Dashboard</h3>
				<div className="flex flex-row gap-4 justify-between">
					{/* 3 columns */}
					<div className="flex flex-col gap-2">
						<h4 className="text-lg font-bold">54</h4>
						<p className="text-sm text-gray-500">Oferte create</p>
					</div>
					<div className="flex flex-col gap-2">
						<h4 className="text-lg font-bold">1,423</h4>
						<p className="text-sm text-gray-500">Vizualizări</p>
					</div>
					<div className="flex flex-col gap-2">
						<h4 className="text-lg font-bold">342</h4>
						<p className="text-sm text-gray-500">Conversii</p>
					</div>
				</div>
				<div className="flex flex-row items-center gap-4 border border-black rounded-lg p-4 mt-4">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-[#dbff79]"
						strokeWidth="1"
						stroke="black"
					>
						<path d="M13 2L3 14H11L9 22L19 10H11L13 2Z" fill="currentColor" />
					</svg>
					<div>
						<h4 className="text-lg font-bold">Impuls</h4>
						<p className="text-sm text-gray-500">Voucher 10% la prima comandă</p>
					</div>
					<p className="text-sm text-indigo-500 ml-auto">Activ</p>
				</div>
				<div className="flex flex-row items-center gap-4 border border-black rounded-lg p-4 mt-4">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-indigo-500"
					>
						<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
					</svg>
					<div>
						<h4 className="text-lg font-bold">Moment</h4>
						<p className="text-sm text-gray-500">Băutura + Burger la 25 RON</p>
					</div>
					<p className="text-sm text-indigo-500 ml-auto text-right">14:00-16:00</p>
				</div>
				<div className="flex flex-row items-center gap-4 border border-black rounded-lg p-4 mt-4">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-pink-500"
					>
						<path d="M12 2L2 12L12 22L22 12L12 2Z" fill="currentColor" />
					</svg>

					<div>
						<h4 className="text-lg font-bold">Drop</h4>
						<p className="text-sm text-gray-500">Espresso la 5 RON</p>
					</div>
					<p className="text-sm text-indigo-500 ml-auto">12 rămase</p>
				</div>
			</div>
		</div>
	);
}
