import { getSiteUrl } from '@/lib/siteUrl';

export default function robots() {
	const siteUrl = getSiteUrl();

	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${siteUrl}/sitemap.xml`,
		host: siteUrl,
	};
}
