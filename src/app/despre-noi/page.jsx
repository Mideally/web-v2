import { generateMetadata } from '@/utils';
import { PageHeader, Section, SectionHeader } from '@/components/layout';
import SimpleCard from '@/components/global/SimpleCard';
import Quote from '@/components/global/Quote';
import Button from '@/components/global/Button';
import Link from 'next/link';
import teamData from '@/data/team.json';

// Generate metadata for this page
export const metadata = generateMetadata({
	title: 'Despre noi',
	description: 'Află mai multe despre echipa noastră și cum a luat naștere Mideally.',
	url: 'https://mideally.com/despre-noi',
});

export default function AboutPage() {
	// Mission and vision data
	const missionAndVision = [
		{
			title: 'Democratizarea Marketingului',
			description:
				'Oferim IMM-urilor acces la instrumente de marketing performante, anterior disponibile doar marilor companii. Prin tehnologie și inovație, transformăm micile afaceri în branduri locale puternice.',
			image: '/assets/images/mv-1.jpg',
		},
		{
			title: 'Creștere Sustenabilă',
			description:
				'Construim un ecosistem în care afacerile locale pot scala organic, având la dispoziție instrumentele potrivite pentru a-și crește vizibilitatea și a atrage clienți fideli în mod eficient și accesibil.',
			image: '/assets/images/mv-2.jpg',
		},
		{
			title: 'Comunitate și Economii',
			description:
				'Conectăm comercianții locali cu consumatorii care caută să economisească inteligent, creând o comunitate vibrantă unde toată lumea câștigă: afacerile își dezvoltă prezența locală, iar clienții beneficiază de oferte exclusive.',
			image: '/assets/images/mv-3.jpg',
		},
	];

	return (
		<>
			<Section>
				<PageHeader
					title="Despre noi"
					subtitle="Află mai multe despre echipa noastră și cum a luat naștere Mideally."
					className="text-center"
				/>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 pt-8 place-items-center">
					{teamData.map((member) => (
						<SimpleCard
							key={member.name}
							title={member.name}
							supraTitle={member.role}
							image={member.image}
							description={member.description}
							linkedin={member.linkedin}
							className="max-w-sm w-full"
							alt={`${member.name}, ${member.role} at Mideally`}
							imageHeight="auto"
						/>
					))}
				</div>
			</Section>

			<Section className="pt-8 lg:pt-2">
				<SectionHeader
					title="Povestea Mideally"
					subtitle="Fiecare poveste de succes începe cu un vis și o misiune. Pentru noi, totul a pornit de la dorința de a face o diferență reală în societate, de a rezolva probleme concrete și de a crea un impact pozitiv în comunitățile locale. Mideally s-a născut din această ambiție, transformându-se dintr-o idee îndrăzneață într-o platformă care conectează afacerile locale cu oamenii care vor să economisească inteligent."
					className="text-center mt-8 lg:mt-16"
				/>
				<p className="font-light leading-8 text-gray-900 text-center pb-8 lg:pb-16">
					Mideally s-a născut din dorința de a crea un impact real în comunitatea locală, conectând afacerile
					mici și mijlocii cu clienții lor. Am observat că există o discrepanță între IMM-urile care oferă
					produse și servicii de calitate și potențialii clienți care caută astfel de oferte. Ne-am propus să
					construim o platformă care să faciliteze această conexiune, făcând marketingul și promovarea
					accesibile pentru orice antreprenor local.
				</p>
				<Quote
					text={
						'Credem că piața IMM-urilor se potrivește perfect cu profilul consumatorului "vânător de oferte". Vrem să oferim soluția ideală pentru ca micii antreprenori să devină branduri locale, iar utilizatorii noștri să economisească lunar.'
					}
					author="Dragoș Schițcu"
					role="Co-fondator Mideally"
					image="/assets/images/team/dragos-schitcu.jpeg"
				/>
				<p className="font-light leading-8 text-gray-900 text-center pt-8 lg:pt-16">
					Astăzi, Mideally este o platformă dedicată IMM-urilor, având ca obiectiv principal scalarea micilor
					afaceri și crearea unei experiențe de cumpărare optimizate pentru consumatori. Ne dorim să oferim
					antreprenorilor instrumentele necesare pentru a-și transforma afacerile în branduri locale
					puternice, în timp ce consumatorii beneficiază de produse și servicii de calitate la prețuri
					accesibile. În esență, misiunea noastră este să creăm un ecosistem sustenabil, unde atât afacerile,
					cât și comunitățile locale prosperă împreună.
				</p>
			</Section>

			<Section className="pb-16 pt-8 lg:pt-2">
				<SectionHeader
					title="Misiune și viziune"
					subtitle="La Mideally, transformăm modul în care afacerile locale și consumatorii interacționează, creând un ecosistem digital care aduce beneficii ambelor părți. Misiunea noastră se concentrează pe trei piloni fundamentali:"
					className="text-center mt-8 lg:mt-16"
				/>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 place-items-center">
					{missionAndVision.map((item) => (
						<SimpleCard
							key={item.title}
							title={item.title}
							description={item.description}
							image={item.image}
							alt={`Ilustrație pentru ${item.title}`}
							imageHeight="auto"
						/>
					))}
				</div>
				<p className="font-light leading-8 text-gray-900 text-center pt-8 lg:pt-16">
					Prin aceste trei direcții strategice, Mideally devine catalizatorul care transformă peisajul
					comercial local, aducând împreună tehnologia, comunitatea și valoarea adăugată într-un mod care
					beneficiază tuturor părților implicate.
				</p>
				<div className="mt-16 flex justify-center flex-col items-center gap-4">
					<p className="text-lg text-center">
						Înscrie-ți businessul în Mideally și conectează-te la clienții tăi.
					</p>
					<div className="flex justify-center items-center gap-4 flex-col lg:flex-row">
						<Button href="/inregistrare-business" size="small">
							Înregistrează-te
						</Button>
						<Link href="/noutati" className="font-light hover:underline">
							Roadmap funcționalități →
						</Link>
					</div>
				</div>
			</Section>
		</>
	);
}
