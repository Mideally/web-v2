'use client';

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Section from '@/components/layout/Section';
import Button from '@/components/global/Button';

const customerFaqs = [
	{
		question: 'Ce este Mideally?',
		answer: 'Mideally este o platformă care conectează clienții cu business-uri locale, oferind acces la oferte exclusive, reduceri și servicii de calitate. Ne concentrăm pe afacerile mici și mijlocii din România, oferind o experiență de cumpărare optimizată și accesibilă.',
	},
	{
		question: 'Cum pot găsi oferte în orașul meu?',
		answer: 'Poți explora ofertele după oraș prin secțiunea "Orașul" din meniu, unde găsești toate orașele disponibile (București, Cluj, Iași, Timișoara, Brașov, Sibiu). Alternativ, poți filtra business-urile după tip: cafenele, restaurante, patiserii, magazine sau servicii.',
	},
	{
		question: 'Ce sunt "Momentele" și "Drop-urile"?',
		answer: '"Momentele" sunt oferte cu durată limitată - oportunități speciale care sunt disponibile doar pentru o perioadă scurtă. "Drop-urile" sunt oferte cu cantitate limitată - produse sau servicii disponibile într-un număr restrâns de unități. Ambele tipuri de oferte sunt create pentru a oferi clienților acces la reduceri exclusive.',
	},
	{
		question: 'Cum pot activa o ofertă?',
		answer: 'Pentru a activa o ofertă, trebuie să ai un cont pe Mideally. După ce te-ai înregistrat, poți vizualiza ofertele disponibile și să le activezi direct din platformă. Fiecare ofertă are propriile condiții și instrucțiuni specifice.',
	},
	{
		question: 'Sunt ofertele gratuite?',
		answer: 'Mideally oferă o combinație de oferte gratuite și plătite. Multe business-uri oferă reduceri și promoții care pot fi activate gratuit prin platformă, în timp ce altele pot avea costuri reduse comparativ cu prețurile standard.',
	},
	{
		question: 'Cum funcționează sistemul de loialitate?',
		answer: 'Sistemul nostru de loialitate îți oferă puncte pentru activitatea pe platformă. Cu cât folosești mai mult Mideally, cu atât mai multe beneficii și oferte exclusive vei avea acces. Există diferite niveluri de loialitate, fiecare cu propriile avantaje.',
	},
	{
		question: 'Pot anula o ofertă activată?',
		answer: 'Politica de anulare depinde de fiecare business în parte și de tipul ofertei. Îți recomandăm să verifici condițiile specifice ale fiecărei oferte înainte de activare. Pentru întrebări specifice, poți contacta direct business-ul respectiv.',
	},
	{
		question: 'Cum pot contacta un business?',
		answer: 'Fiecare business are informații de contact disponibile pe pagina sa. Poți găsi numărul de telefon, email sau adresa pentru fiecare locație. Pentru întrebări generale despre platformă, ne poți contacta pe noi.',
	},
	{
		question: 'Ce fac dacă am o problemă cu o ofertă?',
		answer: 'În cazul problemelor cu o ofertă, te rugăm să contactezi direct business-ul respectiv. Mideally facilitează conexiunea între clienți și business-uri, dar tranzacțiile directe sunt între tine și business. Pentru probleme tehnice cu platforma, ne poți contacta.',
	},
];

const businessFaqs = [
	{
		question: 'Cum pot înregistra business-ul meu pe Mideally?',
		answer: 'Înregistrarea este simplă! Accesează pagina de înregistrare și completează formularul cu informațiile despre business-ul tău. Echipa noastră va valida informațiile și va activa contul în cel mai scurt timp. Procesul include verificarea datelor și setarea profilului inițial.',
	},
	{
		question: 'Ce tipuri de business-uri pot fi înregistrate?',
		answer: 'Acceptăm business-uri din toate domeniile: cafenele, restaurante, patiserii, magazine, servicii și multe altele. Ne concentrăm pe afacerile mici și mijlocii care oferă produse sau servicii de calitate în comunitățile locale.',
	},
	{
		question: 'Cum pot crea oferte pentru clienții mei?',
		answer: 'După activarea contului, vei avea acces la un dashboard unde poți crea "Momente" (oferte cu durată limitată) și "Drop-uri" (oferte cu cantitate limitată). Poți seta prețurile, condițiile și perioada de valabilitate pentru fiecare ofertă.',
	},
	{
		question: 'Care sunt costurile pentru business-uri?',
		answer: 'Mideally oferă soluții accesibile pentru IMM-uri, fără bugete mari sau agenții. Costurile sunt transparente și adaptate nevoilor business-urilor mici și mijlocii. Contactează-ne pentru detalii specifice despre planurile disponibile.',
	},
	{
		question: 'Cum pot gestiona locațiile multiple?',
		answer: 'Platforma permite gestionarea mai multor locații din același cont. Poți crea oferte specifice pentru fiecare locație sau oferte valabile pentru toate locațiile. Fiecare locație poate avea propriile informații de contact și program de funcționare.',
	},
	{
		question: 'Ce instrumente de marketing oferiți?',
		answer: 'Oferim instrumente de marketing inteligent și eficient: crearea de oferte personalizate, analitici despre performanța ofertelor, gestionarea programului de loialitate și instrumente pentru a-ți crește vizibilitatea locală. Toate acestea fără nevoia de agenții sau bugete mari.',
	},
	{
		question: 'Cum pot urmări performanța ofertelor?',
		answer: 'Dashboard-ul tău oferă analitici detaliate: câte oferte au fost activate, câți clienți noi ai atras, performanța pe locații și multe altele. Aceste date te ajută să optimizezi strategia de marketing și să înțelegi mai bine clienții tăi.',
	},
	{
		question: 'Pot personaliza profilul business-ului meu?',
		answer: 'Da! Poți adăuga imagini, descrieri, program de funcționare, informații de contact și multe altele. Profilul tău este primul contact al clienților cu business-ul tău, așa că îți oferim toate instrumentele necesare pentru a-l face atractiv și informativ.',
	},
	{
		question: 'Cum funcționează sistemul de recenzii?',
		answer: 'Clienții pot lăsa recenzii pentru business-ul tău după utilizarea ofertelor. Aceste recenzii sunt vizibile pe profilul tău și ajută la construirea încrederii cu potențialii clienți. Poți răspunde la recenzii și gestiona feedback-ul primit.',
	},
	{
		question: 'Ce suport oferiți pentru business-uri?',
		answer: 'Echipa noastră este aici să te ajute în fiecare pas. Oferim suport pentru înregistrare, configurarea ofertelor, optimizarea profilului și orice întrebări tehnice. Contactează-ne oricând ai nevoie de asistență.',
	},
];

