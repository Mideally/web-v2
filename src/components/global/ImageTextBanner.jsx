export default function ImageTextBanner({ imageSrc, altText, description, version = 'default' }) {
	if (version === '2.0') {
		return (
			<div className="w-full h-42 rounded-xl overflow-hidden border border-black mb-8 relative">
				<img src={imageSrc} alt={altText} className="w-full h-full object-cover object-center" />
				<h2 className="absolute top-1/2 left-2.5 right-2.5 -translate-y-1/2 text-center text-[#dbff79] text-[3.2rem] md:text-[4.2rem] uppercase font-[900]" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 4px 4px 0 #000' }}>
					{description}
				</h2>
			</div>
		);
	}

	return (
		<div className="w-full rounded-xl overflow-hidden border border-black mb-8 relative">
			<img src={imageSrc} alt={altText} className="w-full h-64 md:h-128 object-cover object-center" />
			<div className="absolute inset-0 bg-black/40"></div>
			<p className="absolute bottom-0 left-0 text-center bg-white p-6">
				{description}
			</p>
		</div>
	);
}
