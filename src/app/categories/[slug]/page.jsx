import { notFound } from 'next/navigation';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { getStories, getStory } from '@/lib/storyblokData';

export async function generateStaticParams() {
	try {
		const categories = await getStories({
			starts_with: 'categories/',
		});

		return categories.map((category) => ({
			slug: category.slug,
		}));
	} catch {
		return [];
	}
}

export default async function CategoryRoute({ params }) {
	const { slug } = await params;
	let categoryStory;

	try {
		categoryStory = await getStory(`categories/${slug}`);
	} catch (error) {
		if (error.status === 404 || error.response?.status === 404) {
			notFound();
		}

		throw error;
	}

	const categoryBlok = {
		...categoryStory.content,
		component: 'category',
		category: slug,
		title: categoryStory.name,
	};

	return <StoryblokServerComponent blok={categoryBlok} />;
}
