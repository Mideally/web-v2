import React from 'react';
import Image from 'next/image';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import Section from './Section';

const columns = [
	{
		title: 'Descoperă',
		color: 'text-white',
		links: [
			{ name: 'Cafenele', url: '/cafenele' },
			{ name: 'Patiserii', url: '/patiserii' },
			{ name: 'Restaurante', url: '/restaurante' },
			{ name: 'Servicii', url: '/servicii' },
			{ name: 'Toți Partenerii', url: '/toti-partenerii' },
		],
	},
	{
		title: 'Orașul',
		color: 'text-white',
		links: [
			{ name: 'București', url: '/parteneri/oras/bucuresti' },
			{ name: 'Cluj', url: '/parteneri/oras/cluj' },
			{ name: 'Iași', url: '/parteneri/oras/iasi' },
			{ name: 'Timișoara', url: '/parteneri/oras/timisoara' },
			{ name: 'Brașov', url: '/parteneri/oras/brasov' },
		],
	},
	{
		title: 'Funcționalități',
		color: 'text-white',
		links: [
			{ name: 'Drops', url: '/drops' },
			{ name: 'Momente', url: '/momente' },
			{ name: 'Oferte', url: '/oferte' },
			{ name: 'Contul meu', url: '/cont' },
		],
	},
	{
		title: 'Info',
		color: 'text-white',
		links: [
			{ name: 'Despre Noi', url: '/despre-noi' },
			{ name: 'FAQ', url: '/faq' },
			{ name: 'Noutăți', url: '/noutati' },
			{ name: 'Cariere', url: '/cariere' },
			{ name: 'Contact', url: '/contact' },
		],
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
										<li key={link.name}>
											<a
												href={link.url}
												className="text-white/90 text-sm hover:text-white transition-colors"
											>
												{link.name}
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
					<div className="flex flex-col md:flex-row items-center gap-4 text-sm">
						<span className="text-white/70">
							© Copyright {new Date().getFullYear()} Mideally. Toate drepturile rezervate.
						</span>
						<div className="flex gap-4 text-xs">
							<a href="/termeni-si-conditii" className="text-white/70 hover:text-white transition-colors">
								Termeni și Condiții
							</a>
							<a
								href="/politica-de-confidentialitate"
								className="text-white/70 hover:text-white transition-colors"
							>
								Politica de confidențialitate
							</a>
						</div>
					</div>
					<div className="flex gap-4">
						<a
							href="https://www.instagram.com/mideally.romania"
							target="_blank"
							aria-label="Instagram"
							className="hover:text-white transition-colors"
						>
							<FaInstagram size={20} />
						</a>
						<a
							href="https://www.facebook.com/mideally"
							target="_blank"
							aria-label="Facebook"
							className="hover:text-white transition-colors"
						>
							<FaFacebook size={20} />
						</a>
						<a
							href="https://www.linkedin.com/company/mideally"
							target="_blank"
							aria-label="LinkedIn"
							className="hover:text-white transition-colors"
						>
							<FaLinkedin size={20} />
						</a>
					</div>
				</div>
			</Section>
		</footer>
	);
}