export default function FAQPage() {
	const [activeSection, setActiveSection] = useState('customers');
	const [openItems, setOpenItems] = useState({});

	const toggleItem = (section, index) => {
		const key = `${section}-${index}`;
		setOpenItems((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	return (
		<>
			<PageHeader
				title="FAQ - Întrebări frecvente"
				subtitle="Găsește răspunsuri la întrebările tale despre Mideally"
				className="text-center"
			/>

			<Section className="pb-16">
				{/* Section Tabs */}
				<div className="flex justify-center mb-12">
					<div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
						<button
							onClick={() => setActiveSection('customers')}
							className={`px-6 py-3 rounded-md font-semibold transition-all cursor-pointer ${
								activeSection === 'customers'
									? 'bg-white text-black shadow-sm'
									: 'text-gray-600 hover:text-black'
							}`}
						>
							Pentru clienți
						</button>
						<button
							onClick={() => setActiveSection('businesses')}
							className={`px-6 py-3 rounded-md font-semibold transition-all cursor-pointer ${
								activeSection === 'businesses'
									? 'bg-white text-black shadow-sm'
									: 'text-gray-600 hover:text-black'
							}`}
						>
							Pentru business-uri
						</button>
					</div>
				</div>

				{/* FAQ Content */}
				<div className="max-w-4xl mx-auto">
					{activeSection === 'customers' && (
						<div className="space-y-4">
							{customerFaqs.map((faq, index) => (
								<div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
									<button
										onClick={() => toggleItem('customers', index)}
										className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
									>
										<h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
										<span
											className={`transform transition-transform ${
												openItems[`customers-${index}`] ? 'rotate-180' : ''
											}`}
										>
											▼
										</span>
									</button>
									{openItems[`customers-${index}`] && (
										<div className="px-6 pb-4">
											<p className="text-gray-700 leading-relaxed">{faq.answer}</p>
										</div>
									)}
								</div>
							))}
						</div>
					)}

					{activeSection === 'businesses' && (
						<div className="space-y-4">
							{businessFaqs.map((faq, index) => (
								<div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
									<button
										onClick={() => toggleItem('businesses', index)}
										className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
									>
										<h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
										<span
											className={`transform transition-transform ${
												openItems[`businesses-${index}`] ? 'rotate-180' : ''
											}`}
										>
											▼
										</span>
									</button>
									{openItems[`businesses-${index}`] && (
										<div className="px-6 pb-4">
											<p className="text-gray-700 leading-relaxed">{faq.answer}</p>
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>

				{/* Call to Action */}
				<div className="text-center mt-16">
					<div className="bg-gray-50 rounded-lg p-8 border border-black">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							{activeSection === 'customers' ? 'Nu ai găsit răspunsul?' : 'Gata să începi?'}
						</h3>
						<p className="text-gray-600 mb-6">
							{activeSection === 'customers'
								? 'Echipa noastră este aici să te ajute cu orice întrebare ai avea.'
								: 'Înscrie-ți business-ul în Mideally și conectează-te la clienții tăi.'}
						</p>
						<div className="flex justify-center gap-4 flex-col sm:flex-row items-center">
							<Button variant="primary" href="/contact">
								Contactează-ne
							</Button>
							{activeSection === 'businesses' && (
								<Button variant="secondary" href="/inregistrare">
									Înregistrează business-ul
								</Button>
							)}
						</div>
					</div>
				</div>
			</Section>
		</>
	);
}
