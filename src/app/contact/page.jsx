'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import PageHeader from '@/components/layout/PageHeader';
import Section from '@/components/layout/Section';
import Button from '@/components/global/Button';

export default function ContactPage() {
	const [isSending, setIsSending] = useState(false);
	const [isSent, setIsSent] = useState(false);
	const [error, setError] = useState('');
	const [selectedSubject, setSelectedSubject] = useState('');
	const form = useRef();

	const onSubmit = (e) => {
		e.preventDefault();
		setIsSending(true);
		setError('');
		setIsSent(false);

		emailjs
			.sendForm(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
				form.current,
				process.env.NEXT_PUBLIC_EMAILJS_KEY
			)
			.then(
				(result) => {
					console.log('SUCCESS!', result.text);
					setIsSent(true);
					form.current.reset();
					setSelectedSubject('');
				},
				(error) => {
					console.log('FAILED...', error.text);
					setError(error.text || 'A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou.');
				}
			)
			.finally(() => {
				setIsSending(false);
			});
	};

	const showBusinessFields = selectedSubject === 'Înregistrare business' || selectedSubject === 'Parteneriat';

	return (
		<>
			<PageHeader
				title="Contact"
				subtitle="Suntem aici să te ajutăm. Trimite-ne un mesaj și îți vom răspunde în cel mai scurt timp."
				className="text-center"
			/>

			<Section className="pb-16">
				<div className="max-w-2xl mx-auto">
					<div className="bg-white yellow-shadow p-8">
						{isSent ? (
							<div className="text-center">
								<div className="mb-4">
									<svg
										className="mx-auto h-12 w-12 text-green-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Mesajul tău a fost trimis cu succes!
								</h3>
								<p className="text-gray-600 mb-6">
									Îți mulțumim pentru mesaj. Îți vom răspunde în cel mai scurt timp posibil.
								</p>
								<Button onClick={() => setIsSent(false)} variant="primary">
									Trimite alt mesaj
								</Button>
							</div>
						) : (
							<form ref={form} onSubmit={onSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
											Nume complet *
										</label>
										<input
											type="text"
											name="name"
											id="name"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
											placeholder="Introdu numele tău"
										/>
									</div>
									<div>
										<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
											Email *
										</label>
										<input
											type="email"
											name="email"
											id="email"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
											placeholder="introdu@emailul.tau"
										/>
									</div>
								</div>

								<div>
									<label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
										Subiect *
									</label>
									<select
										name="subject"
										id="subject"
										required
										value={selectedSubject}
										onChange={(e) => setSelectedSubject(e.target.value)}
										className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
									>
										<option value="">Selectează un subiect</option>
										<option value="Întrebare generală">Întrebare generală</option>
										<option value="Suport tehnic">Suport tehnic</option>
										<option value="Înregistrare business">Înregistrare business</option>
										<option value="Parteneriat">Parteneriat</option>
										<option value="Feedback">Feedback</option>
										<option value="Altul">Altul</option>
									</select>
								</div>

								{showBusinessFields && (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label
												htmlFor="phone"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Telefon *
											</label>
											<input
												type="tel"
												name="phone"
												id="phone"
												required
												className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
												placeholder="Numărul tău de telefon"
											/>
										</div>
										<div>
											<label
												htmlFor="company"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Companie *
											</label>
											<input
												type="text"
												name="company"
												id="company"
												required
												className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
												placeholder="Numele companiei"
												autoComplete="organization"
											/>
										</div>
									</div>
								)}

								<div>
									<label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
										Mesaj *
									</label>
									<textarea
										name="message"
										id="message"
										rows={6}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none"
										placeholder="Scrie mesajul tău aici..."
									></textarea>
								</div>

								{error && (
									<div className="bg-red-50 border border-red-200 rounded-md p-4">
										<p className="text-red-700 text-sm">{error}</p>
									</div>
								)}

								<div className="flex justify-center">
									<Button
										type="submit"
										variant="primary"
										loading={isSending}
										disabled={isSending}
										className="min-w-[200px]"
									>
										{isSending ? 'Se trimite...' : 'Trimite mesajul'}
									</Button>
								</div>
							</form>
						)}
					</div>
				</div>
			</Section>
		</>
	);
}
