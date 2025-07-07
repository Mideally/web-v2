import React from 'react';
import Image from 'next/image';
import Section from './Section';

const columns = [
	{
		title: 'Category',
		color: 'text-white',
		links: ['News', 'World', 'Games', 'References'],
	},
	{
		title: 'Cherry',
		color: 'text-white',
		links: ['Web', 'eCommerce', 'Business', 'Entertainment', 'Portfolio'],
	},
	{
		title: 'Apples',
		color: 'text-white',
		links: ['Media', 'Brochure', 'Nonprofit', 'Educational', 'Projects'],
	},
	{
		title: 'Business',
		color: 'text-white',
		links: ['Infopreneur', 'Personal', 'Wiki', 'Forum'],
	},
];

export default function Footer() {
	return (
		<footer className="bg-indigo-500 text-white rounded-2xl mt-16 pt-8 md:pt-16 pb-8 mx-2.5 mb-2.5 border border-1 border-black">
			<Section>
				<div className="flex flex-col md:flex-row gap-10 md:gap-20">
					{/* Left: Logo + Description */}
					<div className="flex-1 min-w-[220px]">
						<div className="flex items-center gap-3 mb-4">
							<Image
								src="/assets/images/mideally-logo-white.png"
								width={120}
								height={40}
								alt="Mideally Logo"
							/>
						</div>
						<p className="text-sm text-white/80 max-w-xs">
							Construim un ecosistem în care afacerile locale pot scala organic, având la dispoziție
							instrumentele potrivite pentru a-și crește vizibilitatea și a atrage clienți fideli în mod
							eficient și accesibil.
						</p>
					</div>
					{/* Right: Columns */}
					<div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-8">
						{columns.map((col) => (
							<div key={col.title}>
								<h4 className={`font-semibold mb-3 ${col.color}`}>{col.title}</h4>
								<ul className="space-y-2">
									{col.links.map((link) => (
										<li key={link}>
											<a href="#" className="text-white/90 text-sm">
												{link}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
				{/* Divider */}
				<div className="border-t border-white/20 my-6 " />
				{/* Bottom: Copyright + Socials */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
					<span className="text-white/70">
						© Copyright {new Date().getFullYear()} Mideally. Toate drepturile rezervate.
					</span>
					<div className="flex gap-4">
						<a href="#" aria-label="Twitter" className="hover:text-white">
							<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
								<path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.868 9.868 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z" />
							</svg>
						</a>
						<a href="#" aria-label="Instagram" className="hover:text-white">
							<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.808 2.256 6.088 2.243 6.497 2.243 12c0 5.503.013 5.912.072 7.192.059 1.276.353 2.449 1.32 3.416.967.967 2.14 1.261 3.416 1.32 1.28.059 1.689.072 7.192.072s5.912-.013 7.192-.072c1.276-.059 2.449-.353 3.416-1.32.967-.967 1.261-2.14 1.32-3.416.059-1.28.072-1.689.072-7.192s-.013-5.912-.072-7.192c-.059-1.276-.353-2.449-1.32-3.416C21.449.425 20.276.131 19 .072 17.72.013 17.311 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
							</svg>
						</a>
						<a href="#" aria-label="Facebook" className="hover:text-white">
							<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
								<path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
							</svg>
						</a>
					</div>
				</div>
			</Section>
		</footer>
	);
}
