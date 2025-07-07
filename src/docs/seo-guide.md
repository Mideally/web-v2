# SEO in Next.js vs React Helmet

## Overview

In our migration from a React SPA to Next.js, we've changed how SEO is handled. This document outlines the differences between the approaches and explains how to implement SEO in the new Next.js application.

## Old Approach: React Helmet

In our previous React application, we used `react-helmet-async` to manage SEO:

```jsx
// Old approach with React Helmet
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url }) {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			{/* Other meta tags */}
		</Helmet>
	);
}

// Usage in a page component
<SEO title="About Us" description="Learn about our team" />;
```

This approach injected meta tags into the `<head>` of the document at runtime.

## New Approach: Next.js Metadata API

Next.js 13+ provides a built-in Metadata API that handles SEO in a more efficient way, integrated with the app router and server components.

### Key Differences

1. **Static vs. Runtime**: Next.js can generate metadata during build time for static pages, improving performance.
2. **Server Components**: Metadata is often defined in server components, not client components.
3. **File Conventions**: Next.js allows metadata to be defined directly in page files or in a separate `layout.js` file.
4. **Stronger Typing**: The Next.js metadata API has stronger typing and validation.

### Project Structure

Our SEO and script utilities are organized in the following way:

```
src/
├── utils/
│   ├── index.js          # Exports metadata utilities
│   └── metadata.js       # Contains metadata generation functions
└── components/
    └── global/
        └── HeadScripts.jsx   # Client-side scripts (analytics, etc.)
```

### How to Use

There are several ways to implement metadata in Next.js:

#### 1. Using the `layout.js` file for app-wide defaults:

```jsx
// src/app/layout.js
export const metadata = {
	title: {
		template: '%s | Mideally',
		default: 'Mideally - Conectăm clienții cu business-urile',
	},
	description: 'Default description...',
};
```

#### 2. Using page-specific metadata:

```jsx
// src/app/about/page.js
export const metadata = {
	title: 'About Us',
	description: 'Learn about our team...',
};
```

#### 3. Using our utility function:

```jsx
// src/app/contact/page.js
import { generateMetadata } from '@/utils';

export const metadata = generateMetadata({
	title: 'Contact Us',
	description: 'Get in touch with our team',
});
```

### Dynamic Metadata

For dynamic routes or data-dependent metadata, use the `createDynamicMetadata` helper:

```jsx
// src/app/products/[id]/page.js
import { createDynamicMetadata } from '@/utils';

// Create a function to fetch product data
async function fetchProductData(params) {
	const product = await fetchProduct(params.id);
	return {
		title: product.name,
		description: product.description,
		image: product.imageUrl, // Optional
	};
}

// Generate metadata for this dynamic route
export const generateMetadata = createDynamicMetadata(fetchProductData);

export default function ProductPage({ params }) {
	// Component implementation
}
```

## Client-Side Scripts

For client-side scripts (analytics, etc.), we use the `HeadScripts` component in the root layout:

```jsx
// src/app/layout.js
import HeadScripts from '@/components/global/HeadScripts';

export default function RootLayout({ children }) {
	return (
		<html lang="ro">
			<head>
				<HeadScripts />
			</head>
			<body>{children}</body>
		</html>
	);
}
```

## Best Practices

1. Define default metadata in the root layout
2. Override page-specific metadata in each page
3. Use the utility function to maintain consistency
4. Use dynamic metadata for routes with dynamic data
5. Always include:
    - Title
    - Description
    - Open Graph tags
    - Twitter card tags
    - Canonical URL

## Resources

-   [Next.js Metadata API Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
-   [SEO in Next.js](https://nextjs.org/learn/seo/introduction-to-seo)
