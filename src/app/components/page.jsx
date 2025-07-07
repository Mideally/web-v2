import Button from '@/components/global/Button';
import SimpleCard from '@/components/global/SimpleCard';
import Link from 'next/link';

export default function ComponentsPage() {
	// Sample local image paths (for demonstration)
	// In a real project, you would have actual images in the public folder
	const localImagePath = '/assets/images/mv-1.jpg';

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-3xl font-bold mb-8">Component Examples</h1>

			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-4">Button Component</h2>

				<div className="space-y-12">
					<div>
						<h3 className="text-xl font-medium mb-4">Standard Buttons</h3>
						<div className="flex flex-col gap-4 md:flex-row md:items-center mb-8">
							<Button>Default Button</Button>
							<Button color="pink">Pink Button</Button>
							<Button size="small">Small Button</Button>
							<Button loading>Loading Button</Button>
							<Button disabled>Disabled Button</Button>
						</div>
					</div>

					<div>
						<h3 className="text-xl font-medium mb-4">Link Buttons</h3>
						<div className="flex flex-col gap-4 md:flex-row md:items-center">
							<Button href="/about">Internal Link</Button>
							<Button href="/contact" color="pink" size="small">
								Small Pink Link
							</Button>
							<Button href="https://example.com">External Link</Button>
						</div>
					</div>

					<div>
						<h3 className="text-xl font-medium mb-4">Custom Tag Buttons</h3>
						<div className="flex flex-col gap-4 md:flex-row md:items-center">
							{/* Example with Next.js Link */}
							<Button>
								<Link href="/dashboard">NextJS Link inside Button</Link>
							</Button>

							{/* Example with anchor tag */}
							<Button>
								<a href="https://example.com" target="_blank" rel="noopener noreferrer">
									Anchor tag inside Button
								</a>
							</Button>

							{/* Example with loading state */}
							<Button loading color="pink">
								<a href="https://example.com" target="_blank" rel="noopener noreferrer">
									Loading External Link
								</a>
							</Button>
						</div>
					</div>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-4">SimpleCard Component</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* Card with internal link */}
					<SimpleCard
						title="Service Example"
						description="This is an example card with an internal link that uses the Button component inside."
						image="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
						alt="A laptop on a desk with a coffee cup"
						link="/services"
						linkText="Learn More"
					/>

					{/* Card with LinkedIn */}
					<SimpleCard
						title="Team Member"
						supraTitle="Founder & CEO"
						description="This card example has a LinkedIn profile link in the top right corner."
						image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
						alt="Professional woman smiling"
						linkedin="https://linkedin.com/in/example"
					/>

					{/* Card demonstrating local image usage */}
					<SimpleCard
						title="Local Image Example"
						description="This example demonstrates using a local image with Next.js Image optimization."
						image={localImagePath}
						alt="Sample local image"
						link="/local-image-example"
						linkText="View Details"
					/>
				</div>

				<div className="mt-8 bg-yellow-50 p-4 rounded-md border border-yellow-200">
					<p className="text-yellow-800 text-sm">
						<strong>Note:</strong> For the local image example to work properly, ensure you have the image
						file at <code>/public/images/sample.jpg</code> in your project. If this file doesn't exist,
						you'll see an error in development mode.
					</p>
				</div>
			</section>
		</div>
	);
}
