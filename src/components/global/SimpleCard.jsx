import Image from 'next/image';
import Button from './Button';

export default function SimpleCard({
	image,
	title,
	description,
	link,
	linkText,
	supraTitle,
	linkedin,
	alt = '',
	imageHeight = 'auto',
	className = '',
}) {
	// Check if the image is an external URL
	const isExternalImage = image && (image.startsWith('http') || image.startsWith('//'));

	// Determine if we should have a fixed height or auto (maintain aspect ratio)
	const hasFixedHeight = imageHeight !== 'auto';

	return (
		<div className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow ${className}`}>
			<div className="py-5">
				{supraTitle && <p className="text-sm text-gray-500 px-5">{supraTitle}</p>}
				<h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 px-5 flex items-center justify-between">
					{title}{' '}
					{linkedin && (
						<a
							href={linkedin}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`LinkedIn profile for ${title}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="text-[#0e76a8] hover:text-[#0e76a8]/80"
								viewBox="0 0 16 16"
							>
								<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
							</svg>
						</a>
					)}
				</h3>

				{image && (
					<div className={`relative w-full ${hasFixedHeight ? `h-${imageHeight}` : ''} overflow-hidden`}>
						{isExternalImage ? (
							// For external images, use img tag
							<img
								src={image}
								alt={alt || `Image for ${title}`}
								className={`w-full ${hasFixedHeight ? 'h-full object-cover' : ''}`}
							/>
						) : hasFixedHeight ? (
							// For fixed height local images, use Next.js Image with fill
							<Image
								src={image}
								alt={alt || `Image for ${title}`}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover"
							/>
						) : (
							// For auto height local images, use Next.js Image with width/height auto
							<Image
								src={image}
								alt={alt || `Image for ${title}`}
								width={0}
								height={0}
								sizes="100vw"
								className="w-full h-auto"
								style={{ width: '100%', height: 'auto' }}
							/>
						)}
					</div>
				)}

				<div className="font-normal text-gray-700 px-5 mt-5">{description}</div>

				{link && (
					<div className="px-5 mt-5">
						<Button
							href={link}
							color="pink"
							size="small"
							aria-label={linkText || `Learn more about ${title}`}
						>
							{linkText || 'Learn More'}
							<svg
								className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 5h12m0 0L9 1m4 4L9 9"
								/>
							</svg>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
