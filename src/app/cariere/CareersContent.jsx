'use client';

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Section from '@/components/layout/Section';
import Button from '@/components/global/Button';
import rolesData from '@/data/careers.json';

export default function CareersContent() {
	const [selectedRole, setSelectedRole] = useState(null);

	const openRole = (role) => {
		setSelectedRole(role);
		document.body.style.overflow = 'hidden';
	};

	const closeRole = () => {
		setSelectedRole(null);
		document.body.style.overflow = '';
	};

	// Close modal on Escape key
	if (typeof window !== 'undefined') {
		window.onkeydown = (e) => {
			if (e.key === 'Escape') closeRole();
		};
	}

	return (
		<>
			<PageHeader
				title="Cariere"
				subtitle="Alătură-te echipei Mideally și ajută-ne să construim viitorul business-urilor locale."
				className="text-center"
			/>

			<Section className="pb-16">
				<h2 className="text-2xl font-bold mb-6 text-gray-900">Roluri disponibile</h2>
				{rolesData.roles.length === 0 && (
					<p className="text-gray-600">Momentan nu există roluri disponibile.</p>
				)}
				<ul className="space-y-6">
					{rolesData.roles.map((role) => (
						<li
							key={role.id}
							className="yellow-shadow p-6 cursor-pointer bg-white"
							onClick={() => openRole(role)}
						>
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
								<div>
									<h3 className="text-xl font-semibold text-pink-600">{role.title}</h3>
									<p className="text-gray-700">{role.shortDescription}</p>
								</div>
								<div className="flex flex-col md:items-end gap-1">
									<span className="text-sm text-gray-500">{role.location}</span>
									<span className="text-sm text-gray-500">{role.type}</span>
									<span className="text-sm text-gray-500">{role.remote}</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			</Section>

			{/* Side Modal */}
			{selectedRole && (
				<>
					<div
						className="fixed inset-0 bg-black/40 z-50 transition-opacity"
						onClick={closeRole}
						aria-label="Închide detalii rol"
					/>
					<aside
						className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50 shadow-2xl overflow-y-auto transition-transform duration-300"
						style={{ transform: selectedRole ? 'translateX(0)' : 'translateX(100%)' }}
						tabIndex={-1}
						aria-modal="true"
						role="dialog"
					>
						<div className="flex flex-col h-full">
							<div className="flex items-center justify-between p-6 border-b border-gray-100">
								<h2 className="text-2xl font-bold text-pink-600">{selectedRole.title}</h2>
								<button
									onClick={closeRole}
									className="text-gray-400 hover:text-pink-600 text-2xl font-bold focus:outline-none"
									aria-label="Închide"
								>
									&times;
								</button>
							</div>
							<div className="p-6 flex-1 overflow-y-auto">
								<p className="text-gray-700 mb-2">{selectedRole.fullDescription}</p>
								<div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
									{selectedRole.location && <span>📍 {selectedRole.location}</span>}
									{selectedRole.type && <span>⏰ {selectedRole.type}</span>}
									{selectedRole.remote && <span>🌐 {selectedRole.remote}</span>}
									{selectedRole.salary && <span>💸 {selectedRole.salary}</span>}
									{selectedRole.experience && <span>🎯 {selectedRole.experience}</span>}
								</div>
								{selectedRole.responsibilities?.length > 0 && (
									<div className="mb-4">
										<h3 className="font-semibold text-gray-900 mb-1">Responsabilități</h3>
										<ul className="list-disc list-inside text-gray-700 space-y-1">
											{selectedRole.responsibilities.map((item, i) => (
												<li key={i}>{item}</li>
											))}
										</ul>
									</div>
								)}
								{selectedRole.requirements?.length > 0 && (
									<div className="mb-4">
										<h3 className="font-semibold text-gray-900 mb-1">Cerințe</h3>
										<ul className="list-disc list-inside text-gray-700 space-y-1">
											{selectedRole.requirements.map((item, i) => (
												<li key={i}>{item}</li>
											))}
										</ul>
									</div>
								)}
								{selectedRole.niceToHave?.length > 0 && (
									<div className="mb-4">
										<h3 className="font-semibold text-gray-900 mb-1">Constituie un avantaj</h3>
										<ul className="list-disc list-inside text-gray-700 space-y-1">
											{selectedRole.niceToHave.map((item, i) => (
												<li key={i}>{item}</li>
											))}
										</ul>
									</div>
								)}
								{selectedRole.benefits?.length > 0 && (
									<div className="mb-4">
										<h3 className="font-semibold text-gray-900 mb-1">Beneficii</h3>
										<ul className="list-disc list-inside text-gray-700 space-y-1">
											{selectedRole.benefits.map((item, i) => (
												<li key={i}>{item}</li>
											))}
										</ul>
									</div>
								)}
								{selectedRole.applicationProcess?.length > 0 && (
									<div className="mb-4">
										<h3 className="font-semibold text-gray-900 mb-1">Proces de aplicare</h3>
										<ol className="list-decimal list-inside text-gray-700 space-y-1">
											{selectedRole.applicationProcess.map((item, i) => (
												<li key={i}>{item}</li>
											))}
										</ol>
									</div>
								)}
							</div>
							<div className="p-6 border-t border-gray-100 flex flex-col gap-2">
								<Button
									as="a"
									href={`mailto:contact@mideally.com?subject=Aplicare%20${encodeURIComponent(
										selectedRole.title
									)}`}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full"
								>
									Aplică acum
								</Button>
								<Button variant="secondary" onClick={closeRole} className="w-full">
									Închide
								</Button>
							</div>
						</div>
					</aside>
				</>
			)}
		</>
	);
}
