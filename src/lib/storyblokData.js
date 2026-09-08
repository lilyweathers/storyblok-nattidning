import { getStoryblokApi } from '@/lib/storyblok';

export const storyblokVersion = process.env.STORYBLOK_VERSION || 'draft';

export async function getStory(fullSlug, params = {}) {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
		version: storyblokVersion,
		...params,
	});

	return data.story;
}

export async function getStories(params = {}) {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.get('cdn/stories', {
		version: storyblokVersion,
		...params,
	});

	return data.stories;
}