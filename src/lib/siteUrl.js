const localSiteUrl = 'http://localhost:3000';

export function getSiteUrl() {
	const configuredSiteUrl = process.env.SITE_URL?.trim();

	try {
		return new URL(configuredSiteUrl || localSiteUrl).origin;
	} catch {
		return localSiteUrl;
	}
}
