'use client';

import { useState } from 'react';
import Section from '../../components/layout/Section';
import Button from '../../components/global/Button';
import PageHeader from '@/components/layout/PageHeader';

const roleOptions = ['Administrator', 'Director', 'Manager', 'Proprietar', 'Altul'];

export default function RegisterBusiness() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		cui: '',
		brand_name: '',
		website: '',
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		role: '',
	});
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const senderURL = 'https://api.sender.net/v2/subscribers';
		const senderAPIKey = process.env.NEXT_PUBLIC_SENDER_API_KEY;

		try {
			const data = {
				email: formData.email,
				groups: ['aMNEvG'],
				fields: {
					'{$business_cui}': formData.cui,
					'{$business_website}': formData.website,
					'{$business_main_user_role}': formData.role,
					'{$business_brand_name}': formData.brand_name,
					'{$business_main_user_first_name}': formData.first_name,
					'{$business_main_user_phone_number}': formData.phone,
					'{$business_main_user_last_name}': formData.last_name,
					'{$business_main_user_email}': formData.email,
					'{$type}': 'Business',
				},
				trigger_automation: true,
			};

			const response = await fetch(senderURL, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${senderAPIKey}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				setSuccess(true);
				setFormData({
					cui: '',
					brand_name: '',
					website: '',
					first_name: '',
					last_name: '',
					email: '',
					phone: '',
					role: '',
				});
			} else {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			console.error('Error:', error);
			setSuccess(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<PageHeader
				title="Înregistrează-ți business-ul"
				subtitle="Completează formularul de înregistrare, iar un membru din echipa noastră te va contacta pentru validare."
				className="text-center"
			/>

			<Section className="pb-16">
				<div className="max-w-3xl mx-auto">
					<div className="mt-6 bg-white yellow-shadow">
						<div className={`p-6 lg:p-12 ${success ? 'opacity-50 pointer-events-none' : ''}`}>
							<form onSubmit={handleSubmit} className="space-y-8">
								{/* Business Details Section */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-6">Detalii business</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
										<div className="sm:col-span-2">
											<div className="relative">
												<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
													<svg
														className="w-4 h-4 text-gray-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
														/>
													</svg>
												</div>
												<input
													type="text"
													name="cui"
													id="cui"
													value={formData.cui}
													onChange={handleChange}
													required
													placeholder="CUI"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 p-2.5"
												/>
											</div>
										</div>

										<div className="sm:col-span-2">
											<div className="relative">
												<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
													<svg
														className="w-4 h-4 text-gray-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</div>
												<input
													type="text"
													name="brand_name"
													id="brand_name"
													value={formData.brand_name}
													onChange={handleChange}
													required
													placeholder="Denumire comercială / numele brandului"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 p-2.5"
												/>
											</div>
										</div>

										<div className="sm:col-span-2">
											<div className="relative">
												<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
													<svg
														className="w-4 h-4 text-gray-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
														/>
													</svg>
												</div>
												<input
													type="text"
													name="website"
													id="website"
													value={formData.website}
													onChange={handleChange}
													placeholder="Website (opțional)"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 p-2.5"
												/>
											</div>
										</div>
									</div>
								</div>

								{/* User Details Section */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-6">
										Detalii utilizator principal
									</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
										<div>
											<div className="relative">
												<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
													<svg
														className="w-4 h-4 text-gray-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
														/>
													</svg>
												</div>
												<input
													type="text"
													name="first_name"
													id="first_name"
													value={formData.first_name}
													onChange={handleChange}
													required
													placeholder="Prenume"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 p-2.5"
												/>
											</div>
										</div>

										<div>
											<div className="relative">
												<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
													<svg
														className="w-4 h-4 text-gray-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
														/>
													</svg>
												</div>
												<input
													type="text"
													name="last_name"
													id="last_name"
													value={formData.last_name}
													onChange={handleChange}
													required
													placeholder="Nume"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 p-2.5"
												/>
											</div>
										</div>

										<div>
											<div className="relative">
												<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
													<svg
														className="w-4 h-4 text-gray-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
														/>
													</svg>
												</div>
												<input
													type="email"
													name="email"
													id="email"
													value={formData.email}
													onChange={handleChange}
													required
													placeholder="Email"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 p-2.5"
												/>
											</div>
										</div>

										<div>
											<div className="relative">
												<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
													<svg
														className="w-4 h-4 text-gray-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
														/>
													</svg>
												</div>
												<input
													type="tel"
													name="phone"
													id="phone"
													value={formData.phone}
													onChange={handleChange}
													required
													placeholder="Telefon"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 p-2.5"
												/>
											</div>
										</div>

										<div className="sm:col-span-2">
											<div className="relative">
												<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
													<svg
														className="w-4 h-4 text-gray-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
														/>
													</svg>
												</div>
												<select
													name="role"
													id="role"
													value={formData.role}
													onChange={handleChange}
													required
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 p-2.5"
												>
													<option value="">Selectează rolul în companie</option>
													{roleOptions.map((role) => (
														<option key={role} value={role}>
															{role}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>
								</div>

								<div className="flex justify-end">
									<Button type="submit" disabled={loading} loading={loading}>
										{loading ? 'Se trimite...' : 'Trimite cererea'}
									</Button>
								</div>
							</form>
						</div>
						{success && (
							<div className="p-6 lg:p-12 pt-0 lg:pt-0">
								<p className="text-center text-lg font-semibold text-green-600">
									Cererea a fost trimisă cu succes! Vă vom contacta în curând.
								</p>
							</div>
						)}
					</div>
				</div>
			</Section>
		</>
	);
}
