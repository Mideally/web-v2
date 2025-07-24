export default function SectionHeader({ title, subtitle, className }) {
	return (
		<div className={`pb-8 lg:pb-16 lg:pt-16 ${className}`}>
			<div className="bg-gradient-to-r from-pink-600 to-indigo-600 rounded-lg py-12 text-white text-center flex flex-col gap-5 shadow-lg border border-gray-200 px-8 lg:px-12">
				<h1 className="text-4xl font-bold">{title}</h1>
				<p className="md:text-lg font-light max-w-6xl mx-auto">{subtitle}</p>
			</div>
		</div>
	);
}
