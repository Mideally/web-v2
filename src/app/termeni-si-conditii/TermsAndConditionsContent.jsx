'use client';

import PageHeader from '@/components/layout/PageHeader';
import Section from '@/components/layout/Section';

export default function TermsAndConditionsContent() {
	return (
		<>
			<PageHeader
				title="Termeni și Condiții"
				subtitle="Condițiile de utilizare a platformei Mideally"
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
							Acești Termeni și Condiții ("Termenii") guvernează utilizarea platformei Mideally
							("Platforma", "Serviciul", "noi", "nostru") furnizată de Mideally. Prin accesarea și
							utilizarea Platformei, accepti să te conformezi acestor Termeni.
						</p>
					</div>

					{/* Definiții */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definiții</h2>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>
								<strong>"Platforma"</strong> - website-ul și aplicația Mideally
							</li>
							<li>
								<strong>"Utilizator"</strong> - orice persoană care accesează sau utilizează Platforma
							</li>
							<li>
								<strong>"Client"</strong> - utilizator care caută oferte și servicii de la business-uri
							</li>
							<li>
								<strong>"Business"</strong> - companie înregistrată pe Platformă care oferă servicii
							</li>
							<li>
								<strong>"Ofertă"</strong> - promoție, reducere sau serviciu oferit de un Business
							</li>
							<li>
								<strong>"Moment"</strong> - ofertă cu durată limitată
							</li>
							<li>
								<strong>"Drop"</strong> - ofertă cu cantitate limitată
							</li>
							<li>
								<strong>"Impuls"</strong> - tip special de ofertă
							</li>
						</ul>
					</div>

					{/* Acceptarea termenilor */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">3. Acceptarea Termenilor</h2>
						<p className="text-gray-700 leading-relaxed mb-4">Prin utilizarea Platformei, confirmi că:</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Ai citit și înțeles acești Termeni</li>
							<li>Ai capacitatea legală de a accepta acești Termeni</li>
							<li>Vei respecta toate condițiile și restricțiile stabilite</li>
							<li>Vei utiliza Platforma doar în scopuri legale și permise</li>
						</ul>
					</div>

					{/* Descrierea serviciului */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">4. Descrierea Serviciului</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Mideally este o platformă care conectează clienții cu business-uri locale, oferind:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Acces la oferte exclusive de la business-uri partenere</li>
							<li>Informații despre business-uri locale și serviciile lor</li>
							<li>Posibilitatea de a descoperi noi locații și experiențe</li>
							<li>Instrumente pentru business-uri de a-și promova serviciile</li>
							<li>Funcționalități de căutare și filtrare</li>
						</ul>
					</div>

					{/* Înregistrarea și contul */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">5. Înregistrarea și Contul</h2>

						<h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Pentru Clienți</h3>
						<p className="text-gray-700 leading-relaxed mb-4">
							Pentru a accesa anumite funcționalități, poți fi nevoit să creezi un cont. Ești responsabil
							pentru:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
							<li>Furnizarea informațiilor corecte și complete</li>
							<li>Păstrarea confidențialității datelor de acces</li>
							<li>Toate activitățile care au loc în contul tău</li>
							<li>Notificarea imediată a oricărei utilizări neautorizate</li>
						</ul>

						<h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Pentru Business-uri</h3>
						<p className="text-gray-700 leading-relaxed mb-4">
							Înregistrarea business-ului pe Platformă implică:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Validarea informațiilor furnizate de echipa noastră</li>
							<li>Acceptarea termenilor specifici pentru business-uri</li>
							<li>Respectarea politicilor de calitate și servicii</li>
							<li>Actualizarea regulată a informațiilor și ofertelor</li>
						</ul>
					</div>

					{/* Utilizarea acceptabilă */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">6. Utilizarea Acceptabilă</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Te angajezi să nu utilizezi Platforma pentru:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Activități ilegale sau care încalcă drepturile altora</li>
							<li>Transmiterea de conținut dăunător, abuziv sau obscen</li>
							<li>Încercarea de a accesa neautorizat sistemele noastre</li>
							<li>Interferarea cu funcționarea Platformei</li>
							<li>Colectarea informațiilor despre alți utilizatori fără consimțământ</li>
							<li>Utilizarea bot-urilor sau scripturilor automate fără autorizare</li>
							<li>Spam-ul sau distribuția de conținut nedorit</li>
						</ul>
					</div>

					{/* Conținutul utilizatorilor */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">7. Conținutul Utilizatorilor</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Pentru orice conținut pe care îl trimiți prin Platformă:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Garantezi că ai drepturile necesare pentru a-l distribui</li>
							<li>Ne acorzi o licență non-exclusivă de a-l utiliza pe Platformă</li>
							<li>Ești responsabil pentru acuratețea și legalitatea conținutului</li>
							<li>Accepti că putem modifica sau șterge conținutul care încalcă acești Termeni</li>
						</ul>
					</div>

					{/* Proprietatea intelectuală */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">8. Proprietatea Intelectuală</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Platforma și conținutul său sunt protejate de drepturile de proprietate intelectuală:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Mideally deține drepturile asupra Platformei și mărcii comerciale</li>
							<li>Nu poți copia, modifica sau distribui conținutul fără autorizare</li>
							<li>Business-urile își păstrează drepturile asupra propriului conținut</li>
							<li>Utilizarea Platformei nu îți conferă drepturi de proprietate asupra acesteia</li>
						</ul>
					</div>

					{/* Oferte și tranzacții */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">9. Oferte și Tranzacții</h2>

						<h3 className="text-xl font-semibold text-gray-800 mb-3">9.1 Oferte</h3>
						<ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
							<li>Ofertele sunt furnizate de business-urile partenere</li>
							<li>Mideally nu garantează disponibilitatea sau calitatea ofertelor</li>
							<li>Condițiile specifice ale fiecărei oferte sunt stabilite de business</li>
							<li>Ofertele pot fi modificate sau retrase fără notificare prealabilă</li>
						</ul>

						<h3 className="text-xl font-semibold text-gray-800 mb-3">9.2 Tranzacții</h3>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Tranzacțiile directe sunt între client și business</li>
							<li>Mideally nu este parte la tranzacții și nu garantează serviciile</li>
							<li>Disputele trebuie rezolvate direct cu business-ul respectiv</li>
							<li>Nu suntem responsabili pentru serviciile furnizate de business-uri</li>
						</ul>
					</div>

					{/* Limitarea responsabilității */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitarea Responsabilității</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							În măsura permisă de lege, Mideally nu va fi responsabil pentru:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Daunele indirecte, incidentale sau consecvente</li>
							<li>Pierderile de date sau întreruperile de serviciu</li>
							<li>Acțiunile sau omisiunile business-urilor partenere</li>
							<li>Daunele cauzate de utilizarea necorespunzătoare a Platformei</li>
							<li>Conținutul generat de utilizatori sau business-uri</li>
						</ul>
					</div>

					{/* Indemnizare */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnizare</h2>
						<p className="text-gray-700 leading-relaxed">
							Te angajezi să ne indemni și să ne exonerezi de orice daune, costuri sau cheltuieli
							rezultate din încălcarea acestor Termeni sau din utilizarea necorespunzătoare a Platformei.
						</p>
					</div>

					{/* Rezilierea */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">12. Rezilierea</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Putem rezilia sau suspenda accesul tău la Platformă în următoarele cazuri:
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Încălcarea acestor Termeni</li>
							<li>Utilizarea frauduloasă sau abuzivă</li>
							<li>Cererea ta de închidere a contului</li>
							<li>Închiderea Platformei (cu notificare prealabilă)</li>
						</ul>
					</div>

					{/* Legea aplicabilă */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">13. Legea Aplicabilă</h2>
						<p className="text-gray-700 leading-relaxed">
							Acești Termeni sunt guvernați de legislația română. Orice dispută va fi rezolvată de
							instanțele competente din România.
						</p>
					</div>

					{/* Modificări */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">14. Modificări ale Termenilor</h2>
						<p className="text-gray-700 leading-relaxed">
							Ne rezervăm dreptul de a modifica acești Termeni în orice moment. Modificările vor fi
							comunicate prin Platformă sau email. Continuarea utilizării după modificări reprezintă
							acceptarea noilor Termeni.
						</p>
					</div>

					{/* Dispoziții finale */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">15. Dispoziții Finale</h2>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Dacă o dispoziție este invalidă, restul Termenilor rămân valabili</li>
							<li>Acestea reprezintă întregul acord între părți</li>
							<li>Renunțarea la o încălcare nu constituie renunțare la viitoare încălcări</li>
							<li>Termenii sunt independenți și separabili</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							Pentru întrebări despre acești Termeni și Condiții, ne poți contacta la:
						</p>
						<div className="bg-gray-50 p-4 rounded-lg">
							<p className="text-gray-700">
								<strong>Email:</strong> legal@mideally.com
								<br />
								<strong>Adresă:</strong> [Adresa companiei]
								<br />
								<strong>Telefon:</strong> [Numărul de telefon]
							</p>
						</div>
					</div>
				</div>
			</Section>
		</>
	);
}
