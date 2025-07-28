'use client';

import PageHeader from '@/components/layout/PageHeader';
import Section from '@/components/layout/Section';

export default function PrivacyPolicyContent() {
	return (
		<>
			<PageHeader
				title="Politica de Confidențialitate"
				subtitle="Informații despre modul în care colectăm, utilizăm și protejăm datele tale personale"
				className="text-center"
			/>

			<Section>
				<div className="bg-white yellow-shadow p-8 lg:p-12 space-y-8">
					{/* Ultima actualizare */}
					<div className="text-sm text-gray-600 border-b border-gray-200 pb-4">
						<strong>Ultima actualizare:</strong> {new Date().toLocaleDateString('ro-RO')}
					</div>

					{/* Introducere */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introducere</h2>
						<p className="text-gray-700 leading-relaxed">
							Mideally ("noi", "nostru", "platforma") se angajează să protejeze confidențialitatea și
							securitatea datelor tale personale. Această Politică de Confidențialitate explică modul în
							care colectăm, utilizăm, stocăm și protejăm informațiile tale când utilizezi platforma
							noastră de conectare între clienți și business-uri locale.
						</p>
					</div>

					{/* Informații colectate */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">2. Informații pe care le colectăm</h2>

						<h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Informații furnizate de tine</h3>
						<ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
							<li>
								<strong>Informații de contact:</strong> nume, prenume, adresă de email, număr de telefon
							</li>
							<li>
								<strong>Informații de business:</strong> CUI, denumire comercială, website, rol în
								companie (pentru înregistrarea business-urilor)
							</li>
							<li>
								<strong>Informații de cont:</strong> date de autentificare și preferințe
							</li>
							<li>
								<strong>Comunicări:</strong> mesaje și feedback trimis prin platformă
							</li>
						</ul>

						<h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Informații colectate automat</h3>
						<ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
							<li>
								<strong>Date tehnice:</strong> adresa IP, tipul browserului, sistemul de operare, timpul
								de acces
							</li>
							<li>
								<strong>Date de utilizare:</strong> paginile vizitate, timpul petrecut pe site,
								interacțiunile cu conținutul
							</li>
							<li>
								<strong>Cookies și tehnologii similare:</strong> pentru îmbunătățirea experienței și
								analiză
							</li>
							<li>
								<strong>Date de localizare:</strong> pentru afișarea business-urilor din apropierea ta
							</li>
						</ul>

						<h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Informații de la terți</h3>
						<p className="text-gray-700 leading-relaxed">
							Putem primi informații despre tine de la partenerii noștri de business, servicii de analiză
							și alte surse autorizate pentru a îmbunătăți serviciile noastre.
						</p>
					</div>

					{/* Utilizarea informațiilor */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cum utilizăm informațiile tale</h2>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>
								Pentru a furniza și îmbunătăți serviciile noastre de conectare între clienți și
								business-uri
							</li>
							<li>Pentru a procesa înregistrările de business și a valida informațiile</li>
							<li>Pentru a personaliza experiența ta și a recomanda oferte relevante</li>
							<li>Pentru a comunica cu tine despre servicii, actualizări și oferte</li>
							<li>Pentru a analiza utilizarea platformei și a îmbunătăți performanța</li>
							<li>Pentru a respecta obligațiile legale și a preveni activitățile frauduloase</li>
							<li>Pentru a gestiona relațiile cu business-urile partenere</li>
						</ul>
					</div>

					{/* Partajarea informațiilor */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">4. Partajarea informațiilor</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Nu vindem, închiriem sau partajăm datele tale personale cu terți în scopuri comerciale, cu
							excepția cazurilor descrise mai jos:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>
								<strong>Business-uri partenere:</strong> Informații limitate necesare pentru procesarea
								ofertelor și tranzacțiilor
							</li>
							<li>
								<strong>Furnizori de servicii:</strong> Pentru funcționarea platformei (hosting,
								analiză, email)
							</li>
							<li>
								<strong>Obligații legale:</strong> Când este necesar pentru a respecta legea sau a
								proteja drepturile noastre
							</li>
							<li>
								<strong>Consimțământul tău:</strong> Când ne dai permisiunea explicită
							</li>
						</ul>
					</div>

					{/* Securitatea datelor */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">5. Securitatea datelor</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Implementăm măsuri de securitate tehnice și organizatorice pentru a proteja datele tale:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Criptarea datelor în tranzit și la repaus</li>
							<li>Acces limitat la datele personale doar pentru personalul autorizat</li>
							<li>Monitorizarea continuă a sistemelor pentru detectarea amenințărilor</li>
							<li>Backup-uri regulate și proceduri de recuperare</li>
							<li>Actualizări regulate ale sistemelor de securitate</li>
						</ul>
					</div>

					{/* Drepturile tale */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">6. Drepturile tale</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Conform GDPR, ai următoarele drepturi în ceea ce privește datele tale personale:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>
								<strong>Dreptul de acces:</strong> Să știi ce date avem despre tine
							</li>
							<li>
								<strong>Dreptul de rectificare:</strong> Să corectezi datele inexacte
							</li>
							<li>
								<strong>Dreptul la ștergere:</strong> Să ștergi datele tale ("dreptul de a fi uitat")
							</li>
							<li>
								<strong>Dreptul la restricționare:</strong> Să limitezi procesarea datelor
							</li>
							<li>
								<strong>Dreptul la portabilitate:</strong> Să primești datele într-un format structurat
							</li>
							<li>
								<strong>Dreptul de opoziție:</strong> Să te opui procesării pentru marketing
							</li>
							<li>
								<strong>Dreptul de retragere a consimțământului:</strong> Să retragi consimțământul dat
							</li>
						</ul>
					</div>

					{/* Cookies */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies și tehnologii similare</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Utilizăm cookies și tehnologii similare pentru:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
							<li>Funcționalitatea esențială a platformei</li>
							<li>Îmbunătățirea experienței utilizatorului</li>
							<li>Analiza traficului și performanței</li>
							<li>Personalizarea conținutului și reclamelor</li>
						</ul>
						<p className="text-gray-700 leading-relaxed">
							Poți gestiona preferințele pentru cookies prin setările browserului tău.
						</p>
					</div>

					{/* Retenția datelor */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">8. Retenția datelor</h2>
						<p className="text-gray-700 leading-relaxed">
							Păstrăm datele tale personale doar atât timp cât este necesar pentru a îndeplini scopurile
							descrise în această politică sau pentru a respecta obligațiile legale. Datele sunt șterse în
							mod sigur când nu mai sunt necesare.
						</p>
					</div>

					{/* Transferuri internaționale */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">9. Transferuri internaționale</h2>
						<p className="text-gray-700 leading-relaxed">
							Datele tale pot fi transferate și procesate în țări din afara UE/SEE. În astfel de cazuri,
							ne asigurăm că există măsuri de protecție adecvate și că transferurile respectă legislația
							aplicabilă.
						</p>
					</div>

					{/* Copiii */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">10. Protecția copiilor</h2>
						<p className="text-gray-700 leading-relaxed">
							Serviciile noastre nu sunt destinate copiilor sub 16 ani. Nu colectăm în mod intenționat
							informații personale de la copii. Dacă descoperim că am colectat date de la un copil, le vom
							șterge imediat.
						</p>
					</div>

					{/* Modificări */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modificări ale politicii</h2>
						<p className="text-gray-700 leading-relaxed">
							Ne rezervăm dreptul de a actualiza această politică periodic. Vom notifica utilizatorii
							despre modificările semnificative prin email sau prin anunțuri pe platformă. Continuarea
							utilizării serviciilor după modificări reprezintă acceptarea noii politici.
						</p>
					</div>

					{/* Contact */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Pentru întrebări sau solicitări legate de această politică de confidențialitate, te rugăm să
							ne contactezi:
						</p>
						<div className="bg-gray-50 p-4 rounded-lg">
							<p className="text-gray-700">
								<strong>Email:</strong> privacy@mideally.com
								<br />
								<strong>Adresă:</strong> [Adresa companiei]
								<br />
								<strong>Telefon:</strong> [Numărul de telefon]
								<br />
								<strong>Responsabil cu protecția datelor:</strong> [Nume și contact]
							</p>
						</div>
					</div>

					{/* Autoritatea de supraveghere */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">13. Autoritatea de supraveghere</h2>
						<p className="text-gray-700 leading-relaxed">
							Ai dreptul să depui o plângere la Autoritatea Națională de Supraveghere a Prelucrării
							Datelor cu Caracter Personal (ANSPDCP) dacă consideri că prelucrarea datelor tale personale
							încalcă legislația aplicabilă.
						</p>
					</div>
				</div>
			</Section>
		</>
	);
}
