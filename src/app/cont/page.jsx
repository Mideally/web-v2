'use client';

import { useState } from 'react';
import Button from '@/components/global/Button';

export default function ContPage() {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		// Simulate API call
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// TODO: Replace with real API call
			setSuccess(true);
		} catch (err) {
			setError('A apărut o eroare. Încearcă din nou.');
		}

		setLoading(false);
	};

	return (
		<div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Accesează-ți contul</h2>
				<p className="mt-2 text-center text-sm text-gray-600">Primești un link de autentificare pe email.</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
				<div className="bg-white p-6 yellow-shadow">
					{success ? (
						<div className="text-center text-green-600 font-medium">
							Verifică-ți emailul pentru linkul de autentificare!
						</div>
					) : (
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700">
									Adresă email
								</label>
								<div className="mt-1">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
										placeholder="Introdu adresa de email"
									/>
								</div>
							</div>

							{error && <div className="text-red-600 text-sm">{error}</div>}

							<div>
								<Button type="submit" loading={loading} disabled={loading} className="w-full">
									Primește link de autentificare
								</Button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
