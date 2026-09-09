import { getStories } from '@/lib/storyblokData';
import { getSiteUrl } from '@/lib/siteUrl';

const contentRoutePattern = /^(articles|authors|categories)\/[^/]+$/;

function getStoryPriority(fullSlug) {
	return fullSlug.startsWith('articles/') ? 0.8 : 0.6;
}

export default async function sitemap() {
	const siteUrl = getSiteUrl();
	const staticRoutes = [
		{
			url: siteUrl,
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${siteUrl}/articles`,
			changeFrequency: 'daily',
			priority: 0.9,
		},
	];

	try {
		const stories = await getStories({
			per_page: 100,
			sort_by: 'updated_at:desc',
		});
		const contentRoutes = stories
			.filter((story) => contentRoutePattern.test(story.full_slug))
			.map((story) => ({
				url: `${siteUrl}/${story.full_slug}`,
				lastModified: story.published_at || story.updated_at,
				changeFrequency: 'weekly',
				priority: getStoryPriority(story.full_slug),
			}));

		return [...staticRoutes, ...contentRoutes];
	} catch {
		return staticRoutes;
	}
}
