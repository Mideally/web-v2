import Image from 'next/image';
import Button from '@/components/global/Button';

export default function HomepageImpulsesPromo() {
	return (
		<div className="yellow-shadow bg-pink-500 relative">
			<div className="flex flex-col md:flex-row items-center gap-12 px-4 md:px-12 z-1">
				{/* Text + CTA */}
				<div className="flex-1 pt-12 md:py-12 text-center md:text-left">
					<h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">
						Impulsuri - Oferte personalizate, exact când ai nevoie
					</h2>
					<p className="text-base md:text-lg mb-4 text-white/90">
						Fiecare interacțiune cu Mideally contează. Impulsurile sunt oferte create special pentru tine,
						pornind de la comportamentele și preferințele tale.
					</p>
					<p className="text-base md:text-lg mb-8 text-white/90">
						Ai trecut de mai multe ori pe lângă o cafenea sau ai salvat un business în aplicație? Primești
						un impuls - o reducere personalizată valabilă doar pentru tine și pentru o perioadă limitată.
					</p>

					<Button variant="tertiary" href="/cont">
						Vino in Mideally
					</Button>
				</div>
				{/* Image */}
				<div className="flex justify-center items-end self-end md:mt-8">
					<Image
						src="/assets/images/impuls-homepage-promo.png"
						alt="Impulsuri promo Mideally"
						width={400}
						height={400}
						className=""
						priority
					/>
				</div>
			</div>
		</div>
	);
}
