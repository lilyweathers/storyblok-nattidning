import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import HomePage from '@/components/HomePage';

export default async function Page({ params }) {
	const { slug } = await params;

	if (!slug?.length) {
		return <HomePage />;
	}

	const fullSlug = slug.join('/');

	const sbParams = {
		version: 'draft',
	};

	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);

	return <StoryblokStory story={data.story} />;
}
